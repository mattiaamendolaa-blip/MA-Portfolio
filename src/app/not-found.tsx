import { FileQuestion, ArrowLeft, Link } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
      
      {/* Icona */}
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mb-8">
        <FileQuestion className="h-10 w-10 text-neutral-400" />
      </div>

      {/* Testo */}
      <h1 className="text-4xl font-bold tracking-tight mb-2">404 - Pagina non trovata</h1>
      <p className="text-neutral-500 dark:text-neutral-400 text-center max-w-md mb-8 leading-relaxed">
        Ops! Sembra che tu ti sia perso. La pagina che stai cercando non esiste o è stata spostata.
      </p>

      {/* Pulsante di ritorno */}
      <Link 
  href="/" 
  className="group flex items-center gap-2 px-5 py-3 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium transition-transform hover:scale-105 active:scale-95"
>
  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
  Torna alla Home
</Link>
      
    </div>
  );
}