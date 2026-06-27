import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { CategoryRecord } from "@/types";

function mapCategory(row: {
  id: string;
  slug: string;
  name: string;
  image: string;
  description: string;
}): CategoryRecord {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    image: row.image,
    description: row.description,
  };
}

export async function getCategories(): Promise<CategoryRecord[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, slug, name, image, description")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(mapCategory);
}

export async function getCategoryBySlug(slug: string): Promise<CategoryRecord | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, slug, name, image, description")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data ? mapCategory(data) : null;
}

// --- Admin-only mutations (service-role client, called from /api/categories) ---

export interface CategoryInput {
  slug: string;
  name: string;
  image: string;
  description: string;
}

export async function createCategory(input: CategoryInput) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("categories").insert(input).select().single();
  if (error) throw error;
  return mapCategory(data);
}

export async function updateCategory(id: string, input: CategoryInput) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("categories")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return mapCategory(data);
}

export async function deleteCategory(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
}
