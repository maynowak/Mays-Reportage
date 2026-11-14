# Reportagen-Architektur

Das Magazin ist datengetrieben. Die Hero-Komponente, die Startseite und die Route
`/reportagen/:slug` kennen keine Phagen-Spezifika; alles kommt aus der Registry.

## Neue Titelgeschichte ergänzen

1. Bildmaterial aufbereiten und unter `public/media/<thema>/` ablegen:
   `hero-640.webp`, `hero-960.webp`, `hero-1280.webp`, `hero-1672.webp` sowie
   ein OG-Bild (1200 × 630). Originale bleiben in `assets/source/`.
2. In `src/content/bakteriophagen.ts` (oder einer neuen Datei) ein `Reportage`-Objekt
   anlegen: `slug`, `title`, `headlineLead`, `headlineAccent`, `subheadline`, `teaser`,
   `priority`, `accent`, `hero`, `facts`, `sections`, `sources`, `medicalNote`.
3. Das Objekt in `src/content/reportagen.ts` zu `publishedReportagen` hinzufügen.
   Die höchste `priority` wird automatisch zum Startseiten-Hero; alle anderen
   Reportagen bleiben über `/reportagen/<slug>` erreichbar.
4. Optional `upcomingReportagen` für angekündigte Themen pflegen (nicht verlinkt).

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
