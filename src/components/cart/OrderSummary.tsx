"use client";

import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CouponInput } from "./CouponInput";

export function OrderSummary({
  subtotal,
  discount,
  onApplyCoupon,
  checkoutHref = "/checkout",
}: {
  subtotal: number;
  discount: number;
  onApplyCoupon: (discount: number) => void;
  checkoutHref?: string;
}) {
  const shipping = subtotal > 250 || subtotal === 0 ? 0 : 25;
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount + shipping;

  return (
    <div className="bg-black p-7 text-cream">
      <h2 className="font-playfair text-xl">Order Summary</h2>

      <div className="mt-6 space-y-3 font-inter text-sm">
        <div className="flex justify-between text-cream/70">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-gold">
            <span>Discount ({discount * 100}%)</span>
            <span>-{formatPrice(discountAmount)}</span>
          </div>
        )}
        <div className="flex justify-between text-cream/70">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between border-t border-cream/15 pt-3 text-base font-medium text-cream">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <div className="mt-6">
        <CouponInput onApply={onApplyCoupon} />
      </div>

      <Button href={checkoutHref} variant="primary" size="lg" className="mt-7 w-full">
        Proceed to Checkout
      </Button>
    </div>
  );
}
