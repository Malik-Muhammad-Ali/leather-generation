import Link from "next/link";
import { getProducts } from "@/lib/data/products";
import { getCategories } from "@/lib/data/categories";
import { getOrders } from "@/lib/data/orders";
import { getEvents } from "@/lib/data/events";
import { formatPrice } from "@/lib/utils";

export default async function AdminOverviewPage() {
  const [products, categories, orders, events] = await Promise.all([
    getProducts(),
    getCategories(),
    getOrders(),
    getEvents(),
  ]);

  const revenue = orders.reduce((sum, o) => sum + o.total, 0);
  const recentOrders = orders.slice(0, 5);

  const stats = [
    { label: "Products", value: products.length },
    { label: "Categories", value: categories.length },
    { label: "Orders", value: orders.length },
    { label: "Revenue", value: formatPrice(revenue) },
    { label: "Site Visits", value: events.length },
  ];

  return (
    <div>
      <h1 className="font-playfair text-3xl text-black">Overview</h1>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-black/10 bg-white p-5">
            <p className="font-inter text-xs uppercase tracking-widest text-black/50">{stat.label}</p>
            <p className="mt-2 font-playfair text-2xl text-black">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-playfair text-xl text-black">Recent Orders</h2>
          <Link href="/admin/orders" className="font-inter text-sm text-gold hover:underline">
            View all
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto border border-black/10 bg-white">
          <table className="w-full min-w-[480px] font-inter text-sm">
            <thead>
              <tr className="border-b border-black/10 text-left text-xs uppercase tracking-widest text-black/40">
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-black/40">
                    No orders yet.
                  </td>
                </tr>
              )}
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-black/5">
                  <td className="px-4 py-3">
                    <Link href={`/admin/orders/${order.id}`} className="hover:text-gold">
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-black/60">{order.status}</td>
                  <td className="px-4 py-3 text-right">{formatPrice(order.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
