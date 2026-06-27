import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/requireAdmin";
import { createOrder, getOrders } from "@/lib/data/orders";
import { getProducts } from "@/lib/data/products";
import { OrderCustomer } from "@/types";

const SHIPPING_RATES: Record<string, number> = {
  standard: 0,
  express: 25,
  overnight: 60,
};

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await getOrders();
  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    items: { productId: string; quantity: number; color?: string; size?: string }[];
    customer: OrderCustomer;
    shippingMethod: string;
  };

  if (!body.items?.length || !body.customer) {
    return NextResponse.json({ error: "items and customer are required" }, { status: 400 });
  }

  // Prices are computed server-side from the current catalog — never trust
  // client-submitted amounts.
  const products = await getProducts();
  const orderItems = body.items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      throw new Error(`Unknown product: ${item.productId}`);
    }
    return {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      color: item.color,
      size: item.size,
    };
  });

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 250 ? 0 : SHIPPING_RATES[body.shippingMethod] ?? 0;
  const total = subtotal + shipping;

  const order = await createOrder({
    items: orderItems,
    customer: body.customer,
    shippingMethod: body.shippingMethod,
    subtotal,
    shipping,
    total,
  });

  return NextResponse.json({ order }, { status: 201 });
}
