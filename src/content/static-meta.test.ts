import { describe, expect, it } from 'vitest';
import vercel from '../../vercel.json';
import sitemap from '../../public/sitemap.xml?raw';
import { buildStaticPages } from './static-meta';

describe('static page metadata', () => {
  const pages = buildStaticPages();

  it('covers every public route exactly once', () => {
    const paths = pages.map((page) => page.path);
    expect(paths).toEqual([
      '/',
      '/reportagen',
      '/reportagen/bakteriophagen',
      '/ueber-uns',
      '/impressum',
      '/datenschutz',
      '/bildnachweis',
    ]);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('provides social and canonical data for every page', () => {
    for (const page of pages) {
      expect(page.title.length).toBeGreaterThan(10);
      expect(page.description.length).toBeGreaterThan(30);
      expect(page.image).toMatch(/^\/media\//);
      expect(page.imageAlt).toContain('KI-generierte Illustration');
      expect(page.jsonLd?.['@type'] ?? 'none').toMatch(/WebSite|CollectionPage|NewsArticle|none/);
    }
  });

  it('gives the published reportage its own article metadata', () => {
    const article = pages.find((page) => page.path === '/reportagen/bakteriophagen');
    expect(article).toBeDefined();
    expect(article?.type).toBe('article');
    expect(article?.title).toBe('Bakteriophagen gegen resistente Bakterien — Mays-Reportagen');
    expect(article?.publishedTime).toBe('2026-11-14');
    expect(article?.jsonLd).toMatchObject({
      '@type': 'NewsArticle',
      headline: 'Bakteriophagen gegen resistente Bakterien',
    });
  });

  it('does not emit metadata for drafts', () => {
    const paths = pages.map((page) => page.path);
    expect(paths).not.toContain('/reportagen/entwurf');
  });

  it('keeps sitemap and Vercel rewrites in sync with static pages', () => {
    for (const page of pages) {
      if (page.path !== '/') {
        expect(sitemap).toContain(`https://mays-reportage.vercel.app${page.path}<`);
        expect(vercel.rewrites).toContainEqual({
          source: page.path,
          destination: `${page.path}.html`,
        });
      }
    }
  });
});
