// Using ZOD for form validation 
import * as z from "zod";

export const checkoutSchema = z.object({
  email : z.string().email("Invalid email address"),
  firstName : z.string().min(3,"First Name is required"),
  lastName : z.string().min(3,"Last Name is required"),
  phone : z.string().min(10, "Phone number must be atleast 10 digits"),
  orderNote : z.string().max(500).optional().or(z.literal("")),
  country : z.string().min(1,"Please select your country"),
  city:z.string().min(1,"Please provide your city"),
  address : z.string().min(10, "Please provide detailed address"),
  zip : z.string().min(5,"Please provide a zip code").optional().or(z.literal("")),
  payment_method : z.enum(["cod","e-sewa","khalti","fonepay"]).refine(
    (value) => value !== undefined && value !== null,
    { message: "Payment method is required" }
  ),
})
export type CheckoutFormValidation = z.infer<typeof checkoutSchema>;
