// Using ZOD for form validation
import * as z from "zod";
// Library for phone number validation
import { parsePhoneNumberFromString } from "libphonenumber-js";

// Phone number regex
const nepaliNumberRegex = /^(97|98)\d{8}$/;

export const checkoutSchema = z.object({
  email: z
    .string()
    .email("Invalid email format (e.g., example@example.com)")
    .min(1, "Email is required")
    .toLowerCase()
    .trim()
    .refine(
      (val) => {
        const FAKE_EMAIL_PROVIDERS = [
          "mailinator.com",
          "tempmail.com",
          "10minutemail.com",
          "guerrillamail.com",
          "yopmail.com",
          "throwawaymail.com",
          "getnada.com",
          "maildrop.cc",
          "dispostable.com",
          "trashmail.com",
          "temp-mail.org",
          "fakeinbox.com",
          "mintemail.com",
          "emailondeck.com",
          "sharklasers.com",
          "grr.la",
          "spamgourmet.com",
          "moakt.com",
          "mailnesia.com",
          "inboxbear.com",
        ];
        const domain = val.split("@")[1];
        return !FAKE_EMAIL_PROVIDERS.includes(domain);
      },
      {
        message: "Please use a permanent email address (not a temporary one).",
      },
    ).refine((val)=>{
      return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/.test(val);
    },{
      message:"Email must end with a valid domain (e.g., .com or .com.np)."
    }),
  firstName: z.string().min(3, "First Name is required"),
  lastName: z.string().min(3, "Last Name is required"),
  phone: z
    .string()
    .length(10, "Phone number must be 10 digits.")
    .refine(
      (value) => {
        const num = parsePhoneNumberFromString(value, "NP");
        return num?.isValid();
      },
      {
        message: "Invalid phone number",
      },
    )
    .refine((val) => nepaliNumberRegex.test(val), {
      message: "Number must start with 97 or 98.",
    }),
  orderNote: z.string().max(500).optional().or(z.literal("")),
  country: z.string().min(1, "Please select your country"),
  city: z.string().min(1, "Please provide your city"),
  address: z.string().min(10, "Please provide detailed address"),
  zip: z
    .string()
    .min(5, "Please provide a zip code")
    .optional()
    .or(z.literal("")),
  payment_method: z
    .enum(["Cash on delivery", "e-sewa", "khalti", "fonepay"])
    .refine((value) => value !== undefined && value !== null, {
      message: "Payment method is required",
    }),
});
export type CheckoutFormValidation = z.infer<typeof checkoutSchema>;
