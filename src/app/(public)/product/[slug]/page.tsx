"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  collectionItems,
  categoryLabels,
  type CollectionCategory,
  type CollectionItem,
} from "@/lib/portfolio-data";
import { useLiveProducts } from "@/lib/live-products";
import { formatLKR, cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  Check,
  Heart,
  Share2,
} from "lucide-react";
import toast from "react-hot-toast";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { addToCart } = useCart();
  const { products: liveItems, isLoaded } = useLiveProducts();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("Standard Custom");

  // Find product by slug or id from live items
  const product: CollectionItem | undefined =
    liveItems.find((i) => i.slug === slug || i.id === slug) ||
    collectionItems.find((i) => i.slug === slug || i.id === slug);

  if (!product && !isLoaded) {
    return (
      <div className="pt-32 pb-20 bg-[#FBF9F5] min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-gray-500 font-medium">Loading handcrafted product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  // Related products from same category
  const relatedProducts = (liveItems.length > 0 ? liveItems : collectionItems)
    .filter((i) => product && i.category === product.category && i.id !== product.id)
    .slice(0, 4);

  // Gallery images (main image + alternative thumbnails)
  const galleryImages = [
    product.src,
    ...(relatedProducts.slice(0, 3).map((r) => r.src)),
  ].filter(Boolean);

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        title: product.title,
        slug: product.slug,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.src,
        category: categoryLabels[product.category as CollectionCategory],
        variant: selectedVariant,
      },
      quantity
    );
    toast.success(`${product.title} added to cart!`);
  };

  // Specific craft attributes by category matching reference notes table
  const getCraftSpecs = () => {
    switch (product.category) {
      case "resin-creations":
        return {
          title: "Artisanal Resin Specifications",
          specs: [
            { label: "Material Composition", value: "High-Gloss Crystal Epoxy Resin" },
            { label: "Inclusions", value: "Real Dried Florals, Gold Leaf, Sea Shells" },
            { label: "Finish Quality", value: "Diamond Gloss & UV Non-Yellowing" },
            { label: "Personalization", value: "Custom Names, Dates & Initial Lettering" },
          ],
        };
      case "wedding-invitations":
        return {
          title: "Stationery & Paper Specifications",
          specs: [
            { label: "Cardstock Weight", value: "350 GSM Textured Shimmer Card" },
            { label: "Embellishment", value: "Gold Foil Stamping & Monogram Wax Seal" },
            { label: "Included Items", value: "Main Invite, Ribbon Wrap & Lined Envelope" },
            { label: "Customization", value: "Full Typography, Couple Names & Venue Map" },
          ],
        };
      case "cake-boxes":
        return {
          title: "Cake Box Dimensions & Build",
          specs: [
            { label: "Box Construction", value: "Rigid Embossed Ivory Board" },
            { label: "Accents", value: "Handmade Paper Flowers & Satin Ribbons" },
            { label: "Interior Lining", value: "Food-Safe Moisture Barrier" },
            { label: "Occasion Fit", value: "Weddings, Engagements & Baby Showers" },
          ],
        };
      case "custom-frames":
        return {
          title: "Frame & Shadow Box Details",
          specs: [
            { label: "Frame Structure", value: "Handcrafted Deep Shadow Box Wood" },
            { label: "Illumination", value: "Warm LED Micro Fairy Lights" },
            { label: "Backdrop Art", value: "Resin Typography & Preserved Foliage" },
            { label: "Display Mode", value: "Tabletop Stand & Wall Mount Hook" },
          ],
        };
      case "keychains":
        return {
          title: "Resin Charm & Keychain Specs",
          specs: [
            { label: "Epoxy Type", value: "Impact-Resistant Heavy-Duty Resin" },
            { label: "Hardware Ring", value: "Reinforced Anti-Tarnish Gold Alloy" },
            { label: "Charms Included", value: "Initial Letter + Matching Mini Heart" },
            { label: "Infill Shimmer", value: "Chunky Holographic Mica Glitter" },
          ],
        };
      default:
        return {
          title: "Craft Specifications",
          specs: [
            { label: "Build Type", value: "100% Handcrafted Artisanal Piece" },
            { label: "Origin", value: "1st Class Creative Studio (Sri Lanka)" },
            { label: "Lead Time", value: "2 to 4 Days Handcrafting" },
            { label: "Delivery", value: "Island-wide Safe Courier Packing" },
          ],
        };
    }
  };

  const craftSpecs = getCraftSpecs();

  return (
    <div className="pt-28 pb-20 bg-[#FBF9F5] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb matching Screenshot 1 */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Link href="/" className="hover:text-[#9A7A2E] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/portfolio" className="hover:text-[#9A7A2E] transition-colors">
            Collection
          </Link>
          <span>/</span>
          <Link
            href={`/portfolio?cat=${product.category}`}
            className="hover:text-[#9A7A2E] transition-colors"
          >
            {categoryLabels[product.category as CollectionCategory]}
          </Link>
          <span>/</span>
          <span className="text-brand-charcoal font-semibold truncate max-w-xs">
            {product.title}
          </span>
        </nav>

        {/* Product Hero Section: Left Gallery Carousel + Right Details Card (Matching Screenshot 1 & 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Image Carousel (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-[#EFECE6] shadow-xs">
              <Image
                src={galleryImages[activeImageIndex]}
                alt={product.title}
                fill
                priority
                className="object-cover transition-all duration-300"
                sizes="(max-width: 1024px) 100vw, 650px"
              />

              {/* Prev / Next Carousel Arrow Buttons matching Screenshot 1 & 2 */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-brand-charcoal hover:bg-white hover:text-[#9A7A2E] shadow-md flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-brand-charcoal hover:bg-white hover:text-[#9A7A2E] shadow-md flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-[#59A88E] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  NEW ARRIVAL
                </span>
                {product.originalPrice && (
                  <span className="bg-[#D96B64] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-xs">
                    SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail selector matching Screenshot 1 & 2 */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={cn(
                      "relative w-20 h-20 rounded-2xl overflow-hidden bg-white border-2 shrink-0 transition-all cursor-pointer",
                      activeImageIndex === idx
                        ? "border-[#C9A84C] shadow-xs ring-2 ring-[#C9A84C]/20 scale-[1.02]"
                        : "border-gray-200 hover:border-[#9A7A2E] opacity-75 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Detail Card matching Screenshot 1 & 2 (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#EFECE6] shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold text-[#9A7A2E] uppercase tracking-widest block">
                1ST CLASS CREATIVE
              </span>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-charcoal mt-1">
                {product.title}
              </h1>

              {/* Category & Attributes Badges matching Screenshot 1 */}
              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 uppercase tracking-wider">
                  HANDMADE
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 uppercase tracking-wider">
                  {categoryLabels[product.category as CollectionCategory]}
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 uppercase tracking-wider">
                  CUSTOMIZABLE
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#F5EEDC] text-[#9A7A2E] uppercase tracking-wider">
                  NEW ARRIVAL
                </span>
              </div>
            </div>

            {/* Price Row matching Screenshot 1 & 2 */}
            <div className="flex items-baseline gap-3 pb-3 border-b border-gray-100">
              <span className="font-heading text-3xl font-bold text-[#9A7A2E]">
                {formatLKR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-gray-400 line-through">
                  {formatLKR(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Stock status indicator matching live admin stock */}
            <div
              className={cn(
                "flex items-center gap-2 text-xs font-semibold",
                !product.inStock || (product.stock !== undefined && product.stock <= 0)
                  ? "text-rose-600"
                  : (product.stock ?? 10) <= 5
                  ? "text-[#D96B64]"
                  : "text-emerald-700"
              )}
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>
                {!product.inStock || (product.stock !== undefined && product.stock <= 0)
                  ? "Currently out of stock. Handcrafted to order."
                  : (product.stock ?? 10) <= 5
                  ? `Only ${product.stock ?? 3} left in studio stock! Handcrafted on demand.`
                  : `${product.stock} items currently in studio stock ready for dispatch.`}
              </span>
            </div>

            {/* Quantity Selector matching Screenshot 1 & 2 */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                QUANTITY
              </label>
              <div className="inline-flex items-center border border-gray-200 rounded-xl bg-gray-50/60 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-white hover:text-[#9A7A2E] transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 text-xs font-bold text-brand-charcoal">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-white hover:text-[#9A7A2E] transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to Cart (Gold) + Ask on WhatsApp (Black) matching Screenshot 1 & 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || (product.stock !== undefined && product.stock <= 0)}
                className={cn(
                  "w-full py-3.5 px-4 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors",
                  !product.inStock || (product.stock !== undefined && product.stock <= 0)
                    ? "bg-gray-400 cursor-not-allowed opacity-80"
                    : "bg-[#C9A84C] hover:bg-[#B3933B] cursor-pointer"
                )}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {!product.inStock || (product.stock !== undefined && product.stock <= 0)
                    ? "Out of Stock"
                    : "Add to Cart"}
                </span>
              </button>

              <a
                href={`https://wa.me/94740388788?text=Hello%201st%20Class%20Creative%2C%20I%20am%20interested%20in%20customizing%20${encodeURIComponent(
                  product.title
                )}%20(Price%3A%20${product.price}%20LKR)`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#2C2C2C] hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Ask on WhatsApp</span>
              </a>
            </div>

            {/* Craft Specs Box matching the Fragrance Notes Table in Screenshot 1 & 2 */}
            <div className="p-5 rounded-2xl bg-[#FCFAF6] border border-[#F0ECE1] space-y-3">
              <h4 className="font-heading text-xs font-bold text-brand-charcoal">
                {craftSpecs.title}
              </h4>
              <div className="space-y-2 text-xs">
                {craftSpecs.specs.map((spec, i) => (
                  <div key={i} className="flex items-start justify-between gap-4">
                    <span className="text-gray-400 text-[11px] shrink-0">{spec.label}</span>
                    <span className="font-semibold text-brand-charcoal text-right text-[11px]">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* About this Product Description matching Screenshot 1 & 2 */}
            <div className="space-y-2 text-xs leading-relaxed text-gray-600">
              <h4 className="font-heading font-bold text-brand-charcoal text-xs">
                About this Creation
              </h4>
              <p>
                {product.description ||
                  `Exclusively handcrafted by 1st Class Creative. Designed with high-clarity resin, metallic flakes, and custom bespoke text tailored for weddings, celebrations, and thoughtful gift giving.`}
              </p>
            </div>

            {/* Authenticity Guarantee Callout matching Screenshot 1 & 2 */}
            <div className="p-3.5 rounded-xl bg-[#F5EEDC]/60 border border-[#C9A84C]/30 flex items-center gap-2.5 text-xs text-[#9A7A2E] font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% authentic handcrafted product from 1st Class Creative.</span>
            </div>
          </div>
        </div>

        {/* Related Creations from this Collection */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-[#EFECE6] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-xl font-bold text-brand-charcoal">
                  You May Also Like
                </h3>
                <p className="text-xs text-gray-400">
                  More handcrafted creations from {categoryLabels[product.category as CollectionCategory]}
                </p>
              </div>
              <Link
                href={`/portfolio?cat=${product.category}`}
                className="text-xs text-[#9A7A2E] font-semibold hover:underline"
              >
                View Category →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/product/${rel.slug}`}
                  className="group bg-white rounded-lg border border-[#EFECE6] shadow-2xs hover:border-[#C9A84C] hover:shadow-sm overflow-hidden transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <Image
                      src={rel.src}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3.5 space-y-1">
                    <span className="text-[9px] font-bold text-[#9A7A2E] uppercase tracking-wider">
                      {categoryLabels[rel.category as CollectionCategory]}
                    </span>
                    <h4 className="font-heading text-xs font-bold text-brand-charcoal truncate">
                      {rel.title}
                    </h4>
                    <p className="font-heading font-bold text-xs text-brand-charcoal pt-1">
                      {formatLKR(rel.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
