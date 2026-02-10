import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkoutSchema,
  type CheckoutFormValidation,
} from "../../schemas/checkoutForm-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import type { RootState } from "@/store/store";
import {
  addNote,
  setIsUploading,
  updateShipping,
} from "@/store/slices/cartSlice";
import { PrimaryButton } from "./ButtonComponent";
import { useNavigate } from "react-router-dom";
import { DELIVERY_LOCATIONS } from "@/objects/Objects";
import { requestOtp, verifyOtp } from "@/api/authService";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";


export function CheckoutForm({
  subTotal,
  shippingAmount,
  totalAmount,
  symbol,
  onStartSubmitting,
}: {
  subTotal: number;
  shippingAmount: number;
  totalAmount: number;
  symbol: string;
  onStartSubmitting: () => void;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const orderNote = useAppSelector((state: RootState) => state.cart.orderNote);
  const isUploading = useAppSelector(
    (state: RootState) => state.cart.isUploading,
  );
  // Getting the rates and code from the redux store. Done for converting the currency to NPR in the checkout process.
    // const {rate , activeCurrency} = useAppSelector((state:RootState)=>state.currency)

  // Creating otp handling states
  //Opening and closing the otp entry field
  const [showOtp, setShowOtp] = useState<boolean>(()=>{
    return localStorage.getItem("show_otp") === "true";
  }); 
  const [otpValue, setOtpValue] = useState(""); //State for managing the otp value


  // Handling the resendOtp timer
  const [timer , setTimer] = useState(0);
  const [canResend , setCanResend] = useState(false);

  // Retrieving the timer from the localStorage
  useEffect(()=>{
    const otpExpiry = localStorage.getItem('otp_expiry');
    if(otpExpiry){
      const remainingTime = Math.floor((parseInt(otpExpiry) - Date.now()) / 1000); // Calculating the time remaining for the timer
      if (remainingTime > 0) {
        setTimer(remainingTime);
        setShowOtp(true); //Reopening the otp field
      } else{
        localStorage.removeItem("otp_expiry");
        localStorage.removeItem("show_otp");
      }
    }
  },[])

  // This handles the otptimer sideffect. 
  useEffect(()=>{
    let interval :ReturnType<typeof setTimeout>; //setting the type 
    
    if(timer > 0){
      setCanResend(false);
      interval = setInterval(()=>{
        setTimer((prev)=> {
          const nextValue = prev-1 ; 
          if (nextValue <=0) localStorage.removeItem("otp_expiry");
          return nextValue;
        });
      }, 1000)
    } else{
      setCanResend(true);
    };

    return () => clearInterval(interval);
  }, [timer])


  // Getting the formData from the local storage 
  const getSavedFormData = () => {
    const savedForm = localStorage.getItem("checkout_form");
    const currentTime = Date.now()
    if(savedForm){
      try{
        const decodedData = atob(savedForm) //Decoding the encoded data 
        const parsedData = JSON.parse(decodedData)
        const {formData ,expiresAt} =parsedData;
        // Checking if the localStorage items is expired or not
        if(currentTime > expiresAt){
          localStorage.removeItem("checkout_form");
          return null;
        }
        return formData;
      } catch(error){
        return null;
      }
    }
    return null;
  }

  // Creating a form validation state using zod and react-hook-form
  const form = useForm<CheckoutFormValidation>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: getSavedFormData() || { //Setting the form fields with the data in localStorage
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      orderNote: orderNote || "",
      country: "Nepal",
      city: "",
      address: "",
      zip: "",
      payment_method: "Cash on delivery",
    },
  });

// Persisting the form data even if the page refreshes
const isPersisting = useRef(true);
const expiryTime = 30*60*1000; // 30mins expiry time 

useEffect(()=>{
  const formvalue = form.getValues();
  const hasData = Object.values(formvalue).some(value => value != "" && value !=="Nepal");
  if(isPersisting.current && hasData){ //fetching the value of isPersisting
    const {city , ...restItems} = formvalue; //Not including the city name in the localStorage. 
    const formItems ={
      formData : restItems,
      expiresAt : Date.now() + expiryTime
    }
    localStorage.setItem("checkout_form" , btoa(JSON.stringify(formItems))) //Base64 encoding : btoa
  }
},[form.watch()]) //same as form.getValues()

// Checking the email form field and if the field is empty then setting the showOtp to false to avoid unnecessary glitches
const emailValue = form.watch("email") 
useEffect(()=>{
  if(emailValue === ""){
    setShowOtp(false)
    localStorage.setItem("show_otp" ,"false");
  }
},[emailValue])


  // Handling the delivery charge addition logic
  const handleCitySelect = (cityName: string) => {
    // finding the rate for the selected city
    const currentCity = DELIVERY_LOCATIONS.find((loc) => loc.city === cityName);
    if (currentCity) {
      dispatch(
        updateShipping({
          city: currentCity.city,
          cost: currentCity.rate,
        }),
      );
    }
  };

  // SENDING OTP LOGIC
  const onFormSubmit = async (formData: CheckoutFormValidation) => {

    if(!canResend) return; // If canResend = false , the user is unable to click the button.
    // Calling the startSubmitting state from the Parent Component i.e CheckoutPage to remove the navigation to cart page error
    onStartSubmitting();
    dispatch(setIsUploading(true));
    // handling the otp call from the server
    try {
      // Reqesting the otp from the backend
      await requestOtp(formData.email);
      // Setting the showOtp to localStorage
      setShowOtp(true);
      localStorage.setItem("show_otp" , "true");
      // Opening the otp field
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Setting a cooldown of 30 seconds and storing in localStorage
      const cooldownTime = Date.now() + 30 * 1000;
      localStorage.setItem("otp_expiry" , cooldownTime.toString());
      setTimer(30); //Setting the cooldown timer to 30 seconds.
      
    } catch (error: any) {
      // Handling rate-limit error.
      if (error.response?.status === 429) {
        const msg =
          typeof error.response.data === "string"
            ? error.response.data
            : error.response.data.message;

        toast.error(msg || "Too many attempts.");
        // Storing the timer in LocalStorage
        const expiryTime = Date.now() + 300 * 1000;
        localStorage.setItem("otp_expiry" , expiryTime.toString())
        setTimer(300); //Setting timer for 5 minutes
      } else {
        toast.error("Failed to send OTP.");
      }
    } finally {
      dispatch(setIsUploading(false));
    }
  };

  // When clicking on the verify otp button.
  const handleOtpVerification = async () => {
    // Handling the form validation logic
    const isFormValid = await form.trigger()
    if(!isFormValid){
      toast.error("Please fill in all the details.");
      return;
    }
    if (!otpValue) return toast.error("Please enter the code.");
    if (otpValue.length < 6)
      return toast.error("Please enter the full 6-digit code.");
    
    dispatch(setIsUploading(true));
    const localCartItem = [...cartItems];
    
    try {
      const email = form.getValues("email");
      const orderData = {
        customerData: form.getValues(),
        items: localCartItem,
        orderSummary: {
          subTotal,
          shippingAmount,
          totalAmount,
          symbol,
          orderNumber: `ZY-${Math.floor(Math.random() * 900) + 1000}`,
        },
      };

      const result = await verifyOtp(email, otpValue, orderData);
      if (result.success) {
        // Stopping the localStorage form persistance right away
        isPersisting.current = false;
        // Removing the localStorage Items
        localStorage.removeItem("checkout_form");
        localStorage.removeItem("show_otp");
        localStorage.removeItem("otp_expiry");

        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate("/thank-you", { state: { order: orderData } });

      } else {
        toast.error(result.message || "Invalid OTP");
        setOtpValue("");
      }
    } catch (error: any) {
      const serverMessage = error.response?.data?.message;
      toast.error(serverMessage || "Something went wrong on the server.");  
      setOtpValue("");
    } finally {
      dispatch(setIsUploading(false));
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="space-y-8"
        noValidate
      >
        <div className="space-y-6">
          <h2 className="text-base font-bold underline uppercase tracking-widest">
            Customer Details
          </h2>
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-nav uppercase tracking-widest">
                  Email*
                </FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage className="text-red-600 font-medium text-[15px] tracking-wide" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-nav uppercase tracking-widest">
                    First name*
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-600 font-medium text-[15px] tracking-wide" />
                </FormItem>
              )}
            />
            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-nav uppercase tracking-widest">
                    Last name*
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-600 font-medium text-[15px] tracking-wide" />
                </FormItem>
              )}
            />
          </div>

          {/* Phone  */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-nav uppercase tracking-widest">
                  Phone*
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Phone"
                    {...field}
                    type="tel"
                    inputMode="numeric"
                  />
                </FormControl>
                <FormMessage className="text-red-600 font-medium text-[15px] tracking-wide" />
              </FormItem>
            )}
          />

          <h2 className="text-base font-bold uppercase underline tracking-widest">
            Delivery details
          </h2>
          {/* Country Select */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-nav uppercase tracking-widest">
                  Country*
                </FormLabel>

                {/* 1. Select wraps everything */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || "Nepal"}
                >
                  <FormControl>
                    <SelectTrigger className="border border-main shadow-lg">
                      <SelectValue placeholder="Choose item" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent className="bg-background border">
                    <SelectItem value="Nepal">Nepal</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage className="text-red-600 font-medium text-[15px] tracking-wide" />
              </FormItem>
            )}
          />
          {/* City */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-nav uppercase tracking-widest">
                  City*
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleCitySelect(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border border-main shadow-lg">
                      <SelectValue placeholder="Choose a city" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[200px] overflow-y-hidden bg-card">
                    {DELIVERY_LOCATIONS.map((loc) => (
                      <SelectItem
                        key={loc.city}
                        value={loc.city}
                        className="hover:bg-muted/5 cursor-pointer"
                      >
                        <div className="flex justify-between w-full gap-20">
                          <span>{loc.city}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage className="text-red-600 font-medium text-[15px] tracking-wide" />
              </FormItem>
            )}
          />
          {/* Address select */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-nav uppercase tracking-widest">
                  Address*
                </FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormMessage className="text-red-600 font-medium text-[15px] tracking-wide" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="orderNote"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-end">
                  <FormLabel className="text-nav uppercase  tracking-widest">
                    Order Note
                  </FormLabel>
                  {/* The "Remove" Logic */}
                </div>
                <FormControl>
                  <Textarea
                    {...field}
                    onChange={(e) => {
                      field.onChange(e); // Updates React Hook Form
                      dispatch(addNote({ note: e.target.value })); // Updates Redux Store
                    }}
                    placeholder="Add specific delivery instructions..."
                    className="border border-main placeholder:text-main/70 shadow-lg"
                  />
                </FormControl>
                {field.value && (
                  <button
                    type="button"
                    onClick={() => {
                      field.onChange(""); //clears the form
                      dispatch(addNote({ note: "" })); // Clears the redux stored note
                    }}
                    className="flex flex-row "
                  >
                    <span className="text-center text-tiny tracking-wide text-muted hover:text-main hover:underline">
                      Remove Note
                    </span>
                  </button>
                )}
                <FormMessage className="text-red-600 font-medium text-[15px] tracking-wide" />
              </FormItem>
            )}
          />

          {/* Zip */}
          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-nav uppercase tracking-widest">
                  Zip Code
                </FormLabel>
                <FormControl>
                  <Input placeholder="Zip Code" {...field} />
                </FormControl>
                <FormMessage className="text-red-600 font-medium text-[15px] tracking-wide" />
              </FormItem>
            )}
          />

          <h2 className="text-base font-bold uppercase underline tracking-widest">
            Payment method
          </h2>

          <div className="p-4 border rounded-sm bg-neutral-50 flex justify-between items-center shadow-lg">
            <span className="text-sm">Cash on delivery (COD) </span>
            <div className="h-4 w-4 rounded-full border-2 border-main bg-main shadow-[inset_0_0_0_2px_white]" />
          </div>

          {/* Conditionally rendering the otp input field */}
          {showOtp && (
            <div className="p-6 border-2 border-main/20 bg-muted/5 rounded-lg flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-300">
              <div className="text-center space-y-1">
                <h3 className="text-paragraph font-bold uppercase tracking-widest text-main">
                  Verification Required
                </h3>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
                  A 6-digit code was sent to -{" "}
                  <span className="text-main font-semibold lowercase">
                    {form.getValues("email")}
                  </span>
                </p>
              </div>

              {/* OTP INPUT CONTAINER */}
              <div className="bg-card p-2 rounded-md shadow-sm border border-muted/30">
                <InputOTP
                  maxLength={6}
                  value={otpValue}
                  pattern={REGEXP_ONLY_DIGITS}
                  onChange={(value) => setOtpValue(value)}
                >
                  <InputOTPGroup className="gap-2 ">
                    <InputOTPSlot
                      index={0}
                      className="rounded-md shadow-lg border-muted-foreground/20 text-lg font-bold w-10 h-12 md:w-12 md:h-14 focus:ring-main"
                    />
                    <InputOTPSlot
                      index={1}
                      className="rounded-md shadow-lg border-muted-foreground/20 text-lg font-bold w-10 h-12 md:w-12 md:h-14"
                    />
                    <InputOTPSlot
                      index={2}
                      className="rounded-md shadow-lg border-muted-foreground/20 text-lg font-bold w-10 h-12 md:w-12 md:h-14"
                    />
                  </InputOTPGroup>

                  <InputOTPSeparator className="mx-1 text-muted" />

                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot
                      index={3}
                      className="rounded-md shadow-lg border-muted-foreground/20 text-lg font-bold w-10 h-12 md:w-12 md:h-14"
                    />
                    <InputOTPSlot
                      index={4}
                      className="rounded-md shadow-lg border-muted-foreground/20 text-lg font-bold w-10 h-12 md:w-12 md:h-14"
                    />
                    <InputOTPSlot
                      index={5}
                      className="rounded-md shadow-lg border-muted-foreground/20 text-lg font-bold w-10 h-12 md:w-12 md:h-14"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="flex flex-row items-center justify-center gap-2">
                <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
                  Didn't receive any code?
                </span>
                <button
                  onClick={() => onFormSubmit(form.getValues())}
                  disabled={!canResend}
                  className={`text-tiny font-bold tracking-normal underline hover:text-muted text-main ${!canResend ? "text-muted hover:none" : ""}`}
                >
                  {!canResend ? (
                    `Wait : (${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}) to resend.`
                  ): "Resend otp"}
                </button>
              </div>
            </div>
          )}

          {/* Form Submit Button */}
          <div className="shadow-lg">
            <PrimaryButton
              type="button"
              isDisabled={isUploading}
              name={showOtp ? "Verify & Place Order" : "Get Verification Code"}
              onClick={
                showOtp
                  ? handleOtpVerification
                  : form.handleSubmit(onFormSubmit)
              }
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
