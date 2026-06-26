"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CartItem } from "@/types";
import { PRODUCTS } from "@/data/products";

interface ShopContextValue {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, color?: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  cartCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const ShopContext = createContext<ShopContextValue | null>(null);

const CART_KEY = "lg-cart";
const WISHLIST_KEY = "lg-wishlist";

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // one-time hydration from localStorage on mount, no SSR equivalent to render initially
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_KEY);
      const savedWishlist = localStorage.getItem(WISHLIST_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.productId === item.productId && i.color === item.color && i.size === item.size
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string, color?: string, size?: string) => {
    setCart((prev) =>
      prev.filter((i) => !(i.productId === productId && i.color === color && i.size === size))
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number, color?: string, size?: string) => {
      setCart((prev) =>
        prev.map((i) =>
          i.productId === productId && i.color === color && i.size === size
            ? { ...i, quantity: Math.max(1, quantity) }
            : i
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }, []);

  const isWishlisted = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.quantity, 0), [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, i) => {
      const product = PRODUCTS.find((p) => p.id === i.productId);
      return sum + (product?.price ?? 0) * i.quantity;
    }, 0);
  }, [cart]);

  const value: ShopContextValue = {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    isWishlisted,
    cartCount,
    subtotal,
    isCartOpen,
    setCartOpen,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
