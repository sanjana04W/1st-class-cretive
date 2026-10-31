"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Truck,
  CreditCard,
  MapPin,
  Phone,
  Calendar,
  Package,
  ShoppingBag,
} from "lucide-react";
import type { UserOrderHistory } from "@/context/CustomerProfileContext";
import { formatLKR } from "@/lib/utils";
import { getAdminOrders, mapAdminStatusToCustomer } from "@/lib/admin-store";

/* ── helpers ── */
function formatPlacedAt(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const raw = searchParams.get("order");

  const [adminOrders, setAdminOrders] = useState(() =>
    typeof window !== "undefined" ? getAdminOrders() : []
  );

  useEffect(() => {
    const handleUpdate = () => {
      setAdminOrders(getAdminOrders());
    };
    window.addEventListener("admin_orders_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("admin_orders_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  if (!raw) {
    return (
      <div className="min-h-screen bg-[#FCFAF7] flex flex-col items-center justify-center text-center px-4 space-y-4 pt-24">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <Package className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-[#2C2C2C]">No order found</h2>
        <p className="text-gray-400 text-sm">Please complete checkout to view your order confirmation.</p>
        <Link href="/portfolio" className="mt-4 inline-block py-3 px-8 rounded-xl bg-[#C9A84C] hover:bg-[#B3933B] text-white text-xs font-bold transition-colors">
          Browse Collection
        </Link>
      </div>
    );
  }

  let order: UserOrderHistory;
  try {
    order = JSON.parse(decodeURIComponent(raw));
  } catch {
    return (
      <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center pt-24">
        <p className="text-gray-500">Unable to read order details.</p>
      </div>
    );
  }

  const matchedAdmin = adminOrders.find(
    (a) => a.orderRef.toLowerCase().trim() === (order.orderNumber || "").toLowerCase().trim()
  );
  const currentStatus = matchedAdmin
    ? mapAdminStatusToCustomer(matchedAdmin.status)
    : order.status || "Pending";

  const getStatusBadge = (st: string) => {
    const s = (st || "").toLowerCase();
    if (s === "confirmed") return "border-blue-300 bg-blue-50 text-blue-700";
    if (s === "processing") return "border-indigo-300 bg-indigo-50 text-indigo-700";
    if (s === "dispatched") return "border-purple-300 bg-purple-50 text-purple-700";
    if (s === "delivered" || s === "completed") return "border-emerald-300 bg-emerald-50 text-emerald-700";
    if (s === "cancelled") return "border-rose-300 bg-rose-50 text-rose-700";
    return "border-amber-300 bg-amber-50 text-amber-800";
  };

  const placedAt = order.placedAt ? formatPlacedAt(order.placedAt) : order.date;

  return (
    <div className="min-h-screen bg-[#FCFAF7] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* ── Header: green tick + title ── */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full border-2 border-green-400 bg-green-50 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#2C2C2C]">
            Thank You For Your Order!
          </h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Your order has been received successfully. Below are your reference and shipping expectations.
          </p>
          {/* Order number and status pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 border border-gray-300 bg-white rounded-full px-5 py-2 text-xs font-bold text-[#2C2C2C] shadow-xs uppercase tracking-wider">
              ORDER NUMBER: {order.orderNumber}
            </div>
            <div className={`inline-flex items-center gap-1.5 border rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider ${getStatusBadge(currentStatus)}`}>
              STATUS: {currentStatus}
            </div>
          </div>
        </div>

        {/* ── Two-column detail cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Shipping Details */}
          <div className="bg-white rounded-2xl border border-[#EFECE6] p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#D96B64]">
              <Truck className="w-3.5 h-3.5" />
              Shipping Details
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-[11px] text-gray-400">Recipient Name:</p>
                <p className="font-bold text-[#2C2C2C]">{order.customerName}</p>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] text-gray-400">Mobile Contact:</p>
                  <p className="font-bold text-[#2C2C2C]">{order.customerPhone}</p>
                </div>
              </div>
              <div>
                <p className="text-[11px] text-gray-400">District:</p>
                <p className="font-bold text-[#2C2C2C]">{order.district}</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] text-gray-400">Address:</p>
                  <p className="font-semibold text-[#2C2C2C] leading-relaxed">
                    {order.street}, {order.city}
                    {order.postalCode ? `, ${order.postalCode}` : ""}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] text-gray-400">Requested Delivery / Placed:</p>
                  <p className="font-semibold text-[#2C2C2C]">{placedAt}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Information */}
          <div className="bg-white rounded-2xl border border-[#EFECE6] p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#7A5CAA]">
              <ShoppingBag className="w-3.5 h-3.5" />
              Order Information
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-[11px] text-gray-400">Payment Method:</p>
                <p className="font-bold text-[#2C2C2C]">Cash on Delivery (COD)</p>
              </div>
              <div>
                <p className="text-[11px] text-gray-400">Fulfillment Status:</p>
                <span className="inline-block mt-1 px-3 py-1 rounded-full border border-amber-400 text-amber-700 bg-amber-50 text-[11px] font-bold uppercase tracking-wider">
                  {order.status}
                </span>
              </div>
            </div>

            {/* Expected delivery box */}
            <div className="mt-auto p-4 rounded-xl bg-[#FCFAF6] border border-[#F0ECE1] text-xs space-y-1">
              <p className="font-bold text-[#2C2C2C]">Expected Delivery:</p>
              <p className="text-gray-500">
                Colombo/Gampaha: <strong className="text-[#2C2C2C]">1–3 Business Days.</strong>
              </p>
              <p className="text-gray-500">
                Outstations: <strong className="text-[#2C2C2C]">3–5 Business Days.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* ── Ordered Itemized Summary ── */}
        <div className="bg-white rounded-2xl border border-[#EFECE6] p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#9A7A2E]">
            <Package className="w-3.5 h-3.5" />
            Ordered Itemized Summary
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-bold text-[#2C2C2C]">Order Items</p>
              <p className="text-[11px] text-gray-400">Order confirmed with 1st Class Creative</p>
            </div>

            <div className="divide-y divide-gray-100">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#2C2C2C] truncate">{item.title}</p>
                    <p className="text-[11px] text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-bold text-[#9A7A2E]">
                    {formatLKR(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Subtotals */}
            <div className="border-t border-gray-100 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Order Items</span>
                <span className="font-semibold text-[#2C2C2C]">{formatLKR(order.subtotal ?? order.total)}</span>
              </div>
              {order.deliveryFee != null && (
                <div className="flex justify-between text-gray-500">
                  <span>Delivery ({order.district})</span>
                  <span className="font-semibold text-[#2C2C2C]">{formatLKR(order.deliveryFee)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-sm border-t border-gray-100 pt-2">
                <span className="text-[#2C2C2C]">Total Amount (COD)</span>
                <span className="text-[#9A7A2E]">{formatLKR(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Action buttons ── */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/profile"
            className="flex-1 py-3.5 px-6 rounded-xl bg-[#C9A84C] hover:bg-[#B3933B] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            View Order in My Profile
          </Link>
          <Link
            href="/portfolio"
            className="flex-1 py-3.5 px-6 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            Continue Shopping
          </Link>
          <a
            href={`https://wa.me/94740388788?text=Hello%2C%20I%20placed%20order%20${order.orderNumber}%20and%20would%20like%20to%20check%20on%20my%20delivery%20status.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3.5 px-6 rounded-xl bg-[#2C2C2C] hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            Track via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center pt-24">
        <div className="text-gray-400 text-sm animate-pulse">Loading your order…</div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
