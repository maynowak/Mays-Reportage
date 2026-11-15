import { expect, test } from '@playwright/test';
import fs from 'node:fs';

test.describe('SEO release preparation', () => {
  test('home exposes canonical, Open Graph, Twitter and robots metadata', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Mays-Reportagen — Geschichten, die bewegen.');
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://mays-reportage.vercel.app/');

    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://mays-reportage.vercel.app/media/phagen/og-phagen.jpg');
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index,follow');
  });

  test('reportage exposes NewsArticle JSON-LD and preloads the hero', async ({ page }) => {
    await page.goto('/reportagen/bakteriophagen');

    const jsonLd = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
    expect(jsonLd['@type']).toBe('NewsArticle');
    expect(jsonLd.inLanguage).toBe('de');
    expect(jsonLd.headline).toContain('Bakteriophagen');
    expect(jsonLd.url).toBe('https://mays-reportage.vercel.app/reportagen/bakteriophagen');
    expect(jsonLd.image[0]).toMatch(/^https:\/\/mays-reportage\.vercel\.app\/media\//);

    const preload = page.locator('link[rel="preload"][as="image"]');
    await expect(preload).toHaveAttribute('href', /phagen-hero-1280\.webp$/);
    await expect(preload).toHaveAttribute('imagesrcset', /phagen-hero-640\.webp 640w/);
  });

  test('robots.txt is shipped and allows crawling', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('User-agent: *');
    expect(body).toContain('Allow: /');
    expect(body).toContain('Sitemap: https://mays-reportage.vercel.app/sitemap.xml');
  });

  test('sitemap includes legal pages and can exclude drafts', async () => {
    const { execFileSync } = await import('node:child_process');
    const out = '/tmp/mays-reportagen-sitemap.xml';
    const baseEnv = { ...process.env, SITE_URL: 'https://example.org', OUT: out };

    execFileSync('node', ['scripts/generate-sitemap.mjs'], { env: baseEnv });
    const legalXml = fs.readFileSync(out, 'utf8');
    expect(legalXml).toContain('<loc>https://example.org/reportagen/bakteriophagen</loc>');
    expect(legalXml.match(/<url>/g)?.length).toBe(7);
    expect(legalXml).toContain('<loc>https://example.org/impressum</loc>');
    expect(legalXml).toContain('<loc>https://example.org/datenschutz</loc>');

    execFileSync('node', ['scripts/generate-sitemap.mjs'], {
      env: { ...baseEnv, EXCLUDE_LEGAL: 'true' },
    });
    const draftXml = fs.readFileSync(out, 'utf8');
    expect(draftXml.match(/<url>/g)?.length).toBe(5);
    expect(draftXml).not.toContain('/impressum');
    expect(draftXml).not.toContain('/datenschutz');
  });

  test('sitemap rejects a missing or non-HTTPS domain', async () => {
    const { execFileSync } = await import('node:child_process');
    expect(() =>
      execFileSync('node', ['scripts/generate-sitemap.mjs'], {
        env: { ...process.env, SITE_URL: 'http://example.org', OUT: '/tmp/invalid-sitemap.xml' },
        stdio: 'ignore',
      }),
    ).toThrow();
  });

  test('hero image stays below the LCP budget', () => {
    const bytes = fs.statSync('public/media/phagen/phagen-hero-1280.webp').size;
    expect(bytes).toBeLessThan(250 * 1024);
    const ogBytes = fs.statSync('public/media/phagen/og-phagen.jpg').size;
    expect(ogBytes).toBeLessThan(300 * 1024);
  });

  test('largest contentful paint is measured locally', async ({ page }, testInfo) => {
    await page.goto('/', { waitUntil: 'load' });
    const lcp = await page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          let value = 0;
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const last = entries[entries.length - 1] as PerformanceEntry | undefined;
            if (last) value = last.startTime;
          });
          observer.observe({ type: 'largest-contentful-paint', buffered: true });
          window.setTimeout(() => {
            observer.disconnect();
            resolve(value);
          }, 2500);
        }),
    );

    console.log(`LCP (lokal, ${testInfo.project.name}): ${Math.round(lcp)} ms`);
    expect(lcp).toBeGreaterThan(0);
    expect(lcp).toBeLessThan(4000);
  });
});
