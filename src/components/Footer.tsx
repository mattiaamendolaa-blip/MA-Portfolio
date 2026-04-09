import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { CONFIG } from '../config';
import type { CopyStrings } from '../copy';

interface FooterProps {
  t: CopyStrings;
}

export default function Footer({ t }: FooterProps) {
  return (
    <footer id="footer" className="footer reveal">
      <div className="divider" />

      <h3 className="footer-heading" data-stagger style={{ '--stagger': 0 } as React.CSSProperties}>
        {t.footerHeading}
      </h3>

      <a
        className="footer-email"
        href={`mailto:${CONFIG.email}`}
        data-stagger
        style={{ '--stagger': 1 } as React.CSSProperties}
      >
        {CONFIG.email}
      </a>

      <div className="socials" data-stagger style={{ '--stagger': 2 } as React.CSSProperties}>
        <a
          href={CONFIG.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin aria-hidden /> LinkedIn
        </a>
        <a
          href={CONFIG.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub aria-hidden /> GitHub
        </a>
      </div>

      <p className="footer-copy" data-stagger style={{ '--stagger': 3 } as React.CSSProperties}>
        {t.footer}
      </p>
    </footer>
  );
}
