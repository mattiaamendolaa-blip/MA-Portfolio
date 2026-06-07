"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
/*import { LanguageToggle } from "@/components/ui/LanguageToggle"; */
import { useLanguage } from "@/Context/LanguageContext"; 

export function Header() {
  const langContext = useLanguage();
  
  const t = langContext && typeof langContext.t === "function" ? langContext.t : (key: string) => key;

  const navItems = [
    { href: "#progetti", label: "Progetti" },
    { href: "#skills", label: "Skills" },
  ];

  const translatedContact = t("scrivimi");
  const contactLabel = translatedContact === "scrivimi" || !translatedContact ? "Scrivimi" : translatedContact;

  return (
    <motion.header
      initial={{ opacity: 0, y: -26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed left-0 right-0 top-4 z-[100] px-4 md:top-6"
    >
      <div className="mx-auto flex w-[90%] max-w-4xl items-center justify-between rounded-[1.75rem] border border-white/[0.22] bg-white/[0.38] px-3 py-2.5 shadow-[0_8px_32px_rgba(15,23,42,0.08),0_1.5px_8px_rgba(15,23,42,0.04),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-3xl transition-colors duration-500 dark:border-b dark:border-white/10 dark:bg-[#0f172a]/70 dark:shadow-[0_4px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] sm:px-4 md:px-6 md:py-3">
        
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full p-1 text-neutral-900 transition-colors hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 dark:text-white dark:hover:text-emerald-200 sm:gap-3"
        >
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-black/[0.06] bg-white/80 shadow-md shadow-black/5 transition-colors duration-500 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none sm:h-10 sm:w-10">
            <img src="/logo.png" alt="Logo Mattia Amendola" className="h-full w-full object-cover" />
          </span>
          <span className="hidden sm:block">
            <span className="block text-xs uppercase tracking-[0.32em] text-neutral-500 dark:text-white/45">Portfolio</span>
            <span className="block text-sm font-semibold tracking-tight text-neutral-900 dark:text-white/90">Mattia Amendola</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Navigazione primaria" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-neutral-600 transition hover:bg-black/[0.04] hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mobile Navigation */}
          <nav aria-label="Navigazione mobile" className="flex items-center gap-0.5 md:hidden">
            {navItems.slice(0, 2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-2.5 py-1.5 text-xs font-medium text-neutral-600 transition hover:bg-black/[0.04] hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white sm:px-3 sm:py-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <ThemeToggle />

          {/* GitHub (Desktop Only) */}
          <div className="hidden rounded-full bg-neutral-200 shadow-[inset_0_3px_6px_rgba(0,0,0,0.18)] dark:bg-black dark:shadow-[inset_0_4px_8px_rgba(0,0,0,0.7)] md:block relative group">
            <div className="transition-transform duration-300 ease-out group-hover:scale-[1.08] active:scale-95">
              <MagneticButton strength={50}>
                <a
                  href="https://github.com/mattiaamendolaa-blip"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 transition-[box-shadow,color,background-color,border-color] duration-300 ease-out group-hover:shadow-[0_22px_45px_-10px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.6)] active:shadow-inner dark:border-neutral-700/80 dark:bg-neutral-800 dark:text-neutral-200 dark:group-hover:border-emerald-600/10 dark:group-hover:text-emerald-50 dark:group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.03)] dark:active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.3)]"
                >
                  <img 
                    src="/githubl.svg" 
                    alt="GitHub" 
                    className="h-5 w-5 drop-shadow-sm dark:drop-shadow-[0_1px_0_rgba(255,255,255,0.05)] dark:invert" 
                  />
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* LinkedIn (Desktop Only) */}
          <div className="hidden rounded-full bg-neutral-200 shadow-[inset_0_3px_6px_rgba(0,0,0,0.18)] dark:bg-black dark:shadow-[inset_0_4px_8px_rgba(0,0,0,0.7)] md:block relative group">
            <div className="transition-transform duration-300 ease-out group-hover:scale-[1.08] active:scale-95">
              <MagneticButton strength={50}>
                <a
                  href="https://www.linkedin.com/in/mattia-amendola-726713307/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 transition-[box-shadow,color,background-color,border-color] duration-300 ease-out group-hover:shadow-[0_22px_45px_-10px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.6)] active:shadow-inner dark:border-neutral-700/80 dark:bg-neutral-800 dark:text-neutral-200 dark:group-hover:border-emerald-600/10 dark:group-hover:text-emerald-50 dark:group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.03)] dark:active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.3)]"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 drop-shadow-sm dark:drop-shadow-[0_1px_0_rgba(255,255,255,0.05)]">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </MagneticButton>
            </div>
          </div>

          
          <div className="rounded-full bg-neutral-200 shadow-[inset_0_3px_6px_rgba(0,0,0,0.18)] dark:bg-black dark:shadow-[inset_0_4px_8px_rgba(0,0,0,0.7)] relative group">
            <div className="transition-transform duration-300 ease-out group-hover:scale-[1.04] md:group-hover:scale-[1.08] active:scale-95">
              <MagneticButton strength={30}>
                <a
                  href="mailto:mattiaa.mendolaa@gmail.com?subject=Contatto%20dal%20Portfolio"
                  aria-label={contactLabel}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 transition-[box-shadow,color,background-color,border-color,width] duration-300 ease-out group-hover:border-emerald-300/40 group-hover:text-emerald-700 group-hover:shadow-[0_22px_45px_-10px_rgba(16,185,129,0.20),inset_0_1px_0_rgba(255,255,255,0.6)] active:shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 dark:border-neutral-700/80 dark:bg-neutral-800 dark:text-white dark:group-hover:border-emerald-600/20 dark:group-hover:text-emerald-50 dark:group-hover:shadow-[0_25px_50px_-12px_rgba(16,185,129,0.15),0_15px_30px_-5px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.03)] md:w-auto md:px-4 md:py-2 md:gap-2"
                >
                  <Mail className="h-4 w-4 flex-shrink-0 drop-shadow-sm dark:drop-shadow-[0_1px_0_rgba(255,255,255,0.03)]" />
                  
                  <span className="hidden md:inline text-sm font-semibold tracking-tight transition-colors">
                    {contactLabel}
                  </span>
                  
                  <ArrowUpRight className="hidden md:block h-3.5 w-3.5 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </MagneticButton>
            </div>
          </div>

        </div>
      </div>
    </motion.header>
  );
}