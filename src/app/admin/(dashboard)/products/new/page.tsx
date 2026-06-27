import { getCategories } from "@/lib/data/categories";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="font-playfair text-3xl text-black">Add Product</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
