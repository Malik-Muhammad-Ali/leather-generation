"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryRecord, ProductVariant } from "@/types";
import { ProductInput } from "@/lib/data/products";

interface InitialProduct {
  id: string;
  slug: string;
  name: string;
  category_id: string | null;
  price: number;
  compare_at_price: number | null;
  images: string[];
  short_description: string;
  description: string;
  specs: { label: string; value: string }[];
  colors: ProductVariant[];
  sizes: ProductVariant[];
  is_new: boolean;
  is_best_seller: boolean;
  stock: number;
}

function parseImages(text: string): string[] {
  return text.split("\n").map((line) => line.trim()).filter(Boolean);
}

function parseSpecs(text: string): { label: string; value: string }[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split(":");
      return { label: label.trim(), value: rest.join(":").trim() };
    });
}

function parseColors(text: string): ProductVariant[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, i) => {
      const [label, swatch] = line.split(":").map((s) => s.trim());
      return { id: `color-${i}`, label, type: "color" as const, swatch };
    });
}

function parseSizes(text: string): ProductVariant[] {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((label, i) => ({ id: `size-${i}`, label, type: "size" as const }));
}

export function ProductForm({
  categories,
  initial,
}: {
  categories: CategoryRecord[];
  initial?: InitialProduct;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [categoryId, setCategoryId] = useState(initial?.category_id ?? categories[0]?.id ?? "");
  const [price, setPrice] = useState(initial?.price?.toString() ?? "");
  const [compareAtPrice, setCompareAtPrice] = useState(initial?.compare_at_price?.toString() ?? "");
  const [stock, setStock] = useState(initial?.stock?.toString() ?? "0");
  const [isNew, setIsNew] = useState(initial?.is_new ?? false);
  const [isBestSeller, setIsBestSeller] = useState(initial?.is_best_seller ?? false);
  const [shortDescription, setShortDescription] = useState(initial?.short_description ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [images, setImages] = useState((initial?.images ?? []).join("\n"));
  const [specs, setSpecs] = useState(
    (initial?.specs ?? []).map((s) => `${s.label}: ${s.value}`).join("\n")
  );
  const [colors, setColors] = useState(
    (initial?.colors ?? []).map((c) => `${c.label}:${c.swatch ?? ""}`).join("\n")
  );
  const [sizes, setSizes] = useState((initial?.sizes ?? []).map((s) => s.label).join(", "));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload: ProductInput = {
      slug,
      name,
      categoryId,
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
      images: parseImages(images),
      shortDescription,
      description,
      specs: parseSpecs(specs),
      colors: colors.trim() ? parseColors(colors) : undefined,
      sizes: sizes.trim() ? parseSizes(sizes) : undefined,
      isNew,
      isBestSeller,
      stock: Number(stock),
    };

    const res = await fetch(initial ? `/api/products/${initial.id}` : "/api/products", {
      method: initial ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSubmitting(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Something went wrong.");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  };

  const inputClass =
    "mt-2 w-full border border-black/15 bg-transparent px-4 py-2.5 font-inter text-sm outline-none focus:border-gold";
  const labelClass = "font-inter text-xs uppercase tracking-widest text-black/50";

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-3xl space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Name</label>
          <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Slug</label>
          <input required value={slug} onChange={(e) => setSlug(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Category</label>
          <select
            required
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className={inputClass}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Stock</label>
          <input
            required
            type="number"
            min={0}
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Price (USD)</label>
          <input
            required
            type="number"
            min={0}
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Compare-at Price (optional)</label>
          <input
            type="number"
            min={0}
            step="0.01"
            value={compareAtPrice}
            onChange={(e) => setCompareAtPrice(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 font-inter text-sm">
          <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} />
          Mark as New
        </label>
        <label className="flex items-center gap-2 font-inter text-sm">
          <input
            type="checkbox"
            checked={isBestSeller}
            onChange={(e) => setIsBestSeller(e.target.checked)}
          />
          Mark as Best Seller
        </label>
      </div>

      <div>
        <label className={labelClass}>Short Description</label>
        <input
          required
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          required
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Images (one URL per line)</label>
        <textarea
          required
          rows={3}
          value={images}
          onChange={(e) => setImages(e.target.value)}
          className={inputClass}
          placeholder={"https://images.unsplash.com/...\nhttps://images.unsplash.com/..."}
        />
      </div>

      <div>
        <label className={labelClass}>Specs (one &quot;label: value&quot; per line)</label>
        <textarea
          rows={3}
          value={specs}
          onChange={(e) => setSpecs(e.target.value)}
          className={inputClass}
          placeholder={"Material: Full-Grain Leather\nOrigin: Handcrafted in Italy"}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Colors (one &quot;label:hex&quot; per line, optional)</label>
          <textarea
            rows={3}
            value={colors}
            onChange={(e) => setColors(e.target.value)}
            className={inputClass}
            placeholder={"Black:#0B0B0B\nCognac:#5C3A21"}
          />
        </div>
        <div>
          <label className={labelClass}>Sizes (comma-separated, optional)</label>
          <textarea
            rows={3}
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
            className={inputClass}
            placeholder="S, M, L, XL"
          />
        </div>
      </div>

      {error && <p className="font-inter text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="bg-gold px-6 py-3 font-poppins text-sm uppercase tracking-widest text-black disabled:opacity-60"
      >
        {submitting ? "Saving..." : initial ? "Save Changes" : "Create Product"}
      </button>
    </form>
  );
}
