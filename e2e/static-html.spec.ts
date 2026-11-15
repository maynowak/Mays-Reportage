import { expect, test } from '@playwright/test';
import fs from 'node:fs';

const SITE = 'https://mays-reportage.vercel.app';

const PAGES = [
  { path: '/', title: 'Mays-Reportagen — Geschichten, die bewegen.' },
  { path: '/reportagen', title: 'Alle Reportagen — Mays-Reportagen' },
  {
    path: '/reportagen/bakteriophagen',
    title: 'Bakteriophagen gegen resistente Bakterien — Mays-Reportagen',
  },
  { path: '/ueber-uns', title: 'Über uns — Mays-Reportagen' },
  { path: '/impressum', title: 'Impressum — Mays-Reportagen' },
  { path: '/datenschutz', title: 'Datenschutz — Mays-Reportagen' },
  { path: '/bildnachweis', title: 'Bildnachweis — Mays-Reportagen' },
];

test.describe('static HTML metadata (no JavaScript)', () => {
  for (const page of PAGES) {
    test(`${page.path} has its own head before hydration`, async ({ request }) => {
      const response = await request.get(page.path);
      expect(response.status()).toBe(200);
      const html = await response.text();

      expect(html).toContain(`<title>${page.title}</title>`);
      expect(html).toContain(`<link rel="canonical" href="${SITE}${page.path}">`);
      expect(html).toContain('property="og:title"');
      expect(html).toContain('property="og:description"');
      expect(html).toContain(`property="og:url" content="${SITE}${page.path}"`);
      expect(html).toContain('property="og:image"');
      expect(html).toContain('name="twitter:card"');
      expect(html).toContain('name="robots" content="index,follow"');
      expect(html).not.toContain('noindex,follow');
    });
  }

  test('reportage exposes article OG, image dimensions and NewsArticle JSON-LD', async ({ request }) => {
    const html = await (await request.get('/reportagen/bakteriophagen')).text();

    expect(html).toContain('property="og:type" content="article"');
    expect(html).toContain('property="og:image:width" content="1200"');
    expect(html).toContain('property="og:image:height" content="630"');
    expect(html).toContain('property="og:image:alt"');
    expect(html).toContain('KI-generierte Illustration');
    expect(html).toContain('property="article:published_time" content="2026-11-14"');

    const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(match).not.toBeNull();
    const jsonLd = JSON.parse(match?.[1] ?? '{}');
    expect(jsonLd['@type']).toBe('NewsArticle');
    expect(jsonLd.headline).toBe('Bakteriophagen gegen resistente Bakterien');
    expect(jsonLd.url).toBe(`${SITE}/reportagen/bakteriophagen`);
    expect(jsonLd.image[0]).toContain('/media/phagen/og-phagen.jpg');
  });

  test('social crawlers receive the reportage-specific card', async ({ request }) => {
    const response = await request.get('/reportagen/bakteriophagen', {
      headers: { 'user-agent': 'Twitterbot/1.0' },
    });
    const html = await response.text();
    expect(html).toContain('<title>Bakteriophagen gegen resistente Bakterien — Mays-Reportagen</title>');
    expect(html).toContain(
      'property="og:title" content="Bakteriophagen gegen resistente Bakterien — Mays-Reportagen"',
    );
    expect(html).not.toContain('property="og:url" content="https://mays-reportage.vercel.app/"');
  });

  test('the generated OG image is reachable', async ({ request }) => {
    const response = await request.get(`${SITE}/media/phagen/og-phagen.jpg`);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/jpeg');
  });

  test('unpublished reportages do not get a static HTML entry', () => {
    expect(fs.existsSync('dist/reportagen/entwurf.html')).toBe(false);
    expect(fs.existsSync('dist/reportagen/bakteriophagen.html')).toBe(true);
  });
});
