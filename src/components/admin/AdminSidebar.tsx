"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, Tags, ClipboardList, Activity, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const LINKS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
  { href: "/admin/events", label: "Events", icon: Activity },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-cream/10 bg-black text-cream">
      <div className="px-6 py-6">
        <span className="font-playfair text-lg">
          Leather<span className="text-gold"> Admin</span>
        </span>
      </div>

      <nav className="flex-1 px-3">
        {LINKS.map(({ href, label, icon: Icon }) => {
          const active = href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "mb-1 flex items-center gap-3 rounded px-3 py-2.5 font-inter text-sm transition-colors",
                active ? "bg-gold/15 text-gold" : "text-cream/70 hover:bg-cream/5 hover:text-cream"
              )}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mx-3 mb-6 flex items-center gap-3 rounded px-3 py-2.5 font-inter text-sm text-cream/60 hover:bg-cream/5 hover:text-cream"
      >
        <LogOut size={16} />
        Logout
      </button>
    </aside>
  );
}
