import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

test.describe('performance fundamentals', () => {
  test('home keeps cumulative layout shift below 0.1', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });

    const cls = await page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          let value = 0;
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as Array<PerformanceEntry & { value?: number; hadRecentInput?: boolean }>) {
              if (!entry.hadRecentInput && typeof entry.value === 'number') value += entry.value;
            }
          }).observe({ type: 'layout-shift', buffered: true });
          window.setTimeout(() => resolve(value), 2000);
        }),
    );

    console.log(`CLS (lokal): ${cls.toFixed(4)}`);
    expect(cls).toBeLessThan(0.1);
  });

  test('JS and CSS bundles stay within budget', () => {
    const assets = fs.readdirSync('dist/assets');
    const js = assets.filter((file) => file.endsWith('.js'));
    const css = assets.filter((file) => file.endsWith('.css'));

    const gzipSize = (files: string[]) =>
      files.reduce(
        (total, file) => total + gzipSync(fs.readFileSync(path.join('dist/assets', file))).length,
        0,
      );

    const jsGzip = gzipSize(js);
    const cssGzip = gzipSize(css);
    console.log(`Bundle-Budget: JS ${(jsGzip / 1024).toFixed(1)} kB gzip, CSS ${(cssGzip / 1024).toFixed(1)} kB gzip`);

    expect(jsGzip).toBeLessThan(160 * 1024);
    expect(cssGzip).toBeLessThan(15 * 1024);
  });

  test('hero image variants use responsive widths', () => {
    const widths = [640, 960, 1280, 1672];
    widths.forEach((width) => {
      const file = `public/media/phagen/phagen-hero-${width}.webp`;
      expect(fs.existsSync(file)).toBe(true);
      expect(fs.statSync(file).size).toBeLessThan(300 * 1024);
    });
  });
});
