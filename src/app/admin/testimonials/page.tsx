"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Eye, EyeOff, Search } from "lucide-react";
import { getAllTestimonials, addTestimonial, updateTestimonial, deleteTestimonial } from "@/lib/firestore";
import type { Testimonial, ProductCategory } from "@/types";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

interface TestimonialForm {
  name: string;
  location?: string;
  rating: number;
  text: string;
  productCategory?: ProductCategory;
}

function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className={cn("text-2xl", s <= value ? "text-brand-gold" : "text-gray-300")}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [search, setSearch] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TestimonialForm>();

  const load = async () => {
    setLoading(true);
    const data = await getAllTestimonials();
    setTestimonials(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (data: TestimonialForm) => {
    try {
      await addTestimonial({ ...data, rating, isVisible: true });
      toast.success("Testimonial added!");
      reset();
      setRating(5);
      setShowForm(false);
      load();
    } catch {
      toast.error("Failed to add testimonial.");
    }
  };

  const toggleVisibility = async (t: Testimonial) => {
    try {
      await updateTestimonial(t.id, { isVisible: !t.isVisible });
      toast.success(t.isVisible ? "Hidden from website" : "Showing on website");
      load();
    } catch {
      toast.error("Failed to update.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      toast.success("Deleted.");
      load();
    } catch {
      toast.error("Failed to delete.");
    }
  };

  const filtered = testimonials.filter(
    (t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-charcoal">Testimonials</h1>
          <p className="text-gray-400 text-sm mt-1">Manage customer reviews shown on the website.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm !py-2.5">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-card p-6 mb-8">
          <h2 className="font-heading text-lg font-bold text-brand-charcoal mb-5">Add New Testimonial</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-1.5">Customer Name *</label>
                <input {...register("name", { required: true })} className="form-input" placeholder="e.g. Dilani P." />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-1.5">Location</label>
                <input {...register("location")} className="form-input" placeholder="e.g. Colombo" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1.5">Product Category</label>
              <input {...register("productCategory")} className="form-input" placeholder="e.g. Resin Keychain" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1.5">Rating *</label>
              <StarInput value={rating} onChange={setRating} />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1.5">Review Text *</label>
              <textarea {...register("text", { required: true })} className="form-input min-h-[100px] resize-none" placeholder="Customer's review…" />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary text-sm !py-2.5">Save Testimonial</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm !py-2.5">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search testimonials…" value={search} onChange={(e) => setSearch(e.target.value)} className="form-input pl-9" />
      </div>

      {/* List */}
      {loading ? (
        <div className="text-center py-10"><svg className="animate-spin w-8 h-8 text-brand-gold mx-auto" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" /></svg></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-10 text-gray-400">No testimonials yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((t) => (
            <div key={t.id} className={cn("bg-white rounded-2xl shadow-card p-5", !t.isVisible && "opacity-60")}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-brand-charcoal text-sm">{t.name}</p>
                  {t.location && <p className="text-xs text-gray-400">{t.location}</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toggleVisibility(t)} title={t.isVisible ? "Hide" : "Show"} className="text-gray-400 hover:text-brand-gold transition-colors">
                    {t.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => handleDelete(t.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < t.rating ? "text-brand-gold" : "text-gray-200"}>★</span>
                ))}
              </div>
              <p className="text-gray-600 text-sm italic leading-relaxed">"{t.text}"</p>
              {t.productCategory && <p className="text-xs text-brand-gold mt-2 font-medium">{t.productCategory as string}</p>}
              <div className="mt-3">
                <span className={cn("status-badge text-xs", t.isVisible ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500")}>
                  {t.isVisible ? "Visible" : "Hidden"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
