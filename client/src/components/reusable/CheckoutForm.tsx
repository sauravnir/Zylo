import { useState } from "react";
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

  // Creating otp handling states
  const [showOtp, setShowOtp] = useState(false); //Opening and closing the otp entry field
  const [otpValue, setOtpValue] = useState(""); //State for managing the otp value

  // Creating a form validation state using zod and react-hook-form
  const form = useForm<CheckoutFormValidation>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
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
    // Calling the startSubmitting state from the Parent Component i.e CheckoutPage to remove the navigation to cart page error
    onStartSubmitting();
    dispatch(setIsUploading(true));
    // handling the otp call from the server
    try {
      // Reqesting the otp from the backend
      await requestOtp(formData.email);
      // Opening the otp field
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setShowOtp(true);
    } catch (error) {
      toast.error("Failed to send OTP.");
    } finally {
      dispatch(setIsUploading(false));
    }
  };

  // When clicking on the verify otp button.
  const handleOtpVerification = async () => {
  if (!otpValue) return toast.error("Please enter the code.");
  if (otpValue.length < 6) return toast.error("Please enter the full 6-digit code.");
  
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
          <h2 className="text-base font-bold uppercase tracking-widest">
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

          <h2 className="text-base font-bold uppercase tracking-widest">
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
                    <SelectTrigger className="border border-main">
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
                    <SelectTrigger className="border border-main">
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
                  <FormLabel className="text-nav uppercase tracking-widest">
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
                    className="border border-main placeholder:text-main/70"
                  />
                </FormControl>
                {field.value && (
                  <button
                    type="button"
                    onClick={() => {
                      field.onChange(""); //clears the fortm
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

          <h2 className="text-base font-bold uppercase tracking-widest">
            Payment method
          </h2>

          <div className="p-4 border rounded-sm bg-neutral-50 flex justify-between items-center">
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
                <span className="text-[11px] text-muted-foreground uppercase tracking-wider">Didn't receive any code?</span>
                <button
                onClick={()=>onFormSubmit(form.getValues())}
                className="text-tiny font-bold tracking-normal underline hover:text-muted text-main"
                >
                  Resend code
                </button>
              </div>
            </div>
          )}

          {/* Form Submit Button */}
          <PrimaryButton
            type="button"
            isDisabled={isUploading}
            name={showOtp ? "Verify & Place Order" : "Get Verification Code"}
            onClick={
              showOtp ? handleOtpVerification : form.handleSubmit(onFormSubmit)
            }
          />
        </div>
      </form>
    </Form>
  );
}
