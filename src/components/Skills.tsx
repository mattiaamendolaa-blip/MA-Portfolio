import {
  FaReact, FaAngular, FaHtml5, FaNodeJs, FaNetworkWired,
} from 'react-icons/fa';
import {
  SiTypescript, SiJavascript, SiSass, SiTailwindcss,
  SiSpringboot, SiMongodb, SiMysql,
} from 'react-icons/si';
import type { CopyStrings } from '../copy';

interface SkillsProps {
  t: CopyStrings;
}

export default function Skills({ t }: SkillsProps) {
  return (
    <section id="skills" className="section reveal">
      <div className="section-tag" data-stagger style={{ '--stagger': 0 } as React.CSSProperties}>
        {t.stackTag}
      </div>
      <h2 className="section-title" data-stagger style={{ '--stagger': 1 } as React.CSSProperties}>
        {t.skillsTitle}
      </h2>

      <div className="skill-group" data-stagger style={{ '--stagger': 2 } as React.CSSProperties}>
        <div className="category">
          <div className="dot frontend" />
          Frontend
        </div>
        <div className="tags">
          <span><FaReact color="#61DAFB" aria-hidden /> React</span>
          <span><FaAngular color="#DD0031" aria-hidden /> Angular</span>
          <span><SiTypescript color="#3178C6" aria-hidden /> TS</span>
          <span><SiJavascript color="#F7DF1E" aria-hidden /> JS</span>
          <span><FaHtml5 color="#E34F26" aria-hidden /> HTML & CSS</span>
          <span><SiSass color="#CC6699" aria-hidden /> SCSS</span>
          <span><SiTailwindcss color="#06B6D4" aria-hidden /> Tailwind</span>
        </div>
      </div>

      <div className="skill-group" data-stagger style={{ '--stagger': 3 } as React.CSSProperties}>
        <div className="category">
          <div className="dot backend" />
          Backend
        </div>
        <div className="tags">
          <span><SiSpringboot color="#6DB33F" aria-hidden /> Java SpringBoot</span>
          <span><FaNodeJs color="#339933" aria-hidden /> Node.js</span>
          <span><SiMongodb color="#47A248" aria-hidden /> MongoDB</span>
          <span><SiMysql color="#4479A1" aria-hidden /> MySQL</span>
          <span><FaNetworkWired color="#10b981" aria-hidden /> RESTful APIs</span>
        </div>
      </div>
    </section>
  );
}
