# MAIN RELEASE & MARKETING-01 — Execution Log

**Status:** **MAIN INTEGRATED / PRODUCTION VERIFIED / MARKETING-01 COMPLETED**
**Audit-Zeitpunkt:** 14. November 2026, Europe/Berlin
**Git-Baseline:** `a1ebc40`, clean, 11 Commits vor `origin/main`.
**Freigabe:** Betreiberin hat Main-Release, Hobby-Nutzung und nicht-kommerzielle
Ausrichtung bestätigt. KI-Training wird separat geprüft. Keine Force-Pushes.

---

## 1. Preflight

- Branch `main`, Upstream `origin/main`, 0 hinter / 11 vor.
- Keine Secrets, keine `.env`-Dateien; persönliche Daten nur in
  `src/content/legal.ts` (für das Impressum erforderlich).
- Kein Branch-Schutz; Fast-Forward möglich.
- Vercel-Git-Link: GitHub `maynowak/Mays-Reportage`, Production-Branch `main`,
  Auto-Deployment aktiv.
- Produktionsstand vor Release: `0dabd09`, veraltet; SPA-Routen 404.

## 2. Main-Integration

- Fast-Forward-Push `0dabd09..a1ebc40` (11 Commits), keine Force.
- CI-Lauf `43646048356` **fehlgeschlagen**: Playwright-WebServer-Timeout (180 s).
- Fix `e7b6994`: Preview bindet auf `127.0.0.1`, WebServer-Timeout 300 s.
  CI `43646780686` **success**.
- Production nach Push: Commit `a1ebc40` READY, aber **SPA-Routen 404**.
- Ursache: `cleanUrls: true` mit Rewrite-Ziel `/index.html` ist ungültig.
  Fix `e6e0161`: `cleanUrls` entfernt; Rewrite bleibt `/index.html`.
- Production `e6e0161` READY; Routen erreichbar.
- Production-Audit fand dekorative Kapitelnummern mit zu geringem Kontrast und
  fehlendes Leerzeichen in der H1. Fix `a670327`; CI `43648394647` **success**.
- Production `a670327` READY; finaler App-Commit. Audit-Doku-Commit folgt.

## 3. Production Verification (`a670327`)

Deployment `dpl_5D1bkJXxmJ8vojMWc9YCuFmkgvAw`, Domain
`https://mays-reportage.vercel.app`.

| Prüfung | Ergebnis |
| --- | --- |
| `/`, `/reportagen`, Reportage, Impressum, Datenschutz, Bildnachweis | 200 |
| `robots.txt`, `sitemap.xml` | 200, 7 URLs |
| Alle Sitemap-URLs | 200 |
| Canonical pro Seite | korrekt, Produktionsdomain |
| Meta-Titles/OG/Twitter/JSON-LD mit JS | korrekt |
| robots | öffentliche Seiten `index,follow`; 404 `noindex` |
| Unbekannter Slug | 200 + 404-UI + `noindex` (Soft-404) |
| Interne Links | 200 |
| Mobile 390 px | kein Überlauf |
| axe Home/Reportage | 0 Violations |
| Lighthouse mobil Home/Reportage | **100/100/100/100** |
| LCP/CLS/TBT | 0,9 s/1,1 s · 0 · 30/80 ms |
| Security-Header | HSTS, nosniff, XFO, Referrer/Permissions; keine CSP |
| Auto-Deployment | ja, über GitHub `main` |

**Social-/No-JS:** Der statische HTML-Fallback liefert für Reportage-URLs die
Home-Metadaten; Social-Crawler ohne JS sehen daher nicht die Reportage-OG-Daten.
Googlebot erhält 200; JS-Rendering funktioniert im Browser. Gap dokumentiert.

## 4. SEO-/Discoverability-Audit

Vollständig: `docs/SEO-AUDIT-MARKETING-01.md`.

- Indexierbarkeit, robots, Sitemap, Canonical, noindex, Googlebot-Zugriff: PASS.
- Metadaten/Titles/Descriptions/OG/JSON-LD mit JS: PASS.
- Statuscodes, interne Links, Mobile, CWV, semantische H1/H2, axe: PASS.
- Offen: Social-/No-JS-Metadaten, Soft-404, CSP, Search Console,
  reportagespezifische Social-Cards.

## 5. Google Search Console

Vorbereitet, **nicht verbunden** (keine Autorisierung):

1. URL-Präfix-Property `https://mays-reportage.vercel.app/`.
2. Verifikation per HTML-Tag/Datei nach Betreiber-Token.
3. Sitemap einreichen.
4. URL Inspection für Home/Reportage; Rendering prüfen.
5. Keine Ranking-Garantie.

## 6. Marketing-02/03

Fahrplan: `docs/MARKETING-02-03-PLAN.md`.

- MARKETING-02: Positionierung als Wissenschaftsmagazin, Landing-Page-Struktur,
  Kernbotschaft, redaktionelle Leitlinien; keine Umsetzung in diesem Task.
- MARKETING-03: organische Reichweite, Search Console, Social-Previews,
  Redaktionsplan, Glaubwürdigkeit, Messung ohne Tracking, keine bezahlte Werbung.

## 7. Tests und CI

- Lokal: 33 Unit, 149 E2E / 4 Skips, Build PASS.
- CI nach Fix: success (`43646780686`, `43647482362`, `43648394647`).
- Produktions-Lighthouse/axe: siehe oben.
- Erster CI-Fehler und Routing-Fehler sind dokumentiert und behoben.

## 8. Git-Status und Änderungen

- Push: `a1ebc40` → `e7b6994` (CI) → `e6e0161` (Routing) → `a670327` (A11y).
- Zusätzlich: Audit-/Marketing-/Report-Doku und aktualisierte Screenshots.
- Keine Force-Pushes, keine History-Rewrites, keine anderen Repos.
- Terraform: keine Prüfung, da kein IaC vorhanden.

## 9. Restpunkte

1. Social-/No-JS-Metadaten (Pre-Rendering/Edge) – vor organischem Wachstum.
2. Soft-404-Entscheidung.
3. CSP definieren/testen.
4. Search Console verifizieren/Sitemap einreichen.
5. Vercel-DPA/Tarif und KI-Training durch Betreiberin prüfen.
6. Bildrechte Dritter/Ähnlichkeiten redaktionell prüfen.
7. MARKETING-02/03 umsetzen (separate Phasen).

## 10. Klassifikation

**YELLOW — MAIN INTEGRATED / PRODUCTION VERIFIED mit dokumentierten Restpunkten.**
Keine Rechts- oder Ranking-Garantie.

## 11. Resume-Punkt

Release ist live; Audit und Marketingplan sind dokumentiert. Nächster Schritt:
Search Console und Social-Previews/Pre-Rendering.
