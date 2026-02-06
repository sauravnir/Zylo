import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  type ContactFormValidation,
} from "@/schemas/contactForm-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NavigationBar } from "@/components/reusable/Navigation";
import { Footer } from "@/components/reusable/Footer";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "@/components/reusable/ButtonComponent";
import { Link } from "react-router-dom";
export function ContactPage() {
  // Creating a form validation state

  const form = useForm<ContactFormValidation>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullname: "",
      email: "",
      orderNumber: "",
      message: "",
    },
  });


//  Resume work when connected to backend: 
// Handle the form submisstion. 
  const handleFormSubmission = ()=>{

  }

  return (
    <div className="min-h-screen">
      <NavigationBar />

      <div className="bg-background">
        <main className="flex flex-col max-w-3xl mx-auto px-4 md:px-6 pt-40 pb-10">
          <h1 className="text-h3 text-main uppercase text-center">
            Contact Us
          </h1>

          <p className="text-base text-main/70 mt-8 text-center">
            Let us help you answer any questions about our products, shipping,
            returns, size guides, drop dates, or anything else on your mind!
          </p>
          <p className="text-base text-main/70 text-center mt-4">
            You can contact us on{" "}
            <Link
              to="https://www.instagram.com/zylo.studios/"
              target="_blank"
              className="underline hover:text-main"
            >
              Instagram
            </Link>
            , email us at{" "}
            <button
              onClick={() =>
                window.open(
                  "https://mail.google.com/mail/?view=cm&to=brandzylo@gmail.com&su=Inquiry&body=Greetings, ",
                  "_blank",
                )
              }
              className="underline hover:text-main"
            >
              brandzylo@gmail.com
            </button>{" "}
            or fill out the form below! All inquiries will be responded to
            within 48hrs.
          </p>
          <div className="space-y-4 mt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleFormSubmission)} className="space-y-8" noValidate>
                {/* Full Name */}
                <div className="grid grid-cols-2 gap-4 ">
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-nav uppercase tracking-widest">
                          Fullname*
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Fullname" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-600 font-medium text-[15px] tracking-widest" />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={(field) => (
                      <FormItem>
                        <FormLabel className="text-nav uppercase tracking-widest">
                          Email*
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="E-mail" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-600 font-medium text-[15px] tracking-widest" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Order number */}
                <FormField
                  control={form.control}
                  name="orderNumber"
                  render={(field) => (
                    <FormItem>
                      <FormLabel className="text-nav uppercase tracking-widest">
                        Order Number*
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Order Number" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-600 font-medium text-[15px] tracking-wide" />
                    </FormItem>
                  )}
                />
                {/* Message Box */}
                <FormField
                  control={form.control}
                  name="message"
                  render={(field) => (
                    <FormItem>
                      <FormLabel className="text-nav uppercase tracking-widest">
                        Message*
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Message"
                          className="border border-main placeholder:text-main/70 shadow-lg"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 font-medium text-[15px] tracking-wide" />
                    </FormItem>
                  )}
                />

                <PrimaryButton
                type="submit"
                isDisabled={true}
                name="Submit"
                onClick={()=>{}}
              />
              </form>
              
            </Form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
