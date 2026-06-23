"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

import { MagneticButton } from "@/components/ui/MagneticButton";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl"
        > 
          <motion.h1
            variants={itemVariants}
            className="max-w-4xl font-[family:var(--font-display)] text-5xl font-extrabold tracking-[-0.06em] text-neutral-950 transition-colors duration-500 dark:text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            BLABLALBLABLAA{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent dark:from-emerald-300 dark:to-blue-400">
              Qualcosa
            </span>
            .
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-7 max-w-2xl text-lg leading-8 text-neutral-700 transition-colors duration-500 dark:text-neutral-300 md:text-xl"
          >
            Sono Mattia Amendola, full-stack developer. Progetto interfacce pulite e backend solidi
            per trasformare prodotti complessi in esperienze veloci, eleganti e facili da usare.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton>
              <Link
                href="mailto:mattiaa.mendolaa@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.2] bg-gradient-to-r from-emerald-500 to-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(16,185,129,0.2),0_2px_8px_rgba(16,185,129,0.1),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(16,185,129,0.28),0_4px_12px_rgba(16,185,129,0.14),inset_0_1px_0_rgba(255,255,255,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-white/[0.15] dark:from-emerald-500 dark:to-teal-400 dark:text-white dark:shadow-[0_8px_28px_rgba(52,211,153,0.22),0_2px_8px_rgba(52,211,153,0.1),inset_0_1px_0_rgba(255,255,255,0.2)] dark:hover:shadow-[0_12px_36px_rgba(52,211,153,0.32),0_4px_12px_rgba(52,211,153,0.15),inset_0_1px_0_rgba(255,255,255,0.25)]"
              >
                Avviamo un progetto
                <ArrowRight className="h-4 w-4" />
              </Link>
            </MagneticButton>

            
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-14 grid max-w-3xl gap-4 sm:grid-cols-3"
          >
            {[
              { value: "3+", label: "anni nel web development" },
              { value: "Full stack", label: "frontend e backend" },
              { value: "UX first", label: "attenzione a performance e accessibilita" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.75rem] border border-white/[0.35] bg-white/[0.5] px-5 py-5 shadow-[0_18px_40px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85),inset_0_-1px_0_rgba(255,255,255,0.15)] backdrop-blur-[32px] backdrop-saturate-[1.7] transition-all duration-300 ease-out hover:bg-white/[0.6] hover:border-emerald-300/20 hover:shadow-[0_22px_48px_rgba(15,23,42,0.08),0_0_0_1px_rgba(52,211,153,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] hover:-translate-y-1 dark:border-white/[0.1] dark:bg-white/[0.04] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(255,255,255,0.02)] dark:backdrop-saturate-[1.3] hover:dark:border-emerald-400/15 hover:dark:bg-white/[0.07] hover:dark:shadow-[0_12px_36px_rgba(0,0,0,0.5),0_0_16px_rgba(52,211,153,0.04),inset_0_1px_0_rgba(255,255,255,0.12)]"
              >
                <p className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">{stat.value}</p>
                <p className="mt-1 text-sm leading-6 text-neutral-700 dark:text-neutral-300">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
    
  );
}