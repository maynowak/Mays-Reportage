import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import type { Reportage } from '../../content/types';
import { HeroPicture } from '../hero/CinematicHero';
import { ParticleField } from '../ui/ParticleField';

export function ReportageHero({ reportage }: { reportage: Reportage }) {
  const accentStyle = {
    '--accent': reportage.accent.primary,
    '--accent-2': reportage.accent.secondary,
    '--accent-warm': reportage.accent.warm,
  } as CSSProperties;

  return (
    <header className="article-hero" style={accentStyle}>
      <div className="article-hero__media">
        <HeroPicture hero={reportage.hero} className="article-hero__image" priority />
        <div className="article-hero__scrim" aria-hidden="true" />
        <ParticleField className="article-hero__particles" />
      </div>

      <div className="container article-hero__inner">
        <nav className="breadcrumbs" aria-label="Brotkrumen">
          <Link to="/">Start</Link>
          <span aria-hidden="true">/</span>
          <Link to="/#reportagen">Reportagen</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Bakteriophagen</span>
        </nav>

        <p className="hero__eyebrow">
          <span className="hero__eyebrow-dot" aria-hidden="true" />
          {reportage.eyebrow}
        </p>

        <h1 className="article-hero__title">{reportage.title}</h1>
        <p className="article-hero__dek">{reportage.teaser}</p>

        <ul className="article-hero__meta" aria-label="Artikelinformationen">
          <li>Forschung: {reportage.researchDate}</li>
          <li>Lesezeit {reportage.readingTime}</li>
          <li>Quellenbasiert · {reportage.sources.length} Quellen</li>
        </ul>

        <ul className="tag-list" aria-label="Themen">
          {reportage.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>

      <p className="article-hero__caption container">{reportage.hero.caption}</p>
    </header>
  );
}
