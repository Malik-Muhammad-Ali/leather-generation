"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";

interface BaseProps {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gold text-black hover:shadow-[0_0_25px_rgba(212,175,55,0.55)] border border-gold",
  secondary: "bg-black text-cream hover:bg-brown border border-black",
  outline:
    "bg-transparent text-cream border border-cream/40 hover:border-gold hover:text-gold",
  ghost: "bg-transparent text-black hover:text-gold",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: BaseProps & HTMLMotionProps<"button"> & { href?: string }) {
  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 uppercase tracking-widest font-poppins font-medium overflow-hidden transition-all duration-300",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        <motion.span
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={classes}
        >
          {children}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={classes}
      {...props}
    >
      {children}
    </motion.button>
  );
}
