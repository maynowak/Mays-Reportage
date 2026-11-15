# Release-Gate — Post-Release (MAIN RELEASE & MARKETING-01)

**Stand:** 15. November 2026
**Status:** **PRODUCTION a6331e9 / MARKETING-02 + DESIGN-02 LOKAL FERTIG / DEPLOYMENT AUSSTEHEND**
**Restrisiken:** Social-/No-JS-Metadaten, Soft-404, CSP, DPA/KI-Training, Bildrechte-Dritte.

## 1. Git und CI

- `origin/main` / Produktion: `a6331e9` (letzter Release).
- MARKETING-02 (Positionierung + statische Social-Metadaten) und DESIGN-02
  (Typografie + Living-Science-Hintergrund) sind lokal committet, aber **nicht
  gepusht/deployt**.
- Fast-Forward, keine History-Rewrites, kein Force-Push.
- CI: erster Lauf nach dem ersten Release-Push schlug wegen eines
  Playwright-WebServer-Timeouts fehl (Run `43646048356`). Ursache behoben
  (Preview-Bind-Adresse, Timeout); alle folgenden Läufe **success**:
  `43646780686`, `43647482362`, `43648394647`.
- Lokal: 39 Unit-Tests, 192 E2E / 6 Skips, Build PASS; Lighthouse Home 100,
  Story 96 (lokale Varianz).

## 2. Production

- Deployment `dpl_6UGUxdw4QbDNNwphbk9NUgq8gmjL`, Commit `a6331e9`, READY.
- Lokale Marketing-02-HTML-Metadaten sind noch nicht live.
- Domain `https://mays-reportage.vercel.app` liefert die neue Version.
- Alle öffentlichen Routen 200: `/`, `/reportagen`, Reportage, `/impressum`,
  `/datenschutz`, `/bildnachweis`; `robots.txt` und `sitemap.xml` 200.
- Canonical, OG, Twitter, JSON-LD und robots werden mit JS korrekt gesetzt.
- axe: 0 Violations auf Home/Reportage; Mobile 390 px ohne Überlauf.
- Lighthouse mobil: **100/100/100/100** auf Home und Reportage.
  LCP 0,9 s/1,1 s; CLS 0; TBT 30/80 ms.

## 3. Vercel-Konto

- Plan **Hobby**; nicht-kommerzielle Nutzung von der Betreiberin bestätigt.
- KI-Modelltraining: Hobby-Default opt-in; Einstellung wird separat durch die
  Betreiberin geprüft, keine Änderung durch den Agenten.
- Runtime-Logs: Hobby 1 Stunde; statische Requests ggf. nur Cache-Logs.
- Region: Projekt `iad1` (Functions); statische Auslieferung über Edge.
- DPA: Vercel-DPA laut Anbieter für Enterprise/Pro; Hobby-Status bleibt offen.
- Security: HSTS, nosniff, XFO, Referrer/Permissions vorhanden; **keine CSP**.

## 4. Recht und Bilder

- Impressum/Datenschutz sind veröffentlicht; Betreiberangaben und Anschrift
  bestätigt, Anschrift nur einmal öffentlich. Keine Register-/Steuer-/Aufsichtsangaben
  erfunden.
- Eine anwaltliche Prüfung ist nicht gesetzlich vorgeschrieben; externe Beratung
  bleibt Betreiberentscheidung.
- Bildrechte: OpenAI Terms dokumentiert; Output-Eigentum wird übertragen, aber keine
  Garantie gegenüber Dritten. Redaktionelle Freigabe erfolgt mit dem Release;
  Ähnlichkeitsprüfung/Rechte Dritter bleibt Restrisiko.

## 5. SEO / Discoverability

Vollständig: `docs/SEO-AUDIT-MARKETING-01.md`.

- Indexierbar, Sitemap 7 URLs, robots korrekt, Canonical korrekt.
- **Offen:** Social-Crawler ohne JS sehen für Reportagen Home-Metadaten.
- **Offen:** unbekannte Slugs liefern HTTP 200 (Soft-404) mit JS-`noindex`.
- **Offen:** CSP, Search-Console-Anbindung, reportagespezifische Social-Cards.

## 6. Entscheidungen / nächste Schritte

1. Search Console per URL-Präfix verifizieren und Sitemap einreichen.
2. Pre-Rendering/Edge-Metadata für Social-Preview/statische Metadaten.
3. Edge-404 oder dokumentierte Akzeptanz des Soft-404.
4. CSP definieren/testen.
5. Vercel-DPA/Tarif und KI-Training final prüfen.
6. Bildrechte Dritter redaktionell prüfen.

**Keine Ranking- oder Rechtsgarantie.** Die technische Veröffentlichung ist erfolgt;
die genannten Restpunkte sind dokumentiert, nicht als erledigt behauptet.
