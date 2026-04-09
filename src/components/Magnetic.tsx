import { useRef, type ReactNode } from 'react';

interface MagneticProps {
  children: ReactNode;
  strength?: number;
}

const IS_FINE_POINTER =
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

/**
 * Wrapper che attrae leggermente il contenuto verso il cursore (solo desktop).
 */
export default function Magnetic({ children, strength = 0.15 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  if (!IS_FINE_POINTER) return <>{children}</>;

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        display: 'inline-block',
        transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {children}
    </div>
  );
}
