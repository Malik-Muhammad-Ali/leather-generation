"use client";

import { usePathname } from "next/navigation";
import { ShopProvider } from "@/lib/cart-context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";

// Admin routes render their own chrome (see app/admin/layout.tsx) and skip
// the storefront Navbar/Footer/LoadingScreen entirely.
export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <ShopProvider>
      <LoadingScreen />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </ShopProvider>
  );
}
