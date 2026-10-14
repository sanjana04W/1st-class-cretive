"use client";

import Image from "next/image";
import { portfolioItems, categoryLabels, type PortfolioCategory } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Search } from "lucide-react";

export default function AdminPortfolioPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = portfolioItems.filter((item) => {
    const matchCat = filter === "all" || item.category === filter;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.alt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const categories = ["all", "resin-creations", "keychains", "wedding-invitations", "cake-boxes", "custom-frames"];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-brand-charcoal">Portfolio Gallery</h1>
        <p className="text-gray-400 text-sm mt-1">
          All {portfolioItems.length} portfolio images from the website. Images are served from the /public directory.
          To add new images, upload them to /public and add entries to portfolio-data.ts.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl shadow-card p-4 mb-6 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-9 !py-2.5"
          />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="form-input !py-2.5 !w-auto">
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "All Categories" : categoryLabels[c as PortfolioCategory]}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-gray-400 mb-4">{filtered.length} items</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="group bg-white rounded-xl shadow-card overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="20vw"
              />
              {item.featured && (
                <span className="absolute top-2 right-2 bg-brand-gold text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Featured
                </span>
              )}
            </div>
            <div className="p-3">
              <p className="text-xs font-semibold text-brand-charcoal truncate">{item.title}</p>
              <p className="text-[11px] text-brand-gold mt-0.5">{categoryLabels[item.category as PortfolioCategory]}</p>
              <p className="text-[10px] text-gray-400 mt-1 truncate">{item.src}</p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No items match your search.</p>
        </div>
      )}
    </div>
  );
}
