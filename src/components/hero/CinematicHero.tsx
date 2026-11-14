import type { CSSProperties } from 'react';
import type { HeroImage, Reportage } from '../../content/types';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { IconArrow, IconChevronDown, PhageGlyph } from '../ui/icons';
import { NeonButton } from '../ui/NeonButton';
import { ParticleField } from '../ui/ParticleField';

export function HeroPicture({
  hero,
  className = '',
  priority = false,
}: {
  hero: HeroImage;
  className?: string;
  priority?: boolean;
}) {
  return (
    <img
      className={className}
      src={hero.src}
      srcSet={hero.srcSet}
      sizes={hero.sizes}
      width={hero.width}
      height={hero.height}
      alt={hero.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
}

export function CinematicHero({ reportage }: { reportage: Reportage }) {
  const reducedMotion = usePrefersReducedMotion();
  const accentStyle = {
    '--accent': reportage.accent.primary,
    '--accent-2': reportage.accent.secondary,
    '--accent-warm': reportage.accent.warm,
  } as CSSProperties;

  const scrollToExplainer = () => {
    document.getElementById('wie-es-funktioniert')?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <section className="hero" aria-labelledby="hero-title" style={accentStyle}>
      <div className="hero__media">
        <HeroPicture hero={reportage.hero} className="hero__image" priority />
        <div className="hero__scrim" aria-hidden="true" />
        <ParticleField className="hero__particles" />
        <PhageGlyph className="hero__phage hero__phage--left" />
        <PhageGlyph className="hero__phage hero__phage--right" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            {reportage.eyebrow}
          </p>

          <h1 className="hero__title" id="hero-title">
            <span className="hero__line">{reportage.headlineLead}</span>
            <span className="hero__line hero__line--accent">{reportage.headlineAccent}</span>
          </h1>

          <p className="hero__sub">{reportage.subheadline}</p>

          <div className="hero__actions">
            <NeonButton to={`/reportagen/${reportage.slug}`} className="btn--hero">
              Reportage entdecken
              <IconArrow className="btn__icon" />
            </NeonButton>
            <NeonButton variant="ghost" onClick={scrollToExplainer}>
              Wie funktioniert das?
              <IconChevronDown className="btn__icon" />
            </NeonButton>
          </div>

          <p className="hero__meta">
            <span>Forschung: {reportage.researchDate}</span>
            <span className="hero__meta-sep" aria-hidden="true" />
            <span>Lesezeit {reportage.readingTime}</span>
          </p>
        </div>
      </div>

      <div className="container hero__explore">
        <span>Scroll to explore</span>
        <span className="hero__explore-rule" aria-hidden="true" />
        <span>Wissenschaft statt Wunder</span>
      </div>
    </section>
  );
}
