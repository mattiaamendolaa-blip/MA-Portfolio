"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HyperText } from "@/components/ui/hyper-text";

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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const statsY = useTransform(scrollYProgress, [0, 1], [0, -15]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-24 pb-20 md:pt-28 md:pb-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl"
        >
          <motion.div style={{ y: headingY }}>
            <motion.h1
              variants={itemVariants}
              className="max-w-4xl font-[family:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] text-neutral-950 transition-colors duration-500 dark:text-white sm:text-5xl md:text-7xl lg:text-[5.5rem] text-balance"
            >
              Ciao, sono{" "}
              <HyperText
                as="span"
                startOnView
                animateOnHover={false}
                duration={600}
                delay={400}
                className="inline !p-0 !text-[length:inherit] !font-[weight:inherit] !leading-[inherit]"
              >
                Mattia Amendola
              </HyperText>
              <br />
              <span className="text-emerald-600 dark:text-emerald-400">
                full-stack developer
              </span>
              .
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-7 max-w-[65ch] text-lg leading-8 text-neutral-700 transition-colors duration-500 dark:text-neutral-300 md:text-xl text-pretty"
            >
              Progetto interfacce pulite e backend solidi per trasformare prodotti complessi in esperienze eleganti e performanti.
            </motion.p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            style={{ y: statsY }}
            className="mt-14 grid max-w-3xl gap-4 sm:grid-cols-2"
          >
            <div
              className="sm:row-span-2 rounded-[1.75rem] border border-neutral-200/60 bg-white px-6 py-7 shadow-[0_4px_24px_rgba(15,23,42,0.06)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:border-emerald-300/30 hover:shadow-[0_8px_32px_rgba(15,23,42,0.08)] hover:-translate-y-1 dark:border-white/[0.08] dark:bg-neutral-900/60 dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:dark:border-emerald-400/15 hover:dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col justify-center"
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
                className="rounded-[1.75rem] border border-neutral-200/60 bg-white px-5 py-5 shadow-[0_4px_24px_rgba(15,23,42,0.06)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:border-emerald-300/30 hover:shadow-[0_8px_32px_rgba(15,23,42,0.08)] hover:-translate-y-1 dark:border-white/[0.08] dark:bg-neutral-900/60 dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:dark:border-emerald-400/15 hover:dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
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
