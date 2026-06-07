"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
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
      role="switch"
      aria-checked={isDark}
      aria-label="Cambia tema visivo"
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-[4.5rem] shrink-0 cursor-pointer items-center rounded-full border border-neutral-200/50 bg-white/40 p-1 text-neutral-700 shadow-[0_10px_24px_rgba(15,23,42,0.04),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl transition-all duration-300 hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 dark:border-white/10 dark:bg-neutral-900/40 dark:text-neutral-300 dark:shadow-[0_10px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)] dark:hover:bg-neutral-900/60"
    >
      
      <motion.span
        className="absolute left-1 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.04] bg-white shadow-[0_4px_12px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,1)] dark:border-white/10 dark:bg-neutral-950 dark:shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]"
        animate={{ x: isDark ? 32 : 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "dark-icon" : "light-icon"}
            initial={{ opacity: 0, rotate: -45, scale: 0.65 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.65 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="flex items-center justify-center transform-gpu"
          >
            {isDark ? (
              <Moon className="h-4 w-4 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]" />
            ) : (
              <Sun className="h-4 w-4 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.2)]" />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.span>

      <span className="sr-only">
        {isDark ? "Interruttore tema impostato su scuro" : "Interruttore tema impostato su chiaro"}
      </span>
    </button>
  );
}