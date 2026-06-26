"use client";

import { cn } from "@/lib/utils";

export interface ShippingMethod {
  id: string;
  label: string;
  description: string;
  price: number;
}

export const SHIPPING_METHODS: ShippingMethod[] = [
  { id: "standard", label: "Standard Shipping", description: "5-7 business days", price: 0 },
  { id: "express", label: "Express Shipping", description: "2-3 business days", price: 25 },
  { id: "overnight", label: "Overnight Shipping", description: "Next business day", price: 60 },
];

export function ShippingOptions({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      {SHIPPING_METHODS.map((method) => (
        <label
          key={method.id}
          className={cn(
            "flex cursor-pointer items-center justify-between border px-5 py-4 transition-colors",
            selected === method.id ? "border-gold bg-gold/5" : "border-black/15"
          )}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="shipping"
              checked={selected === method.id}
              onChange={() => onSelect(method.id)}
              className="h-4 w-4 accent-[#d4af37]"
            />
            <div>
              <p className="font-inter text-sm text-black">{method.label}</p>
              <p className="font-inter text-xs text-black/50">{method.description}</p>
            </div>
          </div>
          <span className="font-inter text-sm text-black">
            {method.price === 0 ? "Free" : `$${method.price}`}
          </span>
        </label>
      ))}
    </div>
  );
}
