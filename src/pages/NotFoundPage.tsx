import { Link } from 'react-router-dom';
import { useSeo } from '../lib/seo';

export function NotFoundPage() {
  useSeo({
    title: 'Seite nicht gefunden — Mays-Reportagen',
    description: 'Diese Seite wurde nicht gefunden.',
    canonicalPath: '/404',
    image: '/media/phagen/og-phagen.jpg',
    imageAlt: 'Mays-Reportagen',
    noIndex: true,
  });

  return (
    <div className="page not-found">
      <div className="container not-found__inner">
        <p className="section-kicker">404</p>
        <h1>Diese Seite ist noch nicht entdeckt.</h1>
        <p>
          Vielleicht liegt sie noch im Teich. Sicher ist: Die aktuelle Titelgeschichte wartet
          bereits auf Sie.
        </p>
        <div className="not-found__actions">
          <Link className="btn btn--primary" to="/">
            Zur Startseite
          </Link>
          <Link className="btn btn--ghost" to="/reportagen/bakteriophagen">
            Bakteriophagen lesen
          </Link>
        </div>
      </div>
    </div>
  );
}
