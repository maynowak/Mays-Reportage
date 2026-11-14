import { expect, test } from '@playwright/test';
import fs from 'node:fs';

const SHOT_DIR = 'docs/reports/assets/MAYS-REPORTAGEN-02';

test.beforeAll(() => {
  fs.mkdirSync(SHOT_DIR, { recursive: true });
});

test.describe('release readiness screenshots', () => {
  test('archive at 1440px', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/reportagen');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Alle Reportagen');
    if (testInfo.project.name === 'chromium') {
      await page.screenshot({ path: `${SHOT_DIR}/archiv-1440.png`, fullPage: true });
    }
  });

  test('archive at 390px without overflow', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/reportagen');
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
    if (testInfo.project.name === 'chromium') {
      await page.screenshot({ path: `${SHOT_DIR}/archiv-390.png`, fullPage: true });
    }
  });

  test('impressum draft at 1440px', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/impressum');
    await expect(page.getByText(/Entwurf – nicht veröffentlichungsfähig/)).toBeVisible();
    if (testInfo.project.name === 'chromium') {
      await page.screenshot({ path: `${SHOT_DIR}/impressum-1440.png`, fullPage: true });
    }
  });

  test('privacy draft at 1440px', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/datenschutz');
    if (testInfo.project.name === 'chromium') {
      await page.screenshot({ path: `${SHOT_DIR}/datenschutz-1440.png`, fullPage: true });
    }
  });

  test('image credits at 1440px', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/bildnachweis');
    if (testInfo.project.name === 'chromium') {
      await page.screenshot({ path: `${SHOT_DIR}/bildnachweis-1440.png`, fullPage: true });
    }
  });

  test('unknown reportage shows the 404 page with noindex', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/reportagen/unbekannt');
    await expect(page.getByRole('heading', { name: 'Diese Seite ist noch nicht entdeckt.' })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,follow');
    if (testInfo.project.name === 'chromium') {
      await page.screenshot({ path: `${SHOT_DIR}/404-390.png`, fullPage: true });
    }
  });

  test('reportage stays free of horizontal overflow at 768px', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 768, height: 900 });
    await page.goto('/reportagen/bakteriophagen');
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
    if (testInfo.project.name === 'chromium') {
      await page.screenshot({ path: `${SHOT_DIR}/reportage-768.png`, fullPage: true });
    }
  });
});
