"use client";

import { motion } from "framer-motion";
import { Gem, Hammer, Globe, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FEATURES = [
  {
    icon: Gem,
    title: "Genuine Leather",
    description: "Sourced from the finest tanneries, every hide is full-grain and built to last.",
  },
  {
    icon: Hammer,
    title: "Handcrafted Quality",
    description: "Each piece is cut, stitched, and finished by hand by master artisans.",
  },
  {
    icon: Globe,
    title: "International Shipping",
    description: "Delivered safely to your door, anywhere in the world.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "Your transactions are protected with industry-leading encryption.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading eyebrow="Our Promise" title="Why Choose Us" />

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 text-gold"
              >
                <feature.icon size={28} />
              </motion.div>
              <h3 className="font-playfair text-xl text-black">{feature.title}</h3>
              <p className="mt-2 font-inter text-sm text-black/60 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
