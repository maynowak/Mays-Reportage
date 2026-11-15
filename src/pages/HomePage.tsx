import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { CinematicHero, HeroPicture } from '../components/hero/CinematicHero';
import { NeonButton } from '../components/ui/NeonButton';
import { IconArrow } from '../components/ui/icons';
import {
  getFeaturedReportage,
  listPublishedReportagen,
  site,
  upcomingReportagen,
} from '../content/reportagen';
import { useSeo } from '../lib/seo';
import { buildWebsiteJsonLd } from '../lib/structured-data';

const EXPLAINERS = [
  {
    title: 'Erreger erkennen',
    text: 'Eine klinische Probe bestimmt das Bakterium, das die Infektion verursacht – nicht der Wohnort entscheidet.',
    target: 'biologie',
  },
  {
    title: 'Phagen matchen',
    text: 'Speziallabore prüfen, welche Bakteriophagen genau diesen Stamm angreifen und vermehren sie kontrolliert.',
    target: 'biologie',
  },
  {
    title: 'Geprüft anwenden',
    text: 'Reinigung, Qualität und Dosierung liegen in ärztlicher Verantwortung – oft zusammen mit Antibiotika.',
    target: 'forschung',
  },
  {
    title: 'Grenzen verstehen',
    text: 'Warum Phagentherapie kein zugelassenes Standardverfahren ist und was Studien wirklich zeigen.',
    target: 'forschung',
  },
];

export function HomePage() {
  const featured = getFeaturedReportage();
  const published = listPublishedReportagen();

  useSeo({
    title: site.title,
    description: site.description,
    canonicalPath: '/',
    image: featured.hero.ogImage,
    imageAlt: featured.hero.alt,
    preloadImage: '/media/phagen/phagen-hero-1280.webp',
    preloadSrcSet: featured.hero.srcSet,
    jsonLd: buildWebsiteJsonLd({
      name: site.name,
      description: site.description,
      path: '/',
    }),
  });

  return (
    <div id="seitenanfang">
      <CinematicHero reportage={featured} />

      <section className="facts" aria-label="Zahlen zur Titelgeschichte">
        <div className="container facts__grid">
          {featured.facts.map((fact) => (
            <div className="fact" key={fact.label}>
              <span className="fact__value">{fact.value}</span>
              <span className="fact__label">{fact.label}</span>
              {fact.note && <span className="fact__note">{fact.note}</span>}
            </div>
          ))}
        </div>
        <p className="container facts__source">
          * Ergebnisse einer internationalen Studie (Pirnay et al., Nature Microbiology, 2024).
          Keine allgemeine Heilungswahrscheinlichkeit.
        </p>
      </section>

      <section className="positioning" aria-labelledby="positioning-title" id="magazin">
        <div className="container positioning__grid">
          <div className="positioning__copy">
            <p className="section-kicker">Das Magazin</p>
            <h2 id="positioning-title">Geschichten, die bewegen. <br />Wissen, das bleibt.</h2>
            <p>
              Mays-Reportagen ist ein unabhängiges, kostenloses Wissenschafts- und
              Recherchemagazin. Wir erzählen, was Forschung wirklich zeigt – mit Quellen,
              benannten Unsicherheiten und ohne Heilversprechen.
            </p>
            <div className="positioning__actions">
              <Link className="text-link" to="/reportagen">
                Alle Reportagen
                <IconArrow className="text-link__icon" />
              </Link>
              <Link className="text-link" to="/ueber-uns">
                Wie wir arbeiten
                <IconArrow className="text-link__icon" />
              </Link>
            </div>
          </div>

          <ul className="trust-list">
            <li>
              <strong>Unabhängig &amp; kostenlos</strong>
              <span>Nicht kommerziell, keine institutionelle Zusammenarbeit.</span>
            </li>
            <li>
              <strong>Quellen nachvollziehbar</strong>
              <span>Quellen und Recherchestand sind am Text sichtbar.</span>
            </li>
            <li>
              <strong>Transparent</strong>
              <span>Unsicherheiten, Grenzen und KI-Illustrationen werden benannt.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="explainer" id="wie-es-funktioniert">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="section-kicker">Die Titelgeschichte</p>
              <h2>Wie funktioniert Phagentherapie?</h2>
            </div>
            <Link className="text-link" to={`/reportagen/${featured.slug}`}>
              Alle Hintergründe
              <IconArrow className="text-link__icon" />
            </Link>
          </div>

          <div className="explainer__grid">
            {EXPLAINERS.map((item, index) => (
              <Link
                key={item.title}
                className="explainer__card"
                to={`/reportagen/${featured.slug}#${item.target}`}
                style={{ '--delay': `${index * 70}ms` } as CSSProperties}
              >
                <span className="explainer__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="explainer__more" aria-hidden="true">
                  Mehr erfahren →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="reportagen" id="reportagen">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="section-kicker">Das Archiv</p>
              <h2>Reportagen</h2>
            </div>
            <div className="section-head__aside">
              <p className="section-head__note">
                Jede Titelgeschichte erscheint mit eigenem Bild, eigener Akzentfarbe und
                eigenen Quellen. Ältere Ausgaben bleiben dauerhaft erreichbar.
              </p>
              <Link className="text-link" to="/reportagen">
                Archiv öffnen
                <IconArrow className="text-link__icon" />
              </Link>
            </div>
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
                  Titelgeschichte lesen
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

      <section className="trust-band" aria-labelledby="trust-band-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="section-kicker">Vertrauen</p>
              <h2 id="trust-band-title">Worauf Sie sich verlassen können</h2>
            </div>
            <p className="section-head__note">
              Keine Zertifikate, keine Heilversprechen – nur nachvollziehbare Angaben.
            </p>
          </div>

          <div className="trust-band__grid">
            <Link className="trust-card" to={`/reportagen/${featured.slug}#quellen`}>
              <span className="trust-card__label">Quellenstand</span>
              <strong>{featured.researchDate}</strong>
              <span>{featured.sources.length} Quellen, offengelegt und verlinkt.</span>
            </Link>
            <Link className="trust-card" to={`/reportagen/${featured.slug}#forschung`}>
              <span className="trust-card__label">Forschung im Blick</span>
              <strong>Phagentherapie: kein Standard</strong>
              <span>Was Studien zeigen – und was sie nicht belegen.</span>
            </Link>
            <Link className="trust-card" to="/bildnachweis">
              <span className="trust-card__label">Bildtransparenz</span>
              <strong>KI-Illustrationen</strong>
              <span>Kennzeichnung, Herkunft und offene Rechtefragen.</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="closing-cta">
        <div className="container closing-cta__inner">
          <p className="section-kicker">Unsere Haltung</p>
          <h2>Geschichten, die bewegen. <br />Wissen, das bleibt.</h2>
          <p>
            Unabhängig, kostenlos und nicht kommerziell. Keine Heilsversprechen, keine
            unbelegten Zahlen. Dafür nachvollziehbare Quellen, eingeordnete Risiken und
            Geschichten, die zeigen, was Forschung wirklich leistet.
          </p>
          <div className="closing-cta__actions">
            <NeonButton to={`/reportagen/${featured.slug}`}>
              Titelgeschichte lesen
              <IconArrow className="btn__icon" />
            </NeonButton>
            <NeonButton variant="ghost" to="/ueber-uns">
              Wie wir arbeiten
            </NeonButton>
          </div>
        </div>
      </section>
    </div>
  );
}
