"use client";

import { useState } from "react";
import { Product } from "@/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/shop/ProductCard";
import { QuickViewModal } from "@/components/shop/QuickViewModal";

export function RelatedProducts({ products }: { products: Product[] }) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  if (products.length === 0) return null;

  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading eyebrow="You May Also Like" title="Related Products" />
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
          ))}
        </div>
      </div>
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </section>
  );
}
