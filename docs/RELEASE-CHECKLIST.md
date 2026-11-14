# Release-Checkliste — Mays-Reportagen

Stand: 14. November 2026. Diese Checkliste ist vorbereitet, aber **nicht aktiviert**.
Kein Deployment, kein Push. Die verbindliche Go/No-Go-Matrix steht in
`docs/RELEASE-GATE.md`.

## 1. Rechtliche Pflichtangaben

- [x] Betreiberin, Anschrift, E-Mail, verantwortliche Person und Hoster in
      `src/content/legal.ts` eingetragen.
- [x] Impressum um § 18 Abs. 1 und Abs. 2 MStV ergänzt.
- [x] Datenschutz auf statisches Vercel-Hosting, Logs, DPA und internationale
      Übermittlung geprüft.
- [x] Schreibweise der Anschrift von der Betreiberin bestätigen lassen.
- [ ] Impressum und Datenschutz rechtlich prüfen und freigeben.
- [ ] Vercel-Tarif, DPA-Status, Log-Aufbewahrung und Serverregion im Konto prüfen.
- [ ] Anwaltliche Entscheidung zur Verbraucherstreitbeilegung dokumentieren.

## 2. Bildrechte

- [x] Herkunft als OpenAI-Bildgenerierung dokumentiert.
- [x] KI-Kennzeichnung in Alt-Text, Bildunterschrift, Hero-Meta und `/bildnachweis`.
- [ ] Nutzungsrechte/Lizenz für die öffentliche Verwendung klären.
- [ ] Keine Lizenzgarantie behaupten, solange sie nicht belegt ist.
- [x] Designreferenzen werden nicht ausgeliefert.

## 3. Domain und SEO

Bestätigte Domain: `https://mays-reportage.vercel.app` (`site.config.json`).

- [x] Canonical, OG, Twitter und JSON-LD gegen die Domain absolut aufgelöst.
- [x] `public/sitemap.xml` mit 7 URLs erzeugt.
- [x] `robots.txt` mit Sitemap-Zeile aktualisiert.
- [x] Vercel-Konfiguration geprüft (SPA-Rewrite, Security-/Cache-Header).
- [x] `X-Robots-Tag: noindex` für Rechtsseiten entfernt.
- [ ] Nach dem Deploy Statuscodes, Sitemap, robots, Canonical und Rich Results prüfen.
- [ ] Social-Preview/Pre-Rendering-Entscheidung dokumentieren.
- [ ] Suchmaschinen-Anbindung nur nach Freigabe.

## 4. Deployment (separate Freigabe)

- [ ] Vercel-Projekt verbinden, Build `npm run build`, Output `dist`.
- [ ] Rewrite für `/reportagen/*`, `/ueber-uns`, `/impressum`, `/datenschutz`,
      `/bildnachweis` verifizieren.
- [ ] Keine Analytics-/Tracking-Skripte ohne Einwilligungskonzept ergänzen.
- [ ] Produktions-Smoke: Startseite, Reportage, Archiv, alle Rechtsseiten.
- [ ] Soft-404-Verhalten akzeptieren oder Edge-Routing nachrüsten.
- [ ] CSP/HSTS-Entscheidung treffen.

## 5. CI und Qualität

- [x] GitHub-Actions-Workflow `.github/workflows/ci.yml` angelegt (verify + 3 Browser).
- [x] TypeScript, Unit-Tests, Production Build.
- [x] Chromium/Firefox/WebKit lokal, Responsive 320–1440 px, Reduced Motion.
- [x] axe-core WCAG 2.1 A/AA ohne Violations (inkl. Dialog/Faktencheck).
- [x] Lighthouse mobil lokal: 99–100 Performance, 100 A11y/Best Practices/SEO.
- [ ] Ersten CI-Lauf nach Push abwarten.
- [ ] Firefox/WebKit und Lighthouse auf dem Zielhost/echten Geräten bestätigen.
- [ ] Externe Quellenlinks periodisch prüfen (Redirects, Zugriffsbeschränkungen).

## 6. Inhalt

- [ ] Quellen-Audit bei jeder inhaltlichen Änderung aktualisieren:
      `docs/WISSENSCHAFTLICHER-QUELLEN-AUDIT.md`.
- [ ] Keine Heilversprechen, keine Therapieempfehlungen.
- [ ] Medizinischen Hinweis sichtbar lassen.
