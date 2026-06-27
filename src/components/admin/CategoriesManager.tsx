"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { CategoryRecord } from "@/types";

type Draft = { slug: string; name: string; image: string; description: string };

const EMPTY_DRAFT: Draft = { slug: "", name: "", image: "", description: "" };

export function CategoriesManager({ categories }: { categories: CategoryRecord[] }) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const startAdd = () => {
    setDraft(EMPTY_DRAFT);
    setEditingId(null);
    setAdding(true);
    setError(null);
  };

  const startEdit = (category: CategoryRecord) => {
    setDraft({
      slug: category.slug,
      name: category.name,
      image: category.image,
      description: category.description,
    });
    setEditingId(category.id);
    setAdding(true);
    setError(null);
  };

  const cancel = () => {
    setAdding(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await fetch(editingId ? `/api/categories/${editingId}` : "/api/categories", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });

    setSubmitting(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Something went wrong.");
      return;
    }

    setAdding(false);
    setEditingId(null);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category? Products in it will become uncategorized.")) return;
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete category.");
    }
  };

  const inputClass =
    "mt-2 w-full border border-black/15 bg-transparent px-4 py-2.5 font-inter text-sm outline-none focus:border-gold";
  const labelClass = "font-inter text-xs uppercase tracking-widest text-black/50";

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-playfair text-3xl text-black">Categories</h1>
        {!adding && (
          <button
            onClick={startAdd}
            className="flex items-center gap-2 bg-gold px-5 py-2.5 font-poppins text-xs uppercase tracking-widest text-black"
          >
            <Plus size={14} /> Add Category
          </button>
        )}
      </div>

      {adding && (
        <form onSubmit={handleSubmit} className="mt-6 max-w-xl space-y-4 border border-black/10 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-playfair text-lg text-black">
              {editingId ? "Edit Category" : "New Category"}
            </h2>
            <button type="button" onClick={cancel} className="text-black/40 hover:text-black">
              <X size={18} />
            </button>
          </div>

          <div>
            <label className={labelClass}>Name</label>
            <input
              required
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Slug</label>
            <input
              required
              value={draft.slug}
              onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Image URL</label>
            <input
              required
              value={draft.image}
              onChange={(e) => setDraft({ ...draft, image: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <input
              required
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              className={inputClass}
            />
          </div>

          {error && <p className="font-inter text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="bg-black px-6 py-2.5 font-poppins text-xs uppercase tracking-widest text-cream disabled:opacity-60"
          >
            {submitting ? "Saving..." : editingId ? "Save Changes" : "Create Category"}
          </button>
        </form>
      )}

      <div className="mt-6 overflow-x-auto border border-black/10 bg-white">
        <table className="w-full min-w-[480px] font-inter text-sm">
          <thead>
            <tr className="border-b border-black/10 text-left text-xs uppercase tracking-widest text-black/40">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-black/40">
                  No categories yet.
                </td>
              </tr>
            )}
            {categories.map((category) => (
              <tr key={category.id} className="border-b border-black/5">
                <td className="px-4 py-3 text-black">{category.name}</td>
                <td className="px-4 py-3 text-black/60">{category.slug}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => startEdit(category)}
                      className="text-black/50 hover:text-gold"
                      aria-label="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-black/50 hover:text-red-600"
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
    </div>
  );
}
