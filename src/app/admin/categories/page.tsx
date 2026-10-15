"use client";

import { useState } from "react";
import Image from "next/image";
import { Layers, Plus, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const initialCategories = [
  {
    id: "cat-1",
    name: "Resin Creations",
    slug: "resin-creations",
    itemCount: 18,
    img: "/485184284_1103127648493148_4472142601649408182_n.jpg",
    description: "Coasters, ocean wave wall decor, floral resin slabs, customized trays",
  },
  {
    id: "cat-2",
    name: "Resin Keychains",
    slug: "keychains",
    itemCount: 26,
    img: "/542752181_1238639424941969_1583669488507158905_n.jpg",
    description: "Personalized alphabet letters, glitter pendants, hearts & custom names",
  },
  {
    id: "cat-3",
    name: "Wedding Invitations",
    slug: "wedding-invitations",
    itemCount: 14,
    img: "/468396156_2478270609044241_1138043242894587302_n.jpg",
    description: "Custom romantic suites, envelopes, wax seals, floral stationery",
  },
  {
    id: "cat-4",
    name: "Cake Boxes",
    slug: "cake-boxes",
    itemCount: 16,
    img: "/484074106_1098277412311505_6713907112004454121_n.jpg",
    description: "Embossed gold rose boxes, ribbon wraps, wedding cake packaging",
  },
  {
    id: "cat-5",
    name: "Custom Frames",
    slug: "custom-frames",
    itemCount: 12,
    img: "/529179520_1214465350692710_3362134301413191237_n.jpg",
    description: "Anniversary LED shadow boxes, memory frames with resin lettering",
  },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const newCat = {
      id: `cat-${categories.length + 1}`,
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      itemCount: 0,
      img: "/logo.png",
      description: desc || "Handcrafted collection",
    };
    setCategories([...categories, newCat]);
    setShowAdd(false);
    setName("");
    setDesc("");
    toast.success("Category added successfully!");
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6 bg-[#FBF9F5] min-h-screen">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-brand-charcoal">
            Categories Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Organize products and portfolio collections for 1st Class Creative.
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="btn-primary !py-2.5 !px-4 text-xs font-semibold shadow-xs"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-3xl p-5 border border-[#EFECE6] shadow-xs flex flex-col justify-between hover:border-brand-gold transition-all"
          >
            <div>
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-gray-100">
                <Image src={c.img} alt={c.name} fill className="object-cover" />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[10px] font-bold px-2 py-0.5 rounded-full text-brand-charcoal">
                  {c.itemCount} items
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-1">
                {c.name}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                {c.description}
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
              <Link
                href={`/admin/products`}
                className="text-xs text-gray-400 hover:text-brand-charcoal font-medium"
              >
                Manage Items →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowAdd(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-brand-charcoal text-sm"
            >
              ✕
            </button>
            <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-4">
              New Category
            </h3>
            <form onSubmit={handleAdd} className="space-y-4 text-xs font-bold text-gray-600">
              <div>
                <label className="block mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Wedding Gift Hampers"
                  className="form-input text-xs"
                />
              </div>
              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Short description of this category…"
                  className="form-input text-xs min-h-[80px]"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="btn-primary w-full justify-center text-xs">
                  Save Category
                </button>
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="btn-secondary w-full justify-center text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
