# Reportagen-Architektur

Das Magazin ist datengetrieben. Die Hero-Komponente, die Startseite und die Route
`/reportagen/:slug` kennen keine Phagen-Spezifika; alles kommt aus der Registry.

## Neue Titelgeschichte ergänzen

1. Bildmaterial aufbereiten und unter `public/media/<thema>/` ablegen:
   `hero-640.webp`, `hero-960.webp`, `hero-1280.webp`, `hero-1672.webp` sowie
   ein OG-Bild (1200 × 630). Originale bleiben in `assets/source/`.
2. In `src/content/bakteriophagen.ts` (oder einer neuen Datei) ein `Reportage`-Objekt
   anlegen: `slug`, `status: 'published'`, `title`, `headlineLead`, `headlineAccent`,
   `subheadline`, `teaser`, `priority`, `accent`, `hero`, `facts`, `sections`, `sources`,
   `medicalNote`.
3. Das Objekt in `src/content/reportagen.ts` zu `publishedReportagen` hinzufügen.
   Die höchste `priority` wird automatisch zum Startseiten-Hero; alle anderen
   Reportagen bleiben über `/reportagen/<slug>` erreichbar. `status: 'draft'` schließt
   eine Reportage aus Hero, Archiv und Routing aus.
4. Optional `upcomingReportagen` für angekündigte Themen pflegen (nicht verlinkt).
5. Neue Route in `scripts/generate-sitemap.mjs` ergänzen und den Quellen-Audit
   aktualisieren.

## Abschnittstypen (`Section.blocks`)

| `kind` | Darstellung |
| --- | --- |
| `callout` | Hinweisbox, `tone`: `fact`, `warning`, `info` |
| `steps` | nummerierter Behandlungsablauf |
| `stats` | Kennzahlen-Karten |
| `table` | responsive Datentabelle mit Scrollcontainer |
| `quote` | Pull-Quote |
| `list` | Bullet-Liste |
| `entries` | Spuren-/Kartenraster |
| `sources` | verlinkte Quellenliste |
| `sources` (Top-Level) | `reportage.sources` für SEO/Anzahl |

## Gestaltung

Akzentfarben werden als CSS-Variablen (`--accent`, `--accent-2`, `--accent-warm`)
auf den Hero gesetzt. Bilder nutzen `srcSet`/`sizes`, feste `width`/`height` und
`fetchPriority="high"` für das LCP-Bild. `prefers-reduced-motion` deaktiviert
Partikel, Zoom, Sheen und Scroll-Reveals; ohne JavaScript bleiben alle Inhalte sichtbar.

## SEO

`useSeo` setzt Titel, Description, Canonical, Open Graph, Twitter Cards und
JSON-LD (`NewsArticle`). Das Hero-Bild wird per `<link rel="preload">` vorgeladen.

## Veröffentlichungsstatus und Archiv

`Reportage.status` (`published`/`draft`) steuert alles: `selectPublished()` filtert
Entwürfe aus Hero, Archiv und Related-Liste; `getReportage()` liefert Entwürfe nicht aus.
Das Archiv `/reportagen` listet veröffentlichte Geschichten und getrennt die geplanten
Themen. Unbekannte Slugs rendern die 404-Seite mit `noindex`.

## Recht und SEO

`/impressum`, `/datenschutz` und `/bildnachweis` sind vorhanden. Solange
`src/content/legal.ts` Pflichtfelder als `null` enthält, zeigen die Seiten einen
Entwurfshinweis und setzen `robots: noindex,follow`. Canonical-, OG- und Twitter-URLs
werden zur Laufzeit gegen die Origin absolut aufgelöst; `vercel.json` enthält den
SPA-Rewrite, `scripts/generate-sitemap.mjs` erzeugt die Sitemap erst mit gesetzter
`SITE_URL`.

## Interaktive Reportagen

Reportagen mit Story-Daten werden über `StoryReader` gerendert, alle anderen über den
klassischen Artikelpfad. Die Engine ist inhaltsunabhängig; Kapiteltypen, Navigation,
Quellen-Chips und Dialoge sind in `docs/STORYTELLING-ENGINE.md` dokumentiert.

Story-Daten liegen unter `src/content/stories/` und müssen denselben Quellen-Audit
verwenden wie der Artikel. Die Darstellung folgt dem hellen Editorial-Design
(`docs/DESIGN-SYSTEM.md`); der Hero bleibt dunkel. `getStory(slug)` entscheidet in `ReportagePage`, ob interaktiv
oder langformig gerendert wird; die Startseite importiert keine Story-Renderer.


## Statische Metadaten und Social Preview

`npm run build` führt nach Vite den Generator `scripts/generate-static-pages.mjs` aus.
Er bündelt `src/content/static-meta.ts` mit esbuild, erzeugt für jede veröffentlichte
Route eine statische HTML-Datei (`dist/<route>.html`) auf Basis von `dist/index.html`
und schreibt Titel, Description, Canonical, Open Graph, Twitter Cards und JSON-LD
bereits ins HTTP-HTML. Entwürfe werden nicht ausgegeben.

`vercel.json` mappt die sauberen URLs explizit auf die HTML-Dateien; der letzte Rewrite
bleibt der SPA-Fallback. `src/content/static-meta.test.ts` prüft, dass statische Seiten,
Sitemap und Vercel-Rewrites synchron sind. Eine neue Reportage benötigt daher:
`published`-Status, Sitemap-Eintrag und einen expliziten Rewrite.

Vite Preview simuliert diese Rewrites über `previewStaticRoutes()` in `vite.config.ts`,
damit die No-JS-/Social-Metadaten lokal auf denselben URLs getestet werden können.
