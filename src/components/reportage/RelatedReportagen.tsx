import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { getOtherReportagen, upcomingReportagen } from '../../content/reportagen';
import { HeroPicture } from '../hero/CinematicHero';

export function RelatedReportagen({ slug }: { slug: string }) {
  const others = getOtherReportagen(slug);

  return (
    <section className="related" aria-labelledby="related-title">
      <div className="container">
        <p className="section-kicker">Weiterlesen</p>
        <h2 id="related-title">Die nächsten Geschichten</h2>

        <div className="related__grid">
          {others.map((reportage) => (
            <Link key={reportage.slug} className="related__card related__card--published" to={`/reportagen/${reportage.slug}`}>
              <HeroPicture hero={reportage.hero} className="related__image" />
              <div className="related__body">
                <span className="badge badge--live">Veröffentlicht</span>
                <h3>{reportage.title}</h3>
                <p>{reportage.teaser}</p>
                <span className="related__link">Reportage lesen →</span>
              </div>
            </Link>
          ))}

          {upcomingReportagen.map((item) => (
            <article
              key={item.title}
              className="related__card related__card--upcoming"
              style={{ '--accent': item.accent } as CSSProperties}
            >
              <div className="related__upcoming-art" aria-hidden="true">
                <span />
              </div>
              <div className="related__body">
                <span className="badge">In Vorbereitung</span>
                <p className="related__topic">{item.topic}</p>
                <h3>{item.title}</h3>
                <p>{item.teaser}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
