import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

const NAVIGATION = [
  { label: 'Start', to: '/' },
  { label: 'Reportagen', to: '/#reportagen' },
  { label: 'Forschung', to: '/reportagen/bakteriophagen#forschung' },
  { label: 'Über uns', to: '/ueber-uns' },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isActive = (to: string) => {
    const [path, hash] = to.split('#');
    if (path !== location.pathname) return false;
    if (hash) return location.hash === `#${hash}`;
    return location.hash === '';
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('menu-open');
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-open' : ''}`}>
      <div className="container site-header__bar">
        <Logo />

        <nav className="site-nav" aria-label="Hauptnavigation">
          {NAVIGATION.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`site-nav__link${isActive(item.to) ? ' is-active' : ''}`}
              aria-current={isActive(item.to) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link className="btn btn--small btn--primary site-header__cta" to="/reportagen/bakteriophagen">
            Titelgeschichte
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-toggle__bar" />
            <span className="menu-toggle__bar" />
            <span className="menu-toggle__bar" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu" id="mobile-menu">
          <nav className="mobile-menu__nav" aria-label="Mobile Navigation">
            {NAVIGATION.map((item) => (
              <Link key={item.to} to={item.to} className="mobile-menu__link">
                {item.label}
              </Link>
            ))}
            <Link className="btn btn--primary mobile-menu__cta" to="/reportagen/bakteriophagen">
              Titelgeschichte lesen
            </Link>
          </nav>
          <p className="mobile-menu__note">Wissenschaft statt Wunder. Recherchiert, quellenbasiert, ohne Heilversprechen.</p>
        </div>
      )}
    </header>
  );
}
