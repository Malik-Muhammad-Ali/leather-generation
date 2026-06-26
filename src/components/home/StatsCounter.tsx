"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const STATS = [
  { value: 52, suffix: "+", label: "Years of Craftsmanship" },
  { value: 18000, suffix: "+", label: "Pieces Handcrafted" },
  { value: 40, suffix: "+", label: "Countries Shipped To" },
  { value: 4.9, suffix: "/5", label: "Average Customer Rating", decimals: 1 },
];

function Counter({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, decimals]);

  return <span ref={ref}>{display}</span>;
}

export function StatsCounter() {
  return (
    <section className="bg-black py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 sm:grid-cols-4 lg:px-10">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="font-playfair text-4xl text-gold sm:text-5xl">
              <Counter value={stat.value} decimals={stat.decimals} />
              {stat.suffix}
            </div>
            <p className="mt-2 font-inter text-xs uppercase tracking-widest text-cream/60 sm:text-sm">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
