export type Category =
  | "jackets"
  | "wallets"
  | "belts"
  | "bags"
  | "accessories"
  | "custom";

export interface ProductVariant {
  id: string;
  label: string;
  type: "color" | "size";
  swatch?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  compareAtPrice?: number;
  images: string[];
  shortDescription: string;
  description: string;
  specs: { label: string; value: string }[];
  colors?: ProductVariant[];
  sizes?: ProductVariant[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  isNew?: boolean;
  isBestSeller?: boolean;
  stock: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  color?: string;
  size?: string;
}

export interface Address {
  id: string;
  fullName: string;
  line1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
  items: { productId: string; quantity: number }[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  avatar: string;
}
