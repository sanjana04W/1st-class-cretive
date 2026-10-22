import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Phone,
  Mail,
  MessageCircle,
  Heart,
} from "lucide-react";

// Simple TikTok icon (lucide doesn't ship one)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9a8.27 8.27 0 0 0 4.83 1.55V7.08a4.85 4.85 0 0 1-1.06-.39z" />
    </svg>
  );
}

const socialLinks = [
  {
    href: "https://www.facebook.com/1stclasscreative/",
    label: "Facebook",
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    href: "https://www.instagram.com/1st_class_creative_/",
    label: "Instagram",
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    href: "https://www.tiktok.com/@1st_class_creative",
    label: "TikTok",
    icon: <TikTokIcon className="w-5 h-5" />,
  },
];

const footerLinks = [
  {
    heading: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/portfolio", label: "Collection" },
      { href: "/services", label: "Services" },
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Categories",
    links: [
      { href: "/portfolio?cat=resin-creations", label: "Resin Creations" },
      { href: "/portfolio?cat=keychains", label: "Resin Keychains" },
      { href: "/portfolio?cat=wedding-invitations", label: "Wedding Invitations" },
      { href: "/portfolio?cat=cake-boxes", label: "Cake Boxes" },
      { href: "/portfolio?cat=custom-frames", label: "Custom Frames" },
    ],
  },
  {
    heading: "Info",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Conditions" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-white">
      {/* Top strip */}
      <div className="bg-brand-gold py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <p className="font-body text-sm font-semibold text-white">
            ✨ Handcrafted with love in Sri Lanka – Every piece is unique, made just for you.
          </p>
          <a
            href="https://wa.me/94740388788?text=Hello%2C%20I%20would%20like%20to%20place%20a%20custom%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-brand-gold font-bold text-sm px-5 py-2 rounded-full hover:bg-brand-champagne transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Order on WhatsApp
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="inline-block bg-white/95 px-4 py-2 rounded-md mb-5 shadow-sm border border-brand-gold/30">
              <Image
                src="/logo.png"
                alt="1st Class Creative logo"
                width={160}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Bringing your special moments to life through handcrafted resin creations,
              bespoke wedding invitations, and elegantly designed cake boxes.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-600 text-gray-400
                             hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/10 transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="font-heading text-white font-semibold text-sm uppercase tracking-widest mb-5">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-gray-400 text-sm hover:text-brand-gold transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h4 className="font-heading text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:0740388788"
                  className="flex items-center gap-2 text-gray-400 text-sm hover:text-brand-gold transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                  074 038 8788
                </a>
              </li>
              <li>
                <a
                  href="mailto:1stclasscreative97@gmail.com"
                  className="flex items-center gap-2 text-gray-400 text-sm hover:text-brand-gold transition-colors"
                >
                  <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                  1stclasscreative97@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/94740388788"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 text-sm hover:text-brand-gold transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-brand-gold shrink-0" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} 1st Class Creative. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-brand-rose fill-brand-rose" /> in Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  );
}
