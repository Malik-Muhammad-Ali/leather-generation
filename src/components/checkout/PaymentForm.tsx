"use client";

import { CreditCard } from "lucide-react";

export interface PaymentDetails {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

export function PaymentForm({
  details,
  onChange,
}: {
  details: PaymentDetails;
  onChange: (details: PaymentDetails) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-black/50">
        <CreditCard size={18} className="text-gold" />
        <span className="font-inter text-xs uppercase tracking-widest">Card Details</span>
      </div>
      <div>
        <label className="font-inter text-xs uppercase tracking-widest text-black/50">Name on Card</label>
        <input
          required
          value={details.cardName}
          onChange={(e) => onChange({ ...details, cardName: e.target.value })}
          className="mt-2 w-full border border-black/15 bg-transparent px-4 py-3 font-inter text-sm outline-none focus:border-gold"
        />
      </div>
      <div>
        <label className="font-inter text-xs uppercase tracking-widest text-black/50">Card Number</label>
        <input
          required
          inputMode="numeric"
          placeholder="4242 4242 4242 4242"
          value={details.cardNumber}
          onChange={(e) => onChange({ ...details, cardNumber: e.target.value })}
          className="mt-2 w-full border border-black/15 bg-transparent px-4 py-3 font-inter text-sm outline-none focus:border-gold"
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="font-inter text-xs uppercase tracking-widest text-black/50">Expiry</label>
          <input
            required
            placeholder="MM/YY"
            value={details.expiry}
            onChange={(e) => onChange({ ...details, expiry: e.target.value })}
            className="mt-2 w-full border border-black/15 bg-transparent px-4 py-3 font-inter text-sm outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="font-inter text-xs uppercase tracking-widest text-black/50">CVC</label>
          <input
            required
            inputMode="numeric"
            placeholder="123"
            value={details.cvc}
            onChange={(e) => onChange({ ...details, cvc: e.target.value })}
            className="mt-2 w-full border border-black/15 bg-transparent px-4 py-3 font-inter text-sm outline-none focus:border-gold"
          />
        </div>
      </div>
    </div>
  );
}
