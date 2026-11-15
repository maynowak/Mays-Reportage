import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AppRoutes } from './App';

function renderRoute(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

describe('Mays-Reportagen app', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows the magazine hero and all key sections on the home page', () => {
    renderRoute('/');

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Bacteria can be');
    expect(screen.getByText('> 100')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Reportagen' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Wie funktioniert Phagentherapie?' })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: /Geschichten, die bewegen/ }).length).toBeGreaterThan(0);
    expect(screen.getByText('Unabhängig & kostenlos')).toBeInTheDocument();
  });

  it('navigates from the hero CTA to the reportage page', async () => {
    const user = userEvent.setup();
    renderRoute('/');

    await user.click(screen.getByRole('link', { name: /Reportage entdecken/i }));

    expect(
      screen.getByRole('heading', { level: 1, name: 'Bakteriophagen gegen resistente Bakterien' }),
    ).toBeInTheDocument();
  });

  it('scrolls to the explainer when the secondary hero CTA is used', async () => {
    const user = userEvent.setup();
    renderRoute('/');

    await user.click(screen.getByRole('button', { name: /Wie funktioniert das/i }));

    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('renders the interactive reportage with all chapters, sources and medical note', () => {
    renderRoute('/reportagen/bakteriophagen');

    expect(
      screen.getByRole('heading', { level: 2, name: 'Wie ein Phage ein Bakterium angreift' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Quellen und weiterführende Links' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Medizinischer Hinweis' })).toBeInTheDocument();
    expect(screen.getByText('77,2 %')).toBeInTheDocument();
    expect(screen.getByText('61,3 %')).toBeInTheDocument();

    const chapterNav = screen.getByRole('navigation', { name: 'Kapitel dieser Reportage' });
    expect(within(chapterNav).getAllByRole('link')).toHaveLength(8);

    const article = screen.getByRole('article', { name: 'Reportagetext' });
    const sourceLinks = within(article).getAllByRole('link', { name: /Originalquelle öffnen/i });
    expect(sourceLinks).toHaveLength(14);
    expect(sourceLinks.some((link) => link.getAttribute('href')?.includes('ardmediathek.de'))).toBe(true);
  });

  it('opens and closes the mobile menu with real navigation links', async () => {
    const user = userEvent.setup();
    renderRoute('/');

    const toggle = screen.getByRole('button', { name: 'Menü öffnen' });
    await user.click(toggle);

    const menu = screen.getByRole('navigation', { name: 'Mobile Navigation' });
    expect(within(menu).getByRole('link', { name: 'Über uns' })).toHaveAttribute('href', '/ueber-uns');
    expect(screen.getByRole('button', { name: 'Menü schließen' })).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByRole('button', { name: 'Menü schließen' }));
    expect(screen.queryByRole('navigation', { name: 'Mobile Navigation' })).not.toBeInTheDocument();
  });

  it('shows the about page editorial principles', () => {
    renderRoute('/ueber-uns');

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Geschichten, die bewegen. Wissen, das bleibt.');
    expect(screen.getByRole('heading', { name: 'Recherche vor Tempo' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Keine Heilversprechen' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Medizinischer Hinweis' })).toBeInTheDocument();
  });

  it('shows the archive with published and planned reportagen', () => {
    renderRoute('/reportagen');

    expect(screen.getByRole('heading', { level: 1, name: 'Alle Reportagen' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Bakteriophagen gegen resistente Bakterien/i })).toHaveAttribute(
      'href',
      '/reportagen/bakteriophagen',
    );
    expect(screen.getByRole('heading', { name: 'In Vorbereitung' })).toBeInTheDocument();
  });

  it('renders the completed legal pages without a draft notice', () => {
    renderRoute('/impressum');

    expect(screen.getByRole('heading', { level: 1, name: 'Impressum' })).toBeInTheDocument();
    expect(screen.queryByText(/Entwurf – nicht veröffentlichungsfähig/)).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Verantwortlich im Sinne des § 18 Abs. 2 MStV/ }),
    ).toBeInTheDocument();
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'index,follow');
  });

  it('renders privacy and image credit information', () => {
    renderRoute('/datenschutz');
    expect(screen.getByRole('heading', { level: 1, name: 'Datenschutz' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Keine Cookies, kein Tracking' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Hosting und Auslieferung' })).toBeInTheDocument();
    expect(screen.queryByText(/Entwurf – nicht veröffentlichungsfähig/)).not.toBeInTheDocument();

    renderRoute('/bildnachweis');
    expect(screen.getByRole('heading', { level: 1, name: 'Bildnachweis' })).toBeInTheDocument();
    expect(screen.getByText(/OpenAI-Bildgenerierung/)).toBeInTheDocument();
  });

  it('sets per-reportage SEO metadata', () => {
    renderRoute('/reportagen/bakteriophagen');

    expect(document.title).toBe('Bakteriophagen gegen resistente Bakterien — Mays-Reportagen');
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toMatch(
      /\/reportagen\/bakteriophagen$/,
    );
    expect(document.head.querySelector('meta[property="og:type"]')).toHaveAttribute('content', 'article');
    expect(document.head.querySelector('script[type="application/ld+json"]')).toHaveTextContent(
      '"@type":"NewsArticle"',
    );
  });

  it('returns a noindex 404 for unknown reportage slugs', () => {
    renderRoute('/reportagen/unbekannt');

    expect(screen.getByRole('heading', { name: 'Diese Seite ist noch nicht entdeckt.' })).toBeInTheDocument();
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex,follow');
  });

  it('renders a 404 page for unknown routes', () => {
    renderRoute('/gibt-es-nicht');

    expect(screen.getByRole('heading', { name: 'Diese Seite ist noch nicht entdeckt.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Zur Startseite' })).toHaveAttribute('href', '/');
  });

  it('keeps the site header and footer on every page', () => {
    const { container } = renderRoute('/ueber-uns');

    expect(container.querySelector('.site-header')).toBeInTheDocument();
    expect(container.querySelector('.site-footer')).toBeInTheDocument();
    expect(container.querySelector('.site-header .logo')).toBeInTheDocument();
    expect(container.querySelector('.site-footer .logo')).toBeInTheDocument();
  });
});
