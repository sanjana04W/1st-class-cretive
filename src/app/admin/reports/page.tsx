"use client";

import { useMemo } from "react";
import { ShoppingBag, CheckCircle2, TrendingUp, BarChart3, Trophy } from "lucide-react";
import { INITIAL_ADMIN_ORDERS } from "@/lib/admin-store";
import { formatLKR } from "@/lib/utils";

// ─── Derived Stats ────────────────────────────────────────────────────────────
function useAnalytics() {
  return useMemo(() => {
    const orders = INITIAL_ADMIN_ORDERS;
    const totalOrders = orders.length;
    const completed = orders.filter(o => o.status === "COMPLETED").length;
    const totalRevenue = orders
      .filter(o => o.status !== "CANCELLED")
      .reduce((s, o) => s + o.totalAmount, 0);
    const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
    return { totalOrders, completed, totalRevenue, avgOrderValue };
  }, []);
}

// ─── 7-Day Chart Data (mock realistic data) ───────────────────────────────────
const CHART_DATA = [
  { day: "Mon", orders: 1, revenue: 6150 },
  { day: "Tue", orders: 0, revenue: 0 },
  { day: "Wed", orders: 2, revenue: 16700 },
  { day: "Thu", orders: 1, revenue: 8950 },
  { day: "Fri", orders: 0, revenue: 0 },
  { day: "Sat", orders: 2, revenue: 14750 },
  { day: "Sun", orders: 1, revenue: 7600 },
];

const MAX_ORDERS = Math.max(...CHART_DATA.map(d => d.orders), 1);

// ─── Top Selling Products ─────────────────────────────────────────────────────
const TOP_PRODUCTS = [
  { name: "Custom Alphabet Resin Keychains", category: "Resin Keychains", sold: 38, revenue: 45600 },
  { name: "Bespoke Wedding Invitation Suite", category: "Wedding Invitations", sold: 29, revenue: 34800 },
  { name: "Anniversary Custom Light Frame", category: "Custom Frames", sold: 21, revenue: 25200 },
  { name: "Artisanal Wedding Cake Box", category: "Cake Boxes", sold: 17, revenue: 20400 },
  { name: "Curated Keepsake Gift Box", category: "Gift Boxes", sold: 12, revenue: 14400 },
];
const MAX_SOLD = Math.max(...TOP_PRODUCTS.map(p => p.sold));

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent = false,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
  accent?: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-sm hover:border-[#DEC47F]/60 transition-all p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{label}</p>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${accent ? "bg-[#FAF3E0]" : "bg-[#FBF9F5]"} border border-[#EFECE6]`}>
          <Icon className={`w-4.5 h-4.5 ${accent ? "text-[#9A7A2E]" : "text-gray-400"}`} style={{ width: 18, height: 18 }} />
        </div>
      </div>
      <p className={`font-heading stat-number text-3xl font-bold tabular-nums ${accent ? "text-[#9A7A2E]" : "text-[#2C2C2C]"}`}>
        {value}
      </p>
      {sub && <p className="text-xs text-gray-400 font-medium">{sub}</p>}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminReportsPage() {
  const { totalOrders, completed, totalRevenue, avgOrderValue } = useAnalytics();

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto bg-[#FBF9F5] min-h-screen space-y-8">

      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-[#FAF3E0] border border-[#DEC47F]/40 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-[#9A7A2E]" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-[#2C2C2C]">Analytics</h1>
        </div>
        <p className="text-gray-400 text-sm mt-1 ml-12">Sales and performance overview for 1st Class Creative.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Orders" value={String(totalOrders)} icon={ShoppingBag} sub="All time" />
        <StatCard label="Completed" value={String(completed)} icon={CheckCircle2} sub={`${totalOrders > 0 ? Math.round((completed / totalOrders) * 100) : 0}% completion rate`} />
        <StatCard label="Total Revenue" value={formatLKR(totalRevenue)} icon={TrendingUp} accent sub="Excl. cancelled orders" />
        <StatCard label="Avg Order Value" value={formatLKR(avgOrderValue)} icon={BarChart3} accent sub="Per confirmed order" />
      </div>

      {/* Orders — Last 7 Days Chart */}
      <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading text-lg font-bold text-[#2C2C2C]">Orders — Last 7 Days</h2>
            <p className="text-xs text-gray-400 mt-0.5">Daily order count for the past week</p>
          </div>
          <span className="text-xs font-semibold bg-[#FAF3E0] text-[#9A7A2E] border border-[#DEC47F]/40 px-3 py-1 rounded-full">
            {CHART_DATA.reduce((s, d) => s + d.orders, 0)} orders
          </span>
        </div>

        {/* SVG Bar Chart */}
        <div className="flex items-end gap-3 h-40">
          {CHART_DATA.map((d, i) => {
            const pct = MAX_ORDERS > 0 ? (d.orders / MAX_ORDERS) * 100 : 0;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="relative w-full flex flex-col items-center justify-end" style={{ height: 120 }}>
                  {/* Tooltip */}
                  {d.orders > 0 && (
                    <span className="absolute -top-6 text-[10px] font-bold text-[#9A7A2E] tabular-nums opacity-0 group-hover:opacity-100 transition-opacity">
                      {d.orders}
                    </span>
                  )}
                  {/* Bar */}
                  <div
                    className="w-full rounded-t-lg transition-all duration-500"
                    style={{
                      height: `${Math.max(pct, d.orders > 0 ? 8 : 2)}%`,
                      background: d.orders > 0
                        ? "linear-gradient(to top, #9A7A2E, #C9A84C)"
                        : "#EFECE6",
                    }}
                  />
                </div>
                <span className="text-[11px] font-semibold text-gray-400">{d.day}</span>
              </div>
            );
          })}
        </div>

        {/* Revenue row */}
        <div className="mt-4 pt-4 border-t border-[#EFECE6] flex gap-3 overflow-x-auto">
          {CHART_DATA.map((d, i) => (
            <div key={i} className="flex-1 text-center">
              {d.revenue > 0 ? (
                <span className="text-[10px] font-bold text-[#9A7A2E] tabular-nums whitespace-nowrap">
                  {formatLKR(d.revenue)}
                </span>
              ) : (
                <span className="text-[10px] text-gray-300">—</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-sm">
        <div className="px-6 pt-6 pb-4 border-b border-[#EFECE6] flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#9A7A2E]" />
          <div>
            <h2 className="font-heading text-lg font-bold text-[#2C2C2C]">Top Selling Products</h2>
            <p className="text-xs text-gray-400 mt-0.5">Best performers by units sold</p>
          </div>
        </div>

        <div className="divide-y divide-[#EFECE6]">
          {TOP_PRODUCTS.map((product, idx) => {
            const barPct = Math.round((product.sold / MAX_SOLD) * 100);
            return (
              <div key={idx} className="px-6 py-4 flex items-center gap-4 hover:bg-[#FBF9F5] transition-colors group">
                {/* Rank */}
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0
                  ${idx === 0 ? "bg-[#FAF3E0] text-[#9A7A2E] border border-[#DEC47F]/60"
                  : idx === 1 ? "bg-gray-100 text-gray-500 border border-gray-200"
                  : idx === 2 ? "bg-amber-50 text-amber-500 border border-amber-200"
                  : "bg-[#FBF9F5] text-gray-400 border border-[#EFECE6]"}`}>
                  {idx + 1}
                </div>

                {/* Product info + bar */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-1.5">
                    <div>
                      <p className="text-sm font-semibold text-[#2C2C2C] leading-tight">{product.name}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{product.category}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-[#9A7A2E] tabular-nums">{product.sold} sold</p>
                      <p className="text-[11px] text-gray-400 tabular-nums">{formatLKR(product.revenue)}</p>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${barPct}%`,
                        background: idx === 0
                          ? "linear-gradient(to right, #9A7A2E, #C9A84C)"
                          : "linear-gradient(to right, #C9A84C, #E8CC80)",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-sm p-6">
        <h2 className="font-heading text-lg font-bold text-[#2C2C2C] mb-5">Revenue by Category</h2>
        <div className="space-y-4">
          {[
            { label: "Resin Keychains & Personalised Letters", share: 38, revenue: 45000 },
            { label: "Wedding Invitations & Stationery Sets", share: 29, revenue: 34500 },
            { label: "Anniversary & Wedding Custom Light Frames", share: 21, revenue: 25000 },
            { label: "Handcrafted Cake Boxes", share: 12, revenue: 13900 },
          ].map((cat) => (
            <div key={cat.label} className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#2C2C2C]">{cat.label}</span>
                <span className="text-[#9A7A2E] tabular-nums">{formatLKR(cat.revenue)} ({cat.share}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${cat.share}%`,
                    background: "linear-gradient(to right, #9A7A2E, #C9A84C)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
