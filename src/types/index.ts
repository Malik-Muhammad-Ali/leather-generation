// Category slug — categories are now admin-managed rows in Supabase rather
// than a fixed set, so this is just a plain string identifier.
export type Category = string;

export interface CategoryRecord {
  id: string;
  slug: Category;
  name: string;
  image: string;
  description: string;
}

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

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
}

export interface OrderCustomer {
  fullName: string;
  line1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  customer: OrderCustomer;
  shippingMethod: string;
  subtotal: number;
  shipping: number;
  total: number;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  avatar: string;
}
