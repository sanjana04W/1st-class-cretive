import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy | 1st Class Creative" };

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-20 max-w-3xl mx-auto px-4 sm:px-6">
      <h1 className="font-heading text-4xl font-bold text-brand-charcoal mb-3">Privacy Policy</h1>
      <p className="text-gray-400 text-sm mb-10">Last updated: October 2026</p>
      <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
        <p>
          1st Class Creative ("<strong>we</strong>", "<strong>us</strong>", or "<strong>our</strong>") is committed to protecting your personal information. This Privacy Policy explains how we collect, use and protect information you provide when contacting us or visiting our website.
        </p>
        <h2 className="font-heading text-xl font-bold text-brand-charcoal">Information We Collect</h2>
        <p>
          When you submit an enquiry through our contact form, we collect your name, phone number, email address (optional), enquiry type and message. This information is stored securely in Firebase Firestore and used only to respond to your enquiry.
        </p>
        <h2 className="font-heading text-xl font-bold text-brand-charcoal">How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>To respond to your enquiry or order request</li>
          <li>To follow up on pending orders or quotes</li>
          <li>To improve our products and services</li>
        </ul>
        <h2 className="font-heading text-xl font-bold text-brand-charcoal">Data Sharing</h2>
        <p>
          We do not sell, trade or share your personal information with third parties, except where required by law or necessary to process your order (e.g., delivery partners).
        </p>
        <h2 className="font-heading text-xl font-bold text-brand-charcoal">Data Retention</h2>
        <p>
          Enquiry records are retained for operational purposes and deleted upon request. You may contact us at 1stclasscreative97@gmail.com to request deletion of your data.
        </p>
        <h2 className="font-heading text-xl font-bold text-brand-charcoal">Contact</h2>
        <p>
          For privacy questions, contact us at <a href="mailto:1stclasscreative97@gmail.com" className="text-brand-gold hover:underline">1stclasscreative97@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}
