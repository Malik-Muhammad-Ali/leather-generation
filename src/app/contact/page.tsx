"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

const INFO_CARDS = [
  { icon: Mail, label: "Email", value: "hello@leathergeneration.com" },
  { icon: Phone, label: "Phone", value: "+1 (555) 012-3456" },
  { icon: MapPin, label: "Workshop", value: "123 Heritage Lane, Milan, Italy" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="font-poppins text-xs uppercase tracking-[0.3em] text-gold">Get in Touch</span>
          <h1 className="mt-3 font-playfair text-4xl text-black sm:text-5xl">Contact Us</h1>
        </motion.div>

        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {INFO_CARDS.map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-black px-6 py-8 text-center text-cream shadow-md"
            >
              <Icon className="mx-auto text-gold" size={24} />
              <h3 className="mt-3 font-poppins text-xs uppercase tracking-widest text-gold">{label}</h3>
              <p className="mt-2 font-inter text-sm text-cream/80">{value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <AnimatedSection direction="left">
            <h2 className="font-playfair text-2xl text-black">Send Us a Message</h2>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 flex items-center gap-2 font-poppins text-sm uppercase tracking-widest text-gold"
              >
                <Check size={18} /> Message sent — we&apos;ll be in touch shortly.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label className="font-inter text-xs uppercase tracking-widest text-black/50">Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-2 w-full border border-black/15 bg-transparent px-4 py-3 font-inter text-sm outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="font-inter text-xs uppercase tracking-widest text-black/50">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-2 w-full border border-black/15 bg-transparent px-4 py-3 font-inter text-sm outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="font-inter text-xs uppercase tracking-widest text-black/50">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="mt-2 w-full border border-black/15 bg-transparent px-4 py-3 font-inter text-sm outline-none focus:border-gold"
                  />
                </div>
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  <Send size={16} /> Send Message
                </Button>
              </form>
            )}
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="h-full min-h-[360px] overflow-hidden">
              <iframe
                title="Leather Generation location"
                src="https://maps.google.com/maps?q=Milan,Italy&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="h-full w-full min-h-[360px] border-0"
                loading="lazy"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
