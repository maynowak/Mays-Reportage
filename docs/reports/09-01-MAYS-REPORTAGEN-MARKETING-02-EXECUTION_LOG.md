# MARKETING-02 — Magazine Positioning & Landing Page — Execution Log

**Status:** **MARKETING-02 COMPLETED (LOKAL) / DEPLOYMENT PENDING**
**Audit-Zeitpunkt:** 15. November 2026
**Git-Baseline:** Branch `main`, HEAD `a6331e9`, clean, synchron mit `origin/main`.
**Neue Commits:** `65ae84f` (Positionierung/Startseite), `454da4f` (statische
Social-Metadaten); Doku-/Beleg-Commit folgt.
**Kein Push, Merge oder Deployment.**

---

## 1. Governance

AGENTS.md, Auditindex, MARKETING-01-Bericht, SEO-Audit, Design-System und
Quellen-Audit gelesen. Baseline clean und synchron. Keine anderen Projekte
verändert; keine neue Reportage; kein Redesign.

## 2. Positionierung

- Markenclaim: **„Geschichten, die bewegen. Wissen, das bleibt.“**
- Mays-Reportagen wird als unabhängiges, kostenloses, vorerst nicht kommerzielles
  Wissenschafts- und Recherchemagazin beschrieben.
- Keine fiktive Redaktion oder institutionelle Zusammenarbeit behauptet.
- Redaktionelle Grundsätze: Neugier, verständliche Wissenschaft, belegte Aussagen,
  transparente Unsicherheiten, Fakten/Meinung trennen, keine Heilversprechen.
- `site.title`, `site.description`, Logo-Claim, Footer, About und Startseite
  konsistent aktualisiert.

## 3. Startseite

Bestehende Struktur beibehalten, gezielt ergänzt:

- Cinematic Hero unverändert (Bild, Animation, Headline, CTAs).
- Neuer Positionierungsblock nach den Kennzahlen: Claim, Magazinangebot,
  „Alle Reportagen“, „Wie wir arbeiten“.
- Drei Vertrauenselemente: Unabhängig & kostenlos, Quellen nachvollziehbar,
  Transparent (Unsicherheiten/KI).
- Archivzugang im Reportagen-Abschnitt („Archiv öffnen“).
- Trust-Band mit Quellenstand (14.11.2026, 14 Quellen), Forschungsgrenze
  (Phagentherapie kein Standard) und KI-Bildtransparenz.
- Geplante Themen bleiben als „In Vorbereitung“ klar getrennt.
- Keine pauschale „wissenschaftlich geprüft“-Zertifizierung.

## 4. Statische Social-/SEO-Metadaten

Problem aus MARKETING-01: Reportage-URLs lieferten ohne JS die Home-Metadaten.

Lösung ohne SSR/Framework-Migration:

- `src/content/static-meta.ts` erzeugt Metadaten für alle veröffentlichten Routen.
- `scripts/generate-static-pages.mjs` bündelt das Modul mit esbuild und schreibt
  nach dem Vite-Build `dist/<route>.html` für 7 öffentliche Routen.
- Jede Datei enthält bereits im HTTP-HTML: individuellen Titel, Description,
  Canonical, Open Graph, Twitter Cards, OG-Bildgröße/-typ/-alt und JSON-LD.
- `vercel.json` mappt die sauberen URLs explizit auf die `.html`-Dateien;
  der letzte Rewrite bleibt SPA-Fallback.
- `vite.config.ts` simuliert diese Rewrites im Preview, damit No-JS-Tests dieselben
  URLs wie Produktion prüfen.
- Entwürfe werden nicht generiert; Unit-Test prüft Sitemap-/Rewrite-Synchronität.
- `useSeo` entfernt statisches JSON-LD vor dem Hydration-Update, keine Duplikate.

**Social-Preview lokal verifiziert:**
`Twitterbot`-Request auf `/reportagen/bakteriophagen` erhält den Reportage-Titel,
die Reportage-OG-Daten und die absolute OG-Bild-URL. `og:image` ist 1200 × 630,
160 KB, bestehendes freigegebenes Asset; keine neuen KI-Bilder erzeugt.

## 5. SEO-Regressionsschutz

- Sitemap bleibt 7 URLs; alle weiterhin 200.
- Canonical-Konfiguration unverändert korrekt.
- robots.txt unverändert.
- JSON-LD: WebSite (Home), CollectionPage (Archiv), NewsArticle (Reportage).
- Veröffentlichungsstatus: nur `published`; Entwürfe ohne statische Datei.
- Deep Links und Navigation unverändert.
- Soft-404 bleibt bestehen (unbekannte Slugs 200 + 404-UI + JS-`noindex`);
  pragmatisch dokumentiert, keine SPA-Routen beschädigt.
- Keine noindex-Regression auf öffentlichen Seiten.

## 6. Tests

| Prüfung | Ergebnis |
| --- | --- |
| ESLint / TypeScript / Build | PASS |
| Unit-Tests | **38/38** |
| Playwright gesamt | **182 passed / 4 skipped** |
| Chromium / Firefox / WebKit | 62 / 60+2 / 60+2 |
| Statische HTML-Tests | 7 Routen, Artikel-OG, Twitterbot, OG-Bild, Entwurf |
| Accessibility | axe 0 Violations (Home/Reportage) |
| Lighthouse lokal Home/Story | **100/100/100/100** |
| LCP / CLS / TBT | 0,8 s / 0 / 30 ms (Home); 0,8 s / 0 / 70 ms (Story) |
| No-JS-Metadaten | PASS lokal |

**Nicht ausgeführt:** Deployment, Produktions-Social-Preview, Search-Console-
Verbindung, echte Social-Plattform-Crawler (nur UA-Request), Paid Ads.

## 7. Screenshots

`docs/reports/assets/MAYS-REPORTAGEN-MARKETING-02/`:

- `home-top-1440.png`, `home-positioning-1440.png`, `home-trust-1440.png`
- `home-archive-1440.png`, `home-closing-1440.png`, `archive-1440.png`, `about-1440.png`
- `home-top-390.png`, `home-positioning-390.png`, `home-trust-390.png`,
  `home-archive-390.png`

Keine Screenshots von Impressum/Datenschutz mit Betreiberdaten.

## 8. Git-Status und Änderungen

Neu: `src/content/static-meta.ts`, `src/content/static-meta.test.ts`,
`src/lib/structured-data.ts`, `scripts/generate-static-pages.mjs`,
`e2e/static-html.spec.ts`, Marketing-Screenshots.
Geändert: Startseite/About/Logo/Footer/Header/Hero, `site`-Konstanten,
`src/lib/seo.ts`, `ArchivePage`, `index.html`, `vite.config.ts`, `vercel.json`,
`package.json`/Lock (esbuild), Tests, Dokumentation.

Kein Push, Merge, Deployment, keine Änderung an anderen Projekten.
Terraform: keine Prüfung, da kein IaC vorhanden.

## 9. Klassifikation

**GREEN lokal / DEPLOYMENT PENDING.** Positionierung, Landing Page und statische
Social-Metadaten sind lokal vollständig getestet. Die Produktion läuft weiterhin
auf `a6331e9`; Änderungen sind nicht live.

## 10. Offene Punkte

1. Push/Deployment der MARKETING-02-Änderungen (separate Freigabe).
2. Search Console verifizieren, Sitemap einreichen.
3. Produktions-Social-Preview auf realen Plattformen prüfen.
4. Soft-404, CSP und ggf. Pre-Rendering des sichtbaren Artikeltexts.
5. Vercel-DPA/KI-Training und Bildrechte Dritter weiter beobachten.

## 11. Empfehlung MARKETING-03

Zuerst deployen und reale Social-Previews prüfen. Danach organische
Veröffentlichungswelle mit Search Console, Themenkalender, Quellen-Threads und
datenschutzfreundlicher Messung; keine bezahlte Werbung, keine Tracking-Skripte.
Siehe `docs/MARKETING-02-03-PLAN.md`.

## 12. Resume-Punkt

Lokal fertig, clean und getestet. Nächster Schritt: Push/Deploy-Freigabe.
