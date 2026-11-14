import { expect, test } from '@playwright/test';
import fs from 'node:fs';

const SHOT_DIR = 'docs/reports/assets/MAYS-REPORTAGEN-03';

test.beforeAll(() => {
  fs.mkdirSync(SHOT_DIR, { recursive: true });
});

test.describe('cinematic story engine', () => {
  test('chapter navigation marks the active chapter and scrolls to it', async ({ page }) => {
    await page.goto('/reportagen/bakteriophagen');
    const nav = page.getByRole('navigation', { name: 'Kapitel dieser Reportage' });

    await expect(nav.getByRole('link')).toHaveCount(8);
    await nav.getByRole('link', { name: /Europa & Militär/ }).click();

    await expect(page).toHaveURL(/#militaer$/);
    await expect
      .poll(() => page.locator('#militaer').evaluate((element) => element.getBoundingClientRect().top))
      .toBeLessThan(220);

    await expect
      .poll(() => nav.getByRole('link', { name: /Europa & Militär/ }).getAttribute('aria-current'))
      .toBe('location');
  });

  test('phage cycle is manually steppable and never auto-plays', async ({ page }) => {
    await page.goto('/reportagen/bakteriophagen');
    const visual = page.locator('.phage-visual');

    await expect(visual).toHaveAttribute('data-stage', '1');
    await expect(page.getByRole('heading', { level: 3, name: 'Annäherung' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Zurück/ })).toBeDisabled();

    await page.getByRole('button', { name: /Weiter/ }).click();
    await expect(visual).toHaveAttribute('data-stage', '2');
    await expect(page.getByRole('heading', { level: 3, name: 'Bindung' })).toBeVisible();

    await page.getByRole('button', { name: 'Schritt 5: Aufbrechen' }).click();
    await expect(visual).toHaveAttribute('data-stage', '5');
    await expect(page.getByRole('heading', { level: 3, name: 'Aufbrechen' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Weiter/ })).toBeDisabled();

    const stageText = await page.locator('.phage-panel p[aria-live="polite"]').textContent();
    expect(stageText).toContain('Schritt 5 von 5');
  });

  test('timeline station links jump to the verified event card', async ({ page }) => {
    await page.goto('/reportagen/bakteriophagen');
    const rail = page.getByRole('navigation', { name: 'Stationen der Zeitleiste' });
    await rail.getByRole('link', { name: /Königin-Astrid/ }).click();

    await expect(page).toHaveURL(/#timeline-bruessel$/);
    await expect(page.locator('#timeline-bruessel')).toBeVisible();
    await expect(page.locator('#timeline-bruessel')).toContainText('individuelle Heilversuche');
  });

  test('institution filter separates research from treatment offers', async ({ page }) => {
    await page.goto('/reportagen/bakteriophagen');
    await page.getByRole('button', { name: 'Forschungseinrichtungen' }).click();

    await expect(page.getByText('4 Einrichtungen in dieser Kategorie')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'DSMZ Braunschweig' })).toBeVisible();
    const grid = page.locator('.institution-grid');
    await expect(grid.getByRole('heading', { name: /PhagoFlow/ })).toHaveCount(0);

    await page.getByRole('button', { name: 'Erreichbare Angebote' }).click();
    await expect(grid.getByRole('heading', { name: 'Königin-Astrid-Militärkrankenhaus' })).toBeVisible();
    await expect(grid.getByRole('heading', { name: 'DSMZ Braunschweig' })).toHaveCount(0);
  });

  test('fact check opens and closes all answers', async ({ page }) => {
    await page.goto('/reportagen/bakteriophagen');
    const items = page.locator('.factcheck-item');
    await expect(items).toHaveCount(6);

    await page.getByRole('button', { name: 'Alle Antworten öffnen' }).click();
    await expect.poll(() => items.evaluateAll((nodes) => nodes.every((node) => (node as HTMLDetailsElement).open))).toBe(true);

    await page.getByRole('button', { name: 'Alle schließen' }).click();
    await expect.poll(() => items.evaluateAll((nodes) => nodes.every((node) => !(node as HTMLDetailsElement).open))).toBe(true);
  });

  test('sharing copies the link without external scripts', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Clipboard permissions are only granted for Chromium here.');
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/reportagen/bakteriophagen');

    await page.getByRole('button', { name: 'Link kopieren' }).click();
    await expect(page.getByText('Link kopiert.')).toBeVisible();
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toContain('/reportagen/bakteriophagen');
  });

  test('mobile chapter dialog navigates without blocking reading', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/reportagen/bakteriophagen');

    await page.getByRole('button', { name: 'Kapitel wählen' }).click();
    const dialog = page.getByRole('dialog').filter({ hasText: 'Kapitel' });
    await expect(dialog).toBeVisible();

    await dialog.getByRole('link', { name: /Faktencheck/ }).click();
    await expect(page).toHaveURL(/#faktencheck$/);
    await expect(page.locator('#faktencheck')).toBeVisible();
    await expect(dialog).toHaveCount(0);
  });

  test('keyboard users can drive the story controls', async ({ page }) => {
    await page.goto('/reportagen/bakteriophagen');

    const next = page.getByRole('button', { name: /Weiter/ });
    await next.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.phage-visual')).toHaveAttribute('data-stage', '2');

    const nav = page.getByRole('navigation', { name: 'Kapitel dieser Reportage' });
    const link = nav.getByRole('link', { name: /Faktencheck/ });
    await link.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#faktencheck$/);
  });

  test('light theme keeps every chapter visible before scrolling', async ({ page }) => {
    await page.goto('/reportagen/bakteriophagen');

    const state = await page.evaluate(() => {
      const chapters = [...document.querySelectorAll<HTMLElement>('.story-chapter')];
      const last = chapters[chapters.length - 1]?.getBoundingClientRect();
      const sources = document.querySelector('#quellen')?.getBoundingClientRect();
      return {
        opacities: chapters.map((chapter) => getComputedStyle(chapter).opacity),
        gap: last && sources ? Math.round(sources.top - last.bottom) : -1,
        bodyBackground: getComputedStyle(document.body).backgroundColor,
        timelineBackground: getComputedStyle(document.querySelector('.story-chapter--timeline') as HTMLElement).backgroundColor,
      };
    });

    expect(state.opacities.every((opacity) => opacity === '1')).toBe(true);
    expect(state.gap).toBeGreaterThanOrEqual(0);
    expect(state.gap).toBeLessThan(120);
    expect(state.bodyBackground).toBe('rgb(248, 250, 252)');
    expect(state.timelineBackground).not.toBe(state.bodyBackground);
  });

  test('works with reduced motion and keeps all content', async ({ page }) => {
    await page.goto('/reportagen/bakteriophagen');
    await expect(page.locator('.phage-visual')).toHaveClass(/is-reduced/);
    await expect(page.getByRole('heading', { level: 2, name: 'Sechs Fragen, sechs Antworten' })).toBeAttached();
    await page.getByRole('button', { name: /Weiter/ }).click();
    await expect(page.getByRole('heading', { level: 3, name: 'Bindung' })).toBeVisible();
  });

  test('has no horizontal overflow at all target widths', async ({ page }, testInfo) => {
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: width < 500 ? 900 : 1000 });
      await page.goto('/reportagen/bakteriophagen');
      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(dimensions.scrollWidth, `overflow at ${width}px`).toBeLessThanOrEqual(dimensions.clientWidth + 1);

      if (testInfo.project.name === 'chromium' && (width === 390 || width === 1440)) {
        await page.locator('#biologie').scrollIntoViewIfNeeded();
        await page.screenshot({
          path: `${SHOT_DIR}/story-biologie-${width}.png`,
          fullPage: false,
        });
      }
    }
  });

  test('captures the desktop chapters for the report', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'Screenshots are captured once in Chromium.');
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/reportagen/bakteriophagen');

    for (const id of ['bedrohung', 'teichwasser', 'militaer', 'forschung', 'zentren', 'faktencheck']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.screenshot({ path: `${SHOT_DIR}/story-${id}-1440.png` });
    }

    await page.locator('#biologie').scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: /Weiter/ }).click();
    await page.getByRole('button', { name: /Weiter/ }).click();
    await page.locator('.phage-visual').screenshot({ path: `${SHOT_DIR}/phage-stage-3.png` });
  });
});
