"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SplitText } from "@/components/ui/SplitText";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/data/images";
import { useParallax } from "@/lib/useParallax";

export function BrandStory() {
  const imageRef = useRef<HTMLDivElement>(null);
  useParallax(imageRef, 80);

  return (
    <section className="overflow-hidden bg-black py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:px-10">
        <motion.div
          className="relative aspect-[4/5] overflow-hidden"
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div ref={imageRef} className="absolute inset-0 -top-16 -bottom-16">
            <Image src={IMAGES.workshop[0]} alt="Leather workshop" fill className="object-cover" />
          </div>
        </motion.div>

        <AnimatedSection direction="right">
          <span className="font-poppins text-xs uppercase tracking-[0.3em] text-gold">Our Story</span>
          <h2 className="mt-4 font-playfair text-3xl text-cream sm:text-4xl md:text-5xl leading-tight">
            <SplitText text="A Legacy Built by Hand" />
          </h2>
          <p className="mt-6 font-inter text-base leading-relaxed text-cream/70">
            Leather Generation began in a small workshop with a single belief: that true luxury is
            patient, deliberate, and made by hand. Three generations later, our artisans still cut
            every hide, stitch every seam, and finish every edge the way it was done at the very
            beginning — because craftsmanship like this cannot be rushed.
          </p>
          <p className="mt-4 font-inter text-base leading-relaxed text-cream/70">
            Today, our pieces travel across the world, but the philosophy never changes: build
            something that lasts a generation, then another.
          </p>
          <div className="mt-8">
            <Button href="/about" variant="outline">
              Discover Our Heritage
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
