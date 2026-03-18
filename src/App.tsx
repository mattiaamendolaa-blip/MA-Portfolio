import { useEffect, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import './App.scss';

import { 
  FaReact, FaAngular, FaHtml5, FaNodeJs, FaNetworkWired, 
  FaLinkedin, FaGithub, FaEnvelope, FaBars, FaTimes 
} from 'react-icons/fa';
import { 
  SiTypescript, SiJavascript, SiSass, SiTailwindcss, 
  SiSpringboot, SiMongodb, SiMysql 
} from 'react-icons/si';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add('page-enter');
    const enterTimer = window.setTimeout(() => {
      document.body.classList.remove('page-enter');
    }, 1200);

    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll * 100);

      if (window.scrollY > 300) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setIsMenuOpen(false);
      }
    };

    const observerOptions = { threshold: 0.4 };
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15 });

    const sections = document.querySelectorAll('section');
    sections.forEach((sec) => spyObserver.observe(sec));

    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => revealObserver.observe(el));

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.clearTimeout(enterTimer);
      spyObserver.disconnect();
      revealObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>

      <div className="spotlight-overlay"></div>
      <div className="aurora-bg">
        <div className="aurora-blob blob-1"></div>
        <div className="aurora-blob blob-2"></div>
        <div className="aurora-blob blob-3"></div>
      </div>

      {isScrolled && isMenuOpen && (
        <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}

      <nav className={`floating-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <a 
            href="#hero" 
            className={activeSection === 'hero' ? 'active' : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </a>
          <a 
            href="#projects" 
            className={activeSection === 'projects' ? 'active' : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            Progetti
          </a>
          <a 
            href="#skills" 
            className={activeSection === 'skills' ? 'active' : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            Skills
          </a>
        </div>
      </nav>

      <div className="portfolio-container">
        {/* HERO SECTION */}
        <section id="hero" className="hero reveal">
          <div className="badge">● Software Architect</div>
          <h1 className="title"><span className="highlight">Mattia Amendola</span></h1>
          <p className="typewriter-text">Full-Stack Developer <span className="cursor">|</span></p>
          <p className="description">Studio software architect presso l'ITS Angelo Rizzoli.</p>
          <div className="cta-group">
            <button className="btn-primary" onClick={() => document.getElementById('footer')?.scrollIntoView()}>Contattami</button>
          </div>
        </section>

        {/* PROGETTI SECTION */}
        <section id="projects" className="section reveal">
          <h2 className="section-tag">//I miei progetti</h2>
          
          <Tilt 
            className="tilt-wrapper"
            glareEnable={true} 
            glareMaxOpacity={0.15} 
            glareColor="#ffffff" 
            glarePosition="all" 
            glareBorderRadius="20px"
            tiltMaxAngleX={6} 
            tiltMaxAngleY={6} 
            perspective={1000} 
            scale={1.02} 
            transitionSpeedEnter={400}
            transitionSpeedExit={400}
            gyroscope={false}
            trackOnWindow={false}      
          >
            <div className="project-card">
              <div className="project-header">
                <span>App</span>
                <span className="year">2026</span>
              </div>
              <h3>Applicazione di online food delivery</h3>
              <p>Un'architettura completa per una app di food delivery con autenticazione cifrata e gestione DB.</p>
              <div className="project-tags">
                <span>Kotlin</span>
                <span>Node.js</span>
                <span>MongoDB</span>
              </div>
            </div>
          </Tilt>

          <Tilt 
            className="tilt-wrapper"
            glareEnable={true} 
            glareMaxOpacity={0.15} 
            glareColor="#ffffff" 
            glarePosition="all" 
            glareBorderRadius="20px"
            tiltMaxAngleX={6} 
            tiltMaxAngleY={6} 
            perspective={1000} 
            scale={1.02}
            gyroscope={false}
          >
            <div className="project-card">
              <div className="project-header">
                <span>Bigliettino</span>
                <span className="year">2025</span>
                <span
                  className="github"
                  onClick={() => window.open('https://github.com/mattiaamendolaa-blip/portfolio-nfc', '_blank')}
                >
                  <FaGithub /> GitHub ↗
                </span>
              </div>
              <h3>Bigliettino da visita tramite NFC card</h3>
              <p>Creazione di un bigliettino da visita digitale con tecnologia NFC e sito web integrato.</p>
              <div className="project-tags">
                <span>Angular</span>
                <span>NFC Tech</span>
              </div>
            </div>
          </Tilt>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="section reveal">
          <div className="section-tag">//Stack</div>
          <h2 className="section-title">Le mie Skills</h2>
          
          <div className="skill-group">
            <div className="category"><div className="dot frontend"></div>Frontend</div>
            <div className="tags">
              <span><FaReact color="#61DAFB" /> React</span>
              <span><FaAngular color="#DD0031" /> Angular</span>
              <span><SiTypescript color="#3178C6" /> TS</span>
              <span><SiJavascript color="#F7DF1E" /> JS</span>
              <span><FaHtml5 color="#E34F26" /> HTML & CSS</span>
              <span><SiSass color="#CC6699" /> SCSS</span>
              <span><SiTailwindcss color="#06B6D4" /> Tailwind</span>
            </div>
          </div>

          <div className="skill-group">
            <div className="category"><div className="dot backend"></div>Backend</div>
            <div className="tags">
              <span><SiSpringboot color="#6DB33F" /> Java SpringBoot</span>
              <span><FaNodeJs color="#339933" /> Node.js</span>
              <span><SiMongodb color="#47A248" /> MongoDB</span>
              <span><SiMysql color="#4479A1" /> MySQL</span>
              <span><FaNetworkWired color="#24b9b9" /> RESTful APIs</span>
           </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="footer" className="footer reveal">
          <div className="divider"></div>
          <p>© 2026 Mattia Amendola. Tutti i diritti riservati.</p>
          <div className="socials">
            <a href="https://www.linkedin.com/in/mattia-amendola-726713307/" target="_blank" rel="noreferrer"><FaLinkedin /> LinkedIn</a>
            <a href="https://github.com/mattiaamendolaa-blip" target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>
            <a href="mailto:mattiaa.mendolaa@gmail.com"><FaEnvelope /> Email</a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;