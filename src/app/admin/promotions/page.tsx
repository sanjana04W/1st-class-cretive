"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, Check, X } from "lucide-react";
import { getPromotions, addPromotion, updatePromotion } from "@/lib/firestore";
import type { Promotion } from "@/types";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Timestamp } from "firebase/firestore";

interface PromoForm {
  title: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  startDate: string;
  endDate: string;
}

export default function PromotionsPage() {
  const [promos, setPromos] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PromoForm>();

  const load = async () => {
    setLoading(true);
    const data = await getPromotions();
    setPromos(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (data: PromoForm) => {
    try {
      await addPromotion({
        title: data.title,
        description: data.description,
        discountType: data.discountType,
        discountValue: Number(data.discountValue),
        applicableProducts: [],
        isActive: true,
        startDate: Timestamp.fromDate(new Date(data.startDate)),
        endDate: Timestamp.fromDate(new Date(data.endDate)),
      });
      toast.success("Promotion created!");
      reset();
      setShowForm(false);
      load();
    } catch {
      toast.error("Failed to create promotion.");
    }
  };

  const toggleActive = async (promo: Promotion) => {
    try {
      await updatePromotion(promo.id, { isActive: !promo.isActive });
      toast.success(promo.isActive ? "Promotion deactivated" : "Promotion activated");
      load();
    } catch {
      toast.error("Failed to update.");
    }
  };

  const formatDate = (d: any) => {
    try { return d?.toDate?.()?.toLocaleDateString() ?? new Date(d).toLocaleDateString(); } catch { return "—"; }
  };

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-charcoal">Promotions</h1>
          <p className="text-gray-400 text-sm mt-1">Create and manage discount campaigns and special offers.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm !py-2.5">
          <Plus className="w-4 h-4" /> New Promotion
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-card p-6 mb-8">
          <h2 className="font-heading text-lg font-bold text-brand-charcoal mb-5">Create Promotion</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1.5">Promotion Title *</label>
              <input {...register("title", { required: true })} className="form-input" placeholder="e.g. Summer Sale — 20% Off" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1.5">Description</label>
              <textarea {...register("description")} className="form-input resize-none min-h-[80px]" placeholder="Describe the promotion…" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-1.5">Discount Type *</label>
                <select {...register("discountType", { required: true })} className="form-input">
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount (LKR)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-1.5">Discount Value *</label>
                <input {...register("discountValue", { required: true, min: 0 })} type="number" className="form-input" placeholder="e.g. 20" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-1.5">Start Date *</label>
                <input {...register("startDate", { required: true })} type="date" className="form-input" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-1.5">End Date *</label>
                <input {...register("endDate", { required: true })} type="date" className="form-input" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary text-sm !py-2.5">Create Promotion</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm !py-2.5">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-10"><svg className="animate-spin w-8 h-8 text-brand-gold mx-auto" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" /></svg></div>
      ) : promos.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-2xl shadow-card">
          <p className="text-4xl mb-4">🎉</p>
          <p className="text-gray-500 text-sm">No promotions yet. Create your first one!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {promos.map((promo) => (
            <div key={promo.id} className={cn("bg-white rounded-2xl shadow-card p-5 flex items-start gap-4", !promo.isActive && "opacity-70")}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-heading font-bold text-brand-charcoal">{promo.title}</h3>
                  <span className={cn("status-badge", promo.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500")}>
                    {promo.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                {promo.description && <p className="text-sm text-gray-500 mb-2">{promo.description}</p>}
                <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                  <span className="bg-brand-champagne text-brand-gold-dark font-semibold px-2.5 py-1 rounded-full">
                    {promo.discountType === "percentage" ? `${promo.discountValue}% OFF` : `LKR ${promo.discountValue} OFF`}
                  </span>
                  <span>Start: {formatDate(promo.startDate)}</span>
                  <span>End: {formatDate(promo.endDate)}</span>
                </div>
              </div>
              <button
                onClick={() => toggleActive(promo)}
                className={cn(
                  "shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all",
                  promo.isActive
                    ? "border-red-200 text-red-500 hover:bg-red-50"
                    : "border-green-200 text-green-600 hover:bg-green-50"
                )}
              >
                {promo.isActive ? <><X className="w-3.5 h-3.5" /> Deactivate</> : <><Check className="w-3.5 h-3.5" /> Activate</>}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
