import Link from "next/link";
import { getOrders } from "@/lib/data/orders";
import { formatPrice, cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  Delivered: "text-green-700 bg-green-700/10",
  Shipped: "text-blue-700 bg-blue-700/10",
  Processing: "text-gold bg-gold/10",
  Cancelled: "text-red-600 bg-red-600/10",
};

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <h1 className="font-playfair text-3xl text-black">Orders</h1>

      <div className="mt-6 overflow-x-auto border border-black/10 bg-white">
        <table className="w-full min-w-[560px] font-inter text-sm">
          <thead>
            <tr className="border-b border-black/10 text-left text-xs uppercase tracking-widest text-black/40">
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-black/40">
                  No orders yet.
                </td>
              </tr>
            )}
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-black/5">
                <td className="px-4 py-3">
                  <Link href={`/admin/orders/${order.id}`} className="text-black hover:text-gold">
                    {order.orderNumber}
                  </Link>
                </td>
                <td className="px-4 py-3 text-black/60">{order.customer?.fullName}</td>
                <td className="px-4 py-3 text-black/60">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <span className={cn("rounded-full px-3 py-1 text-xs", STATUS_COLORS[order.status])}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-black">{formatPrice(order.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
