# Release-Checkliste — Mays-Reportagen

Stand: 14. November 2026. Diese Checkliste ist vorbereitet, aber **nicht aktiviert**.
Kein Deployment, kein Push, keine Domainkonfiguration wurde ausgeführt.
Die verbindliche Go/No-Go-Matrix steht in `docs/RELEASE-GATE.md`.

## 1. Rechtliche Pflichtangaben (Blocker)

- [ ] `src/content/legal.ts` ausfüllen: Betreibername, Anschrift, E-Mail,
      redaktionell verantwortliche Person, Hosting-Anbieter.
- [ ] Impressum und Datenschutz rechtlich prüfen lassen.
- [ ] Hosting-Vertrag (AVV), Log-Aufbewahrung und Serverstandort im Datenschutz ergänzen.
- [ ] Aufsichtsbehörde eintragen.
- [ ] Solange Angaben fehlen, bleiben `/impressum` und `/datenschutz` auf `noindex`.

## 2. Bildrechte

- [ ] Nutzungsrechte für die gelieferten KI-Illustrationen klären.
- [ ] KI-Kennzeichnung gemäß den anzuwendenden Regeln bestätigen.
- [ ] Herkunft/Erzeugungswerkzeug in `docs/BILDHERKUNFT.md` ergänzen.
- [ ] Designreferenzen weiterhin nicht ausliefern.

## 3. Domain und SEO

- [ ] Produktive Domain festlegen.
- [ ] Zuerst `SITE_URL=https://<domain> npm run sitemap` (5 öffentliche URLs) ausführen.
- [ ] Nach rechtlicher Freigabe `INCLUDE_LEGAL=true SITE_URL=https://<domain> npm run sitemap`
      erneut ausführen und `public/sitemap.xml` committen.
- [ ] `Sitemap: https://<domain>/sitemap.xml` in `public/robots.txt` ergänzen.
- [ ] Canonical/OG-URLs prüfen: `useSeo` löst sie zur Laufzeit gegen die Origin auf.
- [ ] `vercel.json` prüfen (Framework/Build, SPA-Rewrite, Security-/Cache-Header,
      `X-Robots-Tag` für Rechtsentwürfe).
- [ ] CSP/HSTS-Entscheidung dokumentieren (bewusst noch nicht gesetzt).
- [ ] Nach dem Deployment: Statuscodes, 404-Verhalten, `robots.txt`, Sitemap und
      Rich-Results-Test prüfen.

## 4. Deployment (separate Freigabe)

- [ ] Vercel-Projekt verbinden, Build `npm run build`, Output `dist`.
- [ ] Rewrite für `/reportagen/*`, `/ueber-uns`, `/impressum`, `/datenschutz`,
      `/bildnachweis` verifizieren.
- [ ] Keine Analytics-/Tracking-Skripte ohne Einwilligungskonzept ergänzen.
- [ ] Produktions-Smoke: Startseite, Reportage, Archiv, alle Rechtsseiten.
- [ ] Soft-404-Verhalten akzeptieren oder Edge-Routing nachrüsten.

## 5. CI und Qualität

- [x] GitHub-Actions-Workflow `.github/workflows/ci.yml` angelegt (verify + 3 Browser).
- [ ] Ersten CI-Lauf nach Push abwarten.

- [x] TypeScript, Unit-Tests, Production Build.
- [x] Chromium/Firefox/WebKit lokal, Responsive 320–1440 px, Reduced Motion.
- [x] axe-core WCAG 2.1 A/AA ohne Violations (inkl. Dialog/Faktencheck).
- [x] Lighthouse mobil lokal: 99–100 Performance, 100 A11y/Best Practices/SEO.
- [ ] Firefox/WebKit und Lighthouse auf dem Zielhost/echten Geräten bestätigen.
- [ ] Externe Quellenlinks periodisch prüfen (Redirects, Zugriffsbeschränkungen).

## 6. Inhalt

- [ ] Quellen-Audit bei jeder inhaltlichen Änderung aktualisieren:
      `docs/WISSENSCHAFTLICHER-QUELLEN-AUDIT.md`.
- [ ] Keine Heilversprechen, keine Therapieempfehlungen.
- [ ] Medizinischen Hinweis sichtbar lassen.
