"use client";

import { motion } from "framer-motion";
import { MOCK_ORDERS } from "@/data/orders";
import { formatPrice, cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  Delivered: "text-green-700 bg-green-700/10",
  Shipped: "text-blue-700 bg-blue-700/10",
  Processing: "text-gold bg-gold/10",
  Cancelled: "text-red-600 bg-red-600/10",
};

export function OrdersTab() {
  return (
    <div>
      <h2 className="font-playfair text-2xl text-black">Order History</h2>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[480px] font-inter text-sm">
          <thead>
            <tr className="border-b border-black/10 text-left text-xs uppercase tracking-widest text-black/40">
              <th className="py-3">Order</th>
              <th className="py-3">Date</th>
              <th className="py-3">Status</th>
              <th className="py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.map((order, i) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="border-b border-black/5"
              >
                <td className="py-4 text-black">{order.id}</td>
                <td className="py-4 text-black/60">{order.date}</td>
                <td className="py-4">
                  <span className={cn("rounded-full px-3 py-1 text-xs", STATUS_COLORS[order.status])}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 text-right text-black">{formatPrice(order.total)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
