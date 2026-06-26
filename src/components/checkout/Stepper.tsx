"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const CHECKOUT_STEPS = ["Address", "Shipping", "Payment", "Review"];

export function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-between">
      {CHECKOUT_STEPS.map((step, i) => (
        <div key={step} className="flex flex-1 items-center">
          <div className="flex flex-col items-center">
            <motion.div
              animate={{
                backgroundColor: i <= current ? "#D4AF37" : "transparent",
                borderColor: i <= current ? "#D4AF37" : "rgba(0,0,0,0.2)",
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 font-poppins text-sm"
            >
              {i < current ? <Check size={16} className="text-black" /> : <span className={cn(i === current ? "text-black" : "text-black/40")}>{i + 1}</span>}
            </motion.div>
            <span className={cn("mt-2 font-inter text-xs", i <= current ? "text-black" : "text-black/40")}>
              {step}
            </span>
          </div>
          {i < CHECKOUT_STEPS.length - 1 && (
            <div className="relative mx-2 h-[2px] flex-1 bg-black/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gold"
                animate={{ width: i < current ? "100%" : "0%" }}
                transition={{ duration: 0.4 }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
