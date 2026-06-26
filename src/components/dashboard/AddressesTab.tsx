"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Star } from "lucide-react";
import { MOCK_ADDRESSES } from "@/data/orders";
import { Address } from "@/types";

export function AddressesTab() {
  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES);

  const removeAddress = (id: string) => setAddresses((prev) => prev.filter((a) => a.id !== id));

  const addAddress = () => {
    setAddresses((prev) => [
      ...prev,
      {
        id: `a${prev.length + 1}`,
        fullName: "New Address",
        line1: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        phone: "",
      },
    ]);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-playfair text-2xl text-black">Saved Addresses</h2>
        <button
          onClick={addAddress}
          className="flex items-center gap-1 font-poppins text-xs uppercase tracking-widest text-gold hover:underline"
        >
          <Plus size={14} /> Add Address
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {addresses.map((addr) => (
          <motion.div
            key={addr.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative border border-black/10 p-5"
          >
            {addr.isDefault && (
              <span className="absolute right-4 top-4 flex items-center gap-1 font-inter text-xs text-gold">
                <Star size={12} fill="currentColor" /> Default
              </span>
            )}
            <p className="font-inter text-sm font-medium text-black">{addr.fullName}</p>
            <p className="mt-1 font-inter text-sm text-black/60">{addr.line1}</p>
            <p className="font-inter text-sm text-black/60">
              {addr.city}, {addr.state} {addr.postalCode}
            </p>
            <p className="font-inter text-sm text-black/60">{addr.country}</p>
            <p className="mt-1 font-inter text-sm text-black/60">{addr.phone}</p>
            <button
              onClick={() => removeAddress(addr.id)}
              className="mt-4 flex items-center gap-1 font-inter text-xs text-black/40 hover:text-red-600"
            >
              <Trash2 size={14} /> Remove
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
