import { expect, test } from '@playwright/test';
import fs from 'node:fs';

test.describe('SEO release preparation', () => {
  test('home exposes canonical, Open Graph, Twitter and robots metadata', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Mays-Reportagen — Wissenschaft statt Wunder');
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toMatch(/^https?:\/\/.+\/$/);

    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og-phagen\.jpg$/);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index,follow');
  });

  test('reportage exposes NewsArticle JSON-LD and preloads the hero', async ({ page }) => {
    await page.goto('/reportagen/bakteriophagen');

    const jsonLd = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
    expect(jsonLd['@type']).toBe('NewsArticle');
    expect(jsonLd.inLanguage).toBe('de');
    expect(jsonLd.headline).toContain('Bakteriophagen');

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
  });

  test('sitemap generator emits valid XML for a configured domain', async () => {
    const { execFileSync } = await import('node:child_process');
    const out = '/tmp/mays-reportagen-sitemap.xml';
    execFileSync('node', ['scripts/generate-sitemap.mjs'], {
      env: { ...process.env, SITE_URL: 'https://example.org', OUT: out },
    });
    const xml = fs.readFileSync(out, 'utf8');
    expect(xml).toContain('<loc>https://example.org/reportagen/bakteriophagen</loc>');
    expect(xml.match(/<url>/g)?.length).toBe(7);
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
