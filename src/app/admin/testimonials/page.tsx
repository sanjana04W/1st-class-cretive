"use client";

import { useState } from "react";
import { Plus, Trash2, Eye, EyeOff, Search, Star, Quote, X, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  productCategory: string;
  isVisible: boolean;
  date: string;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────
const STORAGE_KEY = "admin_testimonials";

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Dilani Perera",
    location: "Colombo",
    rating: 5,
    text: "Absolutely stunning! The resin keychain I ordered for my sister's birthday was so beautifully crafted. The glitter and color were exactly what I asked for. Will definitely order again!",
    productCategory: "Resin Keychains",
    isVisible: true,
    date: "Oct 2026",
  },
  {
    id: "t-2",
    name: "Nishani Fernando",
    location: "Kandy",
    rating: 5,
    text: "The wedding invitation suite was beyond my expectations. Every detail was perfect — the foil, the calligraphy, the wax seals. Our guests were truly impressed. Thank you 1st Class Creative!",
    productCategory: "Wedding Invitations",
    isVisible: true,
    date: "Sep 2026",
  },
  {
    id: "t-3",
    name: "Roshan Wickramasinghe",
    location: "Gampaha",
    rating: 5,
    text: "Ordered a custom anniversary frame for my wife and she was in tears when she saw it. The LED backlight and personalized lettering made it look so premium. Highly recommend!",
    productCategory: "Custom Frames",
    isVisible: true,
    date: "Oct 2026",
  },
  {
    id: "t-4",
    name: "Amaya Silva",
    location: "Matara",
    rating: 4,
    text: "The cake boxes for our wedding were gorgeous — embossed rose design with satin ribbons. Delivery was on time and packaging was excellent. Would love even more colour options!",
    productCategory: "Wedding Cake Boxes",
    isVisible: true,
    date: "Aug 2026",
  },
  {
    id: "t-5",
    name: "Kavindi Jayawardena",
    location: "Negombo",
    rating: 5,
    text: "I ordered the bridal hamper set for my bridesmaids and they all loved it. So beautifully packaged with personalized tags. 1st Class Creative truly lives up to their name!",
    productCategory: "Gift Boxes & Hampers",
    isVisible: false,
    date: "Jul 2026",
  },
];

function loadTestimonials(): Testimonial[] {
  if (typeof window === "undefined") return DEFAULT_TESTIMONIALS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_TESTIMONIALS;
  } catch {
    return DEFAULT_TESTIMONIALS;
  }
}
function saveTestimonials(t: Testimonial[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(t));
    try {
      window.dispatchEvent(new CustomEvent("admin_testimonials_updated", { detail: t }));
    } catch {}
  }
}

// ─── Star Input ───────────────────────────────────────────────────────────────
function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(s => (
        <button key={s} type="button" onClick={() => onChange(s)}
          onMouseEnter={() => setHovered(s)} onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110">
          <Star className={cn("w-6 h-6 transition-colors", (hovered || value) >= s ? "fill-[#C9A84C] text-[#C9A84C]" : "text-gray-200")} />
        </button>
      ))}
    </div>
  );
}

// ─── Star Display ─────────────────────────────────────────────────────────────
function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} className={cn("w-3.5 h-3.5", s <= rating ? "fill-[#C9A84C] text-[#C9A84C]" : "text-gray-200")} />
      ))}
    </div>
  );
}

const CATEGORIES = [
  "Resin Keychains", "Wedding Invitations", "Wedding Cake Boxes",
  "Custom Frames", "Resin Coasters & Trays", "Gift Boxes & Hampers",
  "Resin Wall Art", "Ring Dishes & Keepsakes", "Other",
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(loadTestimonials);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [formName, setFormName] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formText, setFormText] = useState("");
  const [formCategory, setFormCategory] = useState(CATEGORIES[0]);

  const persist = (updated: Testimonial[]) => {
    setTestimonials(updated);
    saveTestimonials(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formText.trim()) { toast.error("Name and review text are required."); return; }
    const t: Testimonial = {
      id: `t-${Date.now()}`,
      name: formName.trim(),
      location: formLocation.trim(),
      rating: formRating,
      text: formText.trim(),
      productCategory: formCategory,
      isVisible: true,
      date: new Date().toLocaleDateString("en-LK", { month: "short", year: "numeric" }),
    };
    persist([t, ...testimonials]);
    toast.success(`Testimonial from "${t.name}" added!`);
    setFormName(""); setFormLocation(""); setFormRating(5); setFormText(""); setFormCategory(CATEGORIES[0]);
    setShowForm(false);
  };

  const toggleVisibility = (id: string) => {
    const updated = testimonials.map(t => t.id === id ? { ...t, isVisible: !t.isVisible } : t);
    persist(updated);
    const t = updated.find(x => x.id === id)!;
    toast.success(`"${t.name}" ${t.isVisible ? "shown on website" : "hidden from website"}`);
  };

  const handleDelete = (id: string) => {
    const t = testimonials.find(x => x.id === id)!;
    if (!confirm(`Delete testimonial from "${t.name}"?`)) return;
    persist(testimonials.filter(x => x.id !== id));
    toast.success("Testimonial deleted.");
  };

  const filtered = testimonials.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.text.toLowerCase().includes(search.toLowerCase()) ||
    t.productCategory.toLowerCase().includes(search.toLowerCase())
  );

  const visibleCount = testimonials.filter(t => t.isVisible).length;

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto bg-[#FBF9F5] min-h-screen space-y-6">

      {/* Page Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-[#FAF3E0] border border-[#DEC47F]/40 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-[#9A7A2E]" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-[#2C2C2C]">Testimonials</h1>
          </div>
          <p className="text-gray-400 text-sm mt-1 ml-12">
            Manage customer reviews displayed on the 1st Class Creative website.
            <span className="ml-2 text-[#9A7A2E] font-semibold">{visibleCount} visible</span>
            <span className="text-gray-300 mx-1">·</span>
            <span className="text-gray-400">{testimonials.length} total</span>
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#9A7A2E] hover:bg-[#856722] text-white text-sm font-bold rounded-xl shadow-sm transition-colors"
        >
          {showForm ? <><X className="w-4 h-4" /> Cancel</> : <><Plus className="w-4 h-4" /> Add Testimonial</>}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-[#DEC47F]/50 shadow-sm p-6 space-y-5">
          <h2 className="font-heading text-lg font-bold text-[#2C2C2C] flex items-center gap-2">
            <Quote className="w-5 h-5 text-[#9A7A2E]" /> Add New Testimonial
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#2C2C2C] uppercase tracking-wider mb-2">
                  Customer Name <span className="text-red-400">*</span>
                </label>
                <input value={formName} onChange={e => setFormName(e.target.value)} placeholder="e.g. Dilani P."
                  className="w-full px-4 py-2.5 text-sm bg-[#FBF9F5] border border-[#EFECE6] rounded-xl text-[#2C2C2C]
                             placeholder-gray-300 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2C2C2C] uppercase tracking-wider mb-2">Location</label>
                <input value={formLocation} onChange={e => setFormLocation(e.target.value)} placeholder="e.g. Colombo"
                  className="w-full px-4 py-2.5 text-sm bg-[#FBF9F5] border border-[#EFECE6] rounded-xl text-[#2C2C2C]
                             placeholder-gray-300 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#2C2C2C] uppercase tracking-wider mb-2">Product Category</label>
                <select value={formCategory} onChange={e => setFormCategory(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-[#FBF9F5] border border-[#EFECE6] rounded-xl text-[#2C2C2C]
                             focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2C2C2C] uppercase tracking-wider mb-2">
                  Rating <span className="text-red-400">*</span>
                </label>
                <StarInput value={formRating} onChange={setFormRating} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#2C2C2C] uppercase tracking-wider mb-2">
                Review Text <span className="text-red-400">*</span>
              </label>
              <textarea value={formText} onChange={e => setFormText(e.target.value)} rows={4}
                placeholder="Customer's review…"
                className="w-full px-4 py-3 text-sm bg-[#FBF9F5] border border-[#EFECE6] rounded-xl text-[#2C2C2C]
                           placeholder-gray-300 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20
                           transition-all resize-none" />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#9A7A2E] hover:bg-[#856722] text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
                <Plus className="w-4 h-4" /> Save Testimonial
              </button>
              <button type="button" onClick={() => setShowForm(false)}
                className="px-5 py-2.5 border border-[#EFECE6] text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search testimonials by name, review, or category…"
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border border-[#EFECE6] rounded-xl text-sm text-[#2C2C2C]
                     placeholder-gray-300 shadow-sm focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all" />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Count line */}
      <p className="text-xs text-gray-400 px-1">
        Showing <strong className="text-[#2C2C2C]">{filtered.length}</strong> of {testimonials.length} testimonials
        {search && <> matching "<strong>{search}</strong>"</>}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-[#EFECE6] py-16 flex flex-col items-center gap-3">
          <Quote className="w-8 h-8 text-[#DEC47F]" />
          <p className="text-sm text-gray-400">No testimonials found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map(t => (
            <div key={t.id}
              className={cn(
                "bg-white rounded-2xl border shadow-sm p-5 flex flex-col gap-4 transition-all hover:shadow-md",
                t.isVisible ? "border-[#EFECE6] hover:border-[#DEC47F]/60" : "border-gray-100 opacity-60"
              )}>
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {/* Avatar circle */}
                    <div className="w-9 h-9 rounded-full bg-[#FAF3E0] border border-[#DEC47F]/40 flex items-center justify-center shrink-0">
                      <span className="text-sm font-black text-[#9A7A2E]">{t.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#2C2C2C]">{t.name}</p>
                      {t.location && <p className="text-[11px] text-gray-400">{t.location}</p>}
                    </div>
                  </div>
                  <StarDisplay rating={t.rating} />
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full border",
                    t.isVisible ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-gray-100 text-gray-400 border-gray-200"
                  )}>
                    {t.isVisible ? "Visible" : "Hidden"}
                  </span>
                  <button onClick={() => toggleVisibility(t.id)} title={t.isVisible ? "Hide from website" : "Show on website"}
                    className="p-1.5 text-gray-400 hover:text-[#9A7A2E] hover:bg-[#FAF3E0] rounded-lg transition-colors">
                    {t.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => handleDelete(t.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Review text */}
              <div className="relative pl-4 border-l-2 border-[#DEC47F]/40">
                <Quote className="absolute -left-1.5 -top-1 w-3 h-3 text-[#C9A84C] fill-[#C9A84C]" />
                <p className="text-sm text-gray-600 italic leading-relaxed">"{t.text}"</p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-[#EFECE6]">
                <span className="text-xs font-bold text-[#9A7A2E] bg-[#FAF3E0] px-2.5 py-1 rounded-full border border-[#DEC47F]/40">
                  {t.productCategory}
                </span>
                <span className="text-[11px] text-gray-400">{t.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
