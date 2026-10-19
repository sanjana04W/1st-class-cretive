"use client";

import { useState, useEffect } from "react";
import {
  Boxes,
  AlertTriangle,
  Plus,
  Minus,
  PackagePlus,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  AdminProduct,
  getAdminProducts,
  saveAdminProducts,
  INITIAL_STOCK_ALERTS,
} from "@/lib/admin-store";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 15;

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [stockAlerts] = useState(INITIAL_STOCK_ALERTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setProducts(getAdminProducts());
  }, []);

  const handleAdjustStock = (id: string, delta: number) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        const newStock = Math.max(0, p.stock + delta);
        return { ...p, stock: newStock };
      }
      return p;
    });
    setProducts(updated);
    saveAdminProducts(updated);
    const prod = updated.find((p) => p.id === id);
    toast.success(`Updated stock for ${prod?.title}: ${prod?.stock}`);
  };

  const handleRestock = (id: string) => {
    handleAdjustStock(id, 10);
  };

  const filtered = products.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header matching Image 5 */}
      <div>
        <h1 className="font-heading font-serif text-3xl font-bold text-brand-charcoal">
          Inventory Management
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Real-time stock levels across all {products.length} products and variants
        </p>
      </div>

      {/* Stock Alerts Box matching Image 5 */}
      <div className="bg-[#FFF5F5] border border-rose-200 rounded-2xl p-5 shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <h3 className="font-heading font-serif text-sm font-bold text-rose-700">
            Stock Alerts
          </h3>
        </div>

        <div className="divide-y divide-rose-100">
          {stockAlerts.map((item) => (
            <div
              key={item.id}
              className="py-2.5 flex items-center justify-between first:pt-0 last:pb-0"
            >
              <p className="text-xs font-semibold text-gray-700">
                {item.name}
              </p>
              <span className="text-xs font-bold text-rose-600">
                Only {item.left} left
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-end">
        <div className="relative min-w-[240px] md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search SKU or product..."
            className="w-full pl-9 pr-4 py-2 rounded-full border border-[#EFECE6] bg-white text-xs focus:outline-hidden focus:border-[#9A7A2E] text-brand-charcoal placeholder-gray-400"
          />
        </div>
      </div>

      {/* Inventory Table matching Image 5 */}
      <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EFECE6] bg-[#FAF9F5] text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-5">PRODUCT</th>
                <th className="py-3.5 px-5">SKU</th>
                <th className="py-3.5 px-5">SIZE / TYPE</th>
                <th className="py-3.5 px-5 text-center">STOCK</th>
                <th className="py-3.5 px-5 text-center">ADJUST</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE6] text-xs">
              {paginated.map((product) => (
                <tr key={product.id} className="hover:bg-[#FAF9F5] transition-colors">
                  {/* Product title & formulation */}
                  <td className="py-4 px-5">
                    <p className="font-bold text-brand-charcoal text-xs">
                      {product.title}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {product.brand} • {product.type}
                    </p>
                  </td>

                  {/* SKU */}
                  <td className="py-4 px-5 font-mono text-gray-600 text-xs">
                    {product.sku}
                  </td>

                  {/* Size */}
                  <td className="py-4 px-5 font-medium text-gray-700">
                    {product.volume}
                  </td>

                  {/* Stock count in bold green text */}
                  <td className="py-4 px-5 text-center font-bold tabular-nums text-emerald-600 text-sm">
                    {product.stock}
                  </td>

                  {/* Adjust buttons matching Image 5 */}
                  <td className="py-4 px-5 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* Decrement button [-] */}
                      <button
                        onClick={() => handleAdjustStock(product.id, -1)}
                        className="w-7 h-7 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors"
                        title="Reduce stock"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      {/* Increment button [+] */}
                      <button
                        onClick={() => handleAdjustStock(product.id, 1)}
                        className="w-7 h-7 rounded-lg border border-emerald-200 text-emerald-600 hover:bg-emerald-50 flex items-center justify-center transition-colors"
                        title="Increase stock"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>

                      {/* Quick Restock [📦] */}
                      <button
                        onClick={() => handleRestock(product.id)}
                        className="w-7 h-7 rounded-lg border border-[#E9DFCE] text-[#8C6D27] hover:bg-[#FAF5E8] flex items-center justify-center transition-colors"
                        title="Quick restock (+10)"
                      >
                        <PackagePlus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 bg-[#FAF9F5]">
            <span>
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
              {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} items
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
    </div>
  );
}
