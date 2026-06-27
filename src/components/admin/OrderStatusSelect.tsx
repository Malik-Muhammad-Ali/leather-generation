"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Order } from "@/types";

const STATUSES: Order["status"][] = ["Processing", "Shipped", "Delivered", "Cancelled"];

export function OrderStatusSelect({ orderId, status }: { orderId: string; status: Order["status"] }) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [saving, setSaving] = useState(false);

  const handleChange = async (newStatus: Order["status"]) => {
    setValue(newStatus);
    setSaving(true);
    const res = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setSaving(false);
    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to update status.");
      setValue(status);
    }
  };

  return (
    <select
      value={value}
      disabled={saving}
      onChange={(e) => handleChange(e.target.value as Order["status"])}
      className="border border-black/15 bg-transparent px-4 py-2 font-inter text-sm outline-none focus:border-gold disabled:opacity-60"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
