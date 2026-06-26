"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function LoadingScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem("lg-loaded");
    if (alreadyLoaded) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only check, no SSR value to render initially
    setShow(true);
    const timer = setTimeout(() => {
      sessionStorage.setItem("lg-loaded", "true");
      setShow(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          <motion.span
            className="font-playfair text-3xl sm:text-5xl tracking-wide text-cream"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Leather Generation
          </motion.span>
          <motion.div
            className="mt-5 h-[2px] bg-gold"
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{ duration: 1.1, delay: 0.3, ease: "easeInOut" }}
          />
          <motion.span
            className="mt-4 font-poppins text-xs uppercase tracking-[0.3em] text-gold/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            Crafted for Generations
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
