#!/usr/bin/env node
/**
 * Erzeugt statische HTML-Einstiegspunkte für alle veröffentlichten Routen.
 *
 * Warum: Social-Crawler und Clients ohne JavaScript benötigen Titel, Description,
 * Canonical, Open Graph, Twitter Cards und JSON-LD bereits im HTTP-HTML.
 * Die React-App übernimmt danach wie gewohnt die Navigation.
 *
 * Keine SSR, keine Framework-Migration: Vite baut die App, dieses Skript schreibt
 * zusätzlich dist/<route>.html auf Basis von dist/index.html.
 */
import { build } from 'esbuild';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const SITE_URL = 'https://mays-reportage.vercel.app';

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function jsonForHtml(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c');
}

function renderPage(template, page, imageWidth, imageHeight) {
  const url = `${SITE_URL}${page.path === '/' ? '/' : page.path}`;
  const image = `${SITE_URL}${page.image}`;
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  html = html.replace(
    /<meta[^>]+name="description"[^>]*>/,
    `<meta name="description" content="${escapeHtml(page.description)}">`,
  );
  html = html.replace(/<link[^>]+rel="canonical"[^>]*>/g, '');
  html = html.replace(
    /<meta[^>]+(?:property|name)="(?:og:[^"]+|twitter:[^"]+)"[^>]*>/g,
    '',
  );
  html = html.replace(
    /<script[^>]+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g,
    '',
  );

  const head = [
    '<meta name="robots" content="index,follow">',
    `<link rel="canonical" href="${url}">`,
    '<meta property="og:site_name" content="Mays-Reportagen">',
    `<meta property="og:type" content="${page.type}">`,
    `<meta property="og:title" content="${escapeHtml(page.title)}">`,
    `<meta property="og:description" content="${escapeHtml(page.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:image:alt" content="${escapeHtml(page.imageAlt)}">`,
    `<meta property="og:image:width" content="${imageWidth}">`,
    `<meta property="og:image:height" content="${imageHeight}">`,
    '<meta property="og:image:type" content="image/jpeg">',
    '<meta property="og:locale" content="de_DE">',
    ...(page.publishedTime
      ? [`<meta property="article:published_time" content="${page.publishedTime}">`]
      : []),
    ...(page.section
      ? [`<meta property="article:section" content="${escapeHtml(page.section)}">`]
      : []),
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${escapeHtml(page.title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}">`,
    `<meta name="twitter:image" content="${image}">`,
    `<meta name="twitter:image:alt" content="${escapeHtml(page.imageAlt)}">`,
    ...(page.jsonLd
      ? [`<script type="application/ld+json">${jsonForHtml(page.jsonLd)}</script>`]
      : []),
    '</head>',
  ].join('\n    ');

  return html.replace('</head>', head);
}

const result = await build({
  entryPoints: ['src/content/static-meta.ts'],
  bundle: true,
  write: false,
  platform: 'node',
  format: 'esm',
  target: 'node22',
  logLevel: 'silent',
});

const moduleUrl = `data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`;
const { buildStaticPages, OG_WIDTH, OG_HEIGHT } = await import(moduleUrl);
const pages = buildStaticPages();
const template = readFileSync('dist/index.html', 'utf8');

for (const page of pages) {
  const outputPath =
    page.path === '/'
      ? join('dist', 'index.html')
      : join('dist', `${page.path.replace(/^\//, '')}.html`);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, renderPage(template, page, OG_WIDTH, OG_HEIGHT), 'utf8');
}

if (!pages.some((page) => page.path === '/')) {
  throw new Error('Static-Meta: Startseite fehlt.');
}

console.log(`Statische Metadaten geschrieben: ${pages.length} Routen.`);
