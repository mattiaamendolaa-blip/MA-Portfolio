"use client";

export function MeshBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[hsl(210_20%_98%)] transition-colors duration-500 dark:bg-[hsl(226_63%_6%)]" />

      <div className="absolute top-[38%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/15 to-transparent dark:via-emerald-400/10" />
    </div>
  );
}
