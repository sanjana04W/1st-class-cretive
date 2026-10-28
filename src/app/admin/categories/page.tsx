"use client";

import { useState, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus, Edit2, Trash2, LayoutGrid, List, X,
  ExternalLink, Layers, Tag, Palette, Truck, FolderTree,
} from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  order: number;
  parentId?: string | null;
  img?: string;
  description?: string;
  itemCount?: number;
}

interface TagItem { id: string; label: string; color: string; }
interface MaterialItem { id: string; name: string; type: string; note: string; }
interface DeliveryZone { id: string; zone: string; districts: string; days: string; fee: number; }

// ─── Seed Data ────────────────────────────────────────────────────────────────
const initialCategories: CategoryItem[] = [
  { id: "cat-1", name: "Resin Creations", slug: "resin-creations", order: 1, parentId: null, img: "/485184284_1103127648493148_4472142601649408182_n.jpg", description: "Coasters, ocean wave wall decor, floral resin slabs, customized trays", itemCount: 18 },
  { id: "cat-1-1", name: "Resin Coasters & Trays", slug: "resin-coasters-trays", order: 1, parentId: "cat-1", img: "/485184284_1103127648493148_4472142601649408182_n.jpg", description: "Ocean geode coasters, gold foil rim trays, floral drink coasters", itemCount: 8 },
  { id: "cat-1-2", name: "Resin Alphabet Keychains", slug: "resin-keychains", order: 2, parentId: "cat-1", img: "/542752181_1238639424941969_1583669488507158905_n.jpg", description: "Personalized alphabet letters, glitter pendants, hearts & custom names", itemCount: 26 },
  { id: "cat-1-3", name: "Resin Wall Art & Clocks", slug: "resin-wall-art-clocks", order: 3, parentId: "cat-1", img: "/529179520_1214465350692710_3362134301413191237_n.jpg", description: "Hand-poured resin wall clocks, ocean waves and geode canvas panels", itemCount: 6 },
  { id: "cat-1-4", name: "Resin Bookmarks & Charms", slug: "resin-bookmarks-charms", order: 4, parentId: "cat-1", img: "/626581418_1362772269195350_2007381266795301988_n.jpg", description: "Pressed flower bookmarks, tassel tags and pocket charms", itemCount: 7 },
  { id: "cat-2", name: "Wedding Stationery", slug: "wedding-stationery", order: 2, parentId: null, img: "/468396156_2478270609044241_1138043242894587302_n.jpg", description: "Custom romantic suites, envelopes, wax seals, floral stationery", itemCount: 14 },
  { id: "cat-2-1", name: "Wedding Invitations & Cards", slug: "wedding-invitations", order: 1, parentId: "cat-2", img: "/468396156_2478270609044241_1138043242894587302_n.jpg", description: "Luxury foil-pressed, laser-cut and calligraphy wedding invitations", itemCount: 14 },
  { id: "cat-2-2", name: "Wedding Cake Boxes", slug: "cake-boxes", order: 2, parentId: "cat-2", img: "/484074106_1098277412311505_6713907112004454121_n.jpg", description: "Embossed gold rose boxes, satin ribbons, wedding cake packaging", itemCount: 16 },
  { id: "cat-2-3", name: "Ring Dishes & Keepsakes", slug: "ring-dishes-keepsakes", order: 3, parentId: "cat-2", img: "/485184284_1103127648493148_4472142601649408182_n.jpg", description: "Personalized resin wedding ring platters and ceramic dishes", itemCount: 5 },
  { id: "cat-3", name: "Custom Frames", slug: "custom-frames", order: 3, parentId: null, img: "/529179520_1214465350692710_3362134301413191237_n.jpg", description: "Anniversary LED shadow boxes, memory frames with resin lettering", itemCount: 12 },
  { id: "cat-3-1", name: "Anniversary & Couple Frames", slug: "anniversary-couple-frames", order: 1, parentId: "cat-3", img: "/529179520_1214465350692710_3362134301413191237_n.jpg", description: "Custom date & photo frames, LED warm backlight memory displays", itemCount: 8 },
  { id: "cat-3-2", name: "Graduation & Birthday Frames", slug: "graduation-birthday-frames", order: 2, parentId: "cat-3", img: "/557802403_1265990468873531_7381377988699630798_n.jpg", description: "Milestone photo collage frames with handmade paper flowers", itemCount: 4 },
  { id: "cat-4", name: "Gift Boxes & Hampers", slug: "gifts", order: 4, parentId: null, img: "/logo.png", description: "Curated gift hampers for bridesmaids, groomsmen, and special milestones", itemCount: 9 },
  { id: "cat-4-1", name: "Bridesmaid & Bridal Hampers", slug: "bridal-hampers", order: 1, parentId: "cat-4", img: "/logo.png", description: "Custom luxury keepsake gift boxes with personalized robe tags", itemCount: 5 },
  { id: "cat-4-2", name: "Corporate & Event Favors", slug: "corporate-event-favors", order: 2, parentId: "cat-4", img: "/logo.png", description: "Bulk branded favor boxes and resin keepsake tokens", itemCount: 4 },
];

const initialTags: TagItem[] = [
  { id: "t-1", label: "Personalised", color: "#9A7A2E" },
  { id: "t-2", label: "Monogram", color: "#7A5E1A" },
  { id: "t-3", label: "LED Backlit", color: "#4A7C99" },
  { id: "t-4", label: "Floral", color: "#8B6D6D" },
  { id: "t-5", label: "Foil Pressed", color: "#9A7A2E" },
  { id: "t-6", label: "Laser-Cut", color: "#555555" },
  { id: "t-7", label: "Glitter Resin", color: "#A0629C" },
  { id: "t-8", label: "Custom Name", color: "#9A7A2E" },
  { id: "t-9", label: "Anniversary", color: "#8B6D6D" },
  { id: "t-10", label: "Wedding Suite", color: "#5C7A5C" },
  { id: "t-11", label: "Best Seller", color: "#B05C2A" },
  { id: "t-12", label: "New Arrival", color: "#4A7C99" },
];

const initialMaterials: MaterialItem[] = [
  { id: "m-1", name: "Crystal-Clear Epoxy Resin", type: "Resin Base", note: "UV-resistant, food-safe grade for coasters & trays" },
  { id: "m-2", name: "UV-Stable Pigment Powders", type: "Colorant", note: "Gold, pearl, ocean teal, rose, midnight" },
  { id: "m-3", name: "24K Gold Leaf Flakes", type: "Embellishment", note: "Authentic gold foil for luxury finishes" },
  { id: "m-4", name: "Pressed Dried Florals", type: "Embellishment", note: "Baby's breath, lavender, rose petals, ferns" },
  { id: "m-5", name: "Ivory Matte Card Stock 350gsm", type: "Paper", note: "Premium base for wedding invitations & cards" },
  { id: "m-6", name: "Velvet Satin Ribbon", type: "Ribbon", note: "Blush, ivory, gold, dusty rose — 3 widths" },
  { id: "m-7", name: "Wax Seal Stamps", type: "Tool", note: "Custom monogram & floral design stamps" },
  { id: "m-8", name: "LED Strip Warm 3000K", type: "Electrical", note: "For custom memory frames, USB powered" },
];

const initialDelivery: DeliveryZone[] = [
  { id: "dz-1", zone: "Colombo Metro", districts: "Colombo, Gampaha", days: "1–2 days", fee: 350 },
  { id: "dz-2", zone: "Western Province", districts: "Kalutara", days: "2–3 days", fee: 450 },
  { id: "dz-3", zone: "Central & Sabaragamuwa", districts: "Kandy, Kegalle, Ratnapura", days: "3–4 days", fee: 550 },
  { id: "dz-4", zone: "Southern Province", districts: "Galle, Matara, Hambantota", days: "3–4 days", fee: 550 },
  { id: "dz-5", zone: "North Central & Uva", districts: "Anuradhapura, Polonnaruwa, Badulla, Monaragala", days: "4–5 days", fee: 650 },
  { id: "dz-6", zone: "Northern & Eastern", districts: "Jaffna, Mannar, Trincomalee, Batticaloa, Ampara", days: "5–6 days", fee: 750 },
];

// ─── Section Tabs ─────────────────────────────────────────────────────────────
type Tab = "categories" | "tags" | "materials" | "delivery";

const TABS: { id: Tab; label: string; icon: React.ElementType; count?: number }[] = [
  { id: "categories", label: "Product Categories", icon: FolderTree },
  { id: "tags", label: "Customisation Tags", icon: Tag },
  { id: "materials", label: "Craft Materials", icon: Palette },
  { id: "delivery", label: "Delivery Zones", icon: Truck },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function AdminCategoriesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("categories");

  // Categories state
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CategoryItem | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [parentId, setParentId] = useState<string>("none");
  const [order, setOrder] = useState<number>(1);
  const [desc, setDesc] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  // Tags state
  const [tags, setTags] = useState<TagItem[]>(initialTags);
  const [newTagLabel, setNewTagLabel] = useState("");

  // Materials state
  const [materials, setMaterials] = useState<MaterialItem[]>(initialMaterials);

  // Delivery state
  const [delivery, setDelivery] = useState<DeliveryZone[]>(initialDelivery);

  const parentCategories = categories.filter((c) => !c.parentId);

  // ── Category Modal helpers ──────────────────────────────────────────────────
  const openAddModal = () => {
    setEditingItem(null); setName(""); setSlug(""); setParentId("none");
    setOrder(categories.length + 1); setDesc(""); setImgUrl("/logo.png");
    setModalOpen(true);
  };
  const openEditModal = (cat: CategoryItem) => {
    setEditingItem(cat); setName(cat.name); setSlug(cat.slug);
    setParentId(cat.parentId || "none"); setOrder(cat.order);
    setDesc(cat.description || ""); setImgUrl(cat.img || "/logo.png");
    setModalOpen(true);
  };
  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingItem) setSlug(val.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"));
  };
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { toast.error("Please enter a category name"); return; }
    const pid = parentId === "none" ? null : parentId;
    if (editingItem) {
      setCategories(prev => prev.map(item => item.id === editingItem.id
        ? { ...item, name, slug: slug || name.toLowerCase().replace(/\s+/g, "-"), parentId: pid, order: Number(order) || 1, description: desc, img: imgUrl || item.img || "/logo.png" }
        : item));
      toast.success(`"${name}" updated.`);
    } else {
      setCategories(prev => [...prev, { id: `cat-${Date.now()}`, name, slug: slug || name.toLowerCase().replace(/\s+/g, "-"), parentId: pid, order: Number(order) || 1, description: desc || "Handcrafted collection", img: imgUrl || "/logo.png", itemCount: 0 }]);
      toast.success(`"${name}" added.`);
    }
    setModalOpen(false);
  };
  const handleDelete = (id: string, n: string) => {
    if (confirm(`Delete category "${n}"?`)) {
      setCategories(prev => prev.filter(item => item.id !== id && item.parentId !== id));
      toast.success(`Deleted "${n}"`);
    }
  };

  // ── Tag helpers ────────────────────────────────────────────────────────────
  const addTag = () => {
    if (!newTagLabel.trim()) return;
    setTags(prev => [...prev, { id: `t-${Date.now()}`, label: newTagLabel.trim(), color: "#9A7A2E" }]);
    setNewTagLabel("");
    toast.success("Tag added.");
  };
  const deleteTag = (id: string) => {
    setTags(prev => prev.filter(t => t.id !== id));
    toast.success("Tag removed.");
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6 bg-[#FBF9F5] min-h-screen">

      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-[#FAF3E0] border border-[#DEC47F]/40 flex items-center justify-center">
            <Layers className="w-5 h-5 text-[#9A7A2E]" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-[#2C2C2C]">Master Data</h1>
        </div>
        <p className="text-gray-400 text-sm mt-1 ml-12">
          Manage catalog taxonomies, craft materials, customisation tags, and delivery zones.
        </p>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-1 bg-white border border-[#EFECE6] rounded-2xl p-1.5 shadow-sm w-full overflow-x-auto">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 min-w-fit flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
                isActive
                  ? "bg-[#9A7A2E] text-white shadow-sm"
                  : "text-gray-500 hover:text-[#2C2C2C] hover:bg-[#FBF9F5]"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ══════════════════ TAB 1: PRODUCT CATEGORIES ══════════════════ */}
      {activeTab === "categories" && (
        <div className="space-y-4">
          {/* Header row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-semibold text-gray-500">
              <strong className="text-[#2C2C2C]">{categories.length}</strong> categories ·{" "}
              <strong className="text-[#2C2C2C]">{parentCategories.length}</strong> top-level
            </p>
            <div className="flex items-center gap-3">
              {/* View toggle */}
              <div className="bg-white border border-[#E8E4DC] p-1 rounded-xl flex items-center shadow-xs">
                <button onClick={() => setViewMode("table")} title="Table view"
                  className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${viewMode === "table" ? "bg-[#9A7A2E] text-white shadow-xs" : "text-gray-500 hover:text-[#2C2C2C]"}`}>
                  <List className="w-4 h-4" /><span className="hidden sm:inline">Table</span>
                </button>
                <button onClick={() => setViewMode("cards")} title="Cards view"
                  className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${viewMode === "cards" ? "bg-[#9A7A2E] text-white shadow-xs" : "text-gray-500 hover:text-[#2C2C2C]"}`}>
                  <LayoutGrid className="w-4 h-4" /><span className="hidden sm:inline">Cards</span>
                </button>
              </div>
              <button onClick={openAddModal}
                className="inline-flex items-center gap-1.5 bg-[#9A7A2E] hover:bg-[#856722] text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm transition-colors">
                <Plus className="w-4 h-4" /> Add Category
              </button>
            </div>
          </div>

          {/* TABLE VIEW */}
          {viewMode === "table" && (
            <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#F0ECE1] text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-[#FAF9F5]">
                      <th className="py-4 px-6 w-2/5">Name</th>
                      <th className="py-4 px-6 w-1/5">Slug</th>
                      <th className="py-4 px-6 text-center w-20">Items</th>
                      <th className="py-4 px-6 text-center w-16">Order</th>
                      <th className="py-4 px-6 text-right w-44">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F5F2EB]">
                    {parentCategories.map((parent) => {
                      const children = categories.filter(c => c.parentId === parent.id);
                      return (
                        <Fragment key={parent.id}>
                          <tr className="hover:bg-[#FAF8F5]/80 transition-colors">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#FAF3E0] border border-[#E9DFCE] overflow-hidden relative shrink-0">
                                  {parent.img && <Image src={parent.img} alt={parent.name} fill className="object-cover" />}
                                </div>
                                <div>
                                  <span className="font-semibold text-[#2C2C2C] text-sm">{parent.name}</span>
                                  {parent.description && <p className="text-[10px] text-gray-400 mt-0.5 truncate max-w-[260px]">{parent.description}</p>}
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6 font-mono text-gray-400 text-xs">{parent.slug}</td>
                            <td className="py-4 px-6 text-center">
                              <span className="text-xs font-bold text-[#9A7A2E] tabular-nums bg-[#FAF3E0] px-2 py-0.5 rounded-full border border-[#DEC47F]/40">
                                {parent.itemCount ?? 0}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-center text-gray-500 font-bold tabular-nums">{parent.order}</td>
                            <td className="py-4 px-6 text-right w-44 whitespace-nowrap">
                              <div className="inline-flex items-center justify-end gap-2">
                                <button
                                  onClick={() => openEditModal(parent)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#2C2C2C] bg-white border border-[#E0DCD3] rounded-md hover:border-[#C9A84C] hover:text-[#9A7A2E] hover:bg-[#FAF6EC] transition-all shadow-xs"
                                >
                                  <Edit2 className="w-3.5 h-3.5 text-[#9A7A2E]" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => handleDelete(parent.id, parent.name)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-100 rounded-md hover:bg-rose-100 hover:border-rose-200 transition-all shadow-xs"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                          {children.map(sub => (
                            <tr key={sub.id} className="hover:bg-[#FBF9F5] transition-colors bg-[#FDFCFB]/60">
                              <td className="py-3 px-6">
                                <div className="flex items-center gap-3 pl-7">
                                  <span className="text-[#DEC47F] font-mono text-xs select-none">└</span>
                                  <div className="w-6 h-6 rounded-md bg-[#FAF3E0] border border-[#E9DFCE] overflow-hidden relative shrink-0">
                                    {sub.img && <Image src={sub.img} alt={sub.name} fill className="object-cover" />}
                                  </div>
                                  <span className="text-gray-600 font-medium text-xs">{sub.name}</span>
                                </div>
                              </td>
                              <td className="py-3 px-6 font-mono text-gray-400 text-xs">{sub.slug}</td>
                              <td className="py-3 px-6 text-center">
                                <span className="text-xs font-bold text-gray-500 tabular-nums">{sub.itemCount ?? 0}</span>
                              </td>
                              <td className="py-3 px-6 text-center text-gray-400 text-xs tabular-nums">{sub.order}</td>
                              <td className="py-3 px-6 text-right w-44 whitespace-nowrap">
                                <div className="inline-flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => openEditModal(sub)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#2C2C2C] bg-white border border-[#E0DCD3] rounded-md hover:border-[#C9A84C] hover:text-[#9A7A2E] hover:bg-[#FAF6EC] transition-all shadow-xs"
                                  >
                                    <Edit2 className="w-3.5 h-3.5 text-[#9A7A2E]" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    onClick={() => handleDelete(sub.id, sub.name)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-100 rounded-md hover:bg-rose-100 hover:border-rose-200 transition-all shadow-xs"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CARDS VIEW */}
          {viewMode === "cards" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map(c => (
                <div key={c.id} className="bg-white rounded-2xl p-5 border border-[#EFECE6] shadow-sm flex flex-col justify-between hover:border-[#DEC47F]/60 hover:shadow-md transition-all group">
                  <div>
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-[#FAF3E0]">
                      <Image src={c.img || "/logo.png"} alt={c.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      {c.itemCount !== undefined && (
                        <span className="absolute top-3 right-3 bg-white/95 text-[11px] font-bold px-2.5 py-0.5 rounded-full text-[#2C2C2C] shadow-xs">{c.itemCount} items</span>
                      )}
                      {c.parentId && (
                        <span className="absolute top-3 left-3 bg-[#2C2C2C]/75 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">Sub-category</span>
                      )}
                    </div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-heading text-base font-bold text-[#2C2C2C]">{c.name}</h3>
                      <span className="text-[10px] font-mono bg-[#FAF3E0] px-2 py-0.5 rounded text-[#9A7A2E] border border-[#DEC47F]/40 shrink-0">#{c.order}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">{c.description || "Handcrafted artisanal design."}</p>
                  </div>
                  <div className="pt-3 border-t border-[#EFECE6] flex items-center justify-between">
                    <Link href={`/portfolio?cat=${c.slug}`} target="_blank" className="text-xs text-[#9A7A2E] font-semibold flex items-center gap-1 hover:underline">
                      View on Website <ExternalLink className="w-3 h-3" />
                    </Link>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(c)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#2C2C2C] bg-white border border-[#E0DCD3] rounded-md hover:border-[#C9A84C] hover:text-[#9A7A2E] hover:bg-[#FAF6EC] transition-all shadow-xs"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-[#9A7A2E]" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c.id, c.name)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-100 rounded-md hover:bg-rose-100 hover:border-rose-200 transition-all shadow-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-500" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ══════════════════ TAB 2: CUSTOMISATION TAGS ══════════════════ */}
      {activeTab === "tags" && (
        <div className="space-y-5">
          {/* Add tag */}
          <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-sm p-5">
            <h2 className="font-heading text-base font-bold text-[#2C2C2C] mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#9A7A2E]" /> Add Customisation Tag
            </h2>
            <div className="flex gap-3">
              <input
                value={newTagLabel}
                onChange={e => setNewTagLabel(e.target.value)}
                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="e.g. Monogram, LED, Foil-Pressed…"
                className="flex-1 px-4 py-2.5 text-sm bg-[#FBF9F5] border border-[#EFECE6] rounded-xl
                           text-[#2C2C2C] placeholder-gray-300 focus:outline-none focus:border-[#C9A84C]
                           focus:ring-2 focus:ring-[#C9A84C]/20 transition-all"
              />
              <button onClick={addTag}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#9A7A2E] hover:bg-[#856722] text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </div>

          {/* Tags grid */}
          <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-sm p-6">
            <h2 className="font-heading text-base font-bold text-[#2C2C2C] mb-4">
              Active Tags <span className="text-sm font-normal text-gray-400 ml-1">({tags.length})</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {tags.map(tag => (
                <div key={tag.id}
                  className="group flex items-center gap-2 pl-3.5 pr-2 py-1.5 rounded-full border border-[#E9DFCE] bg-[#FAF3E0] text-[#7A5E1A] text-sm font-semibold transition-all hover:border-[#C9A84C]">
                  <span>{tag.label}</span>
                  <button onClick={() => deleteTag(tag.id)}
                    className="w-4 h-4 flex items-center justify-center rounded-full bg-[#E9DFCE] hover:bg-red-100 hover:text-red-500 text-[#9A7A2E] transition-colors">
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
              {tags.length === 0 && <p className="text-sm text-gray-400">No tags yet. Add your first tag above.</p>}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════ TAB 3: CRAFT MATERIALS ══════════════════ */}
      {activeTab === "materials" && (
        <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[#EFECE6] flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#9A7A2E]" />
            <h2 className="font-heading text-base font-bold text-[#2C2C2C]">Craft Materials & Finishes</h2>
            <span className="ml-auto text-xs text-gray-400 bg-[#FAF3E0] px-2.5 py-1 rounded-full border border-[#DEC47F]/40 font-bold text-[#9A7A2E]">
              {materials.length} items
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-[#FAF9F5] border-b border-[#EFECE6]">
                  <th className="px-6 py-3 text-left w-2/5">Material</th>
                  <th className="px-6 py-3 text-left w-1/5">Type</th>
                  <th className="px-6 py-3 text-left">Notes</th>
                  <th className="px-6 py-3 text-right w-44">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F2EB]">
                {materials.map(m => (
                  <tr key={m.id} className="hover:bg-[#FBF9F5] transition-colors">
                    <td className="px-6 py-3.5">
                      <span className="font-semibold text-[#2C2C2C]">{m.name}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF3E0] text-[#9A7A2E] border border-[#DEC47F]/40 whitespace-nowrap">
                        {m.type}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-gray-500">{m.note}</td>
                    <td className="px-6 py-3.5 text-right w-44 whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            const n = prompt("Update material name:", m.name); if (!n) return;
                            const t = prompt("Update type:", m.type) || m.type;
                            const note = prompt("Update notes:", m.note) || "";
                            setMaterials(prev => prev.map(x => x.id === m.id ? { ...x, name: n, type: t, note } : x));
                            toast.success(`"${n}" updated.`);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#2C2C2C] bg-white border border-[#E0DCD3] rounded-md hover:border-[#C9A84C] hover:text-[#9A7A2E] hover:bg-[#FAF6EC] transition-all shadow-xs"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-[#9A7A2E]" /> Edit
                        </button>
                        <button
                          onClick={() => {
                            setMaterials(prev => prev.filter(x => x.id !== m.id));
                            toast.success("Material removed.");
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-100 rounded-md hover:bg-rose-100 hover:border-rose-200 transition-all shadow-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-500" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-[#EFECE6] bg-[#FAF9F5]">
            <button
              onClick={() => {
                const n = prompt("Material name:"); if (!n) return;
                const t = prompt("Type (e.g. Resin Base, Paper, Ribbon):") || "General";
                const note = prompt("Notes:") || "";
                setMaterials(prev => [...prev, { id: `m-${Date.now()}`, name: n, type: t, note }]);
                toast.success(`"${n}" added.`);
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-[#9A7A2E] hover:text-[#7A5E1A] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Material
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════ TAB 4: DELIVERY ZONES ══════════════════ */}
      {activeTab === "delivery" && (
        <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[#EFECE6] flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#9A7A2E]" />
            <div>
              <h2 className="font-heading text-base font-bold text-[#2C2C2C]">Delivery Zones & Pricing</h2>
              <p className="text-xs text-gray-400 mt-0.5">Island-wide delivery coverage for all 1st Class Creative orders</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-[#FAF9F5] border-b border-[#EFECE6]">
                  <th className="px-6 py-3 text-left">Zone</th>
                  <th className="px-6 py-3 text-left">Districts Covered</th>
                  <th className="px-6 py-3 text-center">Est. Days</th>
                  <th className="px-6 py-3 text-right">Delivery Fee</th>
                  <th className="px-6 py-3 text-right w-44">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F2EB]">
                {delivery.map((zone, idx) => (
                  <tr key={zone.id} className="hover:bg-[#FBF9F5] transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-[#FAF3E0] border border-[#DEC47F]/40 flex items-center justify-center text-[10px] font-bold text-[#9A7A2E]">
                          {idx + 1}
                        </div>
                        <span className="font-semibold text-[#2C2C2C]">{zone.zone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-gray-500 max-w-xs">{zone.districts}</td>
                    <td className="px-6 py-3.5 text-center">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EEF6EE] text-emerald-700 border border-emerald-200 tabular-nums">
                        {zone.days}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <span className="font-bold text-[#9A7A2E] tabular-nums">LKR {zone.fee.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-3.5 text-right w-44 whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            const newFee = prompt(`Update fee for "${zone.zone}" (current: LKR ${zone.fee}):`, String(zone.fee));
                            if (newFee && !isNaN(Number(newFee))) {
                              setDelivery(prev => prev.map(z => z.id === zone.id ? { ...z, fee: Number(newFee) } : z));
                              toast.success("Delivery fee updated.");
                            }
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#2C2C2C] bg-white border border-[#E0DCD3] rounded-md hover:border-[#C9A84C] hover:text-[#9A7A2E] hover:bg-[#FAF6EC] transition-all shadow-xs"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-[#9A7A2E]" /> Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove delivery zone "${zone.zone}"?`)) {
                              setDelivery(prev => prev.filter(z => z.id !== zone.id));
                              toast.success("Zone removed.");
                            }
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-100 rounded-md hover:bg-rose-100 hover:border-rose-200 transition-all shadow-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-500" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-[#EFECE6] bg-[#FAF9F5] flex items-center justify-between">
            <p className="text-[11px] text-gray-400">Free delivery on orders above <strong className="text-[#9A7A2E]">LKR 15,000</strong> island-wide.</p>
            <span className="text-[11px] font-bold text-[#9A7A2E] bg-[#FAF3E0] px-3 py-1 rounded-full border border-[#DEC47F]/40">
              {delivery.length} zones active
            </span>
          </div>
        </div>
      )}

      {/* ══════════════════ CATEGORY MODAL ══════════════════ */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-5 right-5 text-gray-400 hover:text-[#2C2C2C] p-1 rounded-full hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-heading text-xl font-bold text-[#2C2C2C] mb-1">
              {editingItem ? "Edit Category" : "Add New Category"}
            </h3>
            <p className="text-xs text-gray-500 mb-5">Configure name, hierarchy, slug and display order.</p>
            <form onSubmit={handleSave} className="space-y-4 text-xs font-semibold text-gray-700">
              <div>
                <label className="block mb-1.5">Category Name *</label>
                <input type="text" required value={name} onChange={e => handleNameChange(e.target.value)}
                  placeholder="e.g. Wedding Stationery"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFECE6] focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 text-xs bg-[#FBF9F5]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1.5">Slug (URL)</label>
                  <input type="text" value={slug} onChange={e => setSlug(e.target.value)} placeholder="wedding-stationery"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFECE6] focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 text-xs font-mono bg-[#FBF9F5]" />
                </div>
                <div>
                  <label className="block mb-1.5">Display Order</label>
                  <input type="number" min={1} value={order} onChange={e => setOrder(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFECE6] focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 text-xs bg-[#FBF9F5]" />
                </div>
              </div>
              <div>
                <label className="block mb-1.5">Parent Category (Optional)</label>
                <select value={parentId} onChange={e => setParentId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFECE6] focus:outline-none focus:border-[#C9A84C] text-xs bg-[#FBF9F5]">
                  <option value="none">None (Top-Level)</option>
                  {parentCategories.filter(p => !editingItem || p.id !== editingItem.id).map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1.5">Image Path</label>
                <input type="text" value={imgUrl} onChange={e => setImgUrl(e.target.value)}
                  placeholder="/485184284_1103127648493148_4472142601649408182_n.jpg"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFECE6] focus:outline-none focus:border-[#C9A84C] text-xs font-mono bg-[#FBF9F5]" />
              </div>
              <div>
                <label className="block mb-1.5">Description</label>
                <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3}
                  placeholder="Short description of this category…"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFECE6] focus:outline-none focus:border-[#C9A84C] text-xs font-normal bg-[#FBF9F5] resize-none" />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-[#EFECE6] text-gray-600 hover:bg-gray-50 text-xs font-semibold transition-colors">
                  Cancel
                </button>
                <button type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#9A7A2E] hover:bg-[#856722] text-white text-xs font-bold shadow-sm transition-colors">
                  {editingItem ? "Update Category" : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
