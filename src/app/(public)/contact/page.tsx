"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Phone, Mail, MessageCircle, Send, MapPin, Facebook, Instagram } from "lucide-react";
import { submitInquiry } from "@/lib/firestore";
import type { ContactFormData, InquiryType } from "@/types";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9a8.27 8.27 0 0 0 4.83 1.55V7.08a4.85 4.85 0 0 1-1.06-.39z" />
    </svg>
  );
}

const inquiryTypes: { value: InquiryType; label: string }[] = [
  { value: "resin-creation", label: "Resin Creation" },
  { value: "wedding-invitation", label: "Wedding Invitation" },
  { value: "cake-box", label: "Cake Box" },
  { value: "custom-order", label: "Custom Order" },
  { value: "general", label: "General Enquiry" },
];

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    try {
      await submitInquiry(data);
      setSubmitted(true);
      reset();
      toast.success("Your enquiry was sent! We'll be in touch soon. ✨");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try WhatsApp or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <div className="relative pt-32 pb-20 bg-gradient-to-br from-brand-charcoal to-brand-charcoal-light overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/468396156_2478270609044241_1138043242894587302_n.jpg" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-3">✦ Get In Touch</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white">Contact Us</h1>
          <div className="gold-divider" />
          <p className="text-gray-300 text-lg">
            Ready to order or have a question? We'd love to hear from you.
          </p>
        </div>
      </div>

      <section className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-brand-charcoal mb-6">Get In Touch</h2>
                <div className="space-y-4">
                  <a href="tel:0740388788" className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-brand-champagne flex items-center justify-center shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                      <Phone className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-charcoal text-sm">Phone</p>
                      <p className="text-gray-500 text-sm mt-0.5">074 038 8788</p>
                    </div>
                  </a>
                  <a href="mailto:1stclasscreative97@gmail.com" className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-brand-champagne flex items-center justify-center shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                      <Mail className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-charcoal text-sm">Email</p>
                      <p className="text-gray-500 text-sm mt-0.5 break-all">1stclasscreative97@gmail.com</p>
                    </div>
                  </a>
                  <a href="https://wa.me/94740388788" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/20 transition-colors">
                      <MessageCircle className="w-5 h-5 text-[#25D366]" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-charcoal text-sm">WhatsApp</p>
                      <p className="text-gray-500 text-sm mt-0.5">Chat with us directly</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Social */}
              <div>
                <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-4">Follow Us</h3>
                <div className="space-y-3">
                  {[
                    { href: "https://www.facebook.com/1stclasscreative/", icon: <Facebook className="w-5 h-5" />, label: "Facebook", handle: "1stclasscreative" },
                    { href: "https://www.instagram.com/1st_class_creative_/", icon: <Instagram className="w-5 h-5" />, label: "Instagram", handle: "@1st_class_creative_" },
                    { href: "https://www.tiktok.com/@1st_class_creative", icon: <TikTokIcon className="w-5 h-5" />, label: "TikTok", handle: "@1st_class_creative" },
                  ].map(({ href, icon, label, handle }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-gray-500 hover:text-brand-gold transition-colors">
                      <span className="text-brand-gold">{icon}</span>
                      <span className="font-medium">{label}</span>
                      <span className="text-gray-400">{handle}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick WhatsApp */}
              <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-2xl p-5">
                <p className="font-heading font-bold text-brand-charcoal mb-2">💬 Prefer to chat?</p>
                <p className="text-gray-500 text-sm mb-4">Message us on WhatsApp for a quick response — we reply within hours.</p>
                <a
                  href="https://wa.me/94740388788?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20a%20custom%20order."
                  target="_blank" rel="noopener noreferrer"
                  className="btn-primary w-full justify-center text-sm"
                >
                  <MessageCircle className="w-4 h-4" /> Open WhatsApp
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-card p-8 md:p-10">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-5">✨</div>
                    <h3 className="font-heading text-2xl font-bold text-brand-charcoal mb-3">Enquiry Received!</h3>
                    <p className="text-gray-500 mb-6">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                    <button onClick={() => setSubmitted(false)} className="btn-secondary">Send Another Enquiry</button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-heading text-2xl font-bold text-brand-charcoal mb-2">Send an Enquiry</h2>
                    <p className="text-gray-400 text-sm mb-8">Fill in the form below and we'll be in touch soon.</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-brand-charcoal mb-1.5">Full Name *</label>
                          <input
                            {...register("name", { required: "Name is required" })}
                            className="form-input"
                            placeholder="Your full name"
                          />
                          {errors.name && <p className="text-brand-rose text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-brand-charcoal mb-1.5">Phone Number *</label>
                          <input
                            {...register("phone", { required: "Phone is required" })}
                            className="form-input"
                            placeholder="07X XXX XXXX"
                            type="tel"
                          />
                          {errors.phone && <p className="text-brand-rose text-xs mt-1">{errors.phone.message}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-charcoal mb-1.5">Email Address</label>
                        <input
                          {...register("email")}
                          className="form-input"
                          placeholder="your@email.com"
                          type="email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-charcoal mb-1.5">Enquiry Type *</label>
                        <select
                          {...register("inquiryType", { required: "Please select a type" })}
                          className="form-input"
                        >
                          <option value="">Select enquiry type…</option>
                          {inquiryTypes.map(({ value, label }) => (
                            <option key={value} value={value}>{label}</option>
                          ))}
                        </select>
                        {errors.inquiryType && <p className="text-brand-rose text-xs mt-1">{errors.inquiryType.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-charcoal mb-1.5">Your Message *</label>
                        <textarea
                          {...register("message", { required: "Please describe your enquiry" })}
                          className="form-input min-h-[130px] resize-none"
                          placeholder="Tell us about what you need — quantity, occasion, colour preference, timeline…"
                        />
                        {errors.message && <p className="text-brand-rose text-xs mt-1">{errors.message.message}</p>}
                      </div>
                      <p className="text-xs text-gray-400">
                        By submitting, you agree to us storing your enquiry details to respond to you. We do not share your information.
                      </p>
                      <button type="submit" disabled={submitting} className="btn-primary w-full justify-center text-base">
                        {submitting ? (
                          <span className="flex items-center gap-2"><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" /></svg> Sending…</span>
                        ) : (
                          <><Send className="w-4 h-4" /> Send Enquiry</>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
