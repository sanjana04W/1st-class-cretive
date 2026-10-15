"use client";

import { useState } from "react";
import { Truck, Check, Save } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminDeliveryPage() {
  const [codEnabled, setCodEnabled] = useState(true);
  const [colomboFee, setColomboFee] = useState("350");
  const [outstationFee, setOutstationFee] = useState("450");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("10000");
  const [courierPartner, setCourierPartner] = useState("Pronto / Domex / PromptX");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Delivery settings updated successfully!");
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6 bg-[#FBF9F5] min-h-screen">
      <div>
        <h1 className="font-heading text-3xl font-bold text-brand-charcoal">
          Delivery & Payment Settings
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Configure islandwide courier rates, Cash On Delivery (COD), and dispatch terms.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFECE6] shadow-xs space-y-6">
        {/* COD Toggle */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
          <div>
            <h3 className="font-heading text-base font-bold text-brand-charcoal">
              Cash on Delivery (COD)
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Allow customers across Sri Lanka to pay cash upon parcel delivery.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCodEnabled(!codEnabled)}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              codEnabled ? "bg-[#9A7A2E]" : "bg-gray-200"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                codEnabled ? "right-0.5" : "left-0.5"
              }`}
            />
          </button>
        </div>

        {/* Shipping Rates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">
              Western Province / Colombo Delivery Fee (LKR)
            </label>
            <input
              type="number"
              value={colomboFee}
              onChange={(e) => setColomboFee(e.target.value)}
              className="form-input text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">
              Outstation Islandwide Delivery Fee (LKR)
            </label>
            <input
              type="number"
              value={outstationFee}
              onChange={(e) => setOutstationFee(e.target.value)}
              className="form-input text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1.5">
            Free Delivery Minimum Order Amount (LKR)
          </label>
          <input
            type="number"
            value={freeShippingThreshold}
            onChange={(e) => setFreeShippingThreshold(e.target.value)}
            className="form-input text-xs"
          />
          <p className="text-[11px] text-gray-400 mt-1">
            Orders above this value receive free shipping across Sri Lanka.
          </p>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1.5">
            Courier Service Partner
          </label>
          <input
            type="text"
            value={courierPartner}
            onChange={(e) => setCourierPartner(e.target.value)}
            className="form-input text-xs"
          />
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button type="submit" className="btn-primary !py-2.5 !px-6 text-xs font-semibold">
            <Save className="w-4 h-4" /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
