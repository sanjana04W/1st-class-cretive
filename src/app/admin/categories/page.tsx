"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Edit2, Trash2, LayoutGrid, List, Sparkles, X, Check, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

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

const initialCategoriesData: CategoryItem[] = [
  // Parent 1: Resin Art & Creations
  {
    id: "cat-1",
    name: "Resin Creations",
    slug: "resin-creations",
    order: 1,
    parentId: null,
    img: "/485184284_1103127648493148_4472142601649408182_n.jpg",
    description: "Coasters, ocean wave wall decor, floral resin slabs, customized trays",
    itemCount: 18,
  },
  {
    id: "cat-1-1",
    name: "Resin Coasters & Trays",
    slug: "resin-coasters-trays",
    order: 1,
    parentId: "cat-1",
    img: "/485184284_1103127648493148_4472142601649408182_n.jpg",
    description: "Ocean geode coasters, gold foil rim trays, floral drink coasters",
    itemCount: 8,
  },
  {
    id: "cat-1-2",
    name: "Resin Alphabet Keychains",
    slug: "resin-keychains",
    order: 2,
    parentId: "cat-1",
    img: "/542752181_1238639424941969_1583669488507158905_n.jpg",
    description: "Personalized alphabet letters, glitter pendants, hearts & custom names",
    itemCount: 26,
  },
  {
    id: "cat-1-3",
    name: "Resin Wall Art & Clocks",
    slug: "resin-wall-art-clocks",
    order: 3,
    parentId: "cat-1",
    img: "/529179520_1214465350692710_3362134301413191237_n.jpg",
    description: "Hand-poured resin wall clocks, ocean waves and geode canvas panels",
    itemCount: 6,
  },
  {
    id: "cat-1-4",
    name: "Resin Bookmarks & Charms",
    slug: "resin-bookmarks-charms",
    order: 4,
    parentId: "cat-1",
    img: "/626581418_1362772269195350_2007381266795301988_n.jpg",
    description: "Pressed flower bookmarks, tassel tags and pocket charms",
    itemCount: 7,
  },

  // Parent 2: Wedding Stationery & Essentials
  {
    id: "cat-2",
    name: "Wedding Stationery",
    slug: "wedding-stationery",
    order: 2,
    parentId: null,
    img: "/468396156_2478270609044241_1138043242894587302_n.jpg",
    description: "Custom romantic suites, envelopes, wax seals, floral stationery",
    itemCount: 14,
  },
  {
    id: "cat-2-1",
    name: "Wedding Invitations & Cards",
    slug: "wedding-invitations",
    order: 1,
    parentId: "cat-2",
    img: "/468396156_2478270609044241_1138043242894587302_n.jpg",
    description: "Luxury foil-pressed, laser-cut and calligraphy wedding invitations",
    itemCount: 14,
  },
  {
    id: "cat-2-2",
    name: "Wedding Cake Boxes",
    slug: "cake-boxes",
    order: 2,
    parentId: "cat-2",
    img: "/484074106_1098277412311505_6713907112004454121_n.jpg",
    description: "Embossed gold rose boxes, satin ribbons, wedding cake packaging",
    itemCount: 16,
  },
  {
    id: "cat-2-3",
    name: "Ring Dishes & Keepsakes",
    slug: "ring-dishes-keepsakes",
    order: 3,
    parentId: "cat-2",
    img: "/485184284_1103127648493148_4472142601649408182_n.jpg",
    description: "Personalized resin wedding ring platters and ceramic dishes",
    itemCount: 5,
  },

  // Parent 3: Custom Photo Frames & Memory Art
  {
    id: "cat-3",
    name: "Custom Frames",
    slug: "custom-frames",
    order: 3,
    parentId: null,
    img: "/529179520_1214465350692710_3362134301413191237_n.jpg",
    description: "Anniversary LED shadow boxes, memory frames with resin lettering",
    itemCount: 12,
  },
  {
    id: "cat-3-1",
    name: "Anniversary & Couple Frames",
    slug: "anniversary-couple-frames",
    order: 1,
    parentId: "cat-3",
    img: "/529179520_1214465350692710_3362134301413191237_n.jpg",
    description: "Custom date & photo frames, LED warm backlight memory displays",
    itemCount: 8,
  },
  {
    id: "cat-3-2",
    name: "Graduation & Birthday Frames",
    slug: "graduation-birthday-frames",
    order: 2,
    parentId: "cat-3",
    img: "/557802403_1265990468873531_7381377988699630798_n.jpg",
    description: "Milestone photo collage frames with handmade paper flowers",
    itemCount: 4,
  },

  // Parent 4: Gift Boxes & Hampers
  {
    id: "cat-4",
    name: "Gift Boxes & Hampers",
    slug: "gifts",
    order: 4,
    parentId: null,
    img: "/logo.png",
    description: "Curated gift hampers for bridesmaids, groomsmen, and special milestones",
    itemCount: 9,
  },
  {
    id: "cat-4-1",
    name: "Bridesmaid & Bridal Hampers",
    slug: "bridal-hampers",
    order: 1,
    parentId: "cat-4",
    img: "/logo.png",
    description: "Custom luxury keepsake gift boxes with personalized robe tags",
    itemCount: 5,
  },
  {
    id: "cat-4-2",
    name: "Corporate & Event Favors",
    slug: "corporate-event-favors",
    order: 2,
    parentId: "cat-4",
    img: "/logo.png",
    description: "Bulk branded favor boxes and resin keepsake tokens",
    itemCount: 4,
  },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategoriesData);
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  
  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CategoryItem | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [parentId, setParentId] = useState<string>("none");
  const [order, setOrder] = useState<number>(1);
  const [desc, setDesc] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const parentCategories = categories.filter((c) => !c.parentId);

  const openAddModal = () => {
    setEditingItem(null);
    setName("");
    setSlug("");
    setParentId("none");
    setOrder(categories.length + 1);
    setDesc("");
    setImgUrl("/logo.png");
    setModalOpen(true);
  };

  const openEditModal = (cat: CategoryItem) => {
    setEditingItem(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setParentId(cat.parentId || "none");
    setOrder(cat.order);
    setDesc(cat.description || "");
    setImgUrl(cat.img || "/logo.png");
    setModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingItem) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
      );
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    const assignedParentId = parentId === "none" ? null : parentId;

    if (editingItem) {
      // Update
      setCategories((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                name,
                slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
                parentId: assignedParentId,
                order: Number(order) || 1,
                description: desc,
                img: imgUrl || item.img || "/logo.png",
              }
            : item
        )
      );
      toast.success(`Category "${name}" updated successfully!`);
    } else {
      // Create
      const newCat: CategoryItem = {
        id: `cat-${Date.now()}`,
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
        parentId: assignedParentId,
        order: Number(order) || 1,
        description: desc || "Handcrafted collection",
        img: imgUrl || "/logo.png",
        itemCount: 0,
      };
      setCategories((prev) => [...prev, newCat]);
      toast.success(`Category "${name}" added successfully!`);
    }

    setModalOpen(false);
  };

  const handleDelete = (id: string, catName: string) => {
    if (confirm(`Are you sure you want to delete category "${catName}"?`)) {
      setCategories((prev) => prev.filter((item) => item.id !== id && item.parentId !== id));
      toast.success(`Deleted category "${catName}"`);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6 bg-[#FBF9F5] min-h-screen">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-brand-charcoal">
            Categories
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {categories.length} total
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="bg-white border border-[#E8E4DC] p-1 rounded-xl flex items-center shadow-xs">
            <button
              onClick={() => setViewMode("table")}
              title="Table view (Hierarchical)"
              className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === "table"
                  ? "bg-[#C9A84C] text-white shadow-xs"
                  : "text-gray-500 hover:text-brand-charcoal"
              }`}
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Table View</span>
            </button>
            <button
              onClick={() => setViewMode("cards")}
              title="Cards view (Visual)"
              className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === "cards"
                  ? "bg-[#C9A84C] text-white shadow-xs"
                  : "text-gray-500 hover:text-brand-charcoal"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Cards View</span>
            </button>
          </div>

          {/* Add Category Button matching reference */}
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 bg-[#C26B38] hover:bg-[#A95A2B] text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Category</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: TABLE VIEW (EXACTLY MATCHING USER SCREENSHOT) */}
      {viewMode === "table" && (
        <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#F0ECE1] text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-[#FCFAF6]/60">
                  <th className="py-4 px-6 w-2/5">NAME</th>
                  <th className="py-4 px-6 w-2/5">SLUG</th>
                  <th className="py-4 px-6 text-center w-24">ORDER</th>
                  <th className="py-4 px-6 text-right w-36">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F2EB]">
                {parentCategories.map((parent) => {
                  const children = categories.filter((c) => c.parentId === parent.id);

                  return (
                    <div key={parent.id} className="contents">
                      {/* Parent Category Row */}
                      <tr className="hover:bg-[#FAF8F5]/80 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200/60 overflow-hidden relative shrink-0 flex items-center justify-center">
                              {parent.img ? (
                                <Image
                                  src={parent.img}
                                  alt={parent.name}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <span className="text-[9px] text-gray-400 font-medium">No img</span>
                              )}
                            </div>
                            <span className="font-semibold text-brand-charcoal text-sm">
                              {parent.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-mono text-gray-500 text-xs">
                          {parent.slug}
                        </td>
                        <td className="py-4 px-6 text-center text-gray-600 font-medium">
                          {parent.order}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="inline-flex items-center gap-2 justify-end">
                            <button
                              onClick={() => openEditModal(parent)}
                              className="px-2.5 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:text-brand-charcoal transition-colors cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(parent.id, parent.name)}
                              className="px-2.5 py-1 text-xs font-medium text-red-600 bg-red-50/50 border border-red-100 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Sub-categories Rows */}
                      {children.map((sub) => (
                        <tr
                          key={sub.id}
                          className="hover:bg-[#FAF8F5]/50 transition-colors bg-[#FDFCFB]/40 group"
                        >
                          <td className="py-3 px-6">
                            <div className="flex items-center gap-3 pl-6">
                              {/* L-shaped connector icon */}
                              <span className="text-gray-300 font-mono text-xs select-none">└</span>
                              <div className="w-7 h-7 rounded-md bg-gray-100 border border-gray-200/60 overflow-hidden relative shrink-0 flex items-center justify-center">
                                {sub.img ? (
                                  <Image
                                    src={sub.img}
                                    alt={sub.name}
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  <span className="text-[8px] text-gray-400 font-medium">No img</span>
                                )}
                              </div>
                              <span className="text-gray-700 font-medium text-xs">
                                {sub.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-6 font-mono text-gray-400 text-xs pl-6">
                            {sub.slug}
                          </td>
                          <td className="py-3 px-6 text-center text-gray-500 text-xs">
                            {sub.order}
                          </td>
                          <td className="py-3 px-6 text-right">
                            <div className="inline-flex items-center gap-2 justify-end">
                              <button
                                onClick={() => openEditModal(sub)}
                                className="px-2 py-0.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(sub.id, sub.name)}
                                className="px-2 py-0.5 text-xs font-medium text-red-600 bg-red-50/50 border border-red-100 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </div>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: CARDS VIEW (PHOTO PREVIEW WITH LINK TO STORE) */}
      {viewMode === "cards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-3xl p-5 border border-[#EFECE6] shadow-xs flex flex-col justify-between hover:border-brand-gold hover:shadow-md transition-all group"
            >
              <div>
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-gray-100">
                  <Image
                    src={c.img || "/logo.png"}
                    alt={c.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {c.itemCount !== undefined && (
                    <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[11px] font-bold px-2.5 py-0.5 rounded-full text-brand-charcoal shadow-xs">
                      {c.itemCount} items
                    </span>
                  )}
                  {c.parentId && (
                    <span className="absolute top-3 left-3 bg-brand-charcoal/80 text-white text-[10px] font-medium px-2 py-0.5 rounded-full backdrop-blur-xs">
                      Sub-category
                    </span>
                  )}
                </div>

                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-heading text-lg font-bold text-brand-charcoal">
                    {c.name}
                  </h3>
                  <span className="text-[10px] font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-500">
                    Order: {c.order}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  {c.description || "Handcrafted artisanal design."}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href={`/portfolio?cat=${c.slug}`}
                  target="_blank"
                  className="text-xs text-[#9A7A2E] font-semibold flex items-center gap-1 hover:underline"
                >
                  View on Website <ExternalLink className="w-3 h-3" />
                </Link>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(c)}
                    className="p-1.5 text-gray-500 hover:text-brand-charcoal hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    title="Edit Category"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id, c.name)}
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD / EDIT CATEGORY MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in duration-200">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-brand-charcoal p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-1">
              {editingItem ? "Edit Category" : "Add New Category"}
            </h3>
            <p className="text-xs text-gray-500 mb-5">
              Configure name, hierarchy, slug and display order for your store catalog.
            </p>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-semibold text-gray-700">
              <div>
                <label className="block mb-1.5">Category Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Wedding Stationery"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#C9A84C] text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1.5">Slug (URL)</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="wedding-stationery"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#C9A84C] text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block mb-1.5">Display Order</label>
                  <input
                    type="number"
                    min={1}
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#C9A84C] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1.5">Parent Category (Optional)</label>
                <select
                  value={parentId}
                  onChange={(e) => setParentId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#C9A84C] text-xs bg-white"
                >
                  <option value="none">None (Top-Level Category)</option>
                  {parentCategories
                    .filter((p) => !editingItem || p.id !== editingItem.id)
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                </select>
                <p className="text-[10px] text-gray-400 mt-1 font-normal">
                  Selecting a parent category nests this as a sub-category in the table view.
                </p>
              </div>

              <div>
                <label className="block mb-1.5">Image Path / URL</label>
                <input
                  type="text"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  placeholder="/485184284_1103127648493148_4472142601649408182_n.jpg"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#C9A84C] text-xs font-mono"
                />
              </div>

              <div>
                <label className="block mb-1.5">Description</label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Short description of this category…"
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#C9A84C] text-xs font-normal"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-1/2 py-2.5 px-4 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 px-4 rounded-xl bg-[#C26B38] hover:bg-[#A95A2B] text-white text-xs font-semibold shadow-xs transition-colors"
                >
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
