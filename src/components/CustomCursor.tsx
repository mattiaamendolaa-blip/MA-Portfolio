import { useEffect, useRef } from 'react';

const IS_FINE_POINTER =
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

/**
 * Cursore personalizzato con lag smooth (lerp). Solo desktop.
 * Scala su hover di elementi interattivi.
 */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!IS_FINE_POINTER) return;

    // Nascondi cursore nativo
    document.documentElement.classList.add('has-custom-cursor');

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive = el.closest('a, button, .project-card, .tilt-wrapper, .lang-toggle');
      ref.current?.classList.toggle('cursor-hover', !!interactive);
    };

    let rafId: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.14;
      pos.current.y += (target.current.y - pos.current.y) * 0.14;
      if (ref.current) {
        ref.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  if (!IS_FINE_POINTER) return null;

  return <div ref={ref} className="custom-cursor" aria-hidden="true" />;
}
