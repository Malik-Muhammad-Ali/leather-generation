"use client";

import { useState } from "react";
import { getBestSellers } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { QuickViewModal } from "@/components/shop/QuickViewModal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Product } from "@/types";

export function BestSellers() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const products = getBestSellers();

  return (
    <section className="bg-black py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Customer Favorites"
          title="Best Sellers"
          description="The pieces our customers return to again and again."
          light
        />

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} theme="dark" />
          ))}
        </div>
      </div>
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </section>
  );
}
