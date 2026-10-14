"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { portfolioItems, categoryLabels, type PortfolioCategory } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const ALL_CATS: { value: string; label: string }[] = [
  { value: "all", label: "All Creations" },
  { value: "resin-creations", label: "Resin Creations" },
  { value: "keychains", label: "Resin Keychains" },
  { value: "wedding-invitations", label: "Wedding Invitations" },
  { value: "cake-boxes", label: "Cake Boxes" },
  { value: "custom-frames", label: "Custom Frames" },
  { value: "gift-boxes", label: "Gift Boxes" },
];

function PortfolioContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("cat") ?? "all";
  const [activeCat, setActiveCat] = useState(initialCat);
  const [lightbox, setLightbox] = useState<null | (typeof portfolioItems)[0]>(null);

  const filtered = useMemo(
    () =>
      activeCat === "all"
        ? portfolioItems
        : portfolioItems.filter((i) => i.category === activeCat),
    [activeCat]
  );

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {ALL_CATS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActiveCat(value)}
            className={cn(
              "px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200",
              activeCat === value
                ? "bg-brand-gold text-white border-brand-gold shadow-gold"
                : "bg-white text-brand-charcoal border-gray-200 hover:border-brand-gold hover:text-brand-gold"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <button
            key={item.id}
            onClick={() => setLightbox(item)}
            className="group relative aspect-square overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {item.featured && (
              <span className="badge-featured">Featured</span>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div>
                <p className="text-white font-heading font-semibold text-sm">{item.title}</p>
                <p className="text-brand-gold-light text-xs mt-0.5">{categoryLabels[item.category as PortfolioCategory]}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No items in this category yet.</p>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-brand-gold rounded-full p-2 transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="relative max-w-3xl w-full max-h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square md:aspect-[4/3]">
              <Image src={lightbox.src} alt={lightbox.alt} fill className="object-contain" sizes="90vw" />
            </div>
            <div className="p-5 bg-white">
              <p className="text-xs text-brand-gold font-semibold uppercase tracking-widest">
                {categoryLabels[lightbox.category as PortfolioCategory]}
              </p>
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mt-1">{lightbox.title}</h3>
              <div className="mt-4 flex gap-3">
                <a
                  href={`https://wa.me/94740388788?text=Hello%2C%20I%27m%20interested%20in%20a%20${encodeURIComponent(lightbox.title)}.%20Can%20you%20share%20pricing?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm !py-2.5 !px-5"
                >
                  Enquire on WhatsApp
                </a>
                <Link href="/contact" className="btn-secondary text-sm !py-2.5 !px-5">
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function PortfolioPage() {
  return (
    <>
      {/* Page hero */}
      <div className="relative pt-32 pb-20 bg-gradient-to-br from-brand-charcoal to-brand-charcoal-light overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/542752181_1238639424941969_1583669488507158905_n.jpg" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-3">✦ Our Work</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white">Portfolio</h1>
          <div className="gold-divider" />
          <p className="text-gray-300 text-lg">
            Browse our collection of handcrafted resin creations, wedding stationery, cake boxes and custom frames.
          </p>
        </div>
      </div>

      <section className="py-16 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-center py-10 text-gray-400">Loading…</div>}>
            <PortfolioContent />
          </Suspense>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-champagne text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-4">Like What You See?</h2>
          <p className="text-gray-500 mb-6">Reach out to enquire about any creation or to place a custom order.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">Request a Quote</Link>
            <a href="https://wa.me/94740388788" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
