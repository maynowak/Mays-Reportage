import { expect, test } from '@playwright/test';
import fs from 'node:fs';

const SHOT_DIR = 'docs/reports/assets/MAYS-REPORTAGEN-01A';
const WIDTHS = [320, 390, 768, 1024, 1440];

test.beforeAll(() => {
  fs.mkdirSync(SHOT_DIR, { recursive: true });
});

test.describe('cinematic home hero', () => {
  for (const width of WIDTHS) {
    test(`renders without horizontal overflow at ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: width < 500 ? 900 : 1000 });
      await page.goto('/');

      const heroImage = page.locator('.hero__image');
      await expect(heroImage).toBeVisible();
      await expect
        .poll(() => heroImage.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0))
        .toBe(true);

      await expect(page.getByRole('heading', { level: 1 })).toContainText('fought.');
      await expect(page.getByRole('link', { name: /Reportage entdecken/i })).toBeVisible();

      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);

      if (testInfo.project.name === 'chromium') {
        await page.screenshot({ path: `${SHOT_DIR}/home-${width}.png`, fullPage: true });
      }
    });
  }

  test('CTA opens the phagen reportage', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Reportage entdecken/i }).click();

    await expect(page).toHaveURL(/\/reportagen\/bakteriophagen$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Bakteriophagen gegen resistente Bakterien',
    );
  });

  test('secondary CTA scrolls to the explainer', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Wie funktioniert das/i }).click();

    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(200);
  });

  test('mobile menu navigates to the about page', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/');

    await page.getByRole('button', { name: 'Menü öffnen' }).click();
    const menu = page.getByRole('navigation', { name: 'Mobile Navigation' });
    await expect(menu).toBeVisible();
    await menu.getByRole('link', { name: 'Über uns' }).click();

    await expect(page).toHaveURL(/\/ueber-uns$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Ein Magazin für die');
  });

  test('disables decorative particles for reduced motion', async ({ page }) => {
    await page.goto('/');
    const display = await page
      .locator('.particles')
      .first()
      .evaluate((element) => getComputedStyle(element).display);
    expect(display).toBe('none');
  });

  test('every image exposes a non-empty alt text', async ({ page }) => {
    await page.goto('/');
    const missingAlt = await page.evaluate(
      () =>
        [...document.querySelectorAll('img')].filter((image) => !image.getAttribute('alt')?.trim()).length,
    );
    expect(missingAlt).toBe(0);
  });
});

test.describe('reportage page', () => {
  test('shows all sections, 14 linked sources and the medical note', async ({ page }) => {
    await page.goto('/reportagen/bakteriophagen');

    for (const id of ['bedrohung', 'biologie', 'teichwasser', 'militaer', 'forschung', 'zentren', 'faktencheck', 'quellen']) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }

    await expect(page.locator('.source-list__item')).toHaveCount(14);
    await expect(page.getByRole('heading', { name: 'Medizinischer Hinweis' })).toBeVisible();

    const href = await page.locator('.source-list__link').first().getAttribute('href');
    expect(href).toContain('deutschlandfunk.de');
  });

  test('keeps deep links below the fixed header', async ({ page }) => {
    await page.goto('/reportagen/bakteriophagen#forschung');
    const top = await page.locator('#forschung').evaluate((element) => element.getBoundingClientRect().top);
    expect(top).toBeGreaterThan(70);
    expect(top).toBeLessThan(180);
  });

  test('has no horizontal overflow at 390px and captures the page', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/reportagen/bakteriophagen');

    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);

    if (testInfo.project.name === 'chromium') {
      await page.screenshot({ path: `${SHOT_DIR}/reportage-390.png`, fullPage: true });
    }
  });

  test('captures the desktop reportage', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/reportagen/bakteriophagen');
    if (testInfo.project.name === 'chromium') {
      await page.screenshot({ path: `${SHOT_DIR}/reportage-1440.png`, fullPage: true });
    }
  });
});

test.describe('about page', () => {
  test('captures the editorial page at 1440px', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/ueber-uns');
    if (testInfo.project.name === 'chromium') {
      await page.screenshot({ path: `${SHOT_DIR}/ueber-uns-1440.png`, fullPage: true });
    }
  });
});
