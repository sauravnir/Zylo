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

        <span className="font-body text-sm text-main font-bold uppercase mt-4">
          Introduction
        </span>
        <p className="font-body text-muted text-sm tracking-wider font-medium">
          Welcome to Zylo. These Terms and Conditions ("Terms") govern your use
          of our website located at www.zylo.com (the "Site") and the purchase
          of our products. By accessing the Site, you agree to be bound by these
          Terms and all applicable laws and regulations. If you do not agree
          with any of these terms, you are prohibited from using or accessing
          this site.
        </p>

        {/* 2. Eligibility and Account Responsibility */}
        <span className="font-body text-sm text-main font-bold uppercase mt-6">
          Eligibility and Account Responsibility
        </span>

        <p className="font-body text-muted text-sm tracking-wider font-medium">
          <span className="text-main font-semibold">Account Security:</span> If
          you create an account, you are responsible for maintaining the
          confidentiality of your credentials. You agree to accept
          responsibility for all activities that occur under your account.
        </p>

        <p className="font-body text-muted text-sm tracking-wider font-medium">
          <span className="text-main font-semibold">
            Accuracy of Information:
          </span>{" "}
          You represent that all information provided to us is accurate,
          current, and complete. We reserve the right to terminate accounts that
          provide false data.
        </p>

        {/* 3. Intellectual Property Rights */}
        <span className="font-body text-sm text-main font-bold uppercase mt-6">
          Intellectual Property Rights
        </span>

        <p className="font-body text-muted text-sm tracking-wider font-medium">
          The Site and its original content, features, and functionality
          (including but not limited to all information, software, text,
          displays, images, video, and audio, and the design, selection, and
          arrangement thereof) are owned by Zylo and are protected by
          international copyright, trademark, patent, trade secret, and other
          intellectual property or proprietary rights laws.
        </p>

        <p className="font-body text-muted text-sm tracking-wider font-medium">
          <span className="text-main font-semibold">Restriction:</span> You may
          not reproduce, distribute, modify, create derivative works of,
          publicly display, or commercially exploit any material from our Site
          without express written consent.
        </p>

        {/* 4. Purchase and Payment Terms */}
        <span className="font-body text-sm text-main font-bold uppercase mt-6">
          Purchase and Payment Terms
        </span>

        <p className="font-body text-muted text-sm tracking-wider font-medium">
          <span className="text-main font-semibold">Pricing:</span> All prices
          are subject to change without notice. We reserve the right to modify
          or discontinue any product at any time.
        </p>

        <p className="font-body text-muted text-sm tracking-wider font-medium">
          <span className="text-main font-semibold">Billing:</span> You agree to
          provide current, complete, and accurate purchase and account
          information for all purchases made at our store.
        </p>

        <p className="font-body text-muted text-sm tracking-wider font-medium">
          <span className="text-main font-semibold">OTP Verification:</span> To
          ensure the security of transactions, we employ a One-Time Password
          (OTP) verification system via email. Receipt of an OTP constitutes a
          digital handshake confirming your intent to proceed.
        </p>

        {/* 5. Shipping, Risk of Loss, and Customs */}
        <span className="font-body text-sm text-main font-bold uppercase mt-6">
          Shipping, Risk of Loss, and Customs
        </span>

        <p className="font-body text-muted text-sm tracking-wider font-medium">
          <span className="text-main font-semibold">Delivery:</span> All orders
          are subject to product availability. Shipping times are estimates.
        </p>

        <p className="font-body text-muted text-sm tracking-wider font-medium">
          <span className="text-main font-semibold">Risk of Loss:</span> All
          items are made pursuant to a shipment contract. Risk of loss and title
          pass to you upon delivery to the carrier.
        </p>

        <p className="font-body text-muted text-sm tracking-wider font-medium">
          <span className="text-main font-semibold">International Orders:</span>{" "}
          You are responsible for any import duties, taxes, or customs fees
          imposed by your country.
        </p>

        {/* 6. Limitation of Liability */}
        <span className="font-body text-sm text-main font-bold uppercase mt-6">
          Limitation of Liability
        </span>

        <p className="font-body text-muted text-sm tracking-wider font-medium">
          In no event shall Zylo, nor its directors, employees, partners, or
          agents, be liable for any indirect, incidental, special,
          consequential, or punitive damages, including loss of profits, data,
          use, goodwill, or other intangible losses.
        </p>

        {/* 7. User-Generated Content */}
        <span className="font-body text-sm text-main font-bold uppercase mt-6">
          User-Generated Content
        </span>

        <p className="font-body text-muted text-sm tracking-wider font-medium">
          If you post comments, photos, reviews, or tag Zylo on social media,
          you grant us a non-exclusive, royalty-free, perpetual, and irrevocable
          right to use, reproduce, and modify such content.
        </p>

        <p className="font-body text-muted text-sm tracking-wider font-medium">
          You represent that you own the rights to any content you post.
        </p>

        {/* 8. Governing Law */}
        <span className="font-body text-sm text-main font-bold uppercase mt-6">
          Governing Law
        </span>

        <p className="font-body text-muted text-sm tracking-wider font-medium">
          These Terms shall be governed and construed in accordance with the
          laws of Nepal, without regard to its conflict of law provisions.
        </p>

        {/* 9. Changes to Terms */}
        <span className="font-body text-sm text-main font-bold uppercase mt-6">
          Changes to Terms
        </span>

        <p className="font-body text-muted text-sm tracking-wider font-medium">
          We reserve the right to modify or replace these Terms at our sole
          discretion. Updated terms will be posted on this page. Continued use
          of the Site constitutes acceptance of the revised Terms.
        </p>
      </div>
    </div>
      

      <Footer />
    </div>
  );
};
