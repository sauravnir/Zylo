import { NavigationBar } from "@/components/reusable/Navigation";
import { Footer } from "@/components/reusable/Footer";

export const Policy = () => {
  return (
    <div className="min-h-screen">
      <NavigationBar />

      <div className="bg-background">
        <div className="flex flex-col max-w-3xl mx-auto px-4 md:px-6 pt-40 pb-10 gap-4">
          <h1 className="text-h3 text-main uppercase text-center">
            Privacy Policy
          </h1>

          <p className="text-center mt-2 text-muted uppercase text-sm">
            Last Updated: February 2026
          </p>

          {/* Introduction */}
          <div className="flex flex-col gap-6">
            {/* Header Section */}
            <p className="font-body text-muted text-sm tracking-wider font-medium">
              At Zylo Studios, we value and respect your privacy.
            </p>

            {/* Information We Collect */}
            <span className="font-body text-sm text-main font-bold uppercase mt-6">
              Information We Collect
            </span>
            <p className="font-body text-muted text-sm tracking-wider font-medium">
              Personal information such as name, email, phone number, and
              shipping address.
            </p>
            <p className="font-body text-muted text-sm tracking-wider font-medium">
              Payment details (securely handled by trusted third-party payment
              gateways).
            </p>
            <p className="font-body text-muted text-sm tracking-wider font-medium">
              Website data such as cookies and analytics for performance
              improvement.
            </p>

            {/* How We Use Your Information */}
            <span className="font-body text-sm text-main font-bold uppercase mt-6">
              How We Use Your Information
            </span>
            <p className="font-body text-muted text-sm tracking-wider font-medium">
              To process and deliver your orders, communicate order updates,
              promotions, or important notices, and to enhance our website and
              customer experience.
            </p>

            {/* Data Security */}
            <span className="font-body text-sm text-main font-bold uppercase mt-6">
              Data Security
            </span>
            <p className="font-body text-muted text-sm tracking-wider font-medium">
              We implement appropriate security measures to protect your
              personal data. Zylo Studios does not sell, trade, or misuse your
              personal information.
            </p>

            {/* Cookies */}
            <span className="font-body text-sm text-main font-bold uppercase mt-6">
              Cookies
            </span>
            <p className="font-body text-muted text-sm tracking-wider font-medium">
              Our website uses cookies to improve functionality and user
              experience. You may disable cookies through your browser settings.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
