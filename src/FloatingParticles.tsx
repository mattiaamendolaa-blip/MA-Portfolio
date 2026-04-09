import React from 'react';
import './FloatingParticles.scss';

// Particelle base (mobile + desktop)
const PARTICLES_BASE = [
  { id: 0,  x: 6,  size: 2,   delay: 0,    duration: 14, color: '#10b981', shape: 'circle' },
  { id: 1,  x: 15, size: 1.5, delay: 2.2,  duration: 10, color: '#6366f1', shape: 'square' },
  { id: 2,  x: 24, size: 3,   delay: 5.1,  duration: 16, color: '#10b981', shape: 'circle' },
  { id: 3,  x: 35, size: 1,   delay: 1.0,  duration: 11, color: '#38bdf8', shape: 'circle' },
  { id: 4,  x: 44, size: 2.5, delay: 7.3,  duration: 13, color: '#6366f1', shape: 'square' },
  { id: 5,  x: 55, size: 1.5, delay: 3.8,  duration: 12, color: '#10b981', shape: 'circle' },
  { id: 6,  x: 65, size: 2,   delay: 0.5,  duration: 15, color: '#38bdf8', shape: 'circle' },
  { id: 7,  x: 74, size: 1,   delay: 6.0,  duration: 9,  color: '#10b981', shape: 'square' },
  { id: 8,  x: 83, size: 2.5, delay: 4.5,  duration: 14, color: '#6366f1', shape: 'circle' },
  { id: 9,  x: 91, size: 1.5, delay: 2.0,  duration: 11, color: '#10b981', shape: 'circle' },
  { id: 10, x: 11, size: 1,   delay: 9.0,  duration: 13, color: '#38bdf8', shape: 'square' },
  { id: 11, x: 29, size: 2,   delay: 8.5,  duration: 10, color: '#10b981', shape: 'circle' },
  { id: 12, x: 50, size: 1.5, delay: 11.0, duration: 12, color: '#6366f1', shape: 'circle' },
  { id: 13, x: 70, size: 3,   delay: 6.8,  duration: 17, color: '#38bdf8', shape: 'circle' },
  { id: 14, x: 88, size: 1,   delay: 10.5, duration: 11, color: '#10b981', shape: 'square' },
];

// Particelle extra visibili solo su desktop (classe fp-desktop)
const PARTICLES_DESKTOP = [
  { id: 15, x: 3,  size: 1,   delay: 3.5,  duration: 18, color: '#10b981', shape: 'circle' },
  { id: 16, x: 19, size: 2,   delay: 13.0, duration: 14, color: '#38bdf8', shape: 'square' },
  { id: 17, x: 38, size: 1.5, delay: 4.0,  duration: 12, color: '#6366f1', shape: 'circle' },
  { id: 18, x: 48, size: 2.5, delay: 15.0, duration: 16, color: '#10b981', shape: 'circle' },
  { id: 19, x: 60, size: 1,   delay: 7.5,  duration: 13, color: '#38bdf8', shape: 'square' },
  { id: 20, x: 77, size: 2,   delay: 12.0, duration: 15, color: '#6366f1', shape: 'circle' },
  { id: 21, x: 95, size: 1.5, delay: 1.5,  duration: 11, color: '#10b981', shape: 'circle' },
  { id: 22, x: 33, size: 1,   delay: 16.0, duration: 14, color: '#6366f1', shape: 'square' },
  { id: 23, x: 57, size: 3,   delay: 9.5,  duration: 19, color: '#38bdf8', shape: 'circle' },
];

export default function FloatingParticles() {
  return (
    <div className="floating-particles" aria-hidden="true">
      {PARTICLES_BASE.map(p => (
        <span
          key={p.id}
          className="fp-dot"
          style={{
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
      {PARTICLES_DESKTOP.map(p => (
        <span
          key={p.id}
          className="fp-dot fp-desktop"
          style={{
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
