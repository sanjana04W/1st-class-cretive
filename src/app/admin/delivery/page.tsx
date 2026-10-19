"use client";

import { useState } from "react";
import { Truck, Save, Package, MapPin, Clock, ToggleLeft, ToggleRight, Info } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface DeliveryZone {
  id: string;
  zone: string;
  districts: string;
  days: string;
  fee: number;
  color: string;
}

const DELIVERY_ZONES: DeliveryZone[] = [
  { id: "dz-1", zone: "Colombo Metro", districts: "Colombo, Gampaha", days: "1–2 days", fee: 350, color: "emerald" },
  { id: "dz-2", zone: "Western Province", districts: "Kalutara", days: "2–3 days", fee: 450, color: "blue" },
  { id: "dz-3", zone: "Central & Sabaragamuwa", districts: "Kandy, Kegalle, Ratnapura", days: "3–4 days", fee: 550, color: "amber" },
  { id: "dz-4", zone: "Southern Province", districts: "Galle, Matara, Hambantota", days: "3–4 days", fee: 550, color: "amber" },
  { id: "dz-5", zone: "North Central & Uva", districts: "Anuradhapura, Polonnaruwa, Badulla, Monaragala", days: "4–5 days", fee: 650, color: "orange" },
  { id: "dz-6", zone: "North Western", districts: "Kurunegala, Puttalam", days: "3–4 days", fee: 550, color: "amber" },
  { id: "dz-7", zone: "Northern & Eastern", districts: "Jaffna, Kilinochchi, Mannar, Mullaitivu, Trincomalee, Batticaloa, Ampara", days: "5–6 days", fee: 750, color: "red" },
];

const zoneBadgeClass = (color: string) => {
  const map: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
    red: "bg-red-50 text-red-700 border-red-200",
  };
  return map[color] || "bg-gray-100 text-gray-600 border-gray-200";
};

export default function AdminDeliveryPage() {
  const [codEnabled, setCodEnabled] = useState(true);
  const [bankTransferEnabled, setBankTransferEnabled] = useState(true);
  const [colomboFee, setColomboFee] = useState("350");
  const [outstationFee, setOutstationFee] = useState("450");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("15000");
  const [courierPartner, setCourierPartner] = useState("Pronto / Domex / PromptX");
  const [processingDays, setProcessingDays] = useState("2–3");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Delivery & payment settings saved successfully!");
  };

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto bg-[#FBF9F5] min-h-screen space-y-8">

      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-[#FAF3E0] border border-[#DEC47F]/40 flex items-center justify-center">
            <Truck className="w-5 h-5 text-[#9A7A2E]" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-[#2C2C2C]">Delivery & Payment Settings</h1>
        </div>
        <p className="text-gray-400 text-sm mt-1 ml-12">
          Configure island-wide courier rates, payment methods, and dispatch terms for 1st Class Creative orders.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Colombo Metro", value: `LKR ${Number(colomboFee).toLocaleString()}`, sub: "1–2 day delivery", icon: MapPin },
          { label: "Outstation", value: `LKR ${Number(outstationFee).toLocaleString()}`, sub: "Island-wide", icon: Truck },
          { label: "Free Shipping", value: `LKR ${Number(freeShippingThreshold).toLocaleString()}+`, sub: "Minimum order", icon: Package },
          { label: "Handling Time", value: `${processingDays} days`, sub: "Before dispatch", icon: Clock },
        ].map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-2xl border border-[#EFECE6] p-4 shadow-sm hover:border-[#DEC47F]/60 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#FAF3E0] border border-[#DEC47F]/30 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-[#9A7A2E]" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{card.label}</p>
              </div>
              <p className="font-heading text-lg font-bold text-[#9A7A2E] tabular-nums">{card.value}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-sm p-6 space-y-4">
          <h2 className="font-heading text-base font-bold text-[#2C2C2C] flex items-center gap-2 pb-3 border-b border-[#EFECE6]">
            Payment Methods
          </h2>

          {/* COD Toggle */}
          <div className="flex items-center justify-between py-1">
            <div>
              <h3 className="text-sm font-bold text-[#2C2C2C]">Cash on Delivery (COD)</h3>
              <p className="text-xs text-gray-400 mt-0.5">Allow customers across Sri Lanka to pay cash upon parcel delivery.</p>
            </div>
            <button type="button" onClick={() => setCodEnabled(!codEnabled)}
              className={cn("relative w-12 h-6 rounded-full transition-colors flex-shrink-0", codEnabled ? "bg-[#9A7A2E]" : "bg-gray-200")}>
              <span className={cn("w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-sm transition-transform", codEnabled ? "right-0.5" : "left-0.5")} />
            </button>
          </div>

          {/* Bank Transfer Toggle */}
          <div className="flex items-center justify-between py-1 border-t border-[#EFECE6]">
            <div>
              <h3 className="text-sm font-bold text-[#2C2C2C]">Bank Transfer / Online Payment</h3>
              <p className="text-xs text-gray-400 mt-0.5">Accept direct bank transfers, PayPal and card payments via WhatsApp confirmation.</p>
            </div>
            <button type="button" onClick={() => setBankTransferEnabled(!bankTransferEnabled)}
              className={cn("relative w-12 h-6 rounded-full transition-colors flex-shrink-0", bankTransferEnabled ? "bg-[#9A7A2E]" : "bg-gray-200")}>
              <span className={cn("w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-sm transition-transform", bankTransferEnabled ? "right-0.5" : "left-0.5")} />
            </button>
          </div>
        </div>

        {/* Shipping Rates */}
        <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-sm p-6 space-y-5">
          <h2 className="font-heading text-base font-bold text-[#2C2C2C] pb-3 border-b border-[#EFECE6]">
            Shipping Rate Configuration
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-[#2C2C2C] uppercase tracking-wider mb-2">
                Colombo / Western Province Fee (LKR)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#9A7A2E]">LKR</span>
                <input type="number" value={colomboFee} onChange={e => setColomboFee(e.target.value)} min={0}
                  className="w-full pl-12 pr-4 py-2.5 text-sm bg-[#FBF9F5] border border-[#EFECE6] rounded-xl text-[#2C2C2C]
                             tabular-nums focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#2C2C2C] uppercase tracking-wider mb-2">
                Outstation Island-wide Fee (LKR)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#9A7A2E]">LKR</span>
                <input type="number" value={outstationFee} onChange={e => setOutstationFee(e.target.value)} min={0}
                  className="w-full pl-12 pr-4 py-2.5 text-sm bg-[#FBF9F5] border border-[#EFECE6] rounded-xl text-[#2C2C2C]
                             tabular-nums focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-[#2C2C2C] uppercase tracking-wider mb-2">
                Free Delivery Threshold (LKR)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#9A7A2E]">LKR</span>
                <input type="number" value={freeShippingThreshold} onChange={e => setFreeShippingThreshold(e.target.value)} min={0}
                  className="w-full pl-12 pr-4 py-2.5 text-sm bg-[#FBF9F5] border border-[#EFECE6] rounded-xl text-[#2C2C2C]
                             tabular-nums focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all" />
              </div>
              <p className="text-[11px] text-gray-400 mt-1.5 flex items-center gap-1">
                <Info className="w-3 h-3" /> Orders above this value receive free island-wide shipping.
              </p>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#2C2C2C] uppercase tracking-wider mb-2">
                Order Handling / Processing Time
              </label>
              <select value={processingDays} onChange={e => setProcessingDays(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-[#FBF9F5] border border-[#EFECE6] rounded-xl text-[#2C2C2C]
                           focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all">
                <option value="1–2">1–2 business days</option>
                <option value="2–3">2–3 business days</option>
                <option value="3–5">3–5 business days</option>
                <option value="5–7">5–7 business days (custom orders)</option>
              </select>
              <p className="text-[11px] text-gray-400 mt-1.5 flex items-center gap-1">
                <Info className="w-3 h-3" /> Handcraft production time before handing to courier.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2C2C2C] uppercase tracking-wider mb-2">
              Courier Service Partner
            </label>
            <input type="text" value={courierPartner} onChange={e => setCourierPartner(e.target.value)}
              className="w-full px-4 py-2.5 text-sm bg-[#FBF9F5] border border-[#EFECE6] rounded-xl text-[#2C2C2C]
                         focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all" />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-[#9A7A2E] hover:bg-[#856722] text-white text-sm font-bold rounded-xl shadow-sm transition-colors">
            <Save className="w-4 h-4" /> Save Settings
          </button>
        </div>
      </form>

      {/* Delivery Zones Reference Table */}
      <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#EFECE6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#9A7A2E]" />
            <h2 className="font-heading text-base font-bold text-[#2C2C2C]">Island-wide Delivery Zones</h2>
          </div>
          <span className="text-[11px] font-bold text-[#9A7A2E] bg-[#FAF3E0] px-3 py-1 rounded-full border border-[#DEC47F]/40">
            {DELIVERY_ZONES.length} zones
          </span>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-[#FAF9F5] border-b border-[#EFECE6]">
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">Zone</th>
              <th className="px-6 py-3 text-left">Districts Covered</th>
              <th className="px-6 py-3 text-center">Est. Delivery</th>
              <th className="px-6 py-3 text-right">Fee</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F2EB]">
            {DELIVERY_ZONES.map((zone, idx) => (
              <tr key={zone.id} className="hover:bg-[#FBF9F5] transition-colors">
                <td className="px-6 py-3.5">
                  <div className="w-6 h-6 rounded-lg bg-[#FAF3E0] border border-[#DEC47F]/40 flex items-center justify-center text-[10px] font-bold text-[#9A7A2E]">
                    {idx + 1}
                  </div>
                </td>
                <td className="px-6 py-3.5">
                  <span className="font-semibold text-[#2C2C2C]">{zone.zone}</span>
                </td>
                <td className="px-6 py-3.5 text-gray-500 max-w-xs">{zone.districts}</td>
                <td className="px-6 py-3.5 text-center">
                  <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full border tabular-nums", zoneBadgeClass(zone.color))}>
                    {zone.days}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-right">
                  <span className="font-bold text-[#9A7A2E] tabular-nums">LKR {zone.fee.toLocaleString()}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-3.5 border-t border-[#EFECE6] bg-[#FAF9F5] flex items-center justify-between">
          <p className="text-[11px] text-gray-500 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#9A7A2E]" />
            Free island-wide delivery on orders above <strong className="text-[#9A7A2E] ml-1">LKR {Number(freeShippingThreshold).toLocaleString()}</strong>.
          </p>
          <span className="text-[11px] text-gray-400">Courier: {courierPartner}</span>
        </div>
      </div>
    </div>
  );
}
