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
import { useLiveProducts } from "@/lib/live-products";
import { cn } from "@/lib/utils";

// ── Hero Slides ──────────────────────────────────────────────────────────────
const heroSlides = [
  {
    image: "/hero/hero-1.jpg",
    headline: "Crafted for Your Most",
    highlight: "Cherished Moments",
    sub: "Handmade resin creations, wedding invitations & elegant cake boxes — all uniquely yours.",
    cta: { label: "Explore Collection", href: "/portfolio" },
  },
  {
    image: "/hero/hero-2.jpg",
    headline: "Bespoke Wedding",
    highlight: "Stationery & Cake Boxes",
    sub: "From elegant invitations to beautifully crafted cake boxes — tell your love story in style.",
    cta: { label: "View Wedding Collection", href: "/portfolio?cat=wedding-invitations" },
  },
  {
    image: "/hero/hero-3.jpg",
    headline: "Personalised Resin",
    highlight: "Keychains & Gifts",
    sub: "Custom name keychains, letter charms and unique resin art — perfect gifts for every occasion.",
    cta: { label: "See Keychains", href: "/portfolio?cat=keychains" },
  },
  {
    image: "/hero/hero-4.jpg",
    headline: "Custom Photo Frames",
    highlight: "& Memory Boxes",
    sub: "Preserve your precious memories in one-of-a-kind handcrafted frames.",
    cta: { label: "View Frames", href: "/portfolio?cat=custom-frames" },
  },
];

// ── Services ─────────────────────────────────────────────────────────────────
const services = [
  {
    tag: "Resin Art",
    title: "Resin Creations",
    desc: "Keychains, coasters, art panels, photo frames and custom resin pieces in any colour or style.",
    href: "/portfolio?cat=resin-creations",
    img: "/485184284_1103127648493148_4472142601649408182_n.jpg",
  },
  {
    tag: "Stationery",
    title: "Wedding Invitations",
    desc: "Elegant personalised invitations for weddings, engagements and special celebrations.",
    href: "/portfolio?cat=wedding-invitations",
    img: "/468396156_2478270609044241_1138043242894587302_n.jpg",
  },
  {
    tag: "Packaging",
    title: "Cake Boxes",
    desc: "Beautifully designed and handcrafted cake boxes for weddings, birthdays and all occasions.",
    href: "/portfolio?cat=cake-boxes",
    img: "/484074106_1098277412311505_6713907112004454121_n.jpg",
  },
  {
    tag: "Keepsakes",
    title: "Custom Frames & Gifts",
    desc: "Personalised photo frames, shadow boxes and unique gift creations for every milestone.",
    href: "/portfolio?cat=custom-frames",
    img: "/557802403_1265990468873531_7381377988699630798_n.jpg",
  },
];

// ── Why Choose Us Slideshow Backgrounds ───────────────────────────────────────
const whyUsSlides = [
  { image: "/hero/hero-1.jpg", caption: "Hand-poured resin with pure gold leaf" },
  { image: "/hero/hero-2.jpg", caption: "Bespoke wedding stationery & luxury packaging" },
  { image: "/hero/hero-4.jpg", caption: "Artisanal illuminated memory shadow boxes" },
];

// ── Why Us ────────────────────────────────────────────────────────────────────
const whyUs = [
  { icon: <Sparkles className="w-5 h-5 text-brand-gold" />, title: "100% Handmade", desc: "Every piece crafted by hand with premium materials and painstaking attention to detail." },
  { icon: <Heart className="w-5 h-5 text-brand-gold-light" />, title: "Made with Love", desc: "Each creation is infused with genuine care to make your celebration memorable." },
  { icon: <Package className="w-5 h-5 text-brand-gold" />, title: "Custom Orders", desc: "Tell us your exact vision — we bring your colour palettes and ideas to reality." },
  { icon: <Clock className="w-5 h-5 text-brand-gold-light" />, title: "Timely Delivery", desc: "Reliable scheduling and island-wide delivery to ensure your order arrives on time." },
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
  const [whyUsSlideIndex, setWhyUsSlideIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Auto-advance hero
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance Why Us luxury slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setWhyUsSlideIndex((prev) => (prev + 1) % whyUsSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevHero = () => setHeroIndex((p) => (p - 1 + heroSlides.length) % heroSlides.length);
  const nextHero = () => setHeroIndex((p) => (p + 1) % heroSlides.length);

  const { products: liveProducts, featured: liveFeatured } = useLiveProducts();

  // Featured items for the grid (live reactive to admin featured toggles)
  const featured = (liveFeatured.length > 0 ? liveFeatured : featuredItems).slice(0, 8);

  // Recent / gallery items (live reactive to admin edits)
  const recent = (liveProducts.length > 0 ? liveProducts : portfolioItems).slice(0, 12);

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-brand-charcoal pt-[72px] sm:pt-0">
        {/* Mobile Banner: maintains exact 16:9 banner proportion so image is 100% fully visible without cropping */}
        <div className="relative w-full aspect-[16/9] sm:hidden">
          {heroSlides.map((slide, i) => (
            <div
              key={`mobile-${i}`}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                i === heroIndex ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              )}
            >
              <Image
                src={slide.image}
                alt={slide.headline}
                fill
                priority={i === 0}
                className="object-contain object-center"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </div>
          ))}

          {/* Mobile Arrows */}
          <button onClick={prevHero} aria-label="Previous slide"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-brand-gold text-white w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-xs">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={nextHero} aria-label="Next slide"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-brand-gold text-white w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-xs">
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Mobile Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => setHeroIndex(i)} aria-label={`Slide ${i + 1}`}
                className={cn("h-1.5 rounded-full transition-all", i === heroIndex ? "bg-brand-gold w-5" : "bg-white/60 w-1.5")} />
            ))}
          </div>
        </div>

        {/* Mobile Content Card: clean, readable, unclipped below image */}
        <div className="sm:hidden px-5 py-6 bg-gradient-to-b from-[#1F1F1F] to-brand-charcoal text-center text-white border-b border-brand-charcoal/50">
          <span className="inline-block bg-brand-gold text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            ✦ Handcrafted in Sri Lanka
          </span>
          <h1 className="font-heading text-2xl font-bold text-white leading-snug">
            {heroSlides[heroIndex].headline}{" "}
            <span className="text-brand-gold-light">{heroSlides[heroIndex].highlight}</span>
          </h1>
          <p className="mt-2 text-xs text-gray-300 leading-relaxed max-w-sm mx-auto">
            {heroSlides[heroIndex].sub}
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <Link href={heroSlides[heroIndex].cta.href} className="btn-primary text-xs !py-2.5 !px-5 shadow-gold">
              {heroSlides[heroIndex].cta.label}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="https://wa.me/94740388788?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20a%20custom%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary border-white/80 text-white hover:bg-white hover:text-brand-charcoal text-xs !py-2.5 !px-4"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Custom Order
            </a>
          </div>
        </div>

        {/* Desktop & Tablet: Full-bleed Hero with 100% visible image proportions */}
        <div className="hidden sm:block relative min-h-[520px] md:min-h-[600px] lg:h-[85vh] xl:h-[90vh]">
          {heroSlides.map((slide, i) => (
            <div
              key={`desktop-${i}`}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                i === heroIndex ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              )}
            >
              <Image
                src={slide.image}
                alt={slide.headline}
                fill
                priority={i === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
            </div>
          ))}

          {/* Desktop Hero content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-16">
              <div className="max-w-2xl">
                <span className="inline-block bg-brand-gold/90 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 animate-fade-in">
                  ✦ Handcrafted in Sri Lanka
                </span>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight hero-text-shadow animate-slide-up">
                  {heroSlides[heroIndex].headline}
                  <br />
                  <span className="text-brand-gold-light">{heroSlides[heroIndex].highlight}</span>
                </h1>
                <p className="mt-5 text-base md:text-lg text-gray-200 leading-relaxed max-w-lg animate-fade-in">
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

          {/* Desktop Arrows */}
          <button onClick={prevHero} aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-brand-gold text-white w-11 h-11 rounded-full flex items-center justify-center transition-all backdrop-blur-xs">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={nextHero} aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-brand-gold text-white w-11 h-11 rounded-full flex items-center justify-center transition-all backdrop-blur-xs">
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Desktop Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => setHeroIndex(i)} aria-label={`Slide ${i + 1}`}
                className={cn("h-2.5 rounded-full transition-all", i === heroIndex ? "bg-brand-gold w-6" : "bg-white/50 w-2.5")} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES / CATEGORIES ──────────────────────────────────────── */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-widest mb-2">Our Specialties</p>
            <h2 className="section-heading section-heading-center">What We Create</h2>
            <div className="gold-divider" />
            <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm sm:text-base">
              From sparkling resin keychains to bespoke wedding stationery — each piece is handcrafted to perfection.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(({ tag, title, desc, href, img }) => (
              <Link key={title} href={href} className="group bg-white rounded-md border border-[#E8E4DC] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <div className="relative aspect-[4/3] sm:h-52 overflow-hidden bg-brand-champagne/40">
                  <Image
                    src={img}
                    alt={title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-xs uppercase tracking-wider font-semibold text-brand-gold bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-sm border border-brand-gold/30">
                    {tag}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-2">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-brand-gold text-sm font-semibold group-hover:gap-2 transition-all">
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
              <p className="text-xs font-semibold text-brand-gold uppercase tracking-widest mb-1.5">Artisanal Highlights</p>
              <h2 className="section-heading">Featured Collection</h2>
              <div className="w-16 h-1 bg-brand-gold rounded mt-3" />
            </div>
            <Link href="/portfolio" className="btn-secondary text-sm !rounded-md !py-2.5 !px-5">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((item) => (
              <Link key={item.id} href={`/portfolio?cat=${item.category}`}
                className="group relative aspect-square overflow-hidden rounded-md border border-[#E8E4DC] shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <Image src={item.src} alt={item.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-heading font-semibold text-sm leading-snug">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US (ENHANCED LUXURY SLIDESHOW) ───────────────────── */}
      <section className="relative py-24 sm:py-28 overflow-hidden bg-brand-charcoal text-white">
        {/* Dynamic Background Slideshow */}
        <div className="absolute inset-0">
          {whyUsSlides.map((slide, idx) => (
            <div
              key={slide.image}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                idx === whyUsSlideIndex ? "opacity-35 scale-105" : "opacity-0 scale-100",
                "transition-transform duration-[6000ms] ease-out"
              )}
            >
              <Image
                src={slide.image}
                alt="1st Class Creative Craftsmanship"
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
          ))}
          {/* Luxury gradients & vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/85 to-brand-charcoal" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.12)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-semibold tracking-widest text-brand-gold uppercase px-3 py-1 rounded-sm border border-brand-gold/40 bg-brand-gold/10 mb-3">
              ✦ The 1st Class Standard
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Why Choose 1st Class Creative?
            </h2>
            <div className="gold-divider" />
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mt-2">
              Where exceptional craftsmanship meets personal passion — creating heirloom keepsakes and bespoke designs made uniquely for your moments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="group relative bg-white/[0.07] hover:bg-white/[0.12] backdrop-blur-md rounded-md p-7 border border-white/15 hover:border-brand-gold/60 transition-all duration-300 hover:-translate-y-1.5 shadow-lg"
              >
                <div className="w-12 h-12 rounded-md bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-brand-gold/30 transition-all duration-300">
                  {icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-2.5 group-hover:text-brand-gold-light transition-colors">
                  {title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
                <div className="w-0 group-hover:w-8 h-0.5 bg-brand-gold mt-4 transition-all duration-300" />
              </div>
            ))}
          </div>

          {/* Slideshow indicator dots */}
          <div className="flex justify-center items-center gap-2 mt-12">
            {whyUsSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setWhyUsSlideIndex(i)}
                aria-label={`Why Us slide ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === whyUsSlideIndex ? "w-8 bg-brand-gold" : "w-2 bg-white/30 hover:bg-white/50"
                )}
              />
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {recent.map((item, idx) => (
              <Link
                key={item.id}
                href="/portfolio"
                className={cn(
                  "group relative overflow-hidden rounded-md border border-[#E8E4DC] shadow-xs",
                  idx === 0 || idx === 5 ? "row-span-2 col-span-2" : "",
                  "aspect-square"
                )}
              >
                <Image src={item.src} alt={item.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="20vw" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                  <span className="text-white text-xs font-semibold">{item.title}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/portfolio" className="btn-primary !rounded-md">
              See Full Collection <ArrowRight className="w-5 h-5" />
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
              <div key={name} className="bg-brand-cream rounded-md p-7 border border-brand-champagne shadow-xs hover:shadow-sm transition-all duration-300">
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
      <section className="relative py-20 sm:py-24 overflow-hidden bg-brand-charcoal">
        <Image
          src="/485914720_1105087931630453_8075236399170481825_n.jpg"
          alt="Custom order background"
          fill
          className="object-cover object-center opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/95 via-brand-charcoal/85 to-brand-charcoal/95" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-5">
            Ready to Order Something <span className="text-brand-gold-light">Truly Unique?</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Contact us today to discuss your custom order. We love bringing your ideas to life!
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link href="/contact" className="btn-primary text-sm sm:text-base !rounded-md !py-3 !px-6">
              Request a Quote <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <a
              href="https://wa.me/94740388788?text=Hello%2C%20I%20would%20like%20to%20place%20a%20custom%20order."
              target="_blank" rel="noopener noreferrer"
              className="btn-secondary border-white text-white hover:bg-white hover:text-brand-charcoal text-sm sm:text-base !rounded-md !py-3 !px-6"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
