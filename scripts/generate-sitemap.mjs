#!/usr/bin/env node
/**
 * Erzeugt public/sitemap.xml aus der bestätigten Produktionsdomain.
 *
 * Standard: alle öffentlichen Seiten inklusive Impressum/Datenschutz.
 * Während die Rechtsseiten noch noindex sind:
 *   EXCLUDE_LEGAL=true npm run sitemap
 * Abweichende Domain (nur für Tests/Preview):
 *   SITE_URL=https://example.org OUT=/tmp/sitemap.xml node scripts/generate-sitemap.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';

const siteConfig = JSON.parse(
  readFileSync(new URL('../site.config.json', import.meta.url), 'utf8'),
);
const siteUrl = (process.env.SITE_URL ?? siteConfig.url).replace(/\/+$/, '');
const out = process.env.OUT ?? 'public/sitemap.xml';
const excludeLegal = process.env.EXCLUDE_LEGAL === 'true';

if (!siteUrl || !/^https:\/\/[^/]+$/.test(siteUrl)) {
  console.error(
    'SITE_URL fehlt oder ist ungültig (https://<domain> erwartet). Beispiel: SITE_URL=https://example.org npm run sitemap',
  );
  process.exit(1);
}

const routes = [
  { path: '/', priority: '1.0' },
  { path: '/reportagen', priority: '0.9' },
  { path: '/reportagen/bakteriophagen', priority: '0.9' },
  { path: '/ueber-uns', priority: '0.5' },
  { path: '/bildnachweis', priority: '0.3' },
  ...(excludeLegal
    ? []
    : [
        { path: '/impressum', priority: '0.2' },
        { path: '/datenschutz', priority: '0.2' },
      ]),
];

const lastmod = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(out, xml, 'utf8');
console.log(
  `Sitemap geschrieben: ${out} (${routes.length} URLs, Basis ${siteUrl}, rechtliche Seiten: ${
    excludeLegal ? 'ausgeschlossen' : 'enthalten'
  })`,
);
