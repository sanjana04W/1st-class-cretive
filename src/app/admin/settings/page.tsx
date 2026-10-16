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
      <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
        <h2 className="font-heading text-lg font-bold text-brand-charcoal mb-5">Business Information</h2>
        <div className="space-y-4">
          {[
            { icon: <Globe className="w-4 h-4 text-brand-gold" />, label: "Website", value: "1stclasscreative.lk (configure domain)" },
            { icon: <Phone className="w-4 h-4 text-brand-gold" />, label: "Phone", value: "074 038 8788" },
            { icon: <Mail className="w-4 h-4 text-brand-gold" />, label: "Email", value: "1stclasscreative97@gmail.com" },
            { icon: <Facebook className="w-4 h-4 text-brand-gold" />, label: "Facebook", value: "facebook.com/1stclasscreative" },
            { icon: <Instagram className="w-4 h-4 text-brand-gold" />, label: "Instagram", value: "@1st_class_creative_" },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
              {icon}
              <span className="text-sm font-medium text-gray-500 w-20 shrink-0">{label}</span>
              <span className="text-sm text-brand-charcoal">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Firebase config */}
      <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
        <h2 className="font-heading text-lg font-bold text-brand-charcoal mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5 text-brand-gold" /> Firebase Configuration
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Firebase credentials are stored in <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">.env.local</code>.
          Update this file with your actual Firebase project credentials before deploying.
        </p>
        <div className="bg-gray-50 rounded-xl p-4 text-xs font-mono text-gray-600 space-y-1.5">
          <p>NEXT_PUBLIC_FIREBASE_API_KEY=<span className="text-brand-gold">••••••••</span></p>
          <p>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<span className="text-brand-gold">••••••••</span></p>
          <p>NEXT_PUBLIC_FIREBASE_PROJECT_ID=<span className="text-brand-gold">••••••••</span></p>
          <p>NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<span className="text-brand-gold">••••••••</span></p>
          <p>NEXT_PUBLIC_FIREBASE_APP_ID=<span className="text-brand-gold">••••••••</span></p>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          🔐 Never commit .env.local to version control.
        </p>
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-2xl shadow-card p-6">
        <h2 className="font-heading text-lg font-bold text-brand-charcoal mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { href: "/", label: "View Home Page" },
            { href: "/portfolio", label: "View Collection" },
            { href: "/services", label: "View Services" },
            { href: "/contact", label: "View Contact Page" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              className="text-sm text-brand-gold hover:underline flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" /> {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
