"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "@teispace/next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );

  const isDark = mounted ? resolvedTheme !== "light" : true;

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      aria-label="Cambia tema visivo"
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-[4.5rem] shrink-0 cursor-pointer items-center rounded-full border border-neutral-300/60 bg-neutral-200/60 p-1 text-neutral-700 shadow-[inset_0_2px_5px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-[box-shadow,background-color,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-neutral-300/80 hover:bg-neutral-200/80 hover:shadow-[inset_0_2px_5px_rgba(0,0,0,0.16),inset_0_1px_2px_rgba(0,0,0,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.2)] dark:border-white/[0.08] dark:bg-neutral-900/60 dark:text-neutral-300 dark:shadow-[inset_0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(0,0,0,0.3)] dark:hover:border-white/[0.12] dark:hover:bg-neutral-900/70 dark:hover:shadow-[inset_0_2px_6px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(0,0,0,0.35)]"
    >
      <motion.span
        className="absolute left-1 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.06)] dark:border-white/[0.12] dark:bg-neutral-800 dark:shadow-[0_2px_8px_rgba(0,0,0,0.4),0_0_12px_rgba(52,211,153,0.08)]"
        animate={{ x: isDark ? 32 : 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "dark-icon" : "light-icon"}
            initial={{ opacity: 0, rotate: -30, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.9 }}
            transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-center justify-center transform-gpu"
          >
            {isDark ? (
              <Moon className="h-4 w-4 text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.4)]" />
            ) : (
              <Sun className="h-4 w-4 text-amber-500 drop-shadow-[0_0_6px_rgba(245,158,11,0.3)]" />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.span>

      <span className="sr-only">
        {isDark ? "Tema attuale: scuro. Clicca per cambiare." : "Tema attuale: chiaro. Clicca per cambiare."}
      </span>
    </button>
  );
}
