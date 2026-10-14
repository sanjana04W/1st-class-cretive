"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Sparkles,
  Package,
  Heart,
  Clock,
} from "lucide-react";
import { featuredItems, portfolioItems, categoryLabels, type PortfolioCategory } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

// ── Hero Slides ──────────────────────────────────────────────────────────────
const heroSlides = [
  {
    image: "/529179520_1214465350692710_3362134301413191237_n.jpg",
    headline: "Crafted for Your Most",
    highlight: "Cherished Moments",
    sub: "Handmade resin creations, wedding invitations & elegant cake boxes — all uniquely yours.",
    cta: { label: "Explore Portfolio", href: "/portfolio" },
  },
  {
    image: "/484074106_1098277412311505_6713907112004454121_n.jpg",
    headline: "Bespoke Wedding",
    highlight: "Stationery & Cake Boxes",
    sub: "From elegant invitations to beautifully crafted cake boxes — tell your love story in style.",
    cta: { label: "View Wedding Collection", href: "/portfolio?cat=wedding-invitations" },
  },
  {
    image: "/542752181_1238639424941969_1583669488507158905_n.jpg",
    headline: "Personalised Resin",
    highlight: "Keychains & Gifts",
    sub: "Custom name keychains, letter charms and unique resin art — perfect gifts for every occasion.",
    cta: { label: "See Keychains", href: "/portfolio?cat=keychains" },
  },
  {
    image: "/626581418_1362772269195350_2007381266795301988_n.jpg",
    headline: "Custom Photo Frames",
    highlight: "& Memory Boxes",
    sub: "Preserve your precious memories in one-of-a-kind handcrafted frames.",
    cta: { label: "View Frames", href: "/portfolio?cat=custom-frames" },
  },
];

// ── Services ─────────────────────────────────────────────────────────────────
const services = [
  {
    icon: "✨",
    title: "Resin Creations",
    desc: "Keychains, coasters, art panels, photo frames and custom resin pieces in any colour or style.",
    href: "/portfolio?cat=resin-creations",
    img: "/485184284_1103127648493148_4472142601649408182_n.jpg",
  },
  {
    icon: "💌",
    title: "Wedding Invitations",
    desc: "Elegant personalised invitations for weddings, engagements and special celebrations.",
    href: "/portfolio?cat=wedding-invitations",
    img: "/468396156_2478270609044241_1138043242894587302_n.jpg",
  },
  {
    icon: "🎂",
    title: "Cake Boxes",
    desc: "Beautifully designed and handcrafted cake boxes for weddings, birthdays and all occasions.",
    href: "/portfolio?cat=cake-boxes",
    img: "/484074106_1098277412311505_6713907112004454121_n.jpg",
  },
  {
    icon: "🎁",
    title: "Custom Frames & Gifts",
    desc: "Personalised photo frames, shadow boxes and unique gift creations for every milestone.",
    href: "/portfolio?cat=custom-frames",
    img: "/557802403_1265990468873531_7381377988699630798_n.jpg",
  },
];

// ── Why Us ────────────────────────────────────────────────────────────────────
const whyUs = [
  { icon: <Sparkles className="w-6 h-6 text-brand-gold" />, title: "100% Handmade", desc: "Every piece crafted by hand with premium materials and attention to detail." },
  { icon: <Heart className="w-6 h-6 text-brand-rose" />, title: "Made with Love", desc: "Each creation is made with genuine care to make your moment extra special." },
  { icon: <Package className="w-6 h-6 text-brand-teal" />, title: "Custom Orders", desc: "Tell us your vision — we'll bring it to life exactly as you imagine." },
  { icon: <Clock className="w-6 h-6 text-brand-gold" />, title: "Timely Delivery", desc: "We respect your timeline and ensure your order arrives when you need it." },
];

// ── Testimonials ──────────────────────────────────────────────────────────────
const testimonials = [
  { name: "Dilani P.", text: "Absolutely loved my anniversary frame! The quality and detail were beyond what I expected. Will order again!", rating: 5, product: "Custom Frame" },
  { name: "Nimasha K.", text: "Got personalised keychains for my whole bridal party. Everyone was obsessed. Thank you 1st Class Creative!", rating: 5, product: "Resin Keychain" },
  { name: "Amali R.", text: "The wedding invitations were stunning. So many compliments from our guests. 100% recommend!", rating: 5, product: "Wedding Invitations" },
  { name: "Tharushi W.", text: "Ordered a custom resin coaster set — the ocean theme came out perfectly. Beautiful craftsmanship!", rating: 5, product: "Resin Coasters" },
  { name: "Sanda M.", text: "The cake box was even more beautiful in person. Really added to the whole presentation of my wedding cake.", rating: 5, product: "Cake Box" },
  { name: "Kavinda S.", text: "Fast response, great communication, and the final product was perfect. So happy with my keychain!", rating: 5, product: "Resin Keychain" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("w-4 h-4", i < rating ? "fill-brand-gold text-brand-gold" : "text-gray-300")} />
      ))}
    </div>
  );
}

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Auto-advance hero
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const prevHero = () => setHeroIndex((p) => (p - 1 + heroSlides.length) % heroSlides.length);
  const nextHero = () => setHeroIndex((p) => (p + 1) % heroSlides.length);

  // Featured items for the grid
  const featured = featuredItems.slice(0, 8);

  // Recent / gallery items
  const recent = portfolioItems.slice(0, 12);

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              i === heroIndex ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={slide.image}
              alt={slide.headline}
              fill
              className="object-cover object-center"
              priority={i === 0}
              sizes="100vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>
        ))}

        {/* Hero content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <span className="inline-block bg-brand-gold/90 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 animate-fade-in">
                ✦ Handcrafted in Sri Lanka
              </span>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight hero-text-shadow animate-slide-up">
                {heroSlides[heroIndex].headline}
                <br />
                <span className="text-brand-gold-light">{heroSlides[heroIndex].highlight}</span>
              </h1>
              <p className="mt-5 text-lg text-gray-200 leading-relaxed max-w-lg animate-fade-in">
                {heroSlides[heroIndex].sub}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={heroSlides[heroIndex].cta.href} className="btn-primary text-base shadow-gold-lg">
                  {heroSlides[heroIndex].cta.label}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="https://wa.me/94740388788?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20a%20custom%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary border-white text-white hover:bg-white hover:text-brand-charcoal text-base"
                >
                  <MessageCircle className="w-5 h-5" />
                  Custom Order
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Arrows */}
        <button onClick={prevHero} aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-brand-gold/80 text-white w-11 h-11 rounded-full flex items-center justify-center transition-all">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={nextHero} aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-brand-gold/80 text-white w-11 h-11 rounded-full flex items-center justify-center transition-all">
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setHeroIndex(i)} aria-label={`Slide ${i + 1}`}
              className={cn("w-2.5 h-2.5 rounded-full transition-all", i === heroIndex ? "bg-brand-gold w-6" : "bg-white/50")} />
          ))}
        </div>
      </section>

      {/* ── SERVICES / CATEGORIES ──────────────────────────────────────── */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading section-heading-center">What We Create</h2>
            <div className="gold-divider" />
            <p className="text-gray-500 mt-2 max-w-xl mx-auto">
              From sparkling resin keychains to bespoke wedding stationery — each piece is made with heart.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(({ icon, title, desc, href, img }) => (
              <Link key={title} href={href} className="group card overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                  <Image src={img} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 640px) 100vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-4 left-4 text-3xl">{icon}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-brand-gold text-sm font-semibold group-hover:gap-2 transition-all">
                    View Collection <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PORTFOLIO GRID ────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="section-heading">Featured Creations</h2>
              <div className="w-16 h-1 bg-brand-gold rounded mt-3" />
            </div>
            <Link href="/portfolio" className="btn-secondary text-sm !py-2.5 !px-5">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((item) => (
              <Link key={item.id} href={`/portfolio?cat=${item.category}`}
                className="group relative aspect-square overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                <Image src={item.src} alt={item.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 640px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-heading font-semibold text-sm">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ──────────────────────────────────────────────── */}
      <section className="py-20 bg-brand-champagne">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading section-heading-center">Why Choose 1st Class Creative?</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-7 text-center shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-brand-champagne flex items-center justify-center">
                    {icon}
                  </div>
                </div>
                <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY STRIP ──────────────────────────────────────────────── */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading section-heading-center">Our Gallery</h2>
            <div className="gold-divider" />
            <p className="text-gray-500 mt-2">A glimpse of our most recent creations.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {recent.map((item, idx) => (
              <Link
                key={item.id}
                href="/portfolio"
                className={cn(
                  "group relative overflow-hidden rounded-xl",
                  idx === 0 || idx === 5 ? "row-span-2 col-span-2" : "",
                  "aspect-square"
                )}
              >
                <Image src={item.src} alt={item.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="20vw" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">{item.title}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/portfolio" className="btn-primary">
              See Full Portfolio <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading section-heading-center">What Our Customers Say</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map(({ name, text, rating, product }) => (
              <div key={name} className="bg-brand-cream rounded-2xl p-7 border border-brand-champagne shadow-card hover:shadow-card-hover transition-all duration-300">
                <StarRating rating={rating} />
                <p className="mt-4 text-gray-600 text-sm leading-relaxed italic">"{text}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold font-heading">
                    {name[0]}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-sm text-brand-charcoal">{name}</p>
                    <p className="text-xs text-gray-400">{product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="/485914720_1105087931630453_8075236399170481825_n.jpg"
          alt="Custom order background"
          fill className="object-cover" sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-charcoal/80" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5">
            Ready to Order Something <span className="text-brand-gold-light">Truly Unique?</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Contact us today to discuss your custom order. We love bringing your ideas to life!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary text-base">
              Request a Quote <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/94740388788?text=Hello%2C%20I%20would%20like%20to%20place%20a%20custom%20order."
              target="_blank" rel="noopener noreferrer"
              className="btn-secondary border-white text-white hover:bg-white hover:text-brand-charcoal text-base"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
