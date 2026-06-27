import { Suspense } from "react";
import { ShopContent } from "./ShopContent";
import { getProducts } from "@/lib/data/products";
import { getCategories } from "@/lib/data/categories";

export default async function ShopPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <Suspense fallback={null}>
      <ShopContent products={products} categories={categories} />
    </Suspense>
  );
}
