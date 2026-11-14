import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo compact />
          <p>
            Mays-Reportagen ist ein erweiterbares Online-Reportagemagazin über Wissenschaft,
            Medizin und die Menschen dahinter. Jede Titelgeschichte wird eigenständig
            recherchiert und mit ihren Quellen veröffentlicht.
          </p>
        </div>

        <nav className="site-footer__column" aria-label="Magazin">
          <h2>Magazin</h2>
          <Link to="/">Startseite</Link>
          <Link to="/#reportagen">Alle Reportagen</Link>
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
          <Link to="/ueber-uns#hinweis">Medizinischer Hinweis</Link>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <span>© 2026 Mays-Reportagen</span>
        <span>Wissenschaft statt Wunder.</span>
        <span>Keine medizinische Beratung.</span>
      </div>
    </footer>
  );
}
