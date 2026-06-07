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
            <span className="bg-gradient-to-r from-emerald-700 via-teal-600 to-blue-700 bg-clip-text text-transparent dark:from-emerald-200 dark:via-slate-200 dark:to-blue-300">
              Qualcosa
            </span>
            .
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-7 max-w-2xl text-lg leading-8 text-neutral-600 transition-colors duration-500 dark:text-neutral-400 md:text-xl"
          >
            Sono Mattia Amendola, full-stack developer. Progetto interfacce pulite e backend solidi
            per trasformare prodotti complessi in esperienze veloci, eleganti e facili da usare.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton>
              <Link
                href="mailto:mattiaa.mendolaa@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-300/35 bg-gradient-to-r from-emerald-500 to-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-emerald-900/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 dark:border-white/10 dark:from-slate-100 dark:to-slate-300 dark:text-slate-950 dark:shadow-[0_0_24px_rgba(148,163,184,0.16)] dark:hover:shadow-[0_0_34px_rgba(148,163,184,0.22)]"
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
                className="rounded-[1.75rem] border border-white/50 bg-white/65 px-5 py-5 shadow-[0_18px_40px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-2xl transition-all duration-300 ease-out dark:border-white/10 dark:bg-[#0f172a]/60 dark:shadow-[0_8px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] hover:dark:border-white/20 hover:dark:bg-[#1e293b]/60 hover:dark:shadow-[0_0_25px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.15)] hover:-translate-y-1"
              >
                <p className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">{stat.value}</p>
                <p className="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
    
  );
}