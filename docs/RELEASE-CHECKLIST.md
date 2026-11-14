# Release-Checkliste — Mays-Reportagen

Stand: 14. November 2026. **Kein Push, kein Deployment.** Die verbindliche
Go/No-Go-Matrix steht in `docs/RELEASE-GATE.md`.

## 1. Vercel-Konto (read-only geprüft)

- [x] Projekt/Plan: `mays-reportage` / **Hobby** (Vercel-Team verifiziert).
- [x] Domain verbunden, `/` liefert HTTP 200.
- [ ] Produktion ist veraltet: SPA-Routen und Sitemap liefern 404; aktuellen Stand
      erst nach Freigabe deployen.
- [ ] Hobby ist laut Vercel Terms § 4 nur für persönliche/nicht-kommerzielle Nutzung.
      Nicht-kommerziell bestätigen oder auf Pro wechseln.
- [ ] DPA-Status für Hobby klären (Vercel-DPA gilt für Enterprise/Pro) oder Pro
      abschließen.
- [ ] KI-Modelltraining für Hobby prüfen und in
      `https://vercel.fyi/team-data-preferences` sowie den Projekteinstellungen
      deaktivieren.
- [x] Runtime-Logs Hobby = 1 Stunde; Region `iad1` für Functions; statische
      Auslieferung über Edge.
- [ ] CSP/HSTS-Entscheidung (HSTS ist in Produktion vorhanden, CSP fehlt).

## 2. Rechtliche Pflichtangaben

- [x] Betreiberin, Anschrift, E-Mail, verantwortliche Person und Hoster eingetragen.
- [x] Anschrift-Schreibweise bestätigt.
- [x] Impressum: § 5 DDG, § 18 Abs. 1 und Abs. 2 MStV; Anschrift nur einmal öffentlich.
- [x] Datenschutz gegen statische Vercel-Konfiguration geprüft.
- [x] Keine Register-, Steuer- oder Aufsichtsangaben erfunden.
- [ ] Betreiberin entscheidet über Umfang einer rechtlichen Prüfung (nicht gesetzlich
      vorgeschrieben; externe Beratung optional).
- [ ] Offene Unsicherheiten bewerten: Hobby-DPA, Logs/Region, internationale
      Übermittlung, Verbraucherstreitbeilegung.

## 3. Bildrechte

- [x] OpenAI-Herkunft dokumentiert; Rechte gegenüber OpenAI eingeordnet.
- [x] Keine Lizenzgarantie; mögliche Rechte Dritter benannt.
- [x] KI-Kennzeichnung in Alt-Text, Caption, Hero-Meta und `/bildnachweis`.
- [ ] Betreiberin gibt die Bildnutzung frei.
- [ ] Mögliche Ähnlichkeiten zu Personen/Marken redaktionell prüfen.

## 4. Domain und SEO

Bestätigte Domain: `https://mays-reportage.vercel.app`.

- [x] Canonical, OG, Twitter und JSON-LD absolut auf die Domain.
- [x] `public/sitemap.xml` mit 7 URLs.
- [x] `robots.txt` mit Sitemap-Zeile.
- [x] Vercel-Konfiguration valide.
- [ ] Nach dem Deploy `/`, Reportage, Archiv, Rechtsseiten, Sitemap und robots prüfen.
- [ ] Canonical/OG/JSON-LD in Produktion prüfen.
- [ ] Soft-404-Entscheidung.
- [ ] Social-Preview/Pre-Rendering-Entscheidung.

## 5. Deployment (separate Freigabe)

- [ ] Push freigeben.
- [ ] CI grün.
- [ ] Deploy freigeben.
- [ ] Produktions-Smoke und Header prüfen.
- [ ] Keine Analytics/Tracking ohne Einwilligungskonzept.

## 6. Qualität

- [x] ESLint, TypeScript, 33 Unit-Tests, Build.
- [x] Chromium/Firefox/WebKit lokal, 149 Tests / 4 Skips.
- [x] axe WCAG 2.1 A/AA ohne Violations.
- [x] Lighthouse lokal 99/100/100/100.
- [ ] Erster CI-Lauf.
- [ ] Firefox/WebKit und Lighthouse auf Zielhost/echten Geräten.
- [ ] Externe Quellenlinks periodisch prüfen.
