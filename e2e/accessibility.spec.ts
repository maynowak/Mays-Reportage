import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const PAGES = [
  { path: '/', name: 'home' },
  { path: '/reportagen', name: 'archiv' },
  { path: '/reportagen/bakteriophagen', name: 'reportage' },
  { path: '/ueber-uns', name: 'ueber-uns' },
  { path: '/impressum', name: 'impressum' },
  { path: '/datenschutz', name: 'datenschutz' },
  { path: '/bildnachweis', name: 'bildnachweis' },
];

test.describe('accessibility (axe-core, WCAG 2.1 A/AA)', () => {
  for (const entry of PAGES) {
    test(`${entry.name} has no serious or critical violations`, async ({ page }) => {
      await page.goto(entry.path);
      await page.waitForLoadState('networkidle');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const blocking = results.violations
        .filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')
        .map((violation) => ({
          id: violation.id,
          impact: violation.impact,
          help: violation.help,
          nodes: violation.nodes.map((node) => node.target.join(' ')).slice(0, 5),
        }));

      expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
    });
  }

  test('mobile menu is accessible at 390px', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/');
    await page.getByRole('button', { name: 'Menü öffnen' }).click();

    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    const blocking = results.violations.filter(
      (violation) => violation.impact === 'serious' || violation.impact === 'critical',
    );
    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
  });
});
