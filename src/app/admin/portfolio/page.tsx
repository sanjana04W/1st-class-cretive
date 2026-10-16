"use client";

import Image from "next/image";
import { collectionItems, categoryLabels, type CollectionCategory, type CollectionItem } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Search, ExternalLink, Sparkles, Filter, Copy, Check, Eye } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminCollectionPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = collectionItems.filter((item) => {
    const matchCat = filter === "all" || item.category === filter;
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.alt.toLowerCase().includes(search.toLowerCase()) ||
      item.src.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const categories = [
    "all",
    "resin-creations",
    "keychains",
    "wedding-invitations",
    "cake-boxes",
    "custom-frames",
    "gift-boxes",
  ];

  const handleCopyPath = (src: string, id: string) => {
    navigator.clipboard.writeText(src);
    setCopiedId(id);
    toast.success("Image path copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6 bg-[#FBF9F5] min-h-screen">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-3xl font-bold text-brand-charcoal">
              Collection Gallery
            </h1>
            <span className="bg-[#9A7A2E]/10 text-[#9A7A2E] text-xs font-bold px-2.5 py-0.5 rounded-full">
              {collectionItems.length} Images Connected
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Browse and manage all {collectionItems.length} handcrafted collection photos connected from your local media storage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/portfolio"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-brand-charcoal text-xs font-semibold shadow-xs transition-colors"
          >
            <Eye className="w-4 h-4 text-gray-500" />
            <span>View Public Collection</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </Link>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white rounded-2xl shadow-xs border border-[#EFECE6] p-4 flex flex-wrap gap-3 items-center justify-between">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search collection by title, description or filename…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-[#C9A84C]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs bg-white text-brand-charcoal focus:outline-hidden focus:border-[#C9A84C]"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All Categories" : categoryLabels[c as CollectionCategory]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 px-1">
        <span>Showing {filtered.length} of {collectionItems.length} collection items</span>
        {filter !== "all" && (
          <button
            onClick={() => setFilter("all")}
            className="text-[#9A7A2E] font-medium hover:underline"
          >
            Reset Filter
          </button>
        )}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl border border-[#EFECE6] shadow-xs overflow-hidden hover:border-[#C9A84C] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div
              className="relative aspect-square cursor-pointer overflow-hidden bg-gray-100"
              onClick={() => setSelectedItem(item)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
              />
              {item.featured && (
                <span className="absolute top-2 right-2 bg-[#C9A84C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Featured
                </span>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white/90 text-brand-charcoal text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Eye className="w-3.5 h-3.5" /> Preview
                </span>
              </div>
            </div>

            <div className="p-3">
              <p className="text-xs font-bold text-brand-charcoal truncate" title={item.title}>
                {item.title}
              </p>
              <p className="text-[11px] text-[#9A7A2E] font-semibold mt-0.5">
                {categoryLabels[item.category as CollectionCategory]}
              </p>

              <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between gap-1">
                <span className="text-[10px] font-mono text-gray-400 truncate flex-1" title={item.src}>
                  {item.src.replace("/", "")}
                </span>
                <button
                  onClick={() => handleCopyPath(item.src, item.id)}
                  title="Copy image relative path"
                  className="p-1 text-gray-400 hover:text-brand-charcoal hover:bg-gray-100 rounded transition-colors"
                >
                  {copiedId === item.id ? (
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-400 text-sm font-medium">No collection items match your search.</p>
        </div>
      )}

      {/* Lightbox / Item Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video sm:aspect-[4/3] bg-black">
              <Image
                src={selectedItem.src}
                alt={selectedItem.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#9A7A2E] uppercase tracking-wider">
                    {categoryLabels[selectedItem.category as CollectionCategory]}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-brand-charcoal mt-1">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{selectedItem.alt}</p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 text-gray-400 hover:text-brand-charcoal rounded-full hover:bg-gray-100 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                <span className="text-xs font-mono text-gray-600 truncate mr-2">
                  {selectedItem.src}
                </span>
                <button
                  onClick={() => handleCopyPath(selectedItem.src, selectedItem.id)}
                  className="btn-secondary !py-1.5 !px-3 text-xs shrink-0"
                >
                  Copy Path
                </button>
              </div>

              <div className="mt-5 flex items-center justify-end gap-3">
                <a
                  href={`https://wa.me/94740388788?text=Hello%201st%20Class%20Creative%2C%20I%20am%20interested%20in%20item%20${encodeURIComponent(
                    selectedItem.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !py-2.5 !px-5 text-xs font-semibold"
                >
                  Test WhatsApp Link
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
