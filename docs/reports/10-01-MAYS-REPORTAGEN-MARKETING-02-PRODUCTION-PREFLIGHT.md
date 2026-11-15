# MARKETING-02 — Production Release Preflight

**Status:** **RELEASE-READY (LOKAL) / PUSH & DEPLOY AUSSTEHEND**
**Stand:** 15. November 2026
**Production:** `https://mays-reportage.vercel.app` auf `a6331e9`
**Freigabe:** Kein Push, Merge oder Deployment in diesem Auftrag.

---

## 1. Git-Stand

- Branch `main`, Upstream `origin/main`.
- `origin/main` = `a6331e9`; lokal 3 Commits voraus, 0 hinter.
- Arbeitsbaum vor diesem Report clean.
- Kein Branch-Schutz; Fast-Forward möglich; keine Force-Pushes nötig.
- Lokale Commits:
  - `65ae84f` Positionierung/Startseite
  - `454da4f` statische HTML-Metadaten
  - `acf92b9` MARKETING-02-Doku
  - dieser Preflight-Report folgt als Doku-Commit

**Release-Strategie:** nach Freigabe `git push origin main` (Fast-Forward).
Kein PR nötig, solange `main` ungeschützt und FF möglich ist. Keine History-Rewrites.

## 2. Secrets und persönliche Daten

- Keine Secrets, Tokens, Private Keys oder `.env`-Dateien im Tracked Content.
- Persönliche Betreiberdaten liegen ausschließlich in `src/content/legal.ts` und
  werden für Impressum/Datenschutz benötigt; nicht in Auditlogs, Tests, Fixtures
  oder Screenshots dupliziert.
- Keine Änderungen an anderen Projekten.

## 3. Vercel / CI

- Git-Link: `maynowak/Mays-Reportage`; Production-Branch `main`; Auto-Deployment aktiv.
- Aktuelles Production-Deployment: `dpl_6UGUxdw4QbDNNwphbk9NUgq8gmjL`, `a6331e9`, READY.
- Ein Push auf `main` löst **CI + ein neues Production-Deployment** aus.
- CI-Workflow: `npm ci`, `npm run verify`, Playwright Chromium/Firefox/WebKit.
- Letzter CI-Lauf (`a6331e9`): success. Die drei neuen Commits sind noch nicht gepusht;
  CI für sie läuft erst nach Freigabe.
- Keine Vercel-Kontoeinstellungen geändert.

## 4. Build, Tests, statische Auslieferung

| Prüfung | Ergebnis |
| --- | --- |
| `npm run verify` | PASS |
| Unit-Tests | 38/38 |
| Playwright gesamt | 182 passed / 4 skipped |
| Chromium / Firefox / WebKit | 62 / 60+2 / 60+2 |
| Production Build | PASS |
| Statische HTML-Dateien | 7 |
| Vite-Preview aller 7 Routen | 200, individuelle Titles |
| Social-UA (Twitterbot) auf Reportage | individuelle OG-Daten |
| Lighthouse lokal Home | 100/100/100/100 |
| Lighthouse lokal Reportage | **95**/100/100/100 (TBT 260 ms; vorher 100, lokale Varianz) |
| axe lokal | 0 Violations |

Die statische Auslieferung wurde lokal über die in `vite.config.ts` simulierte
Vercel-Rewrite-Reihenfolge geprüft.

## 5. Vercel-Rewrites (Fehler von zuvor ausgeschlossen)

`cleanUrls` ist **nicht** gesetzt. Reihenfolge:

1. `/reportagen/bakteriophagen` → `/reportagen/bakteriophagen.html`
2. `/reportagen` → `/reportagen.html`
3. `/ueber-uns` → `/ueber-uns.html`
4. `/impressum` → `/impressum.html`
5. `/datenschutz` → `/datenschutz.html`
6. `/bildnachweis` → `/bildnachweis.html`
7. `/(.*)` → `/index.html` (SPA-Fallback)

Damit sind die sieben öffentlichen Routen explizit vor dem Catch-all abgedeckt; der
frühere 404-Fehler durch `cleanUrls` + `/index.html` kann nicht erneut auftreten.

## 6. Auslieferung aller sieben Routen (lokal)

`/`, `/reportagen`, `/reportagen/bakteriophagen`, `/ueber-uns`, `/impressum`,
`/datenschutz`, `/bildnachweis` liefern 200 mit individuellen statischen Titeln,
Canonical, OG/Twitter und JSON-LD (soweit relevant). `robots.txt` und `sitemap.xml`
liefern 200; Sitemap 7 URLs.

**Soft-404:** unbekannte Slugs liefern weiterhin 200 + 404-UI + JS-`noindex`.
Pragmatisch akzeptiert; kein Eingriff in funktionierende SPA-Routen.

## 7. Deployment-Auswirkung

Nach freigegebenem Push:

- Ein gh-Actions-CI-Lauf für den neuen HEAD.
- Ein Vercel-Production-Deployment vom neuen HEAD; Domain bleibt
  `mays-reportage.vercel.app`.
- Neue statische `.html`-Dateien und Rewrites werden live; Social-/No-JS-Metadaten
  werden erstmals ausgeliefert.
- Keine Env-/Konto-/Domain-Änderung; Hobby bleibt bestehen.
- Rollback-Ziel: `a6331e9` / `dpl_6UGUxdw4QbDNNwphbk9NUgq8gmjL`.

## 8. Post-Deployment-Testplan

1. Deployment-SHA und Status `READY` prüfen; Domain-Alias bestätigen.
2. Alle sieben Routen: HTTP 200, kein 5xx.
3. Ohne JS (`curl`): individuelle Titles, Description, Canonical, OG/Twitter,
   absolute Bild-URLs, JSON-LD.
4. Twitterbot-/Social-UA-Request auf Reportage: Reportage-OG statt Home.
5. `robots.txt`, `sitemap.xml` (7 URLs) und alle Sitemap-URLs 200.
6. Canonical/OG/JSON-LD mit JS und ohne JS vergleichen; keine Duplikate.
7. Mobile 390 px, keine Overflows; Cinematic Hero/Interaktionen unverändert.
8. Security-Header: HSTS, nosniff, XFO, Referrer/Permissions; CSP bewusst offen.
9. Soft-404 dokumentieren; keine Indexierung unbekannter URLs behaupten.
10. Lighthouse/axe auf Zielhost; Social-Preview auf realen Plattformen separat
    dokumentieren (LinkedIn/Google nicht ohne Nachweis als erfolgreich bezeichnen).

## 9. Verbleibende Blocker / Restpunkte

**Keine harten technischen Release-Blocker** für diesen Push gefunden.

Restpunkte, die Betreiberentscheidungen oder spätere Phasen bleiben:

- Vercel-DPA/Tarif und KI-Modelltraining (Hobby; Betreiberin prüft separat).
- Bildrechte Dritter/Ähnlichkeiten (OpenAI-Output, keine Drittrechtefreigabe).
- Search-Console-Verbindung/Sitemap-Einreichung.
- CSP, Soft-404, echtes Pre-Rendering des Artikeltexts.
- Social-Preview-Tests auf realen Plattformen.

## 10. Exakte Freigabeanforderung

Für den Produktionsrelease ist eine ausdrückliche Betreiberfreigabe erforderlich:

> „Push von `main` nach `origin/main` und automatisches Vercel-Production-Deployment
> für MARKETING-02 freigegeben.“

Danach: `git push origin main` (Fast-Forward, kein Force), CI beobachten, Vercel-
Deployment abwarten, Post-Deployment-Testplan ausführen. Ohne diese Freigabe bleibt
die Produktion auf `a6331e9`.
