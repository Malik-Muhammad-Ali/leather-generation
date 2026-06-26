"use client";

import { Address } from "@/types";

export function AddressForm({
  address,
  onChange,
}: {
  address: Partial<Address>;
  onChange: (address: Partial<Address>) => void;
}) {
  type TextField = Exclude<keyof Address, "id" | "isDefault">;

  const field = (key: TextField, label: string, type = "text") => (
    <div>
      <label className="font-inter text-xs uppercase tracking-widest text-black/50">{label}</label>
      <input
        type={type}
        required
        value={address[key] ?? ""}
        onChange={(e) => onChange({ ...address, [key]: e.target.value })}
        className="mt-2 w-full border border-black/15 bg-transparent px-4 py-3 font-inter text-sm outline-none focus:border-gold"
      />
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {field("fullName", "Full Name")}
      {field("phone", "Phone", "tel")}
      <div className="sm:col-span-2">{field("line1", "Address")}</div>
      {field("city", "City")}
      {field("state", "State / Province")}
      {field("postalCode", "Postal Code")}
      {field("country", "Country")}
    </div>
  );
}
