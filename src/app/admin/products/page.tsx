"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  Filter,
  Trash2,
  Edit2,
  RefreshCw,
  Check,
  X,
  Upload,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { collectionItems } from "@/lib/portfolio-data";

export interface ProductRecord {
  id: string;
  sku: string;
  title: string;
  slug: string;
  category: string;
  subCategory?: string;
  price: number;
  salePrice?: number;
  stock: number;
  lowStockThreshold: number;
  weightGrams: number;
  leadTimeDays: number;
  allowBackorder: boolean;
  madeToOrder: boolean;
  isFeatured: boolean;
  status: "Active" | "Draft" | "Archived";
  image: string;
}

const defaultProducts: ProductRecord[] = [
  {
    id: "prod-1",
    sku: "FCC-011",
    title: "Rose Petal Resin Keepsake Sachet",
    slug: "rose-petal-resin-keepsake-sachet",
    category: "Resin Creations",
    subCategory: "Keepsakes & Trays",
    price: 560,
    salePrice: 560,
    stock: 45,
    lowStockThreshold: 5,
    weightGrams: 45,
    leadTimeDays: 6,
    allowBackorder: true,
    madeToOrder: true,
    isFeatured: true,
    status: "Active",
    image: "/485184284_1103127648493148_4472142601649408182_n.jpg",
  },
  {
    id: "prod-2",
    sku: "FCC-010",
    title: "Glitter Letter Personalized Keychain",
    slug: "glitter-letter-personalized-keychain",
    category: "Keychains",
    subCategory: "Alphabet Letters",
    price: 800,
    salePrice: 800,
    stock: 56,
    lowStockThreshold: 10,
    weightGrams: 25,
    leadTimeDays: 3,
    allowBackorder: true,
    madeToOrder: false,
    isFeatured: true,
    status: "Active",
    image: "/484810488_1103650881774158_3999044029988274536_n.jpg",
  },
  {
    id: "prod-3",
    sku: "FCC-009",
    title: "Personalized Letter Keychains (Party Pack)",
    slug: "personalized-letter-keychains-pack",
    category: "Keychains",
    subCategory: "Gift Bundles",
    price: 1050,
    salePrice: 1050,
    stock: 34,
    lowStockThreshold: 5,
    weightGrams: 90,
    leadTimeDays: 4,
    allowBackorder: false,
    madeToOrder: true,
    isFeatured: true,
    status: "Active",
    image: "/542752181_1238639424941969_1583669488507158905_n.jpg",
  },
  {
    id: "prod-4",
    sku: "FCC-008",
    title: "Golden Rose Luxury Embossed Cake Box",
    slug: "golden-rose-luxury-embossed-cake-box",
    category: "Cake Boxes",
    subCategory: "Wedding Cake Boxes",
    price: 750,
    salePrice: 750,
    stock: 46,
    lowStockThreshold: 15,
    weightGrams: 60,
    leadTimeDays: 5,
    allowBackorder: true,
    madeToOrder: true,
    isFeatured: false,
    status: "Active",
    image: "/484074106_1098277412311505_6713907112004454121_n.jpg",
  },
  {
    id: "prod-5",
    sku: "FCC-007",
    title: "Peach Blossom Custom Wedding Invitation Suite",
    slug: "peach-blossom-custom-wedding-invitation-suite",
    category: "Wedding Invitations",
    subCategory: "Romantic Suites",
    price: 350,
    salePrice: 350,
    stock: 120,
    lowStockThreshold: 50,
    weightGrams: 30,
    leadTimeDays: 7,
    allowBackorder: true,
    madeToOrder: true,
    isFeatured: true,
    status: "Active",
    image: "/468396156_2478270609044241_1138043242894587302_n.jpg",
  },
  {
    id: "prod-6",
    sku: "FCC-006",
    title: "Anniversary Custom Shadow Frame with Micro LEDs",
    slug: "anniversary-custom-shadow-frame-with-micro-leds",
    category: "Custom Frames",
    subCategory: "Illuminated Frames",
    price: 4850,
    salePrice: 4850,
    stock: 12,
    lowStockThreshold: 2,
    weightGrams: 420,
    leadTimeDays: 7,
    allowBackorder: false,
    madeToOrder: true,
    isFeatured: true,
    status: "Active",
    image: "/529179520_1214465350692710_3362134301413191237_n.jpg",
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductRecord[]>(defaultProducts);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [editingProduct, setEditingProduct] = useState<ProductRecord | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form field states
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formSku, setFormSku] = useState("");
  const [formCategory, setFormCategory] = useState("Resin Creations");
  const [formSubCategory, setFormSubCategory] = useState("");
  const [formStatus, setFormStatus] = useState<"Active" | "Draft" | "Archived">("Active");
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formPrice, setFormPrice] = useState("0");
  const [formSalePrice, setFormSalePrice] = useState("0");
  const [formStock, setFormStock] = useState("0");
  const [formLowStock, setFormLowStock] = useState("5");
  const [formWeight, setFormWeight] = useState("45");
  const [formLeadTime, setFormLeadTime] = useState("6");
  const [formAllowBackorder, setFormAllowBackorder] = useState(false);
  const [formMadeToOrder, setFormMadeToOrder] = useState(true);
  const [formImage, setFormImage] = useState("/logo.png");
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaPickerSearch, setMediaPickerSearch] = useState("");

  const openEditor = (prod: ProductRecord) => {
    setIsCreating(false);
    setEditingProduct(prod);
    setFormTitle(prod.title);
    setFormSlug(prod.slug);
    setFormSku(prod.sku);
    setFormCategory(prod.category);
    setFormSubCategory(prod.subCategory || "");
    setFormStatus(prod.status);
    setFormIsFeatured(prod.isFeatured);
    setFormPrice(String(prod.price));
    setFormSalePrice(String(prod.salePrice ?? prod.price));
    setFormStock(String(prod.stock));
    setFormLowStock(String(prod.lowStockThreshold));
    setFormWeight(String(prod.weightGrams));
    setFormLeadTime(String(prod.leadTimeDays));
    setFormAllowBackorder(prod.allowBackorder);
    setFormMadeToOrder(prod.madeToOrder);
    setFormImage(prod.image);
  };

  const openCreateNew = () => {
    setIsCreating(true);
    setEditingProduct({} as ProductRecord);
    setFormTitle("");
    setFormSlug("");
    setFormSku(`FCC-0${products.length + 12}`);
    setFormCategory("Resin Creations");
    setFormSubCategory("");
    setFormStatus("Active");
    setFormIsFeatured(false);
    setFormPrice("1000");
    setFormSalePrice("1000");
    setFormStock("20");
    setFormLowStock("5");
    setFormWeight("50");
    setFormLeadTime("5");
    setFormAllowBackorder(false);
    setFormMadeToOrder(true);
    setFormImage("/logo.png");
  };

  const generateSlug = () => {
    if (!formTitle) return;
    const s = formTitle
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFormSlug(s);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      toast.error("Please enter a product title.");
      return;
    }

    const updatedData: ProductRecord = {
      id: isCreating ? `prod-${Date.now()}` : editingProduct!.id,
      sku: formSku || `FCC-${Math.floor(100 + Math.random() * 900)}`,
      title: formTitle.trim(),
      slug: formSlug || formTitle.toLowerCase().replace(/\s+/g, "-"),
      category: formCategory,
      subCategory: formSubCategory,
      price: Number(formPrice) || 0,
      salePrice: Number(formSalePrice) || Number(formPrice) || 0,
      stock: Number(formStock) || 0,
      lowStockThreshold: Number(formLowStock) || 5,
      weightGrams: Number(formWeight) || 0,
      leadTimeDays: Number(formLeadTime) || 0,
      allowBackorder: formAllowBackorder,
      madeToOrder: formMadeToOrder,
      isFeatured: formIsFeatured,
      status: formStatus,
      image: formImage,
    };

    if (isCreating) {
      setProducts([updatedData, ...products]);
      toast.success("New product created successfully!");
    } else {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct!.id ? updatedData : p))
      );
      toast.success("Product details updated successfully!");
    }
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted.");
    }
  };

  const filtered = products.filter((p) => {
    const matchCat = filterCategory === "All" || p.category === filterCategory;
    const q = search.toLowerCase();
    const matchSearch =
      p.title.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6 bg-[#FBF9F5] min-h-screen">
      {/* View Header */}
      {!editingProduct ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl font-bold text-brand-charcoal">
                Products Catalog
              </h1>
              <p className="text-gray-500 text-xs mt-1">
                Manage your handcrafted resin items, invitations, cake boxes, prices, and inventory.
              </p>
            </div>
            <button
              onClick={openCreateNew}
              className="btn-primary !py-2.5 !px-5 text-xs font-semibold shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> + New Product
            </button>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="bg-white rounded-2xl p-3 border border-[#EFECE6] flex flex-wrap gap-3 items-center justify-between shadow-xs">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by title, SKU, or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs pl-9 pr-4 py-1.5 outline-none bg-transparent"
              />
            </div>
            <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="text-xs bg-transparent outline-none font-semibold text-gray-600 cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Resin Creations">Resin Creations</option>
                <option value="Keychains">Keychains</option>
                <option value="Wedding Invitations">Wedding Invitations</option>
                <option value="Cake Boxes">Cake Boxes</option>
                <option value="Custom Frames">Custom Frames</option>
              </select>
            </div>
          </div>

          {/* Products Table (Matches Flamira Reference Image 2: IMAGE | TITLE | SKU | CATEGORY | PRICE | STOCK | STATUS | ACTIONS) */}
          <div className="bg-white rounded-3xl border border-[#EFECE6] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF9F6] uppercase text-gray-400 font-semibold text-[10px] tracking-wider border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">IMAGE</th>
                    <th className="px-6 py-4">TITLE</th>
                    <th className="px-6 py-4">SKU</th>
                    <th className="px-6 py-4">CATEGORY</th>
                    <th className="px-6 py-4">PRICE</th>
                    <th className="px-6 py-4">STOCK</th>
                    <th className="px-6 py-4">STATUS</th>
                    <th className="px-6 py-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {filtered.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-amber-50/20 transition-colors group"
                    >
                      {/* Image Thumbnail */}
                      <td className="px-6 py-3.5">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-2xs">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>

                      {/* Title */}
                      <td className="px-6 py-3.5 font-bold text-brand-charcoal text-xs max-w-xs">
                        <div className="flex items-center gap-1.5">
                          <span>{item.title}</span>
                          {item.isFeatured && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-100 text-[#9A7A2E] font-bold">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="px-6 py-3.5 font-mono text-gray-500 text-[11px]">
                        {item.sku}
                      </td>

                      {/* Category */}
                      <td className="px-6 py-3.5 text-gray-600">
                        {item.category}
                      </td>

                      {/* Price (With strike-through original if on sale, exactly like Flamira screenshot) */}
                      <td className="px-6 py-3.5">
                        <div className="leading-tight">
                          <p className="font-bold text-brand-charcoal">
                            Rs. {item.price.toLocaleString()}
                          </p>
                          {item.salePrice && item.salePrice < item.price ? (
                            <p className="text-[10px] text-gray-400 line-through">
                              Rs. {item.salePrice.toLocaleString()}
                            </p>
                          ) : (
                            <p className="text-[10px] text-gray-400">
                              Rs. {item.price.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Stock */}
                      <td className="px-6 py-3.5 font-semibold text-gray-700">
                        {item.stock}
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-3.5">
                        <span
                          className={cn(
                            "px-2.5 py-0.5 rounded-full text-[10px] font-bold",
                            item.status === "Active"
                              ? "bg-[#E6F8F0] text-[#1B8054]"
                              : "bg-gray-100 text-gray-600"
                          )}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* Actions: Edit & Delete (Matches Flamira Screenshot 2) */}
                      <td className="px-6 py-3.5 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => openEditor(item)}
                            className="px-3 py-1 rounded-md border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-2xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(item.id, item.title)}
                            className="px-3 py-1 rounded-md border border-rose-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors shadow-2xs"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Edit Product Full Page Layout (Matches Flamira Reference Image 3: Basic Info, Pricing & Inventory, Images) */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="p-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors shadow-2xs"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <h1 className="font-heading text-3xl font-bold text-brand-charcoal">
                  {isCreating ? "New Product" : "Edit Product"}
                </h1>
              </div>
              <p className="text-gray-500 text-xs mt-1 ml-8">
                {isCreating
                  ? "Add a new product to your 1st Class Creative store catalog."
                  : "Update the product details below."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveProduct} className="space-y-6">
            {/* Box 1: Basic Information */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFECE6] shadow-xs space-y-5">
              <h3 className="font-heading text-base font-bold text-brand-charcoal">
                Basic Information
              </h3>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  TITLE *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Rose Petal Resin Keepsake"
                  className="w-full text-xs px-4 py-2.5 border border-gray-200 rounded-xl bg-white shadow-2xs outline-none focus:border-brand-gold"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    SLUG *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formSlug}
                      onChange={(e) => setFormSlug(e.target.value)}
                      placeholder="rose-petal-resin-keepsake"
                      className="w-full text-xs px-4 py-2.5 border border-gray-200 rounded-xl bg-white shadow-2xs outline-none focus:border-brand-gold font-mono"
                    />
                    <button
                      type="button"
                      onClick={generateSlug}
                      className="px-3 py-2 border border-gray-200 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-semibold text-gray-600 transition-colors whitespace-nowrap shadow-2xs"
                    >
                      Regenerate
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    SKU *
                  </label>
                  <input
                    type="text"
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    placeholder="FCC-011"
                    className="w-full text-xs px-4 py-2.5 border border-gray-200 rounded-xl bg-white shadow-2xs outline-none focus:border-brand-gold font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    CATEGORY *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl bg-white shadow-2xs outline-none focus:border-brand-gold cursor-pointer"
                  >
                    <option value="Resin Creations">Resin Creations</option>
                    <option value="Keychains">Keychains</option>
                    <option value="Wedding Invitations">Wedding Invitations</option>
                    <option value="Cake Boxes">Cake Boxes</option>
                    <option value="Custom Frames">Custom Frames</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    SUB-CATEGORY (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={formSubCategory}
                    onChange={(e) => setFormSubCategory(e.target.value)}
                    placeholder="e.g. Alphabet Letters, Coasters"
                    className="w-full text-xs px-4 py-2.5 border border-gray-200 rounded-xl bg-white shadow-2xs outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center pt-2">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    STATUS
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl bg-white shadow-2xs outline-none focus:border-brand-gold cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    IS FEATURED
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer pt-1 text-xs font-semibold text-gray-700">
                    <input
                      type="checkbox"
                      checked={formIsFeatured}
                      onChange={(e) => setFormIsFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-brand-gold focus:ring-brand-gold accent-[#C9A84C]"
                    />
                    <span>Show in Best Sellers / Featured section</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Box 2: Pricing & Inventory (Matches Flamira Screenshot 3 exactly) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFECE6] shadow-xs space-y-5">
              <h3 className="font-heading text-base font-bold text-brand-charcoal">
                Pricing & Inventory
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    PRICE (RS.) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full text-xs px-4 py-2.5 border border-gray-200 rounded-xl bg-white shadow-2xs outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    SALE PRICE (RS.) — OPTIONAL
                  </label>
                  <input
                    type="number"
                    value={formSalePrice}
                    onChange={(e) => setFormSalePrice(e.target.value)}
                    className="w-full text-xs px-4 py-2.5 border border-gray-200 rounded-xl bg-white shadow-2xs outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    STOCK QUANTITY
                  </label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    className="w-full text-xs px-4 py-2.5 border border-gray-200 rounded-xl bg-white shadow-2xs outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    LOW STOCK THRESHOLD
                  </label>
                  <input
                    type="number"
                    value={formLowStock}
                    onChange={(e) => setFormLowStock(e.target.value)}
                    className="w-full text-xs px-4 py-2.5 border border-gray-200 rounded-xl bg-white shadow-2xs outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    WEIGHT (GRAMS)
                  </label>
                  <input
                    type="number"
                    value={formWeight}
                    onChange={(e) => setFormWeight(e.target.value)}
                    className="w-full text-xs px-4 py-2.5 border border-gray-200 rounded-xl bg-white shadow-2xs outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                    <input
                      type="checkbox"
                      checked={formAllowBackorder}
                      onChange={(e) => setFormAllowBackorder(e.target.checked)}
                      className="w-4 h-4 rounded text-brand-gold accent-[#C9A84C]"
                    />
                    <span>Allow Backorder</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                    <input
                      type="checkbox"
                      checked={formMadeToOrder}
                      onChange={(e) => setFormMadeToOrder(e.target.checked)}
                      className="w-4 h-4 rounded text-brand-gold accent-[#C9A84C]"
                    />
                    <span>Made to Order</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    LEAD TIME (DAYS)
                  </label>
                  <input
                    type="number"
                    value={formLeadTime}
                    onChange={(e) => setFormLeadTime(e.target.value)}
                    className="w-full text-xs px-4 py-2.5 border border-gray-200 rounded-xl bg-white shadow-2xs outline-none focus:border-brand-gold"
                  />
                </div>
              </div>
            </div>

            {/* Box 3: Images */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFECE6] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-base font-bold text-brand-charcoal">
                  Product Media
                </h3>
                <button
                  type="button"
                  onClick={() => setShowMediaPicker(true)}
                  className="px-3.5 py-1.5 rounded-xl border border-[#9A7A2E]/30 bg-[#FBF9F5] hover:bg-[#F5EEDC] text-[#9A7A2E] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Choose from Collection ({collectionItems.length})</span>
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-gray-200 shadow-xs bg-gray-50 shrink-0">
                  <Image
                    src={formImage}
                    alt={formTitle || "Product preview"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1.5 flex-1 max-w-md">
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">
                    IMAGE PATH OR URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="/485184284_1103127648493148_4472142601649408182_n.jpg"
                      className="w-full text-xs px-4 py-2 border border-gray-200 rounded-xl bg-white shadow-2xs outline-none focus:border-brand-gold font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowMediaPicker(true)}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 rounded-xl whitespace-nowrap"
                    >
                      Browse
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400">
                    Directly connected to all {collectionItems.length} studio images in your /public directory.
                  </p>
                </div>
              </div>
            </div>

            {/* Media Picker Modal */}
            {showMediaPicker && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl relative max-h-[85vh] flex flex-col">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div>
                      <h4 className="font-heading text-lg font-bold text-brand-charcoal">
                        Select from Collection Images
                      </h4>
                      <p className="text-xs text-gray-500">
                        {collectionItems.length} handcrafted images available
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowMediaPicker(false)}
                      className="text-gray-400 hover:text-brand-charcoal p-1 rounded-full hover:bg-gray-100"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="my-3">
                    <input
                      type="text"
                      placeholder="Search collection images by title or filename…"
                      value={mediaPickerSearch}
                      onChange={(e) => setMediaPickerSearch(e.target.value)}
                      className="w-full text-xs px-3.5 py-2 rounded-xl border border-gray-200 outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="flex-1 overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 p-1">
                    {collectionItems
                      .filter(
                        (i) =>
                          i.title.toLowerCase().includes(mediaPickerSearch.toLowerCase()) ||
                          i.src.toLowerCase().includes(mediaPickerSearch.toLowerCase())
                      )
                      .map((item) => {
                        const isSelected = formImage === item.src;
                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              setFormImage(item.src);
                              setShowMediaPicker(false);
                              toast.success("Image selected from collection!");
                            }}
                            className={cn(
                              "group relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all",
                              isSelected
                                ? "border-[#C9A84C] ring-2 ring-[#C9A84C]/30 shadow-md"
                                : "border-gray-200 hover:border-[#9A7A2E]"
                            )}
                          >
                            <Image
                              src={item.src}
                              alt={item.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                              sizes="120px"
                            />
                            {isSelected && (
                              <div className="absolute top-1 right-1 bg-[#C9A84C] text-white p-0.5 rounded-full">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <p className="text-[9px] text-white truncate font-medium">{item.title}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowMediaPicker(false)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs font-semibold rounded-xl text-gray-700"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-5 py-2.5 border border-gray-200 bg-white hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary !py-2.5 !px-7 text-xs font-semibold shadow-xs"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
