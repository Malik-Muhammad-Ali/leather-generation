"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

export function ProductsTable({ products }: { products: Product[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    setDeletingId(id);
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    setDeletingId(null);
    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="mt-6 overflow-x-auto border border-black/10 bg-white">
      <table className="w-full min-w-[640px] font-inter text-sm">
        <thead>
          <tr className="border-b border-black/10 text-left text-xs uppercase tracking-widest text-black/40">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-black/40">
                No products yet.
              </td>
            </tr>
          )}
          {products.map((product) => (
            <tr key={product.id} className="border-b border-black/5">
              <td className="px-4 py-3 text-black">{product.name}</td>
              <td className="px-4 py-3 text-black/60 capitalize">{product.category}</td>
              <td className="px-4 py-3 text-black/60">{formatPrice(product.price)}</td>
              <td className="px-4 py-3 text-black/60">{product.stock}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-3">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-black/50 hover:text-gold"
                    aria-label="Edit"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                    className="text-black/50 hover:text-red-600 disabled:opacity-40"
                    aria-label="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
