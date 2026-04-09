import { useEffect, useRef, useState } from 'react';
import type { CopyStrings } from '../copy';

interface StatDef {
  value: number;
  suffix: string;
  label: string;
}

/* Animazione contatore: 0 → target con ease-out */
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1200;
          const start = performance.now();

          function step(now: number) {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
            setCount(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(step);
          }

          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

interface StatsProps {
  t: CopyStrings;
}

export default function Stats({ t }: StatsProps) {
  const stats: StatDef[] = [
    { value: 2, suffix: '+', label: t.statsProjects },
    { value: 12, suffix: '', label: t.statsTech },
    { value: 2, suffix: '', label: t.statsFrameworks },
  ];

  return (
    <div className="stats-row reveal">
      {stats.map((s, i) => (
        <div className="stat-item" key={i} data-stagger style={{ '--stagger': i } as React.CSSProperties}>
          <span className="stat-value">
            <AnimatedCounter target={s.value} suffix={s.suffix} />
          </span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
