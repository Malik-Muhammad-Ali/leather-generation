import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Product, ProductVariant } from "@/types";

const PRODUCT_COLUMNS =
  "id, slug, name, price, compare_at_price, images, short_description, description, specs, colors, sizes, rating, review_count, reviews, is_new, is_best_seller, stock, categories(slug)";

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compare_at_price: number | null;
  images: string[];
  short_description: string;
  description: string;
  specs: Product["specs"];
  colors: Product["colors"];
  sizes: Product["sizes"];
  rating: number;
  review_count: number;
  reviews: Product["reviews"];
  is_new: boolean;
  is_best_seller: boolean;
  stock: number;
  categories: { slug: string } | { slug: string }[] | null;
};

function mapProduct(row: ProductRow): Product {
  const categorySlug = Array.isArray(row.categories)
    ? row.categories[0]?.slug
    : row.categories?.slug;

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: categorySlug ?? "uncategorized",
    price: Number(row.price),
    compareAtPrice: row.compare_at_price != null ? Number(row.compare_at_price) : undefined,
    images: row.images ?? [],
    shortDescription: row.short_description,
    description: row.description,
    specs: row.specs ?? [],
    colors: row.colors && row.colors.length > 0 ? row.colors : undefined,
    sizes: row.sizes && row.sizes.length > 0 ? row.sizes : undefined,
    rating: Number(row.rating),
    reviewCount: row.review_count,
    reviews: row.reviews ?? [],
    isNew: row.is_new,
    isBestSeller: row.is_best_seller,
    stock: row.stock,
  };
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((row) => mapProduct(row as unknown as ProductRow));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data ? mapProduct(data as unknown as ProductRow) : null;
}

export async function getRelatedProducts(product: Product, count = 4): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.category === product.category && p.id !== product.id).slice(0, count);
}

export async function getBestSellers(): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.isBestSeller);
}

// --- Admin-only mutations (service-role client, called from /api/products) ---

export interface ProductInput {
  slug: string;
  name: string;
  categoryId: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  shortDescription: string;
  description: string;
  specs: { label: string; value: string }[];
  colors?: ProductVariant[];
  sizes?: ProductVariant[];
  isNew?: boolean;
  isBestSeller?: boolean;
  stock: number;
}

function toRow(input: ProductInput) {
  return {
    slug: input.slug,
    name: input.name,
    category_id: input.categoryId,
    price: input.price,
    compare_at_price: input.compareAtPrice ?? null,
    images: input.images,
    short_description: input.shortDescription,
    description: input.description,
    specs: input.specs,
    colors: input.colors ?? [],
    sizes: input.sizes ?? [],
    is_new: !!input.isNew,
    is_best_seller: !!input.isBestSeller,
    stock: input.stock,
  };
}

export async function getProductByIdAdmin(id: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(id, slug)")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function createProduct(input: ProductInput) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("products").insert(toRow(input)).select().single();
  if (error) throw error;
  return data;
}

export async function updateProduct(id: string, input: ProductInput) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .update(toRow(input))
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProduct(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}
