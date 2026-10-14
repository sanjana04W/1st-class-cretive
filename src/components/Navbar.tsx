"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
        scrolled
          ? "glass shadow-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo.png"
            alt="1st Class Creative Craft logo"
            width={120}
            height={50}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "font-body font-medium text-sm tracking-wide transition-colors duration-200 relative group",
                  pathname === href
                    ? "text-brand-gold"
                    : scrolled
                    ? "text-brand-charcoal hover:text-brand-gold"
                    : "text-white hover:text-brand-gold-light"
                )}
              >
                {label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-brand-gold rounded transition-all duration-300",
                    pathname === href ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:0740388788"
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium transition-colors",
              scrolled ? "text-brand-charcoal hover:text-brand-gold" : "text-white hover:text-brand-gold-light"
            )}
          >
            <Phone className="w-4 h-4" />
            074 038 8788
          </a>
          <a
            href="https://wa.me/94740388788?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !py-2.5 !px-5 text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Order Now
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={cn(
            "md:hidden p-2 rounded-lg transition-colors",
            scrolled ? "text-brand-charcoal" : "text-white"
          )}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="glass border-t border-brand-gold/20 px-4 py-6 space-y-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "block py-3 px-4 rounded-xl font-body font-medium text-sm transition-all",
                pathname === href
                  ? "bg-brand-champagne text-brand-gold font-bold"
                  : "text-brand-charcoal hover:bg-brand-champagne hover:text-brand-gold"
              )}
            >
              {label}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <a
              href="tel:0740388788"
              className="flex items-center gap-2 text-brand-charcoal py-2 px-4"
            >
              <Phone className="w-4 h-4 text-brand-gold" />
              <span className="text-sm font-medium">074 038 8788</span>
            </a>
            <a
              href="https://wa.me/94740388788?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary justify-center"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
