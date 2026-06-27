import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/requireAdmin";
import { createProduct, getProducts, ProductInput } from "@/lib/data/products";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as ProductInput;

  if (!body.slug || !body.name || !body.categoryId) {
    return NextResponse.json({ error: "slug, name and categoryId are required" }, { status: 400 });
  }

  const product = await createProduct(body);
  return NextResponse.json({ product }, { status: 201 });
}
