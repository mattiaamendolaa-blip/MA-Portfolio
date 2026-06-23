"use client";

import { motion } from "framer-motion";

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
    <section className="relative overflow-hidden pt-24 pb-20 md:pt-28 md:pb-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl"
        > 
          <motion.h1
            variants={itemVariants}
            className="max-w-4xl font-[family:var(--font-display)] text-5xl font-extrabold tracking-[-0.06em] text-neutral-950 transition-colors duration-500 dark:text-white sm:text-6xl md:text-7xl lg:text-[5.5rem] text-balance"
          >
            Ciao, sono Mattia Amendola un
            <br />
            <span className="text-emerald-600 dark:text-emerald-400">
              full-stack developer
            </span>
            .
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-7 max-w-2xl text-lg leading-8 text-neutral-700 transition-colors duration-500 dark:text-neutral-300 md:text-xl text-pretty"
          >
            Progetto interfacce pulite e backend solidi per trasformare prodotti complessi in esperienze eleganti e performanti.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-14 grid max-w-3xl gap-4 sm:grid-cols-2"
          >
            <div
              className="sm:row-span-2 rounded-[1.75rem] border border-neutral-200/60 bg-white px-6 py-7 shadow-[0_4px_24px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:border-emerald-300/30 hover:shadow-[0_8px_32px_rgba(15,23,42,0.08)] hover:-translate-y-1 dark:border-white/[0.08] dark:bg-neutral-900/60 dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:dark:border-emerald-400/15 hover:dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col justify-center"
            >
              <p className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">5+</p>
              <p className="mt-2 text-sm leading-6 text-neutral-700 dark:text-neutral-300">anni nel web development</p>
            </div>
            {[
              { value: "Full stack", label: "frontend e backend" },
              { value: "UX first", label: "performance e accessibilità" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.75rem] border border-neutral-200/60 bg-white px-5 py-5 shadow-[0_4px_24px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:border-emerald-300/30 hover:shadow-[0_8px_32px_rgba(15,23,42,0.08)] hover:-translate-y-1 dark:border-white/[0.08] dark:bg-neutral-900/60 dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:dark:border-emerald-400/15 hover:dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
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