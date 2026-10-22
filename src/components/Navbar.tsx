"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  ShoppingBag,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useCustomerProfile } from "@/context/CustomerProfileContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Collection", hasMega: true },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const collectionCategories = [
  {
    title: "Resin Creations",
    href: "/portfolio?cat=resin-creations",
    desc: "Coasters, trays, wall art panels & clocks",
    tag: "Hand-poured",
  },
  {
    title: "Wedding Invitations",
    href: "/portfolio?cat=wedding-invitations",
    desc: "Custom stationery, wax seals & foil cards",
    tag: "Bespoke",
  },
  {
    title: "Artisanal Cake Boxes",
    href: "/portfolio?cat=cake-boxes",
    desc: "Laser-cut packaging & luxury favor boxes",
    tag: "Handmade",
  },
  {
    title: "Custom Memory Frames",
    href: "/portfolio?cat=custom-frames",
    desc: "Illuminated photo frames & shadow boxes",
    tag: "Keepsake",
  },
  {
    title: "Resin Keychains",
    href: "/portfolio?cat=keychains",
    desc: "Initial alphabet charms, glitters & names",
    tag: "Personalised",
  },
  {
    title: "Gift Boxes & Hampers",
    href: "/portfolio?cat=gift-boxes",
    desc: "Curated celebration gifts & bridal party packs",
    tag: "Gift Sets",
  },
];

/** Pages that have a full-bleed dark hero at the very top — navbar can be transparent */
const DARK_HERO_PAGES = ["/"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileCollectionOpen, setMobileCollectionOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const megaTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const { profile, isLoggedIn, logoutCustomer } = useCustomerProfile();

  const hasDarkHero = DARK_HERO_PAGES.includes(pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
    setMobileCollectionOpen(false);
  }, [pathname]);

  const handleMouseEnterMega = () => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setMegaOpen(true);
  };

  const handleMouseLeaveMega = () => {
    megaTimeoutRef.current = setTimeout(() => {
      setMegaOpen(false);
    }, 200);
  };

  /* ─── Style logic ───
     - Home page (dark hero): transparent at top → solid on scroll
     - Every other page: always solid white navbar
  */
  const isTransparent = hasDarkHero && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isTransparent
          ? "bg-transparent py-4"
          : "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm py-2.5"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* ── Logo with Enhanced Contrast & Framing ── */}
        <Link href="/" className="flex items-center shrink-0 group">
          <div
            className={cn(
              "transition-all duration-300 flex items-center justify-center px-3 py-1.5 rounded-md",
              isTransparent
                ? "bg-white/95 backdrop-blur-md shadow-md border border-[#C9A84C]/40 hover:bg-white"
                : "bg-brand-cream/80 border border-[#E8E4DC] hover:border-[#C9A84C]/40"
            )}
          >
            <Image
              src="/logo.png"
              alt="1st Class Creative"
              width={145}
              height={52}
              className="h-10 sm:h-11 md:h-12 w-auto object-contain"
              priority
            />
          </div>
        </Link>

        {/* ── Desktop Nav Links with Mega Menu ── */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map(({ href, label, hasMega }) => {
            const isActive =
              pathname === href || (href === "/portfolio" && pathname.startsWith("/portfolio"));

            if (hasMega) {
              return (
                <li
                  key={href}
                  className="relative py-2"
                  onMouseEnter={handleMouseEnterMega}
                  onMouseLeave={handleMouseLeaveMega}
                >
                  <Link
                    href={href}
                    className={cn(
                      "font-medium text-sm tracking-wide transition-colors duration-200 relative group flex items-center gap-1",
                      isActive
                        ? "text-[#C9A84C] font-semibold"
                        : isTransparent
                        ? "text-white hover:text-[#C9A84C]"
                        : "text-[#2C2C2C] hover:text-[#C9A84C]"
                    )}
                  >
                    <span>{label}</span>
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        megaOpen ? "rotate-180 text-[#C9A84C]" : ""
                      )}
                    />
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 bg-[#C9A84C] rounded transition-all duration-300",
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {megaOpen && (
                    <div
                      className="absolute top-full -left-28 lg:-left-36 w-[720px] lg:w-[840px] bg-white rounded-md border border-[#E8E4DC] shadow-2xl p-6 z-50 animate-fade-in"
                      onMouseEnter={handleMouseEnterMega}
                      onMouseLeave={handleMouseLeaveMega}
                    >
                      {/* Top Header */}
                      <div className="flex items-center justify-between border-b border-[#EFECE6] pb-3 mb-5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs uppercase tracking-wider font-semibold text-[#C9A84C] bg-brand-champagne/60 px-2 py-0.5 rounded-sm border border-[#C9A84C]/30">
                            Our Collections
                          </span>
                          <span className="text-xs text-gray-500">Handcrafted bespoke creations</span>
                        </div>
                        <Link
                          href="/portfolio"
                          className="text-xs font-semibold text-[#C9A84C] hover:text-[#9A7A2E] flex items-center gap-1 group"
                        >
                          View Full Catalog ({collectionCategories.length}+ categories)
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-12 gap-6">
                        {/* Categories List (8 cols) */}
                        <div className="col-span-8 grid grid-cols-2 gap-3">
                          {collectionCategories.map((cat) => (
                            <Link
                              key={cat.href}
                              href={cat.href}
                              className="group/item p-3 rounded-md border border-transparent hover:border-[#E8E4DC] hover:bg-brand-cream/60 transition-all"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-heading font-bold text-sm text-[#2C2C2C] group-hover/item:text-[#C9A84C] transition-colors">
                                  {cat.title}
                                </span>
                                <span className="text-[10px] text-[#9A7A2E] bg-brand-champagne/50 px-1.5 py-0.5 rounded-sm">
                                  {cat.tag}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 line-clamp-1">{cat.desc}</p>
                            </Link>
                          ))}
                        </div>

                        {/* Custom Commission Card (4 cols) */}
                        <div className="col-span-4 bg-brand-charcoal text-white rounded-md p-4 flex flex-col justify-between border border-[#C9A84C]/40 relative overflow-hidden">
                          <div className="relative z-10">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-gold uppercase tracking-wider mb-2">
                              <Sparkles className="w-3 h-3" /> Custom Order
                            </span>
                            <h4 className="font-heading text-base font-bold text-white mb-1.5 leading-snug">
                              Bespoke Commissions
                            </h4>
                            <p className="text-xs text-gray-300 leading-relaxed mb-4">
                              Personalise wedding themes, colors, or create a unique memory keepsake.
                            </p>
                          </div>
                          <div className="relative z-10 pt-2 border-t border-white/10">
                            <a
                              href="https://wa.me/94740388788?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20a%20bespoke%20custom%20order."
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full flex items-center justify-center gap-1.5 bg-[#C9A84C] hover:bg-[#B3933B] text-white text-xs font-bold py-2 px-3 rounded-md transition-colors"
                            >
                              <MessageCircle className="w-3.5 h-3.5" /> Order on WhatsApp
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Quick Search Footer */}
                      <div className="mt-5 pt-3 border-t border-[#EFECE6] flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <Search className="w-3.5 h-3.5 text-[#C9A84C]" />
                          Looking for something specific?
                        </span>
                        <Link
                          href="/portfolio"
                          className="font-medium text-[#C9A84C] hover:underline"
                        >
                          Use Live Keyword Search in Collections →
                        </Link>
                      </div>
                    </div>
                  )}
                </li>
              );
            }

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "font-medium text-sm tracking-wide transition-colors duration-200 relative group py-2",
                    isActive
                      ? "text-[#C9A84C] font-semibold"
                      : isTransparent
                      ? "text-white hover:text-[#C9A84C]"
                      : "text-[#2C2C2C] hover:text-[#C9A84C]"
                  )}
                >
                  {label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-[#C9A84C] rounded transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Desktop Actions ── */}
        <div className="hidden md:flex items-center gap-2">

          {/* Cart */}
          <button
            onClick={openCart}
            aria-label="Shopping Cart"
            className={cn(
              "relative p-2.5 rounded-md transition-all cursor-pointer flex items-center justify-center",
              isTransparent
                ? "text-white hover:bg-white/10"
                : "text-[#2C2C2C] hover:bg-gray-100 hover:text-[#C9A84C]"
            )}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C9A84C] text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                {totalItems}
              </span>
            )}
          </button>

          {/* Profile / Sign In */}
          {isLoggedIn ? (
            <Link
              href="/profile"
              aria-label="My Account"
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold transition-all",
                pathname === "/profile"
                  ? "bg-[#C9A84C] text-white"
                  : isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-[#2C2C2C] hover:bg-gray-100 hover:text-[#C9A84C]"
              )}
            >
              <User className="w-4 h-4" />
              <span className="hidden lg:inline">{profile.name ? profile.name.split(" ")[0] : "Account"}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              aria-label="Sign In"
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold transition-all",
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-[#2C2C2C] hover:bg-gray-100 hover:text-[#C9A84C]"
              )}
            >
              <User className="w-4 h-4" />
              <span className="hidden lg:inline">Sign In</span>
            </Link>
          )}

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/94740388788?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#C9A84C] hover:bg-[#B3933B] text-white text-xs font-bold shadow-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>

        {/* ── Mobile Actions ── */}
        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={openCart}
            aria-label="Cart"
            className={cn("relative p-2 rounded-md", isTransparent ? "text-white" : "text-[#2C2C2C]")}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#C9A84C] text-white text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <Link
            href={isLoggedIn ? "/profile" : "/login"}
            aria-label="Account"
            className={cn("p-2 rounded-md", isTransparent ? "text-white" : "text-[#2C2C2C]")}
          >
            <User className="w-5 h-5" />
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={cn("p-2 rounded-md", isTransparent ? "text-white" : "text-[#2C2C2C]")}
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile menu drawer with expandable Collection ── */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          menuOpen ? "max-h-[750px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-1 shadow-lg max-h-[85vh] overflow-y-auto">
          {navLinks.map(({ href, label, hasMega }) => {
            const isActive = pathname === href || (href === "/portfolio" && pathname.startsWith("/portfolio"));

            if (hasMega) {
              return (
                <div key={href} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Link
                      href={href}
                      className={cn(
                        "flex-1 py-2.5 px-4 rounded-md font-medium text-sm transition-all",
                        isActive
                          ? "bg-[#F5EEDC] text-[#9A7A2E] font-bold"
                          : "text-[#2C2C2C] hover:bg-[#F5EEDC] hover:text-[#9A7A2E]"
                      )}
                    >
                      {label}
                    </Link>
                    <button
                      onClick={() => setMobileCollectionOpen(!mobileCollectionOpen)}
                      aria-label="Toggle collection categories"
                      className="p-2 text-gray-500 hover:text-[#C9A84C]"
                    >
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          mobileCollectionOpen ? "rotate-180 text-[#C9A84C]" : ""
                        )}
                      />
                    </button>
                  </div>

                  {mobileCollectionOpen && (
                    <div className="pl-4 pr-2 py-2 space-y-1 bg-brand-cream/50 rounded-md border border-[#E8E4DC] my-1">
                      <Link
                        href="/portfolio"
                        className="block py-1.5 px-3 rounded-sm text-xs font-bold text-[#C9A84C] hover:bg-white"
                      >
                        ✦ View All Collections & Search
                      </Link>
                      {collectionCategories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className="block py-1.5 px-3 rounded-sm text-xs text-gray-700 hover:bg-white hover:text-[#C9A84C] transition-colors"
                        >
                          {cat.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "block py-2.5 px-4 rounded-md font-medium text-sm transition-all",
                  isActive
                    ? "bg-[#F5EEDC] text-[#9A7A2E] font-bold"
                    : "text-[#2C2C2C] hover:bg-[#F5EEDC] hover:text-[#9A7A2E]"
                )}
              >
                {label}
              </Link>
            );
          })}

          <div className="border-t border-gray-100 pt-3 mt-3 space-y-1">
            <button
              onClick={openCart}
              className="w-full flex items-center justify-between py-2.5 px-4 rounded-md text-sm text-[#2C2C2C] hover:bg-[#F5EEDC]"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#C9A84C]" />
                Cart
              </span>
              {totalItems > 0 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#C9A84C] text-white">
                  {totalItems}
                </span>
              )}
            </button>

            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 py-2.5 px-4 rounded-md text-sm text-[#2C2C2C] hover:bg-[#F5EEDC]"
                >
                  <User className="w-4 h-4 text-[#C9A84C]" />
                  My Account ({profile.name?.split(" ")[0]})
                </Link>
                <button
                  onClick={logoutCustomer}
                  className="w-full flex items-center gap-2 py-2.5 px-4 rounded-md text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-2 py-2.5 px-4 rounded-md text-sm text-[#2C2C2C] hover:bg-[#F5EEDC]"
                >
                  <User className="w-4 h-4 text-[#C9A84C]" />
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-2 py-2.5 px-4 rounded-md text-sm text-[#2C2C2C] hover:bg-[#F5EEDC]"
                >
                  <User className="w-4 h-4 text-[#C9A84C]" />
                  Create Account
                </Link>
              </>
            )}
          </div>

          <div className="border-t border-gray-100 pt-3 mt-1">
            <a
              href="https://wa.me/94740388788"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md bg-[#C9A84C] hover:bg-[#B3933B] text-white text-sm font-bold transition-colors"
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
