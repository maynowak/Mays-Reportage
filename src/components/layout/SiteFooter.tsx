import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo compact />
          <p>
            Mays-Reportagen ist ein unabhängiges, kostenloses und nicht kommerzielles
            Wissenschafts- und Recherchemagazin. Geschichten, die bewegen. Wissen, das
            bleibt. Jede Titelgeschichte erscheint mit ihren Quellen.
          </p>
        </div>

        <nav className="site-footer__column" aria-label="Magazin">
          <h2>Magazin</h2>
          <Link to="/">Startseite</Link>
          <Link to="/reportagen">Alle Reportagen</Link>
          <Link to="/ueber-uns">Über uns</Link>
        </nav>

        <nav className="site-footer__column" aria-label="Titelgeschichte">
          <h2>Titelgeschichte</h2>
          <Link to="/reportagen/bakteriophagen">Bakteriophagen</Link>
          <Link to="/reportagen/bakteriophagen#forschung">Forschung</Link>
          <Link to="/reportagen/bakteriophagen#quellen">Quellen</Link>
        </nav>

        <div className="site-footer__column">
          <h2>Transparenz</h2>
          <Link to="/bildnachweis">Bildnachweis</Link>
          <Link to="/ueber-uns#hinweis">Medizinischer Hinweis</Link>
          <a href="https://github.com/maynowak/Mays-Reportage" target="_blank" rel="noreferrer noopener">
            Quellcode
          </a>
          <a
            href="https://github.com/maynowak/Mays-Reportage/blob/main/LICENSE"
            target="_blank"
            rel="noreferrer noopener"
          >
            Lizenz (GPL-3.0)
          </a>
        </div>

        <nav className="site-footer__column" aria-label="Rechtliches">
          <h2>Rechtliches</h2>
          <Link to="/impressum">Impressum</Link>
          <Link to="/datenschutz">Datenschutz</Link>
        </nav>
      </div>

      <div className="container site-footer__bottom">
        <span>© 2026 Mays-Reportagen</span>
        <span>Geschichten, die bewegen.</span>
        <span>Keine medizinische Beratung.</span>
      </div>
    </footer>
  );
}
