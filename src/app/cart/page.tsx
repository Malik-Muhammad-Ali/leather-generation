"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useShop } from "@/lib/cart-context";
import { PRODUCTS } from "@/data/products";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const { cart, subtotal } = useShop();
  const [discount, setDiscount] = useState(0);

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-cream px-6 pt-32 text-center">
        <ShoppingBag size={48} className="text-black/20" />
        <h1 className="mt-6 font-playfair text-3xl text-black">Your cart is empty</h1>
        <p className="mt-2 font-inter text-sm text-black/60">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Button href="/shop" variant="primary" size="lg" className="mt-8">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 font-playfair text-4xl text-black"
        >
          Shopping Cart
        </motion.h1>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <AnimatePresence>
              {cart.map((item) => {
                const product = PRODUCTS.find((p) => p.id === item.productId);
                if (!product) return null;
                return (
                  <CartLineItem
                    key={`${item.productId}-${item.color}-${item.size}`}
                    item={item}
                    product={product}
                  />
                );
              })}
            </AnimatePresence>
          </div>

          <div>
            <OrderSummary subtotal={subtotal} discount={discount} onApplyCoupon={setDiscount} />
          </div>
        </div>
      </div>
    </div>
  );
}
