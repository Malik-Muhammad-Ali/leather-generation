"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useShop } from "@/lib/cart-context";
import { Button } from "@/components/ui/Button";

export function QuickViewModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addToCart } = useShop();

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative grid w-full max-w-3xl grid-cols-1 gap-6 bg-cream p-6 sm:grid-cols-2 sm:p-8"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 text-black/60 hover:text-gold"
            >
              <X size={22} />
            </button>
            <div className="relative aspect-square overflow-hidden">
              <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="font-playfair text-2xl text-black">{product.name}</h3>
              <p className="mt-2 font-inter text-sm text-black/60">{product.shortDescription}</p>
              <span className="mt-4 font-inter text-xl text-brown">{formatPrice(product.price)}</span>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="primary"
                  onClick={() => {
                    addToCart({ productId: product.id, quantity: 1 });
                    onClose();
                  }}
                >
                  Add to Cart
                </Button>
                <Button variant="outline" href={`/product/${product.slug}`} className="!text-black !border-black/30 hover:!border-gold hover:!text-gold">
                  View Details
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
