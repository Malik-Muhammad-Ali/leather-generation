"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useShop } from "@/lib/cart-context";
import { TiltCard } from "@/components/ui/TiltCard";

export function ProductCard({
  product,
  onQuickView,
  theme = "light",
}: {
  product: Product;
  onQuickView?: (product: Product) => void;
  theme?: "light" | "dark";
}) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const wishlisted = isWishlisted(product.id);

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <TiltCard max={8} className="relative aspect-[4/5] overflow-hidden bg-black/5 shadow-md transition-shadow duration-500 group-hover:shadow-2xl">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {(product.isNew || product.isBestSeller) && (
            <span className="absolute left-3 top-3 bg-gold px-3 py-1 text-[10px] font-poppins uppercase tracking-widest text-black">
              {product.isNew ? "New" : "Bestseller"}
            </span>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            aria-label="Toggle wishlist"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-black transition-colors hover:bg-gold"
          >
            <Heart size={16} className={cn(wishlisted && "fill-black")} />
          </button>

          <div className="absolute inset-x-0 bottom-0 flex translate-y-full justify-center gap-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.preventDefault();
                onQuickView?.(product);
              }}
              className="flex items-center gap-1 bg-cream px-4 py-2 text-xs font-poppins uppercase tracking-wider text-black hover:bg-gold"
            >
              <Eye size={14} /> Quick View
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart({ productId: product.id, quantity: 1 });
              }}
              className="bg-black px-4 py-2 text-xs font-poppins uppercase tracking-wider text-cream hover:bg-gold hover:text-black"
            >
              Add to Cart
            </button>
          </div>
        </TiltCard>

        <div className="mt-4 text-center">
          <h3 className={cn("font-playfair text-lg", theme === "dark" ? "text-cream" : "text-black")}>
            {product.name}
          </h3>
          <div className="mt-1 flex items-center justify-center gap-2">
            <span className={cn("font-inter text-sm", theme === "dark" ? "text-cream/80" : "text-black/80")}>
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className={cn("font-inter text-sm line-through", theme === "dark" ? "text-cream/40" : "text-black/40")}>
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
