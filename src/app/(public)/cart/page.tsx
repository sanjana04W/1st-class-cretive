"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { formatLKR } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();

  const deliveryFee = 200; // Flat estimate for Colombo / Western Province
  const totalAmount = subtotal + deliveryFee;

  return (
    <div className="pt-28 pb-20 bg-[#FBF9F5] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-charcoal">
            Shopping Cart
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Review your handcrafted selections before checking out.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#EFECE6] shadow-xs space-y-4 max-w-lg mx-auto">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#F5EEDC] flex items-center justify-center text-[#9A7A2E]">
              <Sparkles className="w-10 h-10" />
            </div>
            <h2 className="font-heading text-xl font-bold text-brand-charcoal">
              Your cart is empty
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              Explore our wide variety of customized resin keychains, handmade wedding stationery, and elegant cake boxes.
            </p>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C9A84C] hover:bg-[#B3933B] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Browse Our Collection</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left 2 Cols: Cart Items List matching Screenshot 4 */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.variant || ""}`}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EFECE6] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5 hover:border-[#C9A84C]/50 transition-all"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold tracking-wider uppercase text-[#9A7A2E]">
                        {item.category}
                      </span>
                      <h3 className="font-heading text-base font-bold text-brand-charcoal">
                        {item.title}
                      </h3>
                      {item.variant && (
                        <p className="text-xs text-gray-500 mt-0.5">{item.variant}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    {/* Quantity Selector */}
                    <div className="inline-flex items-center border border-gray-200 rounded-xl bg-gray-50/60 p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:bg-white hover:text-[#9A7A2E] transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-brand-charcoal">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:bg-white hover:text-[#9A7A2E] transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="font-heading font-bold text-sm text-brand-charcoal min-w-[90px] text-right">
                      {formatLKR(item.price * item.quantity)}
                    </span>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id, item.variant)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-1.5 text-xs text-[#9A7A2E] font-semibold hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Right Col: Order Summary Box matching Screenshot 4 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EFECE6] shadow-xs space-y-6">
              <h2 className="font-heading text-lg font-bold text-brand-charcoal">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs border-b border-gray-100 pb-5">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold text-brand-charcoal">{formatLKR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Delivery (Colombo)</span>
                  <span className="font-semibold text-brand-charcoal">{formatLKR(deliveryFee)}</span>
                </div>
                <p className="text-[10px] text-gray-400 italic">
                  Exact delivery fee calculated at checkout based on your district.
                </p>
              </div>

              <div className="flex justify-between items-baseline pt-1">
                <span className="font-heading font-bold text-sm text-brand-charcoal">
                  Estimated Total
                </span>
                <span className="font-heading text-xl font-bold text-[#9A7A2E]">
                  {formatLKR(totalAmount)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="w-full py-3.5 px-4 rounded-xl bg-[#C9A84C] hover:bg-[#B3933B] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="text-center">
                <Link
                  href="/portfolio"
                  className="text-xs text-gray-500 hover:text-brand-charcoal font-medium"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-gray-100 space-y-2 text-[11px] text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="text-[#9A7A2E]">✓</span>
                  <span>100% Authentic Handcrafted Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#9A7A2E]">✓</span>
                  <span>Cash on Delivery Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#9A7A2E]">✓</span>
                  <span>Island-wide Safe Delivery</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
