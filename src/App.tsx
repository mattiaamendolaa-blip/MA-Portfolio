import { useEffect, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import './App.scss';


import { 
  FaReact, FaAngular, FaHtml5, FaNodeJs, FaNetworkWired, 
  FaLinkedin, FaGithub, FaEnvelope 
} from 'react-icons/fa';
import { 
  SiTypescript, SiJavascript, SiSass, SiTailwindcss, 
  SiSpringboot, SiMongodb, SiMysql 
} from 'react-icons/si';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Animazione entrata pagina
    document.body.classList.add('page-enter');
    const enterTimer = window.setTimeout(() => {
      document.body.classList.remove('page-enter');
    }, 1200);

    // Animazione elementi allo scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15 });

    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll) * 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.clearTimeout(enterTimer);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Barra di progresso dello scroll */}
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {}
      <div className="aurora-bg">
        <div className="aurora-blob blob-1"></div>
        <div className="aurora-blob blob-2"></div>
        <div className="aurora-blob blob-3"></div>
      </div>

      {}
      <nav className="floating-nav">
        <a href="#hero">Home</a>
        <a href="#projects">Progetti</a>
        <a href="#skills">Skills</a>
      </nav>

      <div className="portfolio-container">
        {/* HERO SECTION */}
        <section id="hero" className="hero reveal">
          <div className="badge">● Software Architect</div>
          <h1 className="title"><span className="highlight">Mattia Amendola</span></h1>
          <p className="typewriter-text">Full-Stack Developer <span className="cursor">|</span></p>
          <p className="description">Studio software architect presso l'ITS Angelo Rizzoli.</p>
          <div className="cta-group">
            <button className="btn-primary">Contattami</button>
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
            scale={1.05} 
            transitionSpeedEnter={400}
            transitionSpeedExit={400}
            gyroscope={true}
          >
            <div className="project-card">
              <div className="project-header">
                <span>App</span>
                <span className="year">2026</span>
              </div>
              <h3>Applicazione di online food delivery</h3>
              <p>Un'architettura completa per una app di Online food delivery (Senza approfondire sul lato UI) con registrazione e autenticazione degli utenti, con le psw che venogno salvate e cifrate nel DB.</p>
              <div className="project-tags">
                <span>Kotlin</span>
                <span>JS</span>
                <span>Node.js</span>
                <span>MongoDB</span>
                <span>Ngrok</span>
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
            scale={1.05} 
            transitionSpeedEnter={400}
            transitionSpeedExit={400}
            gyroscope={true}
          >
            <div className="project-card">
              <div className="project-header">
                <span>Bigliettino</span>
                <span className="year">2025</span>
                <span
                  className="github"
                  role="button"
                  tabIndex={0}
                  onClick={() => window.open('https://github.com/mattiaamendolaa-blip/portfolio-nfc', '_blank', 'noopener,noreferrer')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      window.open('https://github.com/mattiaamendolaa-blip/portfolio-nfc', '_blank', 'noopener,noreferrer');
                    }
                  }}
                >
                  <FaGithub style={{ marginRight: '4px' }}/> GitHub ↗
                </span>
              </div>
              <h3>Bigliettino da visita tramite NFC card</h3>
              <p>Creazione di un bigliettino da visita funzionante con l'utilizzo di nfc e implementazione sito web al suo interno.</p>
              <div className="project-tags">
                <span>Angular</span>
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
              <span><SiSass color="#CC6699" /> SCSS / Sass</span>
              <span><SiTailwindcss color="#06B6D4" /> Tailwind CSS</span>
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
        <footer className="footer reveal">
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