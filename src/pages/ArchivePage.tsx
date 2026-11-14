import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { HeroPicture } from '../components/hero/CinematicHero';
import { IconArrow } from '../components/ui/icons';
import { listPublishedReportagen, upcomingReportagen } from '../content/reportagen';
import { useSeo } from '../lib/seo';

export function ArchivePage() {
  const published = listPublishedReportagen();

  useSeo({
    title: 'Alle Reportagen — Mays-Reportagen',
    description:
      'Das Archiv von Mays-Reportagen: veröffentlichte Titelgeschichten und angekündigte Themen.',
    canonicalPath: '/reportagen',
    image: '/media/phagen/og-phagen.jpg',
    imageAlt: 'Mays-Reportagen',
  });

  return (
    <div className="page archive-page">
      <header className="page-hero">
        <div className="container page-hero__inner">
          <p className="section-kicker">Das Magazin</p>
          <h1>Alle Reportagen</h1>
          <p>
            Jede Titelgeschichte bleibt dauerhaft über ihre eigene URL erreichbar. Neue
            Ausgaben erhalten ein eigenes Titelmotiv, eine eigene Akzentfarbe und eigene
            Quellen.
          </p>
        </div>
      </header>

      <section className="reportagen" aria-labelledby="archiv-titel">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="section-kicker">Archiv</p>
              <h2 id="archiv-titel">
                {published.length} veröffentlichte {published.length === 1 ? 'Reportage' : 'Reportagen'}
              </h2>
            </div>
            <p className="section-head__note">Neueste zuerst, sortiert nach redaktioneller Priorität.</p>
          </div>

          {published.map((reportage) => (
            <Link
              key={reportage.slug}
              className="featured-card"
              to={`/reportagen/${reportage.slug}`}
              style={
                {
                  '--accent': reportage.accent.primary,
                  '--accent-2': reportage.accent.secondary,
                } as CSSProperties
              }
            >
              <div className="featured-card__media">
                <HeroPicture hero={reportage.hero} className="featured-card__image" />
                <span className="badge badge--live">Titelgeschichte</span>
              </div>
              <div className="featured-card__body">
                <p className="featured-card__eyebrow">{reportage.eyebrow}</p>
                <h3>{reportage.title}</h3>
                <p>{reportage.teaser}</p>
                <ul className="featured-card__meta">
                  <li>{reportage.researchDate}</li>
                  <li>{reportage.readingTime} Lesezeit</li>
                  <li>{reportage.sources.length} Quellen</li>
                </ul>
                <span className="featured-card__cta">
                  Reportage lesen
                  <IconArrow className="featured-card__icon" />
                </span>
              </div>
            </Link>
          ))}

          <div className="upcoming">
            <h3 className="upcoming__title">In Vorbereitung</h3>
            <div className="upcoming__grid">
              {upcomingReportagen.map((item) => (
                <article
                  key={item.title}
                  className="upcoming-card"
                  style={{ '--accent': item.accent } as CSSProperties}
                >
                  <span className="badge">Geplant</span>
                  <p className="upcoming-card__topic">{item.topic}</p>
                  <h4>{item.title}</h4>
                  <p>{item.teaser}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
