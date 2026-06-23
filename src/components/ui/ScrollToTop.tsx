"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const phrases = [
  "Cercavi me?",
  "Hop, si torna su!",
  "Scorciatoia VIP",
  "Teletrasporto attivo",
  "Dai, ti riporto su",
];

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [phrase] = useState(() => phrases[Math.floor(Math.random() * phrases.length)]);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
        >
          <AnimatePresence>
            {hovered && (
              <motion.span
                initial={{ opacity: 0, x: 8, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className="rounded-full bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg dark:bg-white dark:text-neutral-900"
              >
                {phrase}
              </motion.span>
            )}
          </AnimatePresence>

          <button
            type="button"
            aria-label="Torna in cima"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12),0_1px_4px_rgba(0,0,0,0.08)] transition-all duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 dark:border-white/[0.12] dark:bg-neutral-900 dark:shadow-[0_4px_20px_rgba(0,0,0,0.5),0_1px_4px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_8px_28px_rgba(0,0,0,0.6)]"
          >
            <ArrowUp className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
