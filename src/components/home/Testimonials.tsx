"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const testimonial = TESTIMONIALS[index];

  const go = (dir: 1 | -1) => {
    setIndex((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <SectionHeading eyebrow="What Our Customers Say" title="Testimonials" />

        <div className="relative mt-14 flex items-center justify-center gap-4 sm:gap-8">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/20 text-black/60 transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="relative min-h-[260px] flex-1 overflow-hidden text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative mx-auto h-16 w-16 overflow-hidden rounded-full">
                  <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
                </div>
                <div className="mt-4 flex justify-center gap-1 text-gold">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="mx-auto mt-4 max-w-xl font-cormorant text-xl italic leading-relaxed text-black/80 sm:text-2xl">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="mt-5 font-poppins text-sm uppercase tracking-widest text-black/60">
                  {testimonial.name} <span className="text-black/30">— {testimonial.location}</span>
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/20 text-black/60 transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-gold" : "w-3 bg-black/15"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
