"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Edit2, Eye, Search, Filter } from "lucide-react";
import {
  AdminProduct,
  getAdminProducts,
  saveAdminProducts,
} from "@/lib/admin-store";
import toast from "react-hot-toast";

export default function AdminFeaturedProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFeaturedOnly, setFilterFeaturedOnly] = useState(false);

  useEffect(() => {
    setProducts(getAdminProducts());
  }, []);

  const handleToggleFeatured = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, isFeatured: !p.isFeatured } : p
    );
    setProducts(updated);
    saveAdminProducts(updated);
    const target = updated.find((p) => p.id === id);
    if (target?.isFeatured) {
      toast.success(`"${target.title}" added to Homepage Featured`);
    } else {
      toast(`"${target?.title}" set to Standard`, { icon: "ℹ️" });
    }
  };

  const featuredCount = products.filter((p) => p.isFeatured).length;

  const filtered = products.filter((p) => {
    const matchesFeatured = filterFeaturedOnly ? p.isFeatured : true;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q);
    return matchesFeatured && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header matching Image 4 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-serif text-3xl font-bold text-brand-charcoal">
            Featured Products
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Curate handpicked creations displayed on the storefront homepage
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF3E0] border border-[#DEC47F] text-[#8C6D27] text-xs font-bold shrink-0 shadow-2xs">
          <Star className="w-4 h-4 fill-[#8C6D27] text-[#8C6D27]" />
          <span>{featuredCount} Featured Items</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterFeaturedOnly(false)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
              !filterFeaturedOnly
                ? "bg-[#9A7A2E] text-white"
                : "bg-white text-gray-600 border border-[#EFECE6] hover:bg-gray-50"
            }`}
          >
            All Products ({products.length})
          </button>
          <button
            onClick={() => setFilterFeaturedOnly(true)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
              filterFeaturedOnly
                ? "bg-[#9A7A2E] text-white"
                : "bg-white text-gray-600 border border-[#EFECE6] hover:bg-gray-50"
            }`}
          >
            Featured Only ({featuredCount})
          </button>
        </div>

        <div className="relative min-w-[240px] md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2 rounded-full border border-[#EFECE6] bg-white text-xs focus:outline-hidden focus:border-[#9A7A2E] text-brand-charcoal placeholder-gray-400"
          />
        </div>
      </div>

      {/* Table matching Image 4 with real website products */}
      <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EFECE6] bg-[#FAF9F5] text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-5 text-center w-16">FEATURED</th>
                <th className="py-3.5 px-5">PRODUCT</th>
                <th className="py-3.5 px-5">BRAND / CATEGORY</th>
                <th className="py-3.5 px-5">PRICE</th>
                <th className="py-3.5 px-5 text-center">BADGE</th>
                <th className="py-3.5 px-5 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE6] text-xs">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-[#FAF9F5] transition-colors">
                  {/* Featured star toggle matching Image 4 */}
                  <td className="py-4 px-5 text-center">
                    <button
                      onClick={() => handleToggleFeatured(product.id)}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                        product.isFeatured
                          ? "bg-[#FAF3E0] border border-[#DEC47F] text-[#8C6D27]"
                          : "bg-gray-50 border border-gray-200 text-gray-300 hover:text-gray-400"
                      }`}
                      title="Toggle Homepage Featured"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          product.isFeatured ? "fill-[#8C6D27] text-[#8C6D27]" : "text-gray-400"
                        }`}
                      />
                    </button>
                  </td>

                  {/* Product thumbnail + title + subtitle */}
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

                  {/* Price */}
                  <td className="py-4 px-5 font-bold font-heading tabular-nums text-brand-charcoal text-xs">
                    LKR {product.price.toLocaleString()}
                  </td>

                  {/* Badge matching Image 4 */}
                  <td className="py-4 px-5 text-center">
                    {product.isFeatured ? (
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-[#FAF3E0] text-[#8C6D27] border border-[#DEC47F]">
                        Homepage Featured
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-gray-400">
                        Standard
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-center">
                    <div className="flex items-center justify-center gap-2 text-gray-400">
                      <button className="hover:text-brand-charcoal p-1" title="Edit">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button className="hover:text-brand-charcoal p-1" title="View details">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
