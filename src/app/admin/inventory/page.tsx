"use client";

import { useState } from "react";
import { Boxes, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

const initialStock = [
  { item: "Clear Epoxy Resin & Hardener (A+B Kit)", category: "Raw Materials", qty: "14 kg", status: "Adequate" },
  { item: "Glitter Pigments & Chunky Flakes Set", category: "Raw Materials", qty: "32 bottles", status: "Adequate" },
  { item: "Alphabet Metal Keychain Rings (Gold/Silver)", category: "Hardware", qty: "140 pcs", status: "Adequate" },
  { item: "Silicone Alphabet & Number Molds", category: "Tools", qty: "18 pcs", status: "Adequate" },
  { item: "Ivory Pearl Cardstock (300gsm)", category: "Stationery", qty: "80 sheets", status: "Low Stock" },
  { item: "Embossed Gold Pattern Cake Box Blanks", category: "Packaging", qty: "45 boxes", status: "Low Stock" },
  { item: "Warm White Fairy Micro LEDs (3M)", category: "Electronics", qty: "8 sets", status: "Low Stock" },
];

export default function AdminInventoryPage() {
  const [stockList, setStockList] = useState(initialStock);

  const handleRestock = (itemName: string) => {
    setStockList((prev) =>
      prev.map((s) => (s.item === itemName ? { ...s, status: "Adequate" } : s))
    );
    toast.success(`Restocked ${itemName}`);
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6 bg-[#FBF9F5] min-h-screen">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-brand-charcoal">
            Studio Inventory & Supplies
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Track crafting supplies, resin stock, packaging materials, and hardware.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#EFECE6] shadow-xs overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-[#FAF9F6] uppercase text-gray-400 font-semibold text-[10px] tracking-wider border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">Item & Material</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Current Quantity</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {stockList.map((s) => (
              <tr key={s.item} className="hover:bg-amber-50/20 transition-colors">
                <td className="px-6 py-4 font-bold text-brand-charcoal">{s.item}</td>
                <td className="px-6 py-4 text-gray-600">{s.category}</td>
                <td className="px-6 py-4 font-mono font-semibold text-gray-700">{s.qty}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      s.status === "Adequate"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {s.status === "Low Stock" ? (
                    <button
                      onClick={() => handleRestock(s.item)}
                      className="px-3 py-1 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold"
                    >
                      Restock
                    </button>
                  ) : (
                    <span className="text-gray-400 text-xs">Ready</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
