import { getCategories } from "@/lib/data/categories";
import { CategoriesManager } from "@/components/admin/CategoriesManager";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();
  return <CategoriesManager categories={categories} />;
}
