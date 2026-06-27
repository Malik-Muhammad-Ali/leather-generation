import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/data/orders";
import { formatPrice } from "@/lib/utils";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) notFound();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-playfair text-3xl text-black">{order.orderNumber}</h1>
        <OrderStatusSelect orderId={order.id} status={order.status} />
      </div>
      <p className="mt-1 font-inter text-sm text-black/50">
        Placed {new Date(order.createdAt).toLocaleString()}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div className="border border-black/10 bg-white p-6">
          <h2 className="font-playfair text-lg text-black">Items</h2>
          <div className="mt-4 space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between border-b border-black/5 pb-3 font-inter text-sm">
                <div>
                  <p className="text-black">{item.name}</p>
                  <p className="text-black/50">
                    Qty {item.quantity}
                    {item.color && ` · ${item.color}`}
                    {item.size && ` · ${item.size}`}
                  </p>
                </div>
                <span className="text-black">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-1 font-inter text-sm">
            <div className="flex justify-between text-black/60">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-black/60">
              <span>Shipping ({order.shippingMethod})</span>
              <span>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-black/10 pt-2 text-base font-medium text-black">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="border border-black/10 bg-white p-6">
          <h2 className="font-playfair text-lg text-black">Customer</h2>
          <div className="mt-4 space-y-1 font-inter text-sm text-black/70">
            <p>{order.customer.fullName}</p>
            <p>{order.customer.line1}</p>
            <p>
              {order.customer.city}, {order.customer.state} {order.customer.postalCode}
            </p>
            <p>{order.customer.country}</p>
            <p>{order.customer.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
