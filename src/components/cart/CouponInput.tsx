"use client";

import { useState } from "react";
import { Tag, Check, X } from "lucide-react";

export function CouponInput({ onApply }: { onApply: (discount: number) => void }) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "applied" | "invalid">("idle");

  const handleApply = () => {
    if (code.trim().toUpperCase() === "LEATHER10") {
      setStatus("applied");
      onApply(0.1);
    } else {
      setStatus("invalid");
      onApply(0);
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" size={14} />
          <input
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setStatus("idle");
            }}
            placeholder="Coupon code (try LEATHER10)"
            className="w-full border border-black/15 bg-transparent py-2.5 pl-9 pr-3 font-inter text-sm outline-none focus:border-gold"
          />
        </div>
        <button
          onClick={handleApply}
          className="bg-black px-5 py-2.5 font-poppins text-xs uppercase tracking-widest text-cream hover:bg-brown"
        >
          Apply
        </button>
      </div>
      {status === "applied" && (
        <p className="mt-2 flex items-center gap-1 font-inter text-xs text-green-700">
          <Check size={14} /> 10% discount applied
        </p>
      )}
      {status === "invalid" && (
        <p className="mt-2 flex items-center gap-1 font-inter text-xs text-red-600">
          <X size={14} /> Invalid coupon code
        </p>
      )}
    </div>
  );
}
