"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, Star, Truck, ShieldCheck } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useShop } from "@/lib/cart-context";
import { Button } from "@/components/ui/Button";
import { ImageGallery } from "./ImageGallery";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

type Tab = "description" | "specs" | "reviews";

export function ProductDetailContent({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const [color, setColor] = useState(product.colors?.[0]?.label);
  const [size, setSize] = useState(product.sizes?.[0]?.label);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<Tab>("description");
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ productId: product.id, quantity, color, size });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <AnimatedSection direction="left">
            <ImageGallery images={product.images} name={product.name} />
          </AnimatedSection>

          <AnimatedSection direction="right">
            <span className="font-poppins text-xs uppercase tracking-[0.3em] text-gold">
              {product.category}
            </span>
            <h1 className="mt-3 font-playfair text-3xl text-black sm:text-4xl">{product.name}</h1>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.round(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="font-inter text-sm text-black/50">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="font-inter text-2xl text-brown">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="font-inter text-lg text-black/40 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            <p className="mt-5 font-inter text-sm leading-relaxed text-black/70">
              {product.shortDescription}
            </p>

            {product.colors && (
              <div className="mt-7">
                <span className="font-poppins text-xs uppercase tracking-widest text-black/60">
                  Color: {color}
                </span>
                <div className="mt-3 flex gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setColor(c.label)}
                      aria-label={c.label}
                      className={cn(
                        "h-9 w-9 rounded-full border-2 transition-all",
                        color === c.label ? "border-gold scale-110" : "border-transparent"
                      )}
                      style={{ backgroundColor: c.swatch }}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && (
              <div className="mt-7">
                <span className="font-poppins text-xs uppercase tracking-widest text-black/60">
                  Size: {size}
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSize(s.label)}
                      className={cn(
                        "border px-4 py-2 font-inter text-sm transition-colors",
                        size === s.label
                          ? "border-gold bg-gold text-black"
                          : "border-black/20 text-black/70 hover:border-gold"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-7 flex items-center gap-6">
              <div className="flex items-center border border-black/20">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 hover:text-gold"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center font-inter text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="p-3 hover:text-gold"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
              <span className="font-inter text-xs text-black/50">{product.stock} in stock</span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="primary" size="lg" onClick={handleAddToCart} className="flex-1">
                {added ? "Added to Cart" : "Add to Cart"}
              </Button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleWishlist(product.id)}
                aria-label="Toggle wishlist"
                className={cn(
                  "flex h-12 w-12 items-center justify-center border transition-colors",
                  isWishlisted(product.id) ? "border-gold text-gold" : "border-black/20 text-black/60"
                )}
              >
                <Heart size={18} className={cn(isWishlisted(product.id) && "fill-gold")} />
              </motion.button>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-black/10 pt-6 text-sm text-black/60 font-inter">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-gold" /> Free international shipping over $250
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-gold" /> Secure checkout & 2-year warranty
              </div>
            </div>
          </AnimatedSection>
        </div>

        <div className="mt-20">
          <div className="flex gap-8 border-b border-black/10">
            {(["description", "specs", "reviews"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "relative pb-4 font-poppins text-xs uppercase tracking-widest transition-colors",
                  tab === t ? "text-black" : "text-black/40 hover:text-black/70"
                )}
              >
                {t}
                {tab === t && (
                  <motion.div layoutId="tab-underline" className="absolute -bottom-px left-0 right-0 h-[2px] bg-gold" />
                )}
              </button>
            ))}
          </div>

          <div className="py-10">
            {tab === "description" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl font-inter text-sm leading-relaxed text-black/70"
              >
                {product.description}
              </motion.p>
            )}

            {tab === "specs" && (
              <motion.dl
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid max-w-xl grid-cols-1 gap-3"
              >
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between border-b border-black/10 py-2 font-inter text-sm">
                    <dt className="text-black/50">{spec.label}</dt>
                    <dd className="text-black">{spec.value}</dd>
                  </div>
                ))}
              </motion.dl>
            )}

            {tab === "reviews" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl space-y-6"
              >
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b border-black/10 pb-6">
                    <div className="flex items-center justify-between">
                      <span className="font-poppins text-sm font-medium text-black">{review.author}</span>
                      <span className="font-inter text-xs text-black/40">{review.date}</span>
                    </div>
                    <div className="mt-1 flex text-gold">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                      ))}
                    </div>
                    <h4 className="mt-2 font-playfair text-base text-black">{review.title}</h4>
                    <p className="mt-1 font-inter text-sm text-black/60 leading-relaxed">{review.body}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
