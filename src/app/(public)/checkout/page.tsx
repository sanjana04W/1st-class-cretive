"use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { useCustomerProfile } from "@/context/CustomerProfileContext";
import type { UserOrderHistory } from "@/context/CustomerProfileContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, ShieldCheck, Mail, RotateCcw, AlertCircle, Loader2, Tag, X } from "lucide-react";
import { formatLKR } from "@/lib/utils";
import toast from "react-hot-toast";
import { sendVerificationEmail } from "@/lib/email";
import {
  registerNewAdminOrder,
  getDeliverySettings,
  DEFAULT_DELIVERY_SETTINGS,
  type DeliverySettings,
  loadPromos,
  type PromoCode,
} from "@/lib/admin-store";

/* ─────────────────────────────────────────
   Constants
───────────────────────────────────────── */
const SRI_LANKA_DISTRICTS = [
  "Colombo","Gampaha","Kalutara","Kandy","Matale","Nuwara Eliya","Galle",
  "Matara","Hambantota","Jaffna","Kilinochchi","Mannar","Vavuniya","Mullaitivu",
  "Batticaloa","Ampara","Trincomalee","Kurunegala","Puttalam","Anuradhapura",
  "Polonnaruwa","Badulla","Moneragala","Ratnapura","Kegalle",
];

/** Generate a random 6-digit OTP string */
function generateOTP(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

/** Generate order number e.g. 1CC-20261016-8622 */
function generateOrderNumber(): string {
  const now = new Date();
  const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `1CC-${date}-${rand}`;
}

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, totalItems, clearCart } = useCart();
  const { profile, addOrder, isLoggedIn } = useCustomerProfile();

  /* ── Contact / address form state ── */
  const [fullName, setFullName] = useState(profile.name || "");
  const [phone, setPhone]       = useState(profile.phone || "");
  const [email, setEmail]       = useState(profile.email || "");
  const [street, setStreet]     = useState(profile.address?.street || "");
  const [city, setCity]         = useState(profile.address?.city || "");
  const [district, setDistrict] = useState(profile.address?.district || "Colombo");
  const [postalCode, setPostalCode] = useState(profile.address?.postalCode || "");
  const [notes, setNotes]       = useState("");

  // Sync form when profile loads (e.g. after login)
  useEffect(() => {
    if (isLoggedIn && profile.name) {
      setFullName(profile.name);
      setPhone(profile.phone);
      setEmail(profile.email);
      setStreet(profile.address?.street || "");
      setCity(profile.address?.city || "");
      setDistrict(profile.address?.district || "Colombo");
      setPostalCode(profile.address?.postalCode || "");
    }
  }, [isLoggedIn, profile]);

  /* ── OTP / verification state ── */
  const [otpSent, setOtpSent]         = useState(false);
  const [otpCode, setOtpCode]         = useState("");         // the generated code
  const [otpInput, setOtpInput]       = useState("");          // what the user types
  const [otpError, setOtpError]       = useState("");
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const resendTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Order complete state ── */
  const [placedOrderNumber, setPlacedOrderNumber] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ── Live Delivery & Promo States synced with Admin Panel ── */
  const [deliverySettings, setDeliverySettings] = useState<DeliverySettings>(DEFAULT_DELIVERY_SETTINGS);
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

  useEffect(() => {
    const syncDelivery = () => {
      setDeliverySettings(getDeliverySettings());
    };
    syncDelivery();
    window.addEventListener("admin_delivery_updated", syncDelivery);
    window.addEventListener("storage", syncDelivery);
    return () => {
      window.removeEventListener("admin_delivery_updated", syncDelivery);
      window.removeEventListener("storage", syncDelivery);
    };
  }, []);

  const isFreeShipping = subtotal >= deliverySettings.freeShippingThreshold || appliedPromo?.discountType === "shipping";
  const isColomboZone = ["colombo", "gampaha"].includes((district || "").toLowerCase().trim());
  const deliveryFee = isFreeShipping
    ? 0
    : isColomboZone
    ? deliverySettings.colomboFee
    : deliverySettings.outstationFee;

  const discountAmount = appliedPromo
    ? appliedPromo.discountType === "percentage"
      ? Math.round((subtotal * appliedPromo.discountValue) / 100)
      : appliedPromo.discountType === "fixed"
      ? Math.min(subtotal, appliedPromo.discountValue)
      : 0
    : 0;

  const totalAmount = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApplyPromo = () => {
    const q = promoInput.trim().toUpperCase();
    if (!q) return;
    const allPromos = loadPromos();
    const match = allPromos.find((p) => p.code.toUpperCase() === q && p.isActive);
    if (!match) {
      toast.error("Invalid or expired promo code");
      return;
    }
    if (subtotal < match.minOrder) {
      toast.error(`Minimum order amount for this code is ${formatLKR(match.minOrder)}`);
      return;
    }
    setAppliedPromo(match);
    toast.success(`Coupon applied: ${match.description || match.code}`);
  };

  /* ── Countdown timer ── */
  const startResendCountdown = () => {
    if (resendTimer.current) clearInterval(resendTimer.current);
    setResendCountdown(60);
    resendTimer.current = setInterval(() => {
      setResendCountdown((c) => {
        if (c <= 1) {
          if (resendTimer.current) clearInterval(resendTimer.current);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  /* ── Validation helper ── */
  const validateForm = (): boolean => {
    if (!fullName.trim()) { toast.error("Please enter your full name."); return false; }
    if (!phone.trim())    { toast.error("Please enter your phone number."); return false; }
    if (!email.trim())    { toast.error("Please enter your email address."); return false; }
    if (!street.trim())   { toast.error("Please enter your street address."); return false; }
    if (!city.trim())     { toast.error("Please enter your city/town."); return false; }
    if (items.length === 0) { toast.error("Your cart is empty!"); return false; }
    return true;
  };

  /* ── Step 1: "Confirm Order" button clicked ── */
  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // If not logged in → redirect to login with message
    if (!isLoggedIn) {
      router.push("/login?redirect=checkout&message=checkout");
      return;
    }

    if (!validateForm()) return;

    // Logged in → send OTP to customer's email
    sendOTP();
  };

  /* ── Send / resend OTP via EmailJS ── */
  const sendOTP = async () => {
    if (!email.trim()) {
      toast.error("Please provide a valid email address.");
      return;
    }

    const code = generateOTP();
    setOtpCode(code);
    setOtpInput("");
    setOtpError("");
    setIsSendingOTP(true);

    const toastId = toast.loading(`Sending verification code to ${email}...`);

    try {
      const itemsSummaryText = items.map((i) => `${i.title} (x${i.quantity})`).join(", ");
      const result = await sendVerificationEmail({
        toEmail: email.trim(),
        toName: fullName.trim(),
        code,
        orderTotal: totalAmount,
        itemsSummary: itemsSummaryText,
      });

      if (result.success) {
        toast.success(`Verification code sent to ${email}. Please check your inbox!`, {
          id: toastId,
          duration: 6000,
        });
        setOtpSent(true);
        startResendCountdown();
      } else {
        console.warn("EmailJS result warning:", result.error);
        const isServiceNotFound = result.error?.toLowerCase().includes("service id not found");
        if (isServiceNotFound) {
          toast.error("EmailJS Service ID not found. Verify your Email Service in the EmailJS dashboard. (Code logged to Console F12 for testing)", {
            id: toastId,
            duration: 8000,
          });
        } else {
          toast.error(`Unable to send email: ${result.error || "Please check your email address."}`, {
            id: toastId,
            duration: 6000,
          });
        }
        // Still allow OTP verification UI to be active so user can retry or check
        setOtpSent(true);
        startResendCountdown();
      }
    } catch (err: any) {
      console.error("Error sending verification code:", err);
      toast.error("An error occurred while sending the verification email. Please try again.", {
        id: toastId,
      });
      setOtpSent(true);
      startResendCountdown();
    } finally {
      setIsSendingOTP(false);
    }
  };

  /* ── Step 2: Verify OTP and place order ── */
  const handleVerifyAndPlace = async () => {
    setOtpError("");
    if (otpInput.trim() !== otpCode) {
      setOtpError("Incorrect verification code. Please try again.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));

    const orderNumber = generateOrderNumber();
    const now = new Date();
    const placedAt = now.toISOString();
    const dateStr = now.toLocaleString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

    const order: UserOrderHistory = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: dateStr,
      placedAt,
      items: items.map((i) => ({
        title: i.title,
        quantity: i.quantity,
        price: i.price,
        image: i.image,
      })),
      total: totalAmount,
      subtotal,
      deliveryFee,
      district,
      street,
      city,
      postalCode,
      notes,
      status: "Pending",
      paymentMethod: "Cash on Delivery",
      customerName: fullName,
      customerEmail: email,
      customerPhone: phone,
    };

    addOrder(order);
    try {
      registerNewAdminOrder({
        orderNumber,
        customerName: fullName,
        customerPhone: phone,
        customerEmail: email,
        district,
        itemsCount: items.reduce((sum, i) => sum + i.quantity, 0),
        itemsDescription: items.map((i) => `${i.title} (x${i.quantity})`).join(", "),
        totalAmount,
      });
    } catch (adminSyncErr) {
      console.warn("Could not sync with admin orders:", adminSyncErr);
    }
    clearCart();
    setIsSubmitting(false);

    // Navigate to the dedicated order confirmation page
    router.push(`/order-confirmation?order=${encodeURIComponent(JSON.stringify(order))}`);
  };

  /* ── If cart is empty after order placed ── */
  if (items.length === 0 && !otpSent && !placedOrderNumber) {
    return (
      <div className="pt-32 pb-20 bg-[#FBF9F5] min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 max-w-sm px-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="font-heading text-xl font-bold text-brand-charcoal">Your cart is empty</h2>
          <p className="text-gray-400 text-sm">Add items to your cart before checking out.</p>
          <Link
            href="/portfolio"
            className="inline-block mt-4 py-3 px-8 rounded-xl bg-[#C9A84C] hover:bg-[#B3933B] text-white text-xs font-bold shadow-xs transition-colors"
          >
            Browse Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 bg-[#FBF9F5] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-brand-charcoal">Checkout</h1>
          <p className="text-gray-500 text-xs mt-1">
            Cash on Delivery — pay when your order arrives at your doorstep
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── Left: Contact & Delivery ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Contact Information */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EFECE6] shadow-xs space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h2 className="font-heading text-base font-bold text-brand-charcoal">
                  Contact Information
                </h2>
                {isLoggedIn ? (
                  <span className="text-[11px] text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Signed in as {profile.email}
                  </span>
                ) : (
                  <Link
                    href="/login?redirect=checkout&message=checkout"
                    className="text-xs text-[#9A7A2E] font-semibold hover:underline"
                  >
                    → Have an account? Sign In
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Chamari Perera"
                    disabled={otpSent}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A84C] disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="071 234 5678"
                    disabled={otpSent}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A84C] disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="chamari@email.com"
                  disabled={otpSent}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A84C] disabled:bg-gray-50 disabled:text-gray-500"
                />
                <span className="text-[10px] text-gray-400 mt-1 block">
                  {otpSent ? "Verification code will be sent here" : "Verification details and receipt will be sent here"}
                </span>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EFECE6] shadow-xs space-y-4">
              <h2 className="font-heading text-base font-bold text-brand-charcoal">Delivery Address</h2>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Street Address *</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="House no, Street, Area"
                  disabled={otpSent}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A84C] disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">City / Town *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Colombo 07"
                    disabled={otpSent}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A84C] disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">District *</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    disabled={otpSent}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#C9A84C] disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    {SRI_LANKA_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Postal Code</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Optional"
                    disabled={otpSent}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A84C] disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Delivery Notes</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special instructions (optional)"
                    disabled={otpSent}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A84C] disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Order Summary + OTP ── */}
          <div className="space-y-4">

            {/* Order Summary card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EFECE6] shadow-xs space-y-5">
              <h2 className="font-heading text-lg font-bold text-brand-charcoal">
                Order Summary ({totalItems})
              </h2>

              {/* Items */}
              <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={`${item.id}-${item.variant || ""}`} className="flex items-center gap-3 text-xs">
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-brand-charcoal truncate">{item.title}</p>
                      <p className="text-[10px] text-[#9A7A2E] font-semibold">
                        {formatLKR(item.price * item.quantity)}
                      </p>
                      <p className="text-[10px] text-gray-400">{item.variant || "Standard"} × {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="pt-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      placeholder="Promo Code"
                      className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] uppercase"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-3 py-2 bg-[#FAF5E8] hover:bg-[#F2E8D0] text-[#8C6D27] border border-[#E9DFCE] text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="mt-2 flex items-center justify-between text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1.5 rounded-lg">
                    <span>
                      Code <strong>{appliedPromo.code}</strong> applied ({appliedPromo.description})
                    </span>
                    <button
                      type="button"
                      onClick={() => setAppliedPromo(null)}
                      className="text-emerald-700 hover:text-emerald-900 ml-2"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-xs border-t border-b border-gray-100 py-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brand-charcoal">{formatLKR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({appliedPromo?.code})</span>
                    <span>-{formatLKR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>
                    Delivery ({district})
                    {isFreeShipping && (
                      <span className="ml-1 text-[10px] font-bold text-emerald-600 uppercase">
                        (Free Shipping)
                      </span>
                    )}
                  </span>
                  <span className="font-semibold text-brand-charcoal">
                    {deliveryFee === 0 ? "FREE" : formatLKR(deliveryFee)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="font-heading font-bold text-sm text-brand-charcoal">Total Amount (COD)</span>
                <span className="font-heading text-xl font-bold text-[#9A7A2E]">{formatLKR(totalAmount)}</span>
              </div>

              {/* Confirm Order button (only when OTP not yet sent) */}
              {!otpSent ? (
                <>
                  <button
                    onClick={handleConfirmOrder}
                    disabled={items.length === 0 || isSendingOTP}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#C9A84C] hover:bg-[#B3933B] disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    {isSendingOTP ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Verification Code…</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm Order (Cash on Delivery)</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-gray-400 text-center">
                    By placing your order you agree to our{" "}
                    <Link href="/terms" className="underline hover:text-brand-charcoal">return policy</Link>
                  </p>
                </>
              ) : (
                /* After OTP sent — show "Enter code to place order" banner */
                <div className="w-full py-3 px-4 rounded-xl border-2 border-[#C9A84C]/40 bg-[#FCFAF6] text-xs text-[#9A7A2E] font-semibold flex items-center justify-center gap-2 text-center">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  Enter the 6-digit code below to place order
                </div>
              )}

              {otpSent && (
                <p className="text-[10px] text-gray-400 text-center">
                  By placing your order you agree to our{" "}
                  <Link href="/terms" className="underline hover:text-brand-charcoal">return policy</Link>
                </p>
              )}
            </div>

            {/* ── Email Verification Card (shown after OTP sent) ── */}
            {otpSent && (
              <div className="bg-white rounded-3xl p-6 border border-[#EFECE6] shadow-xs space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F5EEDC] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#9A7A2E]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-brand-charcoal">Email Verification</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">Confirm your email to complete the order</p>
                  </div>
                </div>

                <p className="text-[11px] text-gray-600 leading-relaxed">
                  We&apos;ve sent a 6-digit verification code to{" "}
                  <strong className="text-brand-charcoal">{email}</strong>. Please enter it below to confirm your order.
                </p>

                {/* Sent confirmation badge */}
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2 text-[11px] text-green-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verification code sent to {email}!
                </div>

                {/* OTP input */}
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => {
                    setOtpInput(e.target.value.replace(/\D/g, ""));
                    setOtpError("");
                  }}
                  placeholder="Enter 6-digit code"
                  className="w-full text-center text-xl font-bold tracking-[0.4em] px-4 py-3.5 rounded-xl border-2 border-[#C9A84C]/60 focus:outline-none focus:border-[#C9A84C] bg-[#FCFAF6] placeholder:text-gray-300 placeholder:text-sm placeholder:tracking-normal"
                />

                {otpError && (
                  <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {otpError}
                  </div>
                )}

                {/* Verify & Confirm button */}
                <button
                  onClick={handleVerifyAndPlace}
                  disabled={otpInput.length !== 6 || isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#2C2C2C] hover:bg-black disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer uppercase tracking-wide"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Placing Order…</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verify & Confirm Order</span>
                    </>
                  )}
                </button>

                {/* Footer links */}
                <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1">
                  <button
                    type="button"
                    onClick={() => { setOtpSent(false); setOtpInput(""); setOtpError(""); }}
                    className="hover:text-brand-charcoal transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Mail className="w-3 h-3" />
                    Change Email or Details
                  </button>
                  {resendCountdown > 0 ? (
                    <span>Resend in {resendCountdown}s</span>
                  ) : (
                    <button
                      type="button"
                      disabled={isSendingOTP}
                      onClick={sendOTP}
                      className="hover:text-[#C9A84C] transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <RotateCcw className={`w-3 h-3 ${isSendingOTP ? "animate-spin" : ""}`} />
                      <span>{isSendingOTP ? "Sending…" : "Resend Code"}</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
