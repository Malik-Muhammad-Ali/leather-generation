"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden bg-brown py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_60%)]" />
      <AnimatedSection className="relative mx-auto max-w-xl px-6 text-center">
        <Mail className="mx-auto text-gold" size={32} />
        <h2 className="mt-5 font-playfair text-3xl text-cream sm:text-4xl">Join the Inner Circle</h2>
        <p className="mt-3 font-inter text-sm text-cream/70 sm:text-base">
          Subscribe for early access to new collections, private events, and stories of our craft.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 flex items-center justify-center gap-2 font-poppins text-sm uppercase tracking-widest text-gold"
          >
            <Check size={18} /> Thank you for subscribing
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 border border-cream/30 bg-transparent px-5 py-3 font-inter text-sm text-cream placeholder:text-cream/40 outline-none focus:border-gold"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="bg-gold px-7 py-3 font-poppins text-sm uppercase tracking-widest text-black transition-shadow hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]"
            >
              Subscribe
            </motion.button>
          </form>
        )}
      </AnimatedSection>
    </section>
  );
}
