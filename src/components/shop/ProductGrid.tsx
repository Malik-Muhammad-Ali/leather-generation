"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  onQuickView,
}: {
  products: Product[];
  onQuickView: (product: Product) => void;
}) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center font-inter text-black/50">
        No products match your filters.
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <motion.div key={product.id} layout exit={{ opacity: 0, scale: 0.9 }}>
            <ProductCard product={product} onQuickView={onQuickView} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
