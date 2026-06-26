"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem, Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useShop } from "@/lib/cart-context";

export function CartLineItem({ item, product }: { item: CartItem; product: Product }) {
  const { updateQuantity, removeFromCart } = useShop();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="flex gap-5 border-b border-black/10 py-6"
    >
      <Link href={`/product/${product.slug}`} className="relative h-28 w-24 shrink-0 overflow-hidden bg-black/5">
        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link href={`/product/${product.slug}`} className="font-playfair text-base text-black hover:text-gold">
              {product.name}
            </Link>
            <p className="mt-1 font-inter text-xs text-black/50">
              {item.color && `${item.color}`}
              {item.color && item.size && " / "}
              {item.size && `${item.size}`}
            </p>
          </div>
          <button
            onClick={() => removeFromCart(item.productId, item.color, item.size)}
            aria-label="Remove item"
            className="text-black/40 hover:text-gold"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center border border-black/20">
            <button
              onClick={() => updateQuantity(item.productId, item.quantity - 1, item.color, item.size)}
              className="p-2 hover:text-gold"
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </button>
            <span className="w-8 text-center font-inter text-sm">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.productId, item.quantity + 1, item.color, item.size)}
              className="p-2 hover:text-gold"
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </button>
          </div>
          <span className="font-inter text-sm text-black">{formatPrice(product.price * item.quantity)}</span>
        </div>
      </div>
    </motion.div>
  );
}
