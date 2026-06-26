"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
  speed = 28,
}: {
  items: string[];
  className?: string;
  speed?: number;
}) {
  const loop = [...items, ...items];

  return (
    <div className={cn("relative overflow-hidden whitespace-nowrap", className)}>
      <motion.div
        className="flex w-max items-center gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-playfair text-lg italic sm:text-xl">{item}</span>
            <span className="text-gold">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
