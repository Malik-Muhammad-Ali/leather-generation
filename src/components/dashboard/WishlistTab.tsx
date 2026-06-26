"use client";

import { useShop } from "@/lib/cart-context";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";

export function WishlistTab() {
  const { wishlist } = useShop();
  const products = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div>
      <h2 className="font-playfair text-2xl text-black">Wishlist</h2>
      {products.length === 0 ? (
        <p className="mt-6 font-inter text-sm text-black/50">
          You haven&apos;t saved any items yet. Browse the shop and tap the heart icon to save favorites.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
