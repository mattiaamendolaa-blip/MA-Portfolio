import Tilt from 'react-parallax-tilt';
import { FaGithub, FaLock } from 'react-icons/fa';
import { CONFIG } from '../config';
import type { CopyStrings } from '../copy';

interface ProjectsProps {
  t: CopyStrings;
}

const TILT_OPTS = {
  glareEnable: true,
  glareMaxOpacity: 0.06,
  glareColor: '#ffffff',
  glarePosition: 'all' as const,
  glareBorderRadius: '16px',
  tiltMaxAngleX: 4,
  tiltMaxAngleY: 4,
  perspective: 1400,
  scale: 1.01,
  gyroscope: false,
};

export default function Projects({ t }: ProjectsProps) {
  return (
    <section id="projects" className="section reveal">
      <h2 className="section-tag" data-stagger style={{ '--stagger': 0 } as React.CSSProperties}>
        {t.projectsTag}
      </h2>

      {/* Progetto 1 — privato */}
      <Tilt className="tilt-wrapper" {...TILT_OPTS} trackOnWindow={false}>
        <div className="project-card" data-stagger style={{ '--stagger': 1 } as React.CSSProperties}>
          <div className="project-header">
            <span>{t.projectOneType}</span>
            <span className="year">2026</span>
            <span className="private-label">
              <FaLock aria-hidden /> {t.privateLabel}
            </span>
          </div>
          <h3>{t.projectOneTitle}</h3>
          <p>{t.projectOneDesc}</p>
          <div className="project-tags">
            <span>Kotlin</span>
            <span>Node.js</span>
            <span>MongoDB</span>
          </div>
        </div>
      </Tilt>

      {/* Progetto 2 — pubblico */}
      <Tilt className="tilt-wrapper" {...TILT_OPTS}>
        <div className="project-card" data-stagger style={{ '--stagger': 2 } as React.CSSProperties}>
          <div className="project-header">
            <span>{t.projectTwoType}</span>
            <span className="year">2025</span>
            <span
              className="github"
              onClick={() => window.open(CONFIG.githubNfc, '_blank')}
            >
              <FaGithub aria-hidden /> {t.githubLabel}
            </span>
          </div>
          <h3>{t.projectTwoTitle}</h3>
          <p>{t.projectTwoDesc}</p>
          <div className="project-tags">
            <span>Angular</span>
            <span>NFC Tech</span>
          </div>
        </div>
      </Tilt>
    </section>
  );
}
