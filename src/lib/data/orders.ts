import { createAdminClient } from "@/lib/supabase/admin";
import { Order, OrderCustomer, OrderItem } from "@/types";

// Orders have no public SELECT policy in Supabase (see supabase/schema.sql) —
// every function here goes through the service-role client. That's safe
// because this module is only ever called from Route Handlers (server-only):
// POST /api/orders (anyone can place an order) and the /admin/orders routes
// (already gated by requireAdmin()).

type OrderRow = {
  id: string;
  order_number: string;
  items: OrderItem[];
  customer: OrderCustomer;
  shipping_method: string;
  subtotal: number;
  shipping: number;
  total: number;
  status: Order["status"];
  created_at: string;
};

function mapOrder(row: OrderRow): Order {
  return {
    id: row.id,
    orderNumber: row.order_number,
    items: row.items ?? [],
    customer: row.customer,
    shippingMethod: row.shipping_method,
    subtotal: Number(row.subtotal),
    shipping: Number(row.shipping),
    total: Number(row.total),
    status: row.status,
    createdAt: row.created_at,
  };
}

export async function createOrder(input: {
  items: OrderItem[];
  customer: OrderCustomer;
  shippingMethod: string;
  subtotal: number;
  shipping: number;
  total: number;
}): Promise<Order> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .insert({
      items: input.items,
      customer: input.customer,
      shipping_method: input.shippingMethod,
      subtotal: input.subtotal,
      shipping: input.shipping,
      total: input.total,
    })
    .select()
    .single();

  if (error) throw error;
  return mapOrder(data);
}

export async function getOrders(): Promise<Order[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .select()
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapOrder);
}

export async function getOrderById(id: string): Promise<Order | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("orders").select().eq("id", id).maybeSingle();

  if (error) throw error;
  return data ? mapOrder(data) : null;
}

export async function updateOrderStatus(id: string, status: Order["status"]): Promise<Order> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return mapOrder(data);
}
