import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkoutSchema,
  type CheckoutFormValidation,
} from "../schemas/checkoutForm-schema";
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

  // form submit action logic
  const onFormSubmit = async (formData: CheckoutFormValidation) => {
    // Calling the startSubmitting state from the Parent Component i.e CheckoutPage to remove the navigation to cart page error
    onStartSubmitting();
    dispatch(setIsUploading(true));
    // Creating the final order object and passing into the useLocation state
    const confirmOrder = {
      customerData: formData,
      items: cartItems,
      orderSummary: {
        subTotal,
        shippingAmount,
        totalAmount,
        symbol,
        orderNumber: `ZY-${Math.floor(Math.random() * 900) + 1000}`,
      },
    };

    await new Promise((resolve) => setTimeout(resolve, 2000));
    dispatch(setIsUploading(false));
    navigate("/thank-you", { state: { order: confirmOrder } });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
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
                  <Input placeholder="Phone" {...field} />
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
                  Country/Region *
                </FormLabel>

                {/* 1. Select wraps everything */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || "Nepal"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose item" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent className="bg-card">
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
                  City *
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleCitySelect(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
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
                  Address *
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
          {/* Form Submit Button */}
          <PrimaryButton
            type="submit"
            isDisabled={false}
            name="Place Order"
            onClick={() => onFormSubmit}
          />
        </div>
      </form>
    </Form>
  );
}
