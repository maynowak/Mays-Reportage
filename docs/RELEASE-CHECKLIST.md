# Release-Checkliste — Mays-Reportagen

Stand: 14. November 2026. **MAIN INTEGRATED / PRODUCTION VERIFIED.**
Details: `docs/RELEASE-GATE.md`, `docs/SEO-AUDIT-MARKETING-01.md`.

## 1. Vercel

- [x] Plan Hobby, Projekt `mays-reportage`, Production-Branch `main`.
- [x] Nicht-kommerzielle Nutzung von der Betreiberin bestätigt.
- [x] Auto-Deployment nach `main` verifiziert.
- [x] Produktionsdeployment `a670327` READY; Domain liefert neue Version.
- [x] Runtime-Logs Hobby (1 h), Region `iad1`, Edge-Auslieferung dokumentiert.
- [ ] KI-Modelltraining durch Betreiberin prüfen.
- [ ] DPA-Status für Hobby klären (Enterprise/Pro-DPA).
- [ ] CSP-Entscheidung; HSTS/Header vorhanden.

## 2. Recht

- [x] Betreiberangaben, Anschrift, E-Mail, verantwortliche Person, Hoster.
- [x] Anschrift-Schreibweise bestätigt; nur einmal öffentlich.
- [x] Impressum § 5 DDG, § 18 Abs. 1/2 MStV.
- [x] Datenschutz gegen statische Vercel-Konfiguration.
- [x] Keine Register-/Steuer-/Aufsichtsangaben erfunden.
- [x] Betreiberin hat Veröffentlichung freigegeben.
- [ ] Externe rechtliche Beratung optional entscheiden.
- [ ] Verbraucherstreitbeilegung/übrige Unsicherheiten bewerten.

## 3. Bilder

- [x] OpenAI-Herkunft dokumentiert, Rechte gegenüber OpenAI eingeordnet.
- [x] KI-Kennzeichnung vorhanden; keine Lizenzgarantie.
- [x] Betreiberin hat Bildnutzung mit dem Release freigegeben.
- [ ] Mögliche Ähnlichkeiten/Rechte Dritter redaktionell prüfen.

## 4. Domain/SEO

- [x] Domain, Canonical, OG, Twitter, JSON-LD.
- [x] Sitemap 7 URLs, robots.txt.
- [x] Produktionsrouten, Statuscodes, Canonical, Metadaten geprüft.
- [x] Lighthouse mobil 100/100/100/100; axe 0.
- [ ] Search Console verifizieren, Sitemap einreichen.
- [ ] Social-/No-JS-Metadaten (Pre-Rendering/Edge).
- [ ] Soft-404-Entscheidung.
- [ ] Reportagespezifische Social-Cards.

## 5. CI/Qualität

- [x] GitHub-Actions-Workflow; CI-Läufe nach Fix erfolgreich.
- [x] 33 Unit-Tests, 149 E2E / 4 Skips lokal; CI erfolgreich.
- [x] Responsive 320–1440, Reduced Motion, Tastatur/Touch.
- [x] Externe Quellenlinks im Audit geprüft; periodisch wiederholen.

## 6. Marketing

- [x] MARKETING-01 SEO-/Discoverability-Audit.
- [x] MARKETING-02/03-Fahrplan dokumentiert.
- [ ] MARKETING-02 Positioning/Landing-Page-Umsetzung (separate Phase).
- [ ] MARKETING-03 Organic-Launch-Umsetzung (separate Phase).
