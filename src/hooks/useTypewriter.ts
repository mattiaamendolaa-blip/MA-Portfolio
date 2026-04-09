import { useEffect, useRef, useState } from 'react';

/**
 * Hook riutilizzabile per effetto typewriter ciclico.
 * Digita → pausa → cancella → parola successiva → ripete.
 */
export function useTypewriter(
  words: readonly string[],
  typingMs = 72,
  deletingMs = 42,
  pauseMs = 2200,
) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const pauseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const word = words[wordIdx % words.length];

    // Fine scrittura → pausa prima di cancellare
    if (!deleting && charIdx === word.length) {
      pauseRef.current = setTimeout(() => setDeleting(true), pauseMs);
      return () => {
        if (pauseRef.current) clearTimeout(pauseRef.current);
      };
    }

    const speed = deleting ? deletingMs : typingMs;
    const timer = setTimeout(() => {
      if (deleting) {
        const next = charIdx - 1;
        setDisplayed(word.slice(0, next));
        setCharIdx(next);
        if (next === 0) {
          setDeleting(false);
          setWordIdx((i) => (i + 1) % words.length);
        }
      } else {
        const next = charIdx + 1;
        setDisplayed(word.slice(0, next));
        setCharIdx(next);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, typingMs, deletingMs, pauseMs]);

  return displayed;
}
