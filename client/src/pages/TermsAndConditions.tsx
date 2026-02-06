import { NavigationBar } from "@/components/reusable/Navigation";
import { Footer } from "@/components/reusable/Footer";
export const TermsandConditions = () => {
  return (
    <div className="min-h-screen">
      <NavigationBar />
      <div className="bg-background">
        <div className="flex flex-col max-w-3xl mx-auto px-4 md:px-6 pt-40 pb-10 gap-4">
          <h1 className="text-h3 text-main uppercase text-center">
            Terms and Conditions
          </h1>
          <p className="text-center mt-2 text-muted uppercase text-sm">
            Last Updated: February 2026
          </p>

          <div className="flex flex-col gap-6">
            {/* General Conditions */}
            <span className="font-body text-sm text-main font-bold uppercase mt-4">
              General Conditions
            </span>
            <p className="font-body text-muted text-sm tracking-wider font-medium">
              You must be at least 13 years old or have parental consent to use
              this website.
            </p>
            <p className="font-body text-muted text-sm tracking-wider font-medium">
              Prices, product availability, and policies may change without
              prior notice.
            </p>

            {/* Orders & Payments */}
            <span className="font-body text-sm text-main font-bold uppercase mt-6">
              Orders & Payments
            </span>
            <p className="font-body text-muted text-sm tracking-wider font-medium">
              Zylo Studios reserves the right to cancel or refuse any order.
              Cash on delivery available.
            </p>

            {/* Intellectual Property */}
            <span className="font-body text-sm text-main font-bold uppercase mt-6">
              Intellectual Property
            </span>
            <p className="font-body text-muted text-sm tracking-wider font-medium">
              All content, designs, logos, images, and text on this website
              belong to Zylo Studios. Unauthorized use or reproduction is
              strictly prohibited.
            </p>

            {/* Limitation of Liability */}
            <span className="font-body text-sm text-main font-bold uppercase mt-6">
              Limitation of Liability
            </span>
            <p className="font-body text-muted text-sm tracking-wider font-medium">
              Zylo Studios shall not be held liable for any indirect,
              incidental, or consequential damages arising from the use of our
              products or website.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
