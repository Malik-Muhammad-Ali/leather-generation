"use client";

import { CATEGORIES } from "@/data/categories";
import { Category } from "@/types";

interface FilterSidebarProps {
  selectedCategories: Category[];
  onToggleCategory: (category: Category) => void;
  maxPrice: number;
  priceRange: number;
  onPriceChange: (value: number) => void;
  className?: string;
}

export function FilterSidebar({
  selectedCategories,
  onToggleCategory,
  maxPrice,
  priceRange,
  onPriceChange,
  className,
}: FilterSidebarProps) {
  return (
    <aside className={className}>
      <div>
        <h3 className="font-poppins text-xs uppercase tracking-widest text-gold">Category</h3>
        <ul className="mt-4 space-y-3">
          {CATEGORIES.map((cat) => (
            <li key={cat.id}>
              <label className="flex cursor-pointer items-center gap-3 text-sm font-inter text-black/70 hover:text-black">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.id)}
                  onChange={() => onToggleCategory(cat.id)}
                  className="h-4 w-4 accent-[#d4af37]"
                />
                {cat.name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <h3 className="font-poppins text-xs uppercase tracking-widest text-gold">Max Price</h3>
        <input
          type="range"
          min={0}
          max={maxPrice}
          step={10}
          value={priceRange}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="mt-4 w-full accent-[#d4af37]"
        />
        <div className="mt-2 flex justify-between text-xs font-inter text-black/50">
          <span>$0</span>
          <span>${priceRange}</span>
        </div>
      </div>
    </aside>
  );
}
