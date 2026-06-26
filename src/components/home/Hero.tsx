"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SplitText } from "@/components/ui/SplitText";
import { Marquee } from "@/components/ui/Marquee";
import { TiltCard } from "@/components/ui/TiltCard";
import { IMAGES } from "@/data/images";
import { useParallax } from "@/lib/useParallax";

const eyebrowVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] } },
};

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 1.7 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const MARQUEE_ITEMS = [
  "Handcrafted Leather",
  "Timeless Craftsmanship",
  "Full-Grain Hides",
  "Made to Last Generations",
];

export function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);
  useParallax(imageRef, 160);

  return (
    <section className="relative flex h-screen min-h-[640px] w-full flex-col overflow-hidden bg-black">
      <div className="relative flex-1 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.25 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div ref={imageRef} className="absolute inset-0 -top-20 -bottom-20">
            <motion.div
              className="absolute inset-0"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={IMAGES.heroJacket}
                alt="Premium leather jacket"
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_55%,rgba(0,0,0,0.65)_100%)]" />
        </motion.div>

        <div className="pointer-events-none absolute left-1/2 top-1/2 z-[5] h-[520px] w-[90vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-[3rem] bg-black/30 backdrop-blur-[2px]" />

        <TiltCard
          max={3}
          className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center"
        >
          <motion.span
            initial="hidden"
            animate="show"
            variants={eyebrowVariants}
            className="mb-5 inline-flex items-center gap-3 font-poppins text-xs uppercase tracking-[0.35em] text-gold"
          >
            <motion.span
              className="h-px bg-gold/70"
              initial={{ width: 0 }}
              animate={{ width: 24 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            Premium Leather Goods
            <motion.span
              className="h-px bg-gold/70"
              initial={{ width: 0 }}
              animate={{ width: 24 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </motion.span>

          <h1 className="font-playfair text-5xl leading-tight text-cream sm:text-6xl md:text-7xl">
            <SplitText
              text="Crafted for Generations"
              by="char"
              delay={0.55}
              stagger={0.035}
              blur
              trigger="mount"
            />
          </h1>

          <motion.div
            className="mx-auto mt-4 h-[2px] w-0 bg-gold"
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p
              variants={item}
              className="mx-auto mt-6 max-w-xl font-inter text-base text-cream/75 sm:text-lg"
            >
              Premium leather products designed with timeless craftsmanship and modern elegance.
            </motion.p>
            <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button href="/shop" variant="primary" size="lg">
                <span className="relative z-10">Shop Collection</span>
                <motion.span
                  className="absolute inset-y-0 left-0 z-0 w-1/3 -skew-x-12 bg-white/40"
                  initial={{ x: "-150%" }}
                  animate={{ x: "350%" }}
                  transition={{ duration: 1.1, delay: 2.8, ease: "easeInOut" }}
                />
              </Button>
              <Button href="/about" variant="outline" size="lg">
                Explore Craftsmanship
              </Button>
            </motion.div>
          </motion.div>
        </TiltCard>

        <motion.div
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <span className="font-poppins text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="flex h-9 w-6 items-start justify-center rounded-full border border-gold/50 p-1.5">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-gold"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="relative z-10 border-t border-gold/20 bg-black py-4 text-gold/80"
      >
        <Marquee items={MARQUEE_ITEMS} />
      </motion.div>
    </section>
  );
}
