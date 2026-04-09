import { FaBars, FaTimes } from 'react-icons/fa';
import type { CopyStrings, Lang } from '../copy';

interface NavbarProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: CopyStrings;
  isScrolled: boolean;
  navVisible: boolean;
  activeSection: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export default function Navbar({
  lang,
  setLang,
  t,
  isScrolled,
  navVisible,
  activeSection,
  isMenuOpen,
  setIsMenuOpen,
}: NavbarProps) {
  return (
    <nav className={`floating-nav ${isScrolled ? 'scrolled' : ''} ${!navVisible ? 'nav-hidden' : ''}`}>
      <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <a
          href="#hero"
          className={activeSection === 'hero' ? 'active' : ''}
          onClick={() => setIsMenuOpen(false)}
        >
          {t.navHome}
        </a>
        <a
          href="#projects"
          className={activeSection === 'projects' ? 'active' : ''}
          onClick={() => setIsMenuOpen(false)}
        >
          {t.navProjects}
        </a>
        <a
          href="#skills"
          className={activeSection === 'skills' ? 'active' : ''}
          onClick={() => setIsMenuOpen(false)}
        >
          {t.navSkills}
        </a>
      </div>

      <button
        className="lang-toggle"
        onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
        aria-label="Toggle language"
      >
        {lang === 'it' ? 'EN' : 'IT'}
      </button>
    </nav>
  );
}
