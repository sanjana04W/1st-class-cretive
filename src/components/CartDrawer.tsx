"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { formatLKR } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, subtotal, totalItems } =
    useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer matching user reference screenshot 3 */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#EFECE6] flex items-center justify-between bg-[#FCFAF6]">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#C9A84C]/15 text-[#9A7A2E]">
                <ShoppingBag className="w-5 h-5" />
              </span>
              <h2 className="font-heading text-lg font-bold text-brand-charcoal">
                Shopping Cart
              </h2>
              {totalItems > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#C9A84C] text-white text-xs font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-gray-400 hover:text-brand-charcoal hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F5EEDC] flex items-center justify-center text-[#9A7A2E]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-heading text-base font-bold text-brand-charcoal">
                  Your cart is empty
                </p>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  Explore our handcrafted collection of resin art, wedding cards, and custom cake boxes.
                </p>
                <Link
                  href="/portfolio"
                  onClick={closeCart}
                  className="inline-block mt-2 px-5 py-2.5 rounded-xl bg-[#C9A84C] text-white text-xs font-semibold shadow-xs hover:bg-[#B3933B] transition-colors"
                >
                  Browse Collection
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.id}-${item.variant || ""}`}
                  className="bg-white rounded-2xl p-4 border border-[#EFECE6] shadow-2xs hover:border-[#C9A84C]/60 transition-all flex gap-3.5"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider uppercase text-[#9A7A2E]">
                        {item.category}
                      </span>
                      <h4 className="font-heading text-xs font-bold text-brand-charcoal truncate mt-0.5">
                        {item.title}
                      </h4>
                      {item.variant && (
                        <p className="text-[11px] text-gray-400 truncate">{item.variant}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                      {/* Quantity Controls */}
                      <div className="inline-flex items-center border border-gray-200 rounded-lg bg-gray-50/50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                          className="p-1 hover:text-[#9A7A2E] text-gray-500 transition-colors"
                          title="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-brand-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                          className="p-1 hover:text-[#9A7A2E] text-gray-500 transition-colors"
                          title="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price & Trash */}
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-xs text-brand-charcoal">
                          {formatLKR(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id, item.variant)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Subtotal & Proceed to Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#EFECE6] bg-[#FCFAF6] space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-gray-500 block">Subtotal</span>
                  <span className="font-heading text-lg font-bold text-brand-charcoal">
                    {formatLKR(subtotal)}
                  </span>
                </div>
                <span className="text-[11px] text-gray-400">+ delivery calculated at checkout</span>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-3 px-4 rounded-xl bg-[#C9A84C] hover:bg-[#B3933B] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="text-center">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="text-xs text-gray-500 hover:text-brand-charcoal font-medium underline"
                >
                  View Full Cart
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
