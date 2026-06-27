"use client";

import { Heart } from "lucide-react";
import { useShop } from "@/lib/cart-context";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/Button";

export default function WishlistPage() {
  const { wishlist, products } = useShop();
  const wishlisted = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h1 className="mb-12 text-center font-playfair text-4xl text-black">Wishlist</h1>

        {wishlisted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Heart size={48} className="text-black/20" />
            <p className="mt-6 font-inter text-sm text-black/50">
              You haven&apos;t saved any items yet. Browse the shop and tap the heart icon to save
              favorites.
            </p>
            <Button href="/shop" variant="primary" size="lg" className="mt-8">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
            {wishlisted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
