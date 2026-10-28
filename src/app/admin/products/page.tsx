"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Edit2,
  Eye,
  EyeOff,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Filter,
} from "lucide-react";
import {
  AdminProduct,
  getAdminProducts,
  saveAdminProducts,
} from "@/lib/admin-store";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 15;

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState("");
  const [formBrand, setFormBrand] = useState("Resin Creations");
  const [formType, setFormType] = useState("Handcrafted");
  const [formVolume, setFormVolume] = useState("Bespoke Custom");
  const [formPrice, setFormPrice] = useState("");
  const [formOriginalPrice, setFormOriginalPrice] = useState("");
  const [formStock, setFormStock] = useState("15");
  const [formImage, setFormImage] = useState("/119202531_1391124051092241_3548837174143876601_n.jpg");

  useEffect(() => {
    setProducts(getAdminProducts());
  }, []);

  const handleToggleStatus = (id: string) => {
    const updated = products.map((p) =>
      p.id === id
        ? {
            ...p,
            status: (p.status === "active" ? "inactive" : "active") as AdminProduct["status"],
          }
        : p
    );
    setProducts(updated);
    saveAdminProducts(updated);
    toast.success("Product visibility updated");
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormTitle("");
    setFormBrand("Resin Creations");
    setFormType("Handcrafted");
    setFormVolume("Bespoke Custom");
    setFormPrice("");
    setFormOriginalPrice("");
    setFormStock("15");
    setShowAddModal(true);
  };

  const handleOpenEditModal = (p: AdminProduct) => {
    setEditingProduct(p);
    setFormTitle(p.title);
    setFormBrand(p.brand);
    setFormType(p.type);
    setFormVolume(p.volume);
    setFormPrice(String(p.price));
    setFormOriginalPrice(p.originalPrice ? String(p.originalPrice) : "");
    setFormStock(String(p.stock));
    setFormImage(p.image);
    setShowAddModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formPrice) {
      toast.error("Please provide title and price.");
      return;
    }

    if (editingProduct) {
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              title: formTitle,
              brand: formBrand,
              type: formType,
              volume: formVolume,
              price: Number(formPrice) || 0,
              originalPrice: formOriginalPrice ? Number(formOriginalPrice) : undefined,
              stock: Number(formStock) || 0,
            }
          : p
      );
      setProducts(updated);
      saveAdminProducts(updated);
      toast.success("Product updated successfully");
    } else {
      const newProd: AdminProduct = {
        id: `coll-${Date.now()}`,
        title: formTitle,
        brand: formBrand,
        type: formType,
        volume: formVolume,
        sku: `FCC-NEW-${Date.now().toString().slice(-4)}`,
        price: Number(formPrice) || 0,
        originalPrice: formOriginalPrice ? Number(formOriginalPrice) : undefined,
        stock: Number(formStock) || 0,
        status: "active",
        isFeatured: false,
        image: formImage,
      };
      const updated = [newProd, ...products];
      setProducts(updated);
      saveAdminProducts(updated);
      toast.success("Product added to catalog");
    }

    setShowAddModal(false);
  };

  // Get distinct categories
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.brand)))];

  // Filtering
  const filteredProducts = products.filter((p) => {
    const matchesCategory = categoryFilter === "All" || p.brand === categoryFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header matching Image 1 from user */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-serif text-3xl font-bold text-brand-charcoal">
            Products
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {products.length} products in catalog
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#9A7A2E] text-white text-xs font-bold hover:bg-[#856722] transition-colors shadow-2xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategoryFilter(cat);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? "bg-[#9A7A2E] text-white"
                  : "bg-white text-gray-600 border border-[#EFECE6] hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by title, SKU, or category..."
            className="w-full pl-9 pr-4 py-2 rounded-full border border-[#EFECE6] bg-white text-xs focus:outline-hidden focus:border-[#9A7A2E] text-brand-charcoal placeholder-gray-400"
          />
        </div>
      </div>

      {/* Table Container matching Image 3 with all website products */}
      <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EFECE6] bg-[#FAF9F5] text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-5">PRODUCT</th>
                <th className="py-3.5 px-5">BRAND / CATEGORY</th>
                <th className="py-3.5 px-5">TYPE</th>
                <th className="py-3.5 px-5">PRICE</th>
                <th className="py-3.5 px-5 text-center">STOCK</th>
                <th className="py-3.5 px-5 text-center">STATUS</th>
                <th className="py-3.5 px-5 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE6] text-xs">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400 font-semibold">
                    No products found matching your search.
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-[#FAF9F5] transition-colors">
                    {/* Thumbnail & Title */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden relative shrink-0 border border-gray-200">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-brand-charcoal text-xs">
                            {product.title}
                          </p>
                          <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                            {product.sku}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Brand / Category */}
                    <td className="py-4 px-5 font-medium text-gray-700">
                      {product.brand}
                    </td>

                    {/* Type badge */}
                    <td className="py-4 px-5">
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#FAF9F5] border border-gray-200 text-gray-600 text-[10px] font-bold uppercase tracking-wider">
                        {product.type}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-5">
                      <p className="font-bold font-heading tabular-nums text-brand-charcoal text-xs">
                        LKR {product.price.toLocaleString()}
                      </p>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <p className="text-[10px] text-gray-400 tabular-nums line-through">
                          LKR {product.originalPrice.toLocaleString()}
                        </p>
                      )}
                    </td>

                    {/* Stock count */}
                    <td className="py-4 px-5 text-center font-bold tabular-nums text-gray-700">
                      {product.stock}
                    </td>

                    {/* Status pill matching Image 3 */}
                    <td className="py-4 px-5 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          product.status === "active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-gray-100 text-gray-500 border border-gray-200"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-brand-charcoal hover:bg-gray-100 transition-colors"
                          title="Edit product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(product.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-brand-charcoal hover:bg-gray-100 transition-colors"
                          title={product.status === "active" ? "Hide from storefront" : "Show on storefront"}
                        >
                          {product.status === "active" ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-gray-300" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 bg-[#FAF9F5]">
            <span>
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of{" "}
              {filteredProducts.length} products
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-bold text-brand-charcoal px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-[#EFECE6] shadow-2xl overflow-hidden animate-fade-in">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#FAF9F5]">
              <h3 className="font-heading font-serif text-lg font-bold text-brand-charcoal">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Handcrafted Resin Creation #90"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EFECE6] focus:outline-hidden focus:border-[#9A7A2E] text-brand-charcoal"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category / Collection</label>
                  <select
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFECE6] focus:outline-hidden focus:border-[#9A7A2E] text-brand-charcoal bg-white"
                  >
                    <option value="Resin Creations">Resin Creations</option>
                    <option value="Wedding Invitations">Wedding Invitations</option>
                    <option value="Cake Boxes">Cake Boxes</option>
                    <option value="Custom Frames">Custom Frames</option>
                    <option value="Resin Keychains">Resin Keychains</option>
                    <option value="Gift Boxes">Gift Boxes</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Type / Craft Style</label>
                  <input
                    type="text"
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    placeholder="e.g. Epoxy Art, Card Suite"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFECE6] focus:outline-hidden focus:border-[#9A7A2E] text-brand-charcoal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Price (LKR)</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="1200"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFECE6] focus:outline-hidden focus:border-[#9A7A2E] text-brand-charcoal"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Stock Qty</label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    placeholder="15"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFECE6] focus:outline-hidden focus:border-[#9A7A2E] text-brand-charcoal"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Original Price (optional for sale display)</label>
                <input
                  type="number"
                  value={formOriginalPrice}
                  onChange={(e) => setFormOriginalPrice(e.target.value)}
                  placeholder="e.g. 1500"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EFECE6] focus:outline-hidden focus:border-[#9A7A2E] text-brand-charcoal"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#9A7A2E] text-white font-bold hover:bg-[#856722] shadow-2xs"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
