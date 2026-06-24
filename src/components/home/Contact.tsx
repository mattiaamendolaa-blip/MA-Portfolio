"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Check, Copy } from "lucide-react";

const EMAIL = "mattiaa.mendolaa@gmail.com";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    // Apre il client email se configurato
    window.location.href = `mailto:${EMAIL}?subject=Contatto%20dal%20Portfolio`;

    // Fallback affidabile: copia sempre l'indirizzo negli appunti
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard non disponibile, il mailto resta comunque attivo
    }
  };

  return (
    <section className="relative py-24 md:py-32 scroll-mt-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] as const }}
          className="space-y-6"
        >
          <span className="block w-10 h-0.5 rounded-full bg-emerald-500 dark:bg-emerald-400 mx-auto" aria-hidden="true" />

          <h2 className="font-[family:var(--font-display)] text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-3xl md:text-4xl text-balance">
            Lavoriamo insieme
          </h2>

          <p className="text-base text-neutral-700 dark:text-neutral-300 max-w-[50ch] mx-auto text-pretty">
            Hai un progetto in mente o vuoi semplicemente fare due chiacchiere? Scrivimi.
          </p>

          <motion.button
            type="button"
            onClick={handleClick}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] as const, delay: 0.15 }}
            aria-label={`Copia o scrivi a ${EMAIL}`}
            className="group inline-flex items-center gap-2 sm:gap-3 rounded-full border border-neutral-200 bg-white px-5 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg font-semibold text-neutral-900 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-emerald-300/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 dark:border-white/[0.08] dark:bg-neutral-900/60 dark:text-white dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] dark:hover:border-emerald-400/20 dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          >
            <Mail className="h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>{EMAIL}</span>
            <span className="relative ml-0.5 hidden h-5 w-5 flex-shrink-0 sm:block" aria-hidden="true">
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="check"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute inset-0 flex items-center justify-center opacity-40 transition-opacity group-hover:opacity-70"
                  >
                    <Copy className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </motion.button>

          <div className="h-5">
            <AnimatePresence>
              {copied && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  className="text-xs font-medium text-emerald-600 dark:text-emerald-400"
                >
                  Email copiata negli appunti
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-6 pt-2">
            <a
              href="https://github.com/mattiaamendolaa-blip"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-500 transition-colors duration-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              GitHub
            </a>
            <span className="h-4 w-px bg-neutral-200 dark:bg-white/10" aria-hidden="true" />
            <a
              href="https://www.linkedin.com/in/mattia-amendola-726713307/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-500 transition-colors duration-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
