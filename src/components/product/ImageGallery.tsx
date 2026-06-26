"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("center");

  return (
    <div>
      <motion.div
        className="relative aspect-square overflow-hidden bg-black/5"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          setOrigin(`${x}% ${y}%`);
        }}
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
      >
        <motion.div
          animate={{ scale: zoomed ? 1.8 : 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ transformOrigin: origin }}
          className="relative h-full w-full"
        >
          <Image
            src={images[active]}
            alt={name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={img + i}
            onClick={() => setActive(i)}
            className={`relative aspect-square overflow-hidden border transition-colors ${
              active === i ? "border-gold" : "border-transparent"
            }`}
          >
            <Image src={img} alt={`${name} ${i + 1}`} fill sizes="120px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
