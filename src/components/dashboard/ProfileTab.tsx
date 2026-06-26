"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ProfileTab() {
  const [form, setForm] = useState({
    name: "Alexander Hayes",
    email: "alexander.hayes@example.com",
    phone: "+44 20 7946 0958",
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
      <h2 className="font-playfair text-2xl text-black">Profile</h2>
      <div>
        <label className="font-inter text-xs uppercase tracking-widest text-black/50">Full Name</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mt-2 w-full border border-black/15 bg-transparent px-4 py-3 font-inter text-sm outline-none focus:border-gold"
        />
      </div>
      <div>
        <label className="font-inter text-xs uppercase tracking-widest text-black/50">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mt-2 w-full border border-black/15 bg-transparent px-4 py-3 font-inter text-sm outline-none focus:border-gold"
        />
      </div>
      <div>
        <label className="font-inter text-xs uppercase tracking-widest text-black/50">Phone</label>
        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="mt-2 w-full border border-black/15 bg-transparent px-4 py-3 font-inter text-sm outline-none focus:border-gold"
        />
      </div>
      <Button variant="primary">Save Changes</Button>
      {saved && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="ml-4 inline-flex items-center gap-1 font-inter text-sm text-green-700"
        >
          <Check size={14} /> Saved
        </motion.span>
      )}
    </form>
  );
}
