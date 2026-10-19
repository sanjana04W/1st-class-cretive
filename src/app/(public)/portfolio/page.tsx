"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, Eye, Check, Sparkles } from "lucide-react";
import { collectionItems, categoryLabels, type CollectionCategory, type CollectionItem } from "@/lib/portfolio-data";
import { useLiveProducts } from "@/lib/live-products";
import { cn, formatLKR } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const ALL_CATS: { value: string; label: string }[] = [
  { value: "all", label: "All Collections" },
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
  const [lightbox, setLightbox] = useState<null | CollectionItem>(null);
  const { addToCart } = useCart();
  const { products: liveItems } = useLiveProducts();

  const filtered = useMemo(
    () =>
      activeCat === "all"
        ? liveItems
        : liveItems.filter((i) => i.category === activeCat),
    [activeCat, liveItems]
  );

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-12">
        {ALL_CATS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActiveCat(value)}
            className={cn(
              "px-5 py-2.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer",
              activeCat === value
                ? "bg-[#C9A84C] text-white border-[#C9A84C] shadow-xs"
                : "bg-white text-brand-charcoal border-gray-200 hover:border-[#C9A84C] hover:text-[#9A7A2E]"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid matching Product Card Reference Screenshot 1 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((item, idx) => {
          const discountPercent = item.originalPrice
            ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
            : null;

          return (
            <div
              key={item.id}
              className="group bg-white rounded-3xl border border-[#EFECE6] shadow-2xs hover:shadow-md hover:border-[#C9A84C]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Image & Badges — clicking image navigates to product detail page */}
              <Link href={`/product/${item.slug}`} className="block relative aspect-square overflow-hidden bg-gray-50">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Top Badge (New / Discount) matching Screenshot 1 */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                  {idx % 3 === 0 && (
                    <span className="bg-[#59A88E] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      NEW
                    </span>
                  )}
                  {discountPercent && discountPercent > 0 && (
                    <span className="bg-[#D96B64] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      -{discountPercent}%
                    </span>
                  )}
                </div>

                {/* Quick view eye button — stops propagation so it opens lightbox, not product page */}
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLightbox(item); }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-brand-charcoal hover:bg-white hover:text-[#9A7A2E] shadow-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
                  title="Quick View"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>

                {/* Hover Add to Cart Button overlaying image bottom */}
                <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-10">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart({
                        id: item.id,
                        title: item.title,
                        slug: item.slug,
                        price: item.price,
                        originalPrice: item.originalPrice,
                        image: item.src,
                        category: categoryLabels[item.category as CollectionCategory],
                        variant: "Standard Custom",
                      });
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#C9A84C] hover:bg-[#B3933B] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </Link>

              {/* Card Meta details matching Screenshot 1 */}
              <div className="p-4 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A7A2E]">
                  {categoryLabels[item.category as CollectionCategory]}
                </span>

                {/* Title links to product detail page */}
                <Link href={`/product/${item.slug}`}>
                  <h3
                    className="font-heading text-sm font-bold text-brand-charcoal hover:text-[#9A7A2E] cursor-pointer truncate transition-colors"
                    title={item.title}
                  >
                    {item.title}
                  </h3>
                </Link>

                <p className="text-[11px] text-gray-400">
                  Handcrafted • Custom Orders
                </p>

                {/* Price Display matching Screenshot 1 */}
                <div className="pt-2 flex items-baseline gap-2">
                  <span className="font-heading font-bold text-sm text-brand-charcoal">
                    {formatLKR(item.price)}
                  </span>
                  {item.originalPrice && (
                    <span className="text-[11px] text-gray-400 line-through">
                      {formatLKR(item.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No items in this category yet.</p>
        </div>
      )}

      {/* Lightbox / Product Modal matching Product Detail Page Screenshot 2 */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-brand-charcoal p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Product Visual */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                <Image
                  src={lightbox.src}
                  alt={lightbox.alt}
                  fill
                  className="object-cover"
                  sizes="500px"
                />
              </div>

              {/* Product Info matching Screenshot 2 */}
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-bold text-[#9A7A2E] uppercase tracking-wider">
                    {categoryLabels[lightbox.category as CollectionCategory]}
                  </span>
                  <h2 className="font-heading text-2xl font-bold text-brand-charcoal mt-1">
                    {lightbox.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> In Stock & Made to Order
                    </span>
                    <span className="bg-amber-50 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Customizable
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 pb-3 border-b border-gray-100">
                  <span className="font-heading text-2xl font-bold text-[#9A7A2E]">
                    {formatLKR(lightbox.price)}
                  </span>
                  {lightbox.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatLKR(lightbox.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="text-xs text-gray-600 leading-relaxed space-y-2">
                  <p>
                    {lightbox.description ||
                      "Each piece is exclusively handcrafted using high-clarity epoxy resin, shimmering mica pigments, gold leaf flakes, and custom lettering tailored to your request."}
                  </p>
                </div>

                {/* Craft Highlights */}
                <div className="p-4 rounded-2xl bg-[#FCFAF6] border border-[#F0ECE1] space-y-2 text-xs">
                  <h4 className="font-bold text-brand-charcoal">Handmade Craft Highlights</h4>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600">
                    <div>• 100% Handcrafted</div>
                    <div>• UV-Resistant Epoxy</div>
                    <div>• Custom Name Engraving</div>
                    <div>• Island-wide Delivery</div>
                  </div>
                </div>

                {/* Action Buttons: Add to Cart + WhatsApp + View Full Details */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      addToCart({
                        id: lightbox.id,
                        title: lightbox.title,
                        slug: lightbox.slug,
                        price: lightbox.price,
                        originalPrice: lightbox.originalPrice,
                        image: lightbox.src,
                        category: categoryLabels[lightbox.category as CollectionCategory],
                        variant: "Standard Custom",
                      });
                      setLightbox(null);
                    }}
                    className="flex-1 py-3 px-5 rounded-xl bg-[#C9A84C] hover:bg-[#B3933B] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <a
                    href={`https://wa.me/94740388788?text=Hello%201st%20Class%20Creative%2C%20I%20want%20to%20customize%20${encodeURIComponent(
                      lightbox.title
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-5 rounded-xl border border-gray-200 bg-[#2C2C2C] hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Ask on WhatsApp</span>
                  </a>
                </div>

                {/* View Full Product Detail Page link */}
                <Link
                  href={`/product/${lightbox.slug}`}
                  onClick={() => setLightbox(null)}
                  className="block text-center text-xs font-semibold text-[#9A7A2E] hover:underline pt-1"
                >
                  View Full Details →
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
  const { products: liveItems } = useLiveProducts();

  return (
    <>
      {/* Page hero */}
      <div className="relative pt-32 pb-20 bg-gradient-to-br from-brand-charcoal to-brand-charcoal-light overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/542752181_1238639424941969_1583669488507158905_n.jpg" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-3">✦ Our Work</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white">Our Collection</h1>
          <div className="gold-divider" />
          <p className="text-gray-300 text-lg">
            Browse our complete collection of {liveItems.length} handcrafted resin creations, wedding stationery, cake boxes and custom frames.
          </p>
        </div>
      </div>

      <section className="py-16 bg-[#FBF9F5]">
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
