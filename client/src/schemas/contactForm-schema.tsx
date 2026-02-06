import * as z from "zod"; 

export const contactSchema = z.object({
    fullname: z.string().min(3 , "Full name is required."),
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
        orderNumber: z.string().min(4, "Order number is required.").startsWith("ZY", "Order number must start with ZY."),
        message:z.string().max(500).min(5,"Please write a message.")
});

export type ContactFormValidation = z.infer<typeof contactSchema>
