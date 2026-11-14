import { describe, expect, it } from 'vitest';
import { buildArticleJsonLd } from './seo';

describe('buildArticleJsonLd', () => {
  it('builds a German NewsArticle payload with canonical data', () => {
    const jsonLd = buildArticleJsonLd({
      title: 'Bakteriophagen gegen resistente Bakterien',
      description: 'Teichwasser, Phagentherapie und militärische Anwendung.',
      path: '/reportagen/bakteriophagen',
      image: '/media/phagen/og-phagen.jpg',
      publishedAt: '2026-11-14',
      section: 'Medizin',
    });

    expect(jsonLd['@type']).toBe('NewsArticle');
    expect(jsonLd.inLanguage).toBe('de');
    expect(jsonLd.headline).toBe('Bakteriophagen gegen resistente Bakterien');
    expect(jsonLd.image).toEqual(['/media/phagen/og-phagen.jpg']);
    expect(jsonLd.datePublished).toBe('2026-11-14');
    expect(jsonLd.publisher).toMatchObject({ name: 'Mays-Reportagen' });
  });
});
