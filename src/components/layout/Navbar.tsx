"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useShop } from "@/lib/cart-context";
import { MobileMenu } from "./MobileMenu";

const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useShop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link
            href="/"
            className="font-playfair text-xl sm:text-2xl tracking-wide text-cream"
          >
            Leather<span className="text-gold"> Generation</span>
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-poppins text-sm uppercase tracking-widest text-cream/85 transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-5 text-cream">
            <button aria-label="Search" className="hover:text-gold transition-colors">
              <Search size={20} />
            </button>
            <Link href="/dashboard" aria-label="Account" className="hover:text-gold transition-colors">
              <User size={20} />
            </Link>
            <Link href="/cart" aria-label="Cart" className="relative hover:text-gold transition-colors">
              <ShoppingBag size={20} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-black"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <button
              aria-label="Menu"
              className="lg:hidden hover:text-gold transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <motion.div animate={{ rotate: menuOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </button>
          </div>
        </nav>
      </motion.header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={NAV_LINKS} />
    </>
  );
}
