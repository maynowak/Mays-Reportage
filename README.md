# Mays-Reportagen

Erweiterbares Online-Reportagemagazin über Wissenschaft, Medizin und die Menschen
dahinter. Erste Titelgeschichte: **Bakteriophagen gegen resistente Bakterien** –
Teichwasser, Phagentherapie und die militärische Anwendung in Europa.

Die Startseite zeigt die aktuelle Titelgeschichte nach redaktioneller Priorität; das
Archiv unter `/reportagen` bleibt dauerhaft erreichbar. Jede Reportage bringt ihr
eigenes Titelmotiv, ihre eigene Akzentfarbe und ihre eigenen Quellen mit.

## Entwicklung

```bash
npm install
npm run dev        # http://localhost:5173
npm run verify     # ESLint + TypeScript + Unit-Tests + Produktions-Build
npm run e2e        # Playwright: Chromium, Firefox, WebKit; Port 4317
SITE_URL=https://<domain> npm run sitemap
```

`npm run e2e` (51 Chromium- bzw. 49 Firefox/WebKit-Tests, 4 Skips) schreibt Abnahme-Screenshots nach
`docs/reports/assets/MAYS-REPORTAGEN-01A/` (Hero/Reportage) und
`docs/reports/assets/MAYS-REPORTAGEN-02/` (Archiv/Rechtliches) und
`docs/reports/assets/MAYS-REPORTAGEN-03/` (Story-Kapitel, Interaktionen).

## Seiten

| Route | Inhalt |
| --- | --- |
| `/` | Titelgeschichte, Kennzahlen, Erklärstücke, Archivteaser |
| `/reportagen` | Archiv aller veröffentlichten Reportagen + geplante Themen |
| `/reportagen/bakteriophagen` | interaktive Titelgeschichte mit 7 Kapiteln und 14 Quellen |
| `/ueber-uns` | Arbeitsweise und medizinischer Hinweis |
| `/impressum`, `/datenschutz` | Entwürfe mit Platzhaltern, bis Angaben vorliegen `noindex` |
| `/bildnachweis` | Herkunft und KI-Kennzeichnung der Illustrationen |

## Interaktive Reportage

Die Titelgeschichte nutzt die Storytelling-Engine: scrollgesteuerte Kapitel, einen
manuell bedienbaren Phagen-Zyklus, Zeitleiste, Kennzahlen mit Methodik, Einrichtungs-
filter, Faktencheck, Kapitelnavigation, Quellen-Chips und Teilen ohne Tracking.
Technische Dokumentation: `docs/STORYTELLING-ENGINE.md`.

## Release-Status

**YELLOW — lokal verifiziert, nicht veröffentlichungsfähig.** Offen sind Betreiberangaben,
Bildrechte, Hosting/Domain und die rechtliche Prüfung. Details:
`docs/RELEASE-CHECKLIST.md`, `docs/reports/02-01-MAYS-REPORTAGEN-02-EXECUTION_LOG.md`.

## Struktur

| Pfad | Inhalt |
| --- | --- |
| `src/content/reportagen.ts` | Reportage-Registry, Status, Featured-Priorität |
| `src/content/bakteriophagen.ts` | Inhalt, Quellen und Akzentfarben der Titelgeschichte |
| `src/content/legal.ts` | Betreiberangaben (bewusst unvollständig) |
| `src/components/hero/CinematicHero.tsx` | responsiver Hero, Partikel, CTAs |
| `src/styles/fonts.css` | selbst gehostete Fonts (preloaded, CLS-frei) |
| `public/media/phagen/` | Hero-Varianten (WebP 640–1672) + OG-Bild |
| `assets/source/` | unveränderte Originalbilder (nicht Teil des Builds) |
| `docs/` | Architektur, Quellen-Audit, Bildherkunft, Release-Checkliste |

## Bilder

Alle Titelmotive sind **KI-generierte Illustrationen**, keine Mikroskopaufnahmen.
Originale liegen unverändert unter `assets/source/`, ausgeliefert werden nur optimierte
WebP-Derivate. Herkunft und offene Rechtefragen: `docs/BILDHERKUNFT.md`.

## Lizenz

GPL-3.0 – siehe `LICENSE`.
