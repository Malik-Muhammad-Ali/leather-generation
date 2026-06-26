"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { Category, Product } from "@/types";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { SortBar, type SortOption } from "@/components/shop/SortBar";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { QuickViewModal } from "@/components/shop/QuickViewModal";

const MAX_PRICE = Math.max(...PRODUCTS.map((p) => p.price));

export function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as Category | null;

  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    initialCategory ? [initialCategory] : []
  );
  const [priceRange, setPriceRange] = useState(MAX_PRICE);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const filtered = useMemo(() => {
    let result = PRODUCTS.filter((p) => p.price <= priceRange);
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }
    if (search.trim()) {
      const term = search.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(term));
    }
    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        result = [...result].sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }
    return result;
  }, [selectedCategories, priceRange, search, sort]);

  return (
    <div className="bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="font-poppins text-xs uppercase tracking-[0.3em] text-gold">Shop</span>
          <h1 className="mt-3 font-playfair text-4xl text-black sm:text-5xl">All Collections</h1>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
          <FilterSidebar
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            maxPrice={MAX_PRICE}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            className="hidden lg:block"
          />

          <div>
            <SortBar
              search={search}
              onSearchChange={setSearch}
              sort={sort}
              onSortChange={setSort}
              resultCount={filtered.length}
            />

            <details className="mt-6 lg:hidden">
              <summary className="cursor-pointer font-poppins text-xs uppercase tracking-widest text-gold">
                Filters
              </summary>
              <FilterSidebar
                selectedCategories={selectedCategories}
                onToggleCategory={toggleCategory}
                maxPrice={MAX_PRICE}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                className="mt-4"
              />
            </details>

            <div className="mt-10">
              <ProductGrid products={filtered} onQuickView={setQuickViewProduct} />
            </div>
          </div>
        </div>
      </div>
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
