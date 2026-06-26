"use client";

import { Search } from "lucide-react";

export type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

interface SortBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  resultCount: number;
}

export function SortBar({ search, onSearchChange, sort, onSortChange, resultCount }: SortBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="w-full border border-black/15 bg-transparent py-2.5 pl-9 pr-3 font-inter text-sm outline-none focus:border-gold"
        />
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <span className="font-inter text-xs text-black/50">{resultCount} products</span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="border border-black/15 bg-cream py-2.5 px-3 font-inter text-sm outline-none focus:border-gold"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
