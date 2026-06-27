"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (signInError) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-cream/15 bg-black p-8"
      >
        <h1 className="font-playfair text-2xl text-cream">Admin Login</h1>
        <p className="mt-1 font-inter text-sm text-cream/50">Leather Generation back office</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="font-inter text-xs uppercase tracking-widest text-cream/50">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border border-cream/20 bg-transparent px-4 py-3 font-inter text-sm text-cream outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="font-inter text-xs uppercase tracking-widest text-cream/50">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full border border-cream/20 bg-transparent px-4 py-3 font-inter text-sm text-cream outline-none focus:border-gold"
            />
          </div>
        </div>

        {error && <p className="mt-4 font-inter text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-gold px-6 py-3 font-poppins text-sm uppercase tracking-widest text-black transition-opacity disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
