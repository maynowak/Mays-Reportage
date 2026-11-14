import type { CSSProperties } from 'react';

const PARTICLES = Array.from({ length: 18 }, (_, index) => ({
  left: (index * 37 + 11) % 100,
  top: (index * 53 + 7) % 100,
  size: 2 + (index % 3),
  delay: -(index * 0.85),
  duration: 9 + (index % 5) * 2.4,
}));

export function ParticleField({ className = '' }: { className?: string }) {
  return (
    <div className={`particles ${className}`.trim()} aria-hidden="true">
      {PARTICLES.map((particle, index) => (
        <span
          key={index}
          className="particles__dot"
          style={
            {
              '--x': `${particle.left}%`,
              '--y': `${particle.top}%`,
              '--size': `${particle.size}px`,
              '--delay': `${particle.delay}s`,
              '--duration': `${particle.duration}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
