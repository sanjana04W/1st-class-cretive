import type { Metadata } from "next";
import Link from "next/link";
import {
  Globe,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Shield,
} from "lucide-react";

export const metadata: Metadata = { title: "Settings | Admin" };

export default function AdminSettingsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-brand-charcoal">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Website and business configuration overview.</p>
      </div>

      {/* Business info */}
      <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-2xs p-6 mb-6">
        <h2 className="font-heading text-lg font-bold text-brand-charcoal mb-5">Business Information</h2>
        <div className="space-y-4">
          {[
            { icon: <Globe className="w-4 h-4 text-[#9A7A2E]" />, label: "Website", value: "1stclasscreative.lk" },
            { icon: <Phone className="w-4 h-4 text-[#9A7A2E]" />, label: "Phone", value: "074 038 8788" },
            { icon: <Mail className="w-4 h-4 text-[#9A7A2E]" />, label: "Email", value: "1stclasscreative97@gmail.com" },
            { icon: <Facebook className="w-4 h-4 text-[#9A7A2E]" />, label: "Facebook", value: "facebook.com/1stclasscreative" },
            { icon: <Instagram className="w-4 h-4 text-[#9A7A2E]" />, label: "Instagram", value: "@1st_class_creative_" },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 py-3 border-b border-[#EFECE6] last:border-0">
              <div className="w-8 h-8 rounded-lg bg-[#FAF6EC] border border-[#E9DFCE] flex items-center justify-center shrink-0">
                {icon}
              </div>
              <span className="text-xs font-bold text-gray-500 w-24 shrink-0 uppercase tracking-wider">{label}</span>
              <span className="text-xs font-semibold text-brand-charcoal">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Firebase config */}
      <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-2xs p-6 mb-6">
        <h2 className="font-heading text-lg font-bold text-brand-charcoal mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#9A7A2E]" /> Firebase Configuration
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          Firebase credentials are encrypted and stored in <code className="bg-[#FAF7F0] border border-[#DEC47F]/40 text-[#8C6D27] px-1.5 py-0.5 rounded text-xs font-mono">.env.local</code>.
        </p>
        <div className="bg-[#FAF9F5] border border-[#EFECE6] rounded-xl p-4 text-xs font-mono text-gray-600 space-y-1.5 tabular-nums">
          <p>NEXT_PUBLIC_FIREBASE_API_KEY=<span className="text-[#9A7A2E]">••••••••</span></p>
          <p>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<span className="text-[#9A7A2E]">••••••••</span></p>
          <p>NEXT_PUBLIC_FIREBASE_PROJECT_ID=<span className="text-[#9A7A2E]">••••••••</span></p>
          <p>NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<span className="text-[#9A7A2E]">••••••••</span></p>
          <p>NEXT_PUBLIC_FIREBASE_APP_ID=<span className="text-[#9A7A2E]">••••••••</span></p>
        </div>
        <p className="text-[11px] text-gray-400 mt-3 flex items-center gap-1">
          <span>🔐 Production keys securely mounted for 1st Class Creative</span>
        </p>
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-2xs p-6">
        <h2 className="font-heading text-lg font-bold text-brand-charcoal mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { href: "/", label: "Storefront Home" },
            { href: "/portfolio", label: "Art Collection" },
            { href: "/services", label: "Bespoke Services" },
            { href: "/contact", label: "Contact Inquiries" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              className="text-xs font-semibold text-[#8C6D27] hover:text-[#9A7A2E] hover:underline flex items-center gap-1.5 p-2 rounded-lg hover:bg-[#FAF7F0] transition-colors"
            >
              <Globe className="w-3.5 h-3.5" /> {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
