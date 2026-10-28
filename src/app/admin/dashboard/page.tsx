"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ChevronRight,
  Clock,
  CheckCircle2,
  Package,
} from "lucide-react";
import {
  INITIAL_ADMIN_ORDERS,
  INITIAL_STOCK_ALERTS,
  getAdminProducts,
} from "@/lib/admin-store";

export default function AdminDashboardPage() {
  const [orders] = useState(INITIAL_ADMIN_ORDERS);
  const [stockAlerts] = useState(INITIAL_STOCK_ALERTS);
  const [productsCount, setProductsCount] = useState(89);

  useEffect(() => {
    const prods = getAdminProducts();
    if (prods.length > 0) setProductsCount(prods.length);
  }, []);

  const pendingOrders = orders.filter((o) => o.status === "PENDING");

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="font-heading font-serif text-3xl font-bold text-brand-charcoal">
          Dashboard
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Welcome back — here&apos;s what&apos;s happening
        </p>
      </div>

      {/* Stat Cards Row matching 1st Class Creative aesthetic */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Pending Orders */}
        <div className="bg-white rounded-2xl border border-[#EFECE6] p-5 shadow-2xs hover:border-[#DEC47F]/60 transition-all flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700 mb-3">
            <ShoppingBag className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <span className="text-3xl font-bold font-heading stat-number text-brand-charcoal">
              {pendingOrders.length}
            </span>
            <p className="text-xs font-semibold text-gray-500 mt-0.5">Pending Orders</p>
          </div>
        </div>

        {/* Card 2: Today's Orders */}
        <div className="bg-white rounded-2xl border border-[#EFECE6] p-5 shadow-2xs hover:border-[#DEC47F]/60 transition-all flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-700 mb-3">
            <TrendingUp className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <span className="text-3xl font-bold font-heading stat-number text-brand-charcoal">
              0
            </span>
            <p className="text-xs font-semibold text-gray-500 mt-0.5">Today&apos;s Orders</p>
          </div>
        </div>

        {/* Card 3: Total Revenue */}
        <div className="bg-white rounded-2xl border border-[#EFECE6] p-5 shadow-2xs hover:border-[#DEC47F]/60 transition-all flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-[#FAF5E8] border border-[#DEC47F]/50 flex items-center justify-center text-[#9A7A2E] mb-3">
            <ArrowUpRight className="w-5 h-5 text-[#9A7A2E]" />
          </div>
          <div>
            <span className="text-2xl font-bold font-heading stat-number text-[#9A7A2E]">
              LKR 16,550
            </span>
            <p className="text-xs font-semibold text-gray-500 mt-0.5">Confirmed Revenue</p>
          </div>
        </div>

        {/* Card 4: Products in Catalog */}
        <div className="bg-white rounded-2xl border border-[#EFECE6] p-5 shadow-2xs hover:border-[#DEC47F]/60 transition-all flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-[#F6F4EF] border border-[#DEC47F]/40 flex items-center justify-center text-[#8C6D27] mb-3">
            <Package className="w-5 h-5 text-[#8C6D27]" />
          </div>
          <div>
            <span className="text-3xl font-bold font-heading stat-number text-brand-charcoal">
              {productsCount}
            </span>
            <p className="text-xs font-semibold text-gray-500 mt-0.5">Active Catalog Items</p>
          </div>
        </div>
      </div>

      {/* Pending Orders Card Section */}
      <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-[#EFECE6] flex items-center justify-between bg-[#FAF9F5]">
          <h2 className="font-heading font-serif text-lg font-bold text-brand-charcoal">
            Pending Orders
          </h2>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold text-[#8C6D27] hover:text-[#9A7A2E] transition-colors flex items-center gap-1"
          >
            <span>View all</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-[#EFECE6]">
          {pendingOrders.map((order) => (
            <div
              key={order.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAF9F5] transition-colors"
            >
              <div>
                <p className="font-bold text-sm text-brand-charcoal">
                  {order.orderRef}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {order.customerName} - {order.district}
                </p>
              </div>
              <div className="text-left sm:text-right flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
                <span className="font-heading font-bold text-sm tabular-nums text-brand-charcoal">
                  LKR {order.totalAmount.toLocaleString()}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                  Pending
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stock Alerts Card */}
      <div className="bg-[#FFF8F7] border border-rose-200/80 rounded-2xl p-5 shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <h3 className="font-heading font-serif text-sm font-bold text-rose-800">
            Stock Alerts
          </h3>
        </div>

        <div className="divide-y divide-rose-100/70">
          {stockAlerts.slice(0, 2).map((item) => (
            <div key={item.id} className="py-3 flex items-center justify-between first:pt-1 last:pb-1">
              <div>
                <p className="font-bold text-xs text-brand-charcoal">{item.name}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{item.subtitle}</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold tabular-nums text-rose-700 bg-rose-100/70 border border-rose-200">
                {item.left} left
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
