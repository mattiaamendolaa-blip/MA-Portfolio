import { useEffect, useState } from 'react';
import './App.scss';

import { COPY, type Lang } from './copy';
import { useScrollProgress } from './hooks/useScrollProgress';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import FloatingParticles from './FloatingParticles';

function App() {
  const [lang, setLang] = useState<Lang>('it');
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { progress, isScrolled, navVisible } = useScrollProgress(300);

  const t = COPY[lang];

  // ── Spotlight, reveal observer, page-enter ──
  useEffect(() => {
    document.body.classList.add('page-enter');
    const enterTimer = setTimeout(() => document.body.classList.remove('page-enter'), 1200);

    // Mouse spotlight
    let rafId: number | null = null;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mouse-x', `${lastX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${lastY}px`);
        rafId = null;
      });
    };

    // Section spy
    const spyObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { threshold: 0.4 },
    );

    // Reveal on scroll
    const revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('active');
        }),
      { threshold: 0.12 },
    );

    document.querySelectorAll('section, .stats-row, footer').forEach((el) => {
      if (el.id) spyObserver.observe(el);
      if (el.classList.contains('reveal')) revealObserver.observe(el);
    });

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(enterTimer);
      if (rafId !== null) cancelAnimationFrame(rafId);
      spyObserver.disconnect();
      revealObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Chiudi menu mobile quando si scrolla indietro
  useEffect(() => {
    if (!isScrolled) setIsMenuOpen(false);
  }, [isScrolled]);

  return (
    <>
      {/* Progress bar */}
      <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />

      {/* Background layers */}
      <div className="spotlight-overlay" />
      <div className="noise-overlay" />
      <div className="aurora-bg">
        <div className="aurora-blob blob-1" />
        <div className="aurora-blob blob-2" />
        <div className="aurora-blob blob-3" />
      </div>
      <FloatingParticles />

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Menu overlay mobile */}
      {isScrolled && isMenuOpen && (
        <div className="menu-overlay" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Nav */}
      <Navbar
        lang={lang}
        setLang={setLang}
        t={t}
        isScrolled={isScrolled}
        navVisible={navVisible}
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Content */}
      <div className="portfolio-container">
        <Hero lang={lang} t={t} />
        <Stats t={t} />
        <Projects t={t} />
        <Skills t={t} />
        <Footer t={t} />
      </div>
    </>
  );
}

export default App;
