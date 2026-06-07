/* "use client";

import { useLanguage } from "@/Context/LanguageContext";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const cycleLanguage = () => {
    if (language === "it") setLanguage("en");
    else if (language === "en") setLanguage("zh");
    else setLanguage("it");
  };

  return (
    <button
      onClick={cycleLanguage}
      aria-label="Cambia lingua"
      className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300/90 bg-white shadow-sm transition-all duration-300 hover:scale-[1.05] active:scale-95 dark:border-neutral-600/80 dark:bg-neutral-800 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
    >
      <Languages className="h-4 w-4 text-neutral-600 transition-colors group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white" />
      
      <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[8px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-neutral-900">
        {language.toUpperCase()}
      </span>
    </button>
  );
} */