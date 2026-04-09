import type React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { CONFIG } from '../config';
import type { CopyStrings, Lang } from '../copy';
import { useTypewriter } from '../hooks/useTypewriter';
import ScaricaContatto from '../ScaricaContatto';
import Magnetic from './Magnetic';

interface HeroProps {
  lang: Lang;
  t: CopyStrings;
}

const S = (n: number): React.CSSProperties => ({ '--stagger': n } as React.CSSProperties);

export default function Hero({ lang, t }: HeroProps) {
  const role = useTypewriter(CONFIG.roles);

  return (
    <section id="hero" className="hero reveal">
      <div className="badge" data-stagger style={S(0)}>
        * {t.badge}
      </div>

      <h1 className="title" data-stagger style={S(1)}>
        <span className="highlight">{CONFIG.name}</span>
      </h1>

      <p className="typewriter-text" data-stagger style={S(2)}>
        {role}
        <span className="cursor">|</span>
      </p>

      <p className="description" data-stagger style={S(3)}>
        {t.description}
      </p>

      <div className="cta-group" data-stagger style={S(4)}>
        <Magnetic>
          <button
            className="btn-primary"
            onClick={() => window.open(`mailto:${CONFIG.email}`, '_self')}
          >
            {t.cta} <FaArrowRight className="btn-arrow" aria-hidden />
          </button>
        </Magnetic>
        <Magnetic>
          <ScaricaContatto
            lang={lang}
            copy={{ save: t.saveContact, saved: t.savedContact }}
          />
        </Magnetic>
      </div>
    </section>
  );
}
