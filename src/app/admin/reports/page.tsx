"use client";

import { BarChart3, TrendingUp, DollarSign, ShoppingBag, Users, Calendar } from "lucide-react";
import { formatLKR } from "@/lib/utils";

export default function AdminReportsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6 bg-[#FBF9F5] min-h-screen">
      <div>
        <h1 className="font-heading text-3xl font-bold text-brand-charcoal">
          Reports & Analytics
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Review sales performance, popular categories, and inquiry conversion rates.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
            Total Revenue (30 Days)
          </p>
          <p className="font-heading text-2xl font-bold text-[#9A7A2E]">
            {formatLKR(118400)}
          </p>
          <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +18.4% vs last month
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
            Completed Orders
          </p>
          <p className="font-heading text-2xl font-bold text-brand-charcoal">
            42 Orders
          </p>
          <p className="text-xs text-gray-400 mt-1">Avg. order value: LKR 2,820</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
            Conversion Rate
          </p>
          <p className="font-heading text-2xl font-bold text-brand-charcoal">
            78.5%
          </p>
          <p className="text-xs text-gray-400 mt-1">From initial WhatsApp / Web inquiries</p>
        </div>
      </div>

      {/* Top Performing Categories */}
      <div className="bg-white rounded-3xl p-6 border border-[#EFECE6] shadow-xs space-y-4">
        <h3 className="font-heading text-lg font-bold text-brand-charcoal">
          Top Performing Categories
        </h3>
        <div className="space-y-3">
          {[
            { label: "Resin Keychains & Personalised Letters", share: "38%", revenue: 45000 },
            { label: "Wedding Invitations & Stationery Sets", share: "29%", revenue: 34500 },
            { label: "Anniversary & Wedding Custom Light Frames", share: "21%", revenue: 25000 },
            { label: "Handcrafted Cake Boxes", share: "12%", revenue: 13900 },
          ].map((cat) => (
            <div key={cat.label} className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-brand-charcoal">{cat.label}</span>
                <span className="text-[#9A7A2E]">{formatLKR(cat.revenue)} ({cat.share})</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-brand-gold rounded-full"
                  style={{ width: cat.share }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
