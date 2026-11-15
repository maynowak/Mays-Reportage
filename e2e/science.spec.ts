import { expect, test } from '@playwright/test';
import fs from 'node:fs';

const SHOT_DIR = 'docs/reports/assets/MAYS-REPORTAGEN-DESIGN-02';

test.beforeAll(() => {
  fs.mkdirSync(SHOT_DIR, { recursive: true });
});

test.describe('living science background', () => {
  test('flows downward continuously and is decorative', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/', { waitUntil: 'networkidle' });

    const band = page.locator('.science-band--transition .living-science');
    await expect(band).toBeVisible();
    await expect(band).toHaveAttribute('aria-hidden', 'true');

    const state = await page.evaluate(() => {
      const layer = document.querySelector<HTMLElement>('.science-band--transition .living-science__layer');
      const element = document.querySelector<HTMLElement>('.science-band--transition');
      return {
        animationName: layer ? getComputedStyle(layer).animationName : '',
        animationDuration: layer ? getComputedStyle(layer).animationDuration : '',
        height: element?.getBoundingClientRect().height ?? 0,
        pointerEvents: element ? getComputedStyle(element).pointerEvents : '',
      };
    });

    expect(state.animationName).toBe('living-science-flow');
    expect(state.animationDuration).not.toBe('0s');
    expect(state.height).toBeGreaterThan(100);
    expect(state.pointerEvents).toBe('none');
  });

  test('becomes static with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/', { waitUntil: 'networkidle' });

    const animation = await page
      .locator('.science-band--transition .living-science__layer')
      .first()
      .evaluate((element) => getComputedStyle(element).animationName);
    expect(animation).toBe('none');
  });

  test('appears in selected story gaps and keeps content above it', async ({ page }) => {
    await page.goto('/reportagen/bakteriophagen', { waitUntil: 'networkidle' });

    await expect(page.locator('.science-band--story')).toHaveCount(1);
    await expect(page.locator('.science-band--story-end')).toHaveCount(1);

    const opacities = await page.locator('.story-chapter').evaluateAll((elements) =>
      elements.map((element) => getComputedStyle(element).opacity),
    );
    expect(opacities.every((opacity) => opacity === '1')).toBe(true);

    const band = page.locator('.science-band--story');
    await expect(band).toHaveAttribute('aria-hidden', 'true');
    await expect
      .poll(() => band.evaluate((element) => getComputedStyle(element).pointerEvents))
      .toBe('none');
  });

  test('captures before/after evidence at 1440 and 390', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'Screenshots are captured once in Chromium.');

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${SHOT_DIR}/after-home-top-1440.png` });
    await page.locator('.positioning').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${SHOT_DIR}/after-home-positioning-1440.png` });
    await page.locator('.science-band--transition').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${SHOT_DIR}/after-science-transition-1440.png` });

    await page.goto('/reportagen/bakteriophagen', { waitUntil: 'networkidle' });
    await page.locator('#biologie').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${SHOT_DIR}/after-story-biologie-1440.png` });

    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${SHOT_DIR}/after-home-top-390.png` });
    await page.locator('.science-band--transition').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${SHOT_DIR}/after-science-transition-390.png` });
    await page.goto('/reportagen/bakteriophagen', { waitUntil: 'networkidle' });
    await page.locator('#biologie').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${SHOT_DIR}/after-story-biologie-390.png` });
  });
});
