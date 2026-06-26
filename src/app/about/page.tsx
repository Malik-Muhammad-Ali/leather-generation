"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IMAGES } from "@/data/images";
import { Scissors, HeartHandshake, Award } from "lucide-react";

const PROCESS_STEPS = [
  { title: "Hide Selection", description: "We hand-select full-grain hides for strength, grain, and character." },
  { title: "Pattern & Cut", description: "Master cutters shape each panel by hand, minimizing waste and maximizing fit." },
  { title: "Hand Stitching", description: "Every seam is stitched by hand or saddle-stitched for lasting durability." },
  { title: "Finishing & Aging", description: "Edges are burnished and conditioned, allowing the leather to age beautifully." },
];

const TEAM = [
  { name: "Elena Rossi", role: "Founder & Creative Director", image: IMAGES.portraits[1] },
  { name: "Marco Bianchi", role: "Master Tailor", image: IMAGES.portraits[4] },
  { name: "Sofia Romano", role: "Head of Design", image: IMAGES.portraits[5] },
  { name: "Lucas Ferrara", role: "Workshop Manager", image: IMAGES.portraits[6] },
];

export default function AboutPage() {
  return (
    <div className="bg-cream">
      <section className="relative flex h-[60vh] min-h-[420px] items-center justify-center overflow-hidden bg-black">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        >
          <Image src={IMAGES.workshop[1]} alt="Leather Generation workshop" fill className="object-cover opacity-50" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 text-center px-6"
        >
          <span className="font-poppins text-xs uppercase tracking-[0.3em] text-gold">Our Story</span>
          <h1 className="mt-4 font-playfair text-4xl text-cream sm:text-5xl md:text-6xl">About Leather Generation</h1>
        </motion.div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:px-10">
          <AnimatedSection direction="left">
            <span className="font-poppins text-xs uppercase tracking-[0.3em] text-gold">Mission</span>
            <h2 className="mt-4 font-playfair text-3xl text-black sm:text-4xl">
              Building Pieces That Outlive Trends
            </h2>
            <p className="mt-6 font-inter text-base leading-relaxed text-black/70">
              Leather Generation was founded on the belief that true luxury isn&apos;t about logos —
              it&apos;s about substance. We work exclusively with full-grain and vegetable-tanned
              leathers, finished by artisans who have spent decades perfecting their craft.
            </p>
            <p className="mt-4 font-inter text-base leading-relaxed text-black/70">
              Our mission is simple: create leather goods so well made, they become part of your
              story — and eventually, part of the next generation&apos;s.
            </p>
          </AnimatedSection>
          <motion.div
            className="relative aspect-[4/5] overflow-hidden"
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Image src={IMAGES.workshop[2]} alt="Craftsmanship" fill className="object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading eyebrow="How It's Made" title="Our Craftsmanship Process" light />
          <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <span className="font-playfair text-4xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-playfair text-xl text-cream">{step.title}</h3>
                <p className="mt-2 font-inter text-sm text-cream/60 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading eyebrow="Behind the Scenes" title="Workshop Gallery" />
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[...IMAGES.workshop, ...IMAGES.jackets.slice(0, 3)].map((img, i) => (
              <motion.div
                key={img + i}
                className="relative aspect-square overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ scale: 1.04 }}
              >
                <Image src={img} alt="Workshop" fill sizes="(max-width: 768px) 33vw, 20vw" className="object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {[
              { icon: Scissors, label: "Hand-Stitched" },
              { icon: HeartHandshake, label: "Family-Owned Since 1972" },
              { icon: Award, label: "Award-Winning Craft" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center justify-center gap-3 text-black/70">
                <Icon className="text-gold" size={22} />
                <span className="font-poppins text-sm uppercase tracking-widest">{label}</span>
              </div>
            ))}
          </div>

          <SectionHeading eyebrow="Meet the Artisans" title="Our Team" />
          <div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="mt-4 font-playfair text-lg text-black">{member.name}</h3>
                <p className="font-inter text-xs uppercase tracking-widest text-gold">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
