# Release-Gate — Post-Release (MARKETING-02 + DESIGN-02)

**Stand:** 16. November 2026
**Status:** **PRODUCTION 6c960c4 / MARKETING-02 + DESIGN-02 + GSC-DATEI LIVE**
**Restrisiken:** Externe Plattform-Previews, Soft-404, CSP, DPA/KI-Training, Bildrechte-Dritte.

## 1. Git und CI

- `origin/main` / Produktion: `6c960c4` (GSC-01-Release).
- MARKETING-02, DESIGN-02 und die Google-Verifizierungsdatei sind live und
  produktiv geprüft.
- Fast-Forward `304a6e3..6c960c4`, keine History-Rewrites, kein Force-Push.
- CI: Release-Lauf `43948954612` **success**.
- Lokal: 39 Unit-Tests, 192 E2E / 6 Skips, Build PASS.
- Release-Reports: `docs/reports/12-01-...`, `docs/reports/14-01-...`.

## 2. Production

- Deployment `dpl_GZ817a2xBBxLkV6nkjSRi88M5bZY`, Commit `6c960c4`, READY.
- Domain `https://mays-reportage.vercel.app` liefert die neue Version.
- GSC-Verifizierungsdatei: `https://mays-reportage.vercel.app/google426c8ebaa607666d.html`,
  HTTP 200, `text/html`, 53 Bytes, SHA-256
  `4ddd9841d3de4229eeb61181ee9cca0004bb2311675abaeb11f4e9595d268691`.
- Alle öffentlichen Routen 200: `/`, `/reportagen`, Reportage, `/impressum`,
  `/datenschutz`, `/bildnachweis`; `robots.txt` und `sitemap.xml` 200 (7 URLs).
- Statische HTML-Metadaten für 7 Routen ohne JavaScript geprüft: 0 Fehler über
  Twitterbot/Facebook/LinkedIn/Standard-UA.
- Canonical, Open Graph, Twitter Cards und JSON-LD im initialen HTML; Home
  `WebSite`, Archiv `CollectionPage`, Reportage `NewsArticle`.
- axe: 0 Violations auf Home und Reportage; Mobile 390 px ohne Überlauf.
- Lighthouse mobil: **100/100/100/100** auf Home und Reportage.
  LCP 1,0/0,9 s; CLS 0; TBT 20/90 ms.

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
- Statische Social-/No-JS-Metadaten sind live und geprüft.
- **Offen:** reale Plattform-Previews (LinkedIn/X/WhatsApp/Slack) prüfen.
- **Offen:** unbekannte Slugs liefern HTTP 200 (Soft-404) mit JS-`noindex`.
- **Live:** GSC-01-Verifizierungsdatei ist unter
  `https://mays-reportage.vercel.app/google426c8ebaa607666d.html` ausgeliefert.
- **Offen:** Bestätigung der Property in der Google Search Console, Sitemap-
  Einreichung und URL-Prüfung.
- **Offen:** CSP.

## 6. Entscheidungen / nächste Schritte

1. Search Console per URL-Präfix verifizieren und Sitemap einreichen.
2. Reale Social-Previews auf den Zielplattformen prüfen.
3. Edge-404 oder dokumentierte Akzeptanz des Soft-404.
4. CSP definieren/testen.
5. Vercel-DPA/Tarif und KI-Training final prüfen.
6. Bildrechte Dritter redaktionell prüfen.

**Keine Ranking- oder Rechtsgarantie.** Die technische Veröffentlichung ist erfolgt;
die genannten Restpunkte sind dokumentiert, nicht als erledigt behauptet.
