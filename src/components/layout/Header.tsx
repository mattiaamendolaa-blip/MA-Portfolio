"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useLanguage } from "@/Context/LanguageContext";

export function Header() {
  const langContext = useLanguage();
  const t = langContext && typeof langContext.t === "function" ? langContext.t : (key: string) => key;

  const navItems = [
    { href: "#progetti", label: "Progetti", sectionId: "progetti" },
    { href: "#skills", label: "Skills", sectionId: "skills" },
  ];

  const translatedContact = t("scrivimi");
  const contactLabel = translatedContact === "scrivimi" || !translatedContact ? "Scrivimi" : translatedContact;

  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const scrollDelta = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollY.current;
    lastScrollY.current = latest;

    if (latest < 80) {
      setHidden(false);
      scrollDelta.current = 0;
      return;
    }

    scrollDelta.current += diff;

    if (scrollDelta.current > 40) {
      setHidden(true);
      scrollDelta.current = 0;
    } else if (scrollDelta.current < -20) {
      setHidden(false);
      scrollDelta.current = 0;
    }
  });

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.sectionId)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const cradleClass = "rounded-full bg-black/[0.08] shadow-[inset_0_3px_6px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(0,0,0,0.12)] dark:bg-black/40 dark:shadow-[inset_0_4px_8px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(0,0,0,0.4)] relative group";

  const iconBtnClass = "flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/40 bg-white/70 text-neutral-800 backdrop-blur-xl transition-[box-shadow,background-color,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-white/90 group-hover:shadow-[0_22px_45px_-10px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 dark:border-white/[0.12] dark:bg-white/[0.08] dark:text-neutral-200 dark:backdrop-blur-xl dark:group-hover:bg-white/[0.14] dark:group-hover:border-white/[0.18] dark:group-hover:text-emerald-50 dark:group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.06)] dark:active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.3)]";

  const navLinkClass = (sectionId: string) => {
    const isActive = activeSection === sectionId;
    return `rounded-full px-4 py-2 text-sm font-medium transition-[color,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:ring-offset-2 ${
      isActive
        ? "text-emerald-700 bg-white/[0.5] shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)] dark:text-emerald-400 dark:bg-white/[0.08] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]"
        : "text-neutral-700 hover:bg-white/[0.5] hover:text-neutral-950 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)] dark:text-white/85 dark:hover:bg-white/[0.08] dark:hover:text-white dark:hover:shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]"
    }`;
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -26 }}
      animate={{ opacity: 1, y: hidden ? -100 : 0 }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      className="fixed left-0 right-0 top-4 z-[100] px-4 md:top-6"
    >
      <div className="mx-auto flex w-[90%] max-w-4xl items-center justify-between rounded-[1.75rem] border border-white/[0.28] bg-white/[0.45] px-3 py-2.5 shadow-[0_8px_32px_rgba(15,23,42,0.06),0_1.5px_8px_rgba(15,23,42,0.03),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(255,255,255,0.2)] backdrop-blur-[40px] backdrop-saturate-[1.8] transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] dark:border-white/[0.12] dark:bg-[#0f172a]/60 dark:shadow-[0_4px_30px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(255,255,255,0.03)] dark:backdrop-saturate-[1.4] sm:px-4 md:px-6 md:py-3">

        <Link
          href="/"
          className="flex items-center gap-2 rounded-full p-1 text-neutral-900 transition-all hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 dark:text-white dark:hover:text-emerald-200 sm:gap-3"
        >
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-black/[0.06] bg-white/80 shadow-md shadow-black/5 ring-2 ring-transparent transition-all duration-300 hover:ring-emerald-500/20 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none dark:hover:ring-emerald-400/15 sm:h-10 sm:w-10">
            <Image src="/logo.png" alt="Logo Mattia Amendola" width={40} height={40} className="h-full w-full object-cover" priority />
          </span>
          <span className="hidden sm:block">
            <span className="block text-xs uppercase tracking-[0.32em] text-neutral-600 dark:text-white/70">Portfolio</span>
            <span className="block text-sm font-semibold tracking-tight text-neutral-900 dark:text-white">Mattia Amendola</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Navigazione primaria" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass(item.sectionId)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
          {/* Mobile Navigation — hidden on very small screens to avoid overflow */}
          <nav aria-label="Navigazione mobile" className="hidden items-center gap-0.5 sm:flex md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-[44px] min-w-[44px] items-center justify-center ${navLinkClass(item.sectionId)}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <ThemeToggle />

          {/* GitHub */}
          <div className={cradleClass}>
            <div className="transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06] active:scale-[0.97]">
              <MagneticButton strength={50}>
                <a href="https://github.com/mattiaamendolaa-blip" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconBtnClass}>
                  <Image src="/githubl.svg" alt="" width={20} height={20} className="h-4 w-4 sm:h-5 sm:w-5 drop-shadow-sm dark:drop-shadow-[0_1px_0_rgba(255,255,255,0.05)] dark:invert" />
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* LinkedIn */}
          <div className={cradleClass}>
            <div className="transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06] active:scale-[0.97]">
              <MagneticButton strength={50}>
                <a href="https://www.linkedin.com/in/mattia-amendola-726713307/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconBtnClass}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 sm:h-4 sm:w-4 drop-shadow-sm dark:drop-shadow-[0_1px_0_rgba(255,255,255,0.05)]">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Scrivimi */}
          <div className={cradleClass}>
            <div className="transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04] md:group-hover:scale-[1.06] active:scale-[0.97]">
              <MagneticButton strength={30}>
                <a
                  href="mailto:mattiaa.mendolaa@gmail.com?subject=Contatto%20dal%20Portfolio"
                  aria-label={contactLabel}
                  className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/40 bg-white/70 text-neutral-900 backdrop-blur-xl transition-[box-shadow,color,background-color,border-color,width] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-white/90 group-hover:border-emerald-300/40 group-hover:text-emerald-700 group-hover:shadow-[0_22px_45px_-10px_rgba(16,185,129,0.18),inset_0_1px_0_rgba(255,255,255,0.8)] active:shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 dark:border-white/[0.12] dark:bg-white/[0.08] dark:text-white dark:backdrop-blur-xl dark:group-hover:bg-white/[0.14] dark:group-hover:border-emerald-500/20 dark:group-hover:text-emerald-50 dark:group-hover:shadow-[0_25px_50px_-12px_rgba(16,185,129,0.12),0_15px_30px_-5px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] md:w-auto md:px-4 md:py-2 md:gap-2"
                >
                  <Mail className="h-4 w-4 flex-shrink-0 drop-shadow-sm dark:drop-shadow-[0_1px_0_rgba(255,255,255,0.03)]" />
                  <span className="hidden md:inline text-sm font-semibold tracking-tight transition-colors">{contactLabel}</span>
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
