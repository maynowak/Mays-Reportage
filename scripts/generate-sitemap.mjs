#!/usr/bin/env node
/**
 * Erzeugt public/sitemap.xml aus einer produktiven Domain.
 *
 * Die Domain wird bewusst nicht im Repository erfunden:
 *   SITE_URL=https://example.org npm run sitemap
 * Optional: OUT=/tmp/sitemap.xml
 */
import { writeFileSync } from 'node:fs';

const siteUrl = process.env.SITE_URL?.replace(/\/+$/, '');
const out = process.env.OUT ?? 'public/sitemap.xml';

if (!siteUrl || !/^https?:\/\/[^/]+/.test(siteUrl)) {
  console.error('SITE_URL fehlt oder ist ungültig. Beispiel: SITE_URL=https://example.org npm run sitemap');
  process.exit(1);
}

const routes = [
  { path: '/', priority: '1.0' },
  { path: '/reportagen', priority: '0.9' },
  { path: '/reportagen/bakteriophagen', priority: '0.9' },
  { path: '/ueber-uns', priority: '0.5' },
  { path: '/impressum', priority: '0.2' },
  { path: '/datenschutz', priority: '0.2' },
  { path: '/bildnachweis', priority: '0.2' },
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
console.log(`Sitemap geschrieben: ${out} (${routes.length} URLs, Basis ${siteUrl})`);
