"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Package, Heart, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileTab } from "@/components/dashboard/ProfileTab";
import { OrdersTab } from "@/components/dashboard/OrdersTab";
import { WishlistTab } from "@/components/dashboard/WishlistTab";
import { AddressesTab } from "@/components/dashboard/AddressesTab";

type Tab = "profile" | "orders" | "wishlist" | "addresses";

const TABS: { id: Tab; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Order History", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
];

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>("profile");

  return (
    <div className="bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 font-playfair text-4xl text-black"
        >
          My Account
        </motion.h1>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={cn(
                  "flex items-center gap-3 whitespace-nowrap px-4 py-3 text-left font-inter text-sm transition-colors",
                  tab === id ? "bg-black text-cream" : "text-black/60 hover:bg-black/5"
                )}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>

          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {tab === "profile" && <ProfileTab />}
            {tab === "orders" && <OrdersTab />}
            {tab === "wishlist" && <WishlistTab />}
            {tab === "addresses" && <AddressesTab />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
