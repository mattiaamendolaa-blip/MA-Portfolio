"use client";

import { motion } from "framer-motion";
import { Lightbulb, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "Progetto",
    description: "Analizzo le esigenze, definisco l'architettura e pianifico ogni dettaglio prima di scrivere una riga.",
  },
  {
    icon: Code2,
    title: "Sviluppo",
    description: "Codice pulito, componenti riutilizzabili, test e iterazione continua fino al risultato perfetto.",
  },
  {
    icon: Rocket,
    title: "Deploy",
    description: "Ottimizzazione performance, CI/CD, monitoring. Il prodotto va in produzione pronto a scalare.",
  },
];

const itemVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] as const } },
};

export function Process() {
  return (
    <section className="relative py-20 md:py-28 scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-14 text-center">
          <h2 className="font-[family:var(--font-display)] text-3xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 md:text-4xl text-balance">
            Come lavoro
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid gap-4 sm:gap-6 md:grid-cols-3"
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={itemVariant}
                className="rounded-2xl border border-neutral-200/60 bg-white px-6 py-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-emerald-300/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] hover:-translate-y-1 dark:border-white/[0.08] dark:bg-neutral-900/60 dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] dark:hover:border-emerald-400/15"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 dark:bg-emerald-400/10">
                  <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 max-w-[45ch]">{step.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
