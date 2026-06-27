import { notFound } from "next/navigation";
import { getCategories } from "@/lib/data/categories";
import { getProductByIdAdmin } from "@/lib/data/products";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [categories, product] = await Promise.all([getCategories(), getProductByIdAdmin(id)]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="font-playfair text-3xl text-black">Edit Product</h1>
      <ProductForm categories={categories} initial={product} />
    </div>
  );
}
