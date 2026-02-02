import { NavigationBar } from "@/components/reusable/Navigation";
import { Footer } from "@/components/reusable/Footer";

export const Policy = ()=>{
    return (
        <div className="min-h-screen">
            <NavigationBar />


                <div className="flex flex-col max-w-3xl mx-auto px-4 md:px-6 pt-40 pb-10 gap-4">
    <h1 className="text-h3 text-main uppercase text-center">
      Privacy Policy
    </h1>

    <p className="text-center mt-2 text-muted uppercase text-sm">
      Last Updated: February 2026
    </p>

    {/* Introduction */}
    <span className="font-body text-sm text-main font-bold uppercase mt-6">
      Introduction
    </span>

    <p className="font-body text-muted text-sm tracking-wider font-medium">
      Zylo respects your privacy and is committed to protecting your personal
      data. This Privacy Policy explains how we collect, use, store, and protect
      your information when you use our website and services.
    </p>

    {/* Information We Collect */}
    <span className="font-body text-sm text-main font-bold uppercase mt-6">
      Information We Collect
    </span>

    <p className="font-body text-muted text-sm tracking-wider font-medium">
      <span className="text-main font-semibold">Personal Information:</span> Name,
      email address, phone number, billing and shipping details when you create
      an account or make a purchase.
    </p>

    <p className="font-body text-muted text-sm tracking-wider font-medium">
      <span className="text-main font-semibold">Usage Data:</span> IP address,
      browser type, pages visited, and interaction data collected automatically
      to improve our services.
    </p>

    {/* How We Use Your Information */}
    <span className="font-body text-sm text-main font-bold uppercase mt-6">
      How We Use Your Information
    </span>

    <p className="font-body text-muted text-sm tracking-wider font-medium">
      We use your information to process orders, manage your account, improve
      platform performance, communicate important updates, and ensure platform
      security.
    </p>

    {/* Data Sharing */}
    <span className="font-body text-sm text-main font-bold uppercase mt-6">
      Data Sharing and Disclosure
    </span>

    <p className="font-body text-muted text-sm tracking-wider font-medium">
      Zylo does not sell or rent your personal information. Data may be shared
      with trusted third-party service providers strictly for operational and
      legal purposes.
    </p>

    {/* Cookies */}
    <span className="font-body text-sm text-main font-bold uppercase mt-6">
      Cookies and Tracking Technologies
    </span>

    <p className="font-body text-muted text-sm tracking-wider font-medium">
      We use cookies and similar technologies to enhance user experience,
      analyze traffic, and personalize content. You may disable cookies through
      your browser settings.
    </p>

    {/* Data Security */}
    <span className="font-body text-sm text-main font-bold uppercase mt-6">
      Data Security
    </span>

    <p className="font-body text-muted text-sm tracking-wider font-medium">
      We implement industry-standard security measures to protect your data.
      However, no digital platform can guarantee absolute security.
    </p>

    {/* User Rights */}
    <span className="font-body text-sm text-main font-bold uppercase mt-6">
      Your Rights
    </span>

    <p className="font-body text-muted text-sm tracking-wider font-medium">
      You have the right to access, update, or request deletion of your personal
      data. Requests can be made by contacting our support team.
    </p>

    {/* Third-Party Links */}
    <span className="font-body text-sm text-main font-bold uppercase mt-6">
      Third-Party Links
    </span>

    <p className="font-body text-muted text-sm tracking-wider font-medium">
      Our website may contain links to third-party sites. Zylo is not responsible
      for the privacy practices or content of those websites.
    </p>

    {/* Policy Updates */}
    <span className="font-body text-sm text-main font-bold uppercase mt-6">
      Policy Updates
    </span>

    <p className="font-body text-muted text-sm tracking-wider font-medium">
      We may update this Privacy Policy from time to time. Any changes will be
      posted on this page, and continued use of the site constitutes acceptance
      of the updated policy.
    </p>
  </div>
            <Footer />
        </div>
    )
}