"use client";

import { useState } from "react";
import { Plus, Trash2, Pause, Play, Tag, Percent, BadgeDollarSign, TicketPercent } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface PromoCode {
  id: string;
  code: string;
  discountType: "percentage" | "fixed" | "shipping";
  discountValue: number;
  minOrder: number;
  description: string;
  isActive: boolean;
  usageCount: number;
}

const STORAGE_KEY = "admin_promo_codes";

const DEFAULT_PROMOS: PromoCode[] = [
  {
    id: "promo-1",
    code: "CREATIVE10",
    discountType: "percentage",
    discountValue: 10,
    minOrder: 5000,
    description: "10% OFF on orders above LKR 5,000",
    isActive: true,
    usageCount: 14,
  },
  {
    id: "promo-2",
    code: "1STCLASS500",
    discountType: "fixed",
    discountValue: 500,
    minOrder: 10000,
    description: "LKR 500 OFF on orders above LKR 10,000",
    isActive: true,
    usageCount: 7,
  },
  {
    id: "promo-3",
    code: "FREESHIP",
    discountType: "shipping",
    discountValue: 0,
    minOrder: 15000,
    description: "Free Shipping on orders above LKR 15,000",
    isActive: false,
    usageCount: 3,
  },
  {
    id: "promo-4",
    code: "BESPOKE20",
    discountType: "percentage",
    discountValue: 20,
    minOrder: 8000,
    description: "20% OFF bespoke handcraft orders above LKR 8,000",
    isActive: true,
    usageCount: 5,
  },
];

function loadPromos(): PromoCode[] {
  if (typeof window === "undefined") return DEFAULT_PROMOS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_PROMOS;
  } catch {
    return DEFAULT_PROMOS;
  }
}

function savePromos(promos: PromoCode[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(promos));
  }
}

const discountBadge = (p: PromoCode) => {
  if (p.discountType === "percentage") return `${p.discountValue}% OFF`;
  if (p.discountType === "fixed") return `LKR ${p.discountValue.toLocaleString()} OFF`;
  return "FREE SHIP";
};

const discountIcon = (type: PromoCode["discountType"]) => {
  if (type === "percentage") return <Percent className="w-3.5 h-3.5" />;
  if (type === "fixed") return <BadgeDollarSign className="w-3.5 h-3.5" />;
  return <Tag className="w-3.5 h-3.5" />;
};

export default function PromotionsPage() {
  const [promos, setPromos] = useState<PromoCode[]>(loadPromos);

  // Form state
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed" | "shipping">("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [minOrder, setMinOrder] = useState("");

  const persist = (updated: PromoCode[]) => {
    setPromos(updated);
    savePromos(updated);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) { toast.error("Promo code is required."); return; }
    const exists = promos.some(p => p.code.toUpperCase() === code.trim().toUpperCase());
    if (exists) { toast.error("A promo code with this name already exists."); return; }
    const val = discountType === "shipping" ? 0 : Number(discountValue);
    if (discountType !== "shipping" && (!discountValue || val <= 0)) { toast.error("Please enter a valid discount value."); return; }

    const desc = discountType === "percentage"
      ? `${val}% OFF on orders above LKR ${Number(minOrder || 0).toLocaleString()}`
      : discountType === "fixed"
      ? `LKR ${val.toLocaleString()} OFF on orders above LKR ${Number(minOrder || 0).toLocaleString()}`
      : `Free Shipping on orders above LKR ${Number(minOrder || 0).toLocaleString()}`;

    const newPromo: PromoCode = {
      id: `promo-${Date.now()}`,
      code: code.trim().toUpperCase(),
      discountType,
      discountValue: val,
      minOrder: Number(minOrder || 0),
      description: desc,
      isActive: true,
      usageCount: 0,
    };
    persist([newPromo, ...promos]);
    toast.success(`Promo code "${newPromo.code}" created!`);
    setCode(""); setDiscountValue(""); setMinOrder(""); setDiscountType("percentage");
  };

  const toggleActive = (id: string) => {
    const updated = promos.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p);
    persist(updated);
    const p = updated.find(x => x.id === id)!;
    toast.success(`"${p.code}" ${p.isActive ? "activated" : "paused"}.`);
  };

  const deletePromo = (id: string) => {
    const p = promos.find(x => x.id === id)!;
    persist(promos.filter(x => x.id !== id));
    toast.success(`"${p.code}" deleted.`);
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto bg-[#FBF9F5] min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-[#FAF3E0] border border-[#DEC47F]/40 flex items-center justify-center">
            <TicketPercent className="w-5 h-5 text-[#9A7A2E]" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-[#2C2C2C]">Promotions &amp; Offers</h1>
        </div>
        <p className="text-gray-400 text-sm mt-1 ml-12">Manage discount codes and promotional campaigns for 1st Class Creative.</p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">

        {/* LEFT — Create Promo Code */}
        <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-sm sticky top-6">
          <div className="px-6 pt-6 pb-4 border-b border-[#EFECE6]">
            <h2 className="font-heading text-lg font-bold text-[#2C2C2C] flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#9A7A2E]" /> Create Promo Code
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Add a new discount code or offer</p>
          </div>
          <form onSubmit={handleCreate} className="p-6 space-y-5">
            {/* Promo Code */}
            <div>
              <label className="block text-xs font-bold text-[#2C2C2C] uppercase tracking-wider mb-2">
                Promo Code <span className="text-red-400">*</span>
              </label>
              <input
                value={code}
                onChange={e => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. CREATIVE10"
                className="w-full px-4 py-2.5 text-sm bg-[#FBF9F5] border border-[#EFECE6] rounded-xl
                           text-[#2C2C2C] placeholder-gray-300 font-mono font-semibold tracking-widest
                           focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all"
              />
            </div>

            {/* Discount Type */}
            <div>
              <label className="block text-xs font-bold text-[#2C2C2C] uppercase tracking-wider mb-2">
                Discount Type <span className="text-red-400">*</span>
              </label>
              <select
                value={discountType}
                onChange={e => setDiscountType(e.target.value as typeof discountType)}
                className="w-full px-4 py-2.5 text-sm bg-[#FBF9F5] border border-[#EFECE6] rounded-xl
                           text-[#2C2C2C] focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (LKR)</option>
                <option value="shipping">Free Shipping</option>
              </select>
            </div>

            {/* Discount Value (hidden for free shipping) */}
            {discountType !== "shipping" && (
              <div>
                <label className="block text-xs font-bold text-[#2C2C2C] uppercase tracking-wider mb-2">
                  Discount Value <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#9A7A2E]">
                    {discountType === "percentage" ? "%" : "LKR"}
                  </span>
                  <input
                    type="number"
                    value={discountValue}
                    onChange={e => setDiscountValue(e.target.value)}
                    placeholder={discountType === "percentage" ? "e.g. 10" : "e.g. 500"}
                    min={1}
                    className="w-full pl-12 pr-4 py-2.5 text-sm bg-[#FBF9F5] border border-[#EFECE6] rounded-xl
                               text-[#2C2C2C] tabular-nums focus:outline-none focus:border-[#C9A84C]
                               focus:ring-2 focus:ring-[#C9A84C]/20 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Minimum Order Value */}
            <div>
              <label className="block text-xs font-bold text-[#2C2C2C] uppercase tracking-wider mb-2">
                Min. Order Value (LKR) <span className="text-gray-300 font-normal normal-case">optional</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">LKR</span>
                <input
                  type="number"
                  value={minOrder}
                  onChange={e => setMinOrder(e.target.value)}
                  placeholder="e.g. 5000"
                  min={0}
                  className="w-full pl-12 pr-4 py-2.5 text-sm bg-[#FBF9F5] border border-[#EFECE6] rounded-xl
                             text-[#2C2C2C] tabular-nums focus:outline-none focus:border-[#C9A84C]
                             focus:ring-2 focus:ring-[#C9A84C]/20 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                         bg-[#9A7A2E] text-white text-sm font-bold tracking-wide
                         hover:bg-[#856722] active:scale-[0.98] transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" /> Create Code
            </button>
          </form>
        </div>

        {/* RIGHT — Active Campaigns */}
        <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-sm">
          <div className="px-6 pt-6 pb-4 border-b border-[#EFECE6] flex items-center justify-between">
            <div>
              <h2 className="font-heading text-lg font-bold text-[#2C2C2C]">Active Campaigns &amp; Codes</h2>
              <p className="text-xs text-gray-400 mt-0.5">{promos.length} code{promos.length !== 1 ? "s" : ""} total · {promos.filter(p => p.isActive).length} active</p>
            </div>
          </div>

          {promos.length === 0 ? (
            <div className="py-16 flex flex-col items-center gap-3 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#FAF3E0] flex items-center justify-center">
                <TicketPercent className="w-7 h-7 text-[#C9A84C]" />
              </div>
              <p className="text-sm font-medium text-gray-400">No promo codes yet.<br />Create your first one!</p>
            </div>
          ) : (
            <ul className="divide-y divide-[#EFECE6]">
              {promos.map((promo) => (
                <li key={promo.id} className={cn("px-6 py-4 flex items-start gap-4 group transition-colors hover:bg-[#FBF9F5]", !promo.isActive && "opacity-60")}>
                  {/* Code badge + discount pill */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2 mb-1.5">
                      {/* Code pill */}
                      <span className="font-mono text-sm font-extrabold px-3 py-1 rounded-lg bg-[#FAF3E0] border border-[#DEC47F]/60 text-[#7A5E1A] tracking-widest">
                        {promo.code}
                      </span>
                      {/* Discount value badge */}
                      <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FAF3E0] border border-[#DEC47F]/50 text-[#9A7A2E] tabular-nums">
                        {discountIcon(promo.discountType)} {discountBadge(promo)}
                      </span>
                      {/* Status */}
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide",
                        promo.isActive
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-gray-100 text-gray-400 border border-gray-200"
                      )}>
                        {promo.isActive ? "Active" : "Paused"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{promo.description}</p>
                    <p className="text-[11px] text-gray-400 tabular-nums">
                      Used <strong className="text-[#9A7A2E]">{promo.usageCount}</strong> time{promo.usageCount !== 1 ? "s" : ""}
                      {promo.minOrder > 0 && <> · Min order: <strong className="text-[#2C2C2C]">LKR {promo.minOrder.toLocaleString()}</strong></>}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 mt-0.5">
                    <button
                      onClick={() => toggleActive(promo.id)}
                      title={promo.isActive ? "Pause" : "Activate"}
                      className={cn(
                        "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all",
                        promo.isActive
                          ? "border-amber-200 text-amber-600 hover:bg-amber-50"
                          : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                      )}
                    >
                      {promo.isActive
                        ? <><Pause className="w-3.5 h-3.5" /> Pause</>
                        : <><Play className="w-3.5 h-3.5" /> Activate</>}
                    </button>
                    <button
                      onClick={() => deletePromo(promo.id)}
                      title="Delete"
                      className="p-1.5 rounded-lg border border-red-100 text-red-400 hover:bg-red-50 hover:border-red-200 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
