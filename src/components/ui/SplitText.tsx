"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  by = "word",
  blur = false,
  trigger = "inView",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  by?: "word" | "char";
  blur?: boolean;
  trigger?: "inView" | "mount";
}) {
  const units = by === "word" ? text.split(" ") : text.split("");

  const animProps =
    trigger === "mount"
      ? { initial: "hidden", animate: "show" }
      : { initial: "hidden", whileInView: "show", viewport: { once: true } };

  return (
    <span className={cn("inline-block overflow-hidden", className)}>
      {units.map((unit, i) => (
        <span key={i} className="inline-block overflow-hidden" style={{ verticalAlign: "top" }}>
          <motion.span
            className="inline-block"
            {...animProps}
            variants={{
              hidden: { y: "110%", opacity: 0, filter: blur ? "blur(10px)" : "blur(0px)" },
              show: { y: "0%", opacity: 1, filter: "blur(0px)" },
            }}
            transition={{
              duration: 0.8,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {unit}
            {by === "word" && i < units.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
