import Link from "next/link";
import { getProducts } from "@/lib/data/products";
import { ProductsTable } from "@/components/admin/ProductsTable";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-playfair text-3xl text-black">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-gold px-5 py-2.5 font-poppins text-xs uppercase tracking-widest text-black"
        >
          Add Product
        </Link>
      </div>

      <ProductsTable products={products} />
    </div>
  );
}
