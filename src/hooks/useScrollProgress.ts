import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Traccia progresso scroll, soglia scrolled, e direzione (up/down).
 * La direzione ha un dead-zone di 5px per evitare flicker.
 */
export function useScrollProgress(scrolledThreshold = 300) {
  const [progress, setProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up');
  const lastY = useRef(0);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    const height =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;

    setProgress(height > 0 ? (y / height) * 100 : 0);
    setIsScrolled(y > scrolledThreshold);

    // Direzione con dead-zone 5px
    if (y > lastY.current + 5) setScrollDir('down');
    else if (y < lastY.current - 5) setScrollDir('up');

    lastY.current = y;
  }, [scrolledThreshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // In cima alla pagina → sempre "up" (nav visibile)
  const navVisible = scrollDir === 'up' || !isScrolled;

  return { progress, isScrolled, scrollDir, navVisible };
}
