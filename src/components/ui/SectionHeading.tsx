import { cn } from "@/lib/utils";
import { AnimatedSection } from "./AnimatedSection";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <AnimatedSection
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "block uppercase tracking-[0.25em] text-xs font-poppins mb-3",
            light ? "text-gold" : "text-gold"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-playfair text-3xl sm:text-4xl md:text-5xl leading-tight",
          light ? "text-cream" : "text-black"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 font-inter text-base leading-relaxed",
            light ? "text-cream/70" : "text-black/60"
          )}
        >
          {description}
        </p>
      )}
    </AnimatedSection>
  );
}
