# CONTROLLED PRODUCTION RELEASE — MARKETING-02 + DESIGN-02

## 1. Status

**GREEN — RELEASED UND PRODUKTIV VERIFIZIERT.**

- Production: `https://mays-reportage.vercel.app`
- Deployment: `dpl_H4ydqQxfKmQXypHt8LAecuqwYe1Q`
- Deployment-Commit: `304a6e3d0bdd74d4eacf74667cbea1682120b08b` (`304a6e3`)
- Vercel-Status: **READY**
- CI: **success** (`43735767466`)
- Kein Force-Push, keine History-Rewrites.

## 2. Audit-Zeitpunkt

15. November 2026, Push um 16:29 UTC, Deployment READY um 16:35 UTC.

## 3. Git-Branch und HEAD

- Branch: `main`, Upstream `origin/main`.
- Vor Release: `origin/main` `a6331e9`, lokal `304a6e3`, 10 Commits voraus,
  Working Tree clean.
- Push: `a6331e9..304a6e3 main -> main` als Fast-Forward.
- Nach Release: `origin/main` = `304a6e3`; Produktion = `304a6e3`.
- Dieser Auditbericht wird nach der Verifikation als lokaler Doku-Commit abgelegt
  und **nicht gepusht**, damit kein unnötiger zweiter Production-Deploy entsteht.

## 4. Audit-Scope

- Design-Check im tatsächlichen Browser vor dem Release.
- Kontrollierter Fast-Forward-Release nach `origin/main`.
- CI- und Vercel-Deployment-Beobachtung.
- Production-E2E aller sieben öffentlichen Routen sowie Sitemap/robots.txt.
- Statische No-JS-/Social-Metadaten, Canonical, Open Graph, Twitter, JSON-LD.
- Mobile 390 px, Kapitel-Navigation, Quellen, Reduced Motion, axe.
- Lighthouse auf der echten Produktionsdomain.
- Keine Änderungen an anderen Projekten, Rechtstexten, Inhalten oder Reportagen.

## 5. Abgeschlossene Audit-Abschnitte

1. Governance und Baseline verifiziert.
2. Design-Check im laufenden Chromium-Browser.
3. `npm run verify` vor Release: PASS.
4. Fast-Forward-Push ausgeführt.
5. CI erfolgreich abgeschlossen.
6. Vercel-Production-Deployment READY und Alias bestätigt.
7. Production-Routen und statische Metadaten geprüft.
8. Production-Browser-E2E und axe geprüft.
9. Lighthouse Production ausgeführt.
10. Release-Dokumentation und Auditindex aktualisiert.

## 6. Tatsächliche Findings

### Design-Check

- Cinematic Hero, Hero-Bild und bestehendes Layout unverändert.
- Drei Hintergrundebenen mit 150 s / 105 s / 72 s.
- Gemessene Abwärtsbewegung über 3 Sekunden:
  - fern: 5,20 px
  - mittel: 7,43 px
  - nah: 10,83 px
- Bewegung damit praktisch erkennbar; **keine Animationsparameter geändert**.
- Textüberlagerung: `elementFromPoint` auf der Positionierungs-H2 traf die H2,
  `opacity: 1`; keine Überlagerung durch den Hintergrund.
- Reduced Motion: `transform: none`, `animation: none`, nach 2 s unverändert.
- Kapitel sichtbar; keine `opacity: 0`-Kapitel.
- Keine zusätzlichen Designänderungen und kein zusätzlicher Design-Commit.

### Release

- Push erfolgreich als Fast-Forward.
- CI-Run `43735767466`: **success**, Laufzeit 4m58s.
- Vercel-Deployment `dpl_H4ydqQxfKmQXypHt8LAecuqwYe1Q`: **READY**.
- Alias `https://mays-reportage.vercel.app` zeigt auf dieses Deployment.
- Deployment-Metadaten bestätigen Commit `304a6e3` und Commit-Message
  `docs(design): finalize DESIGN-02 commit record`.

### Production-Routen

Alle liefern HTTP 200 mit individuellem Titel:

- `/`
- `/reportagen`
- `/reportagen/bakteriophagen`
- `/ueber-uns`
- `/impressum`
- `/datenschutz`
- `/bildnachweis`
- `/sitemap.xml` mit 7 URLs
- `/robots.txt`

### Statische Metadaten ohne JavaScript

Geprüft mit `Twitterbot/1.0`, `facebookexternalhit/1.1`, `LinkedInBot/1.0` und
`Mozilla/5.0` — jeweils ohne JavaScript-Ausführung:

- **0 Fehler** über 7 Routen × 4 User-Agents.
- Titel, Description, Canonical, Open Graph und Twitter Cards im initialen HTML.
- Canonicals exakt auf `https://mays-reportage.vercel.app<route>`.
- OG-Bild: `https://mays-reportage.vercel.app/media/phagen/og-phagen.jpg`,
  HTTP 200, `image/jpeg`, 160.318 Bytes.
- JSON-LD im initialen HTML:
  - Home: `WebSite`
  - Archiv: `CollectionPage`
  - Reportage: `NewsArticle`
  - Über uns/Impressum/Datenschutz/Bildnachweis: erwartungsgemäß kein JSON-LD.
- Keine JavaScript-abhängige Bot-Sonderbehandlung.

### Production-Browser-E2E

- Hero sichtbar, Hero-Bild erfolgreich geladen.
- Science-Transition mit drei Ebenen vorhanden; Bewegung messbar.
- Reduced Motion statisch.
- Mobile 390 px: kein horizontaler Überlauf.
- Mobiles Menü öffnet und schließt mit Escape.
- Mobile Kapitelauswahl öffnet und navigiert zu `#forschung`.
- Desktop-Kapitelnavigation navigiert zu `#forschung`.
- 7 Kapitel, 14 Quellen; Quellenbereich sichtbar.
- Keine Konsolen- oder Seitenfehler; keine 4xx/5xx-Subresources.
- axe WCAG 2.1 A/AA: **0 Violations** auf Home und Reportage.
- Textkontrast und Kapitelsichtbarkeit damit zusätzlich bestätigt.

### Lighthouse Production (mobil)

| Seite | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home | **100** | **100** | **100** | **100** | 1,0 s | 20 ms | 0 |
| Reportage | **100** | **100** | **100** | **100** | 0,9 s | 90 ms | 0 |

### Security-Header

Vorhanden: HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
Referrer-Policy, Permissions-Policy. Keine CSP (bestehender Restpunkt).

## 7. Evidenz / Dateireferenzen

- CI: https://github.com/maynowak/Mays-Reportage/actions/runs/43735767466
- Deployment: `dpl_H4ydqQxfKmQXypHt8LAecuqwYe1Q`,
  `https://mays-reportage-ffjoosv4f-maymilly.vercel.app`
- Screenshots:
  - `docs/reports/assets/MAYS-REPORTAGEN-RELEASE-02/production-home-1440.png`
  - `.../production-home-390.png`
  - `.../production-reportage-1440.png`
  - `.../production-reportage-390.png`
  - `.../production-reportage-forschung-1440.png`
- Release-Gate: `docs/RELEASE-GATE.md`
- Checkliste: `docs/RELEASE-CHECKLIST.md`
- Vorherige Implementierung: `docs/reports/09-01-...MARKETING-02...`,
  `docs/reports/11-01-...DESIGN-02...`

## 8. Klassifikation

**GREEN.** Der kontrollierte Release ist live, der Deployment-Commit ist eindeutig
festgestellt, CI und Production-E2E sind erfolgreich. Verbleibende Punkte sind
redaktionelle/externe Restpunkte, keine technischen Release-Blocker dieses Auftrags.

## 9. Terraform

Keine Terraform-Prüfung ausgeführt: Im Repository existiert keine
Terraform-/IaC-Konfiguration. Keine Cloud-Infrastruktur außerhalb von Vercel geändert.

## 10. Git-Status

- Vor Release: clean, 10 Commits voraus.
- Nach Push: `origin/main` = `304a6e3`.
- Nach diesem Bericht: lokaler Doku-Commit; Arbeitsbaum clean.
- Kein Force-Push, kein Merge, keine History-Rewrites.
- Doku-Commit absichtlich nicht gepusht, um kein zweites Deployment zu erzeugen.

## 11. Geänderte Dateien

- Neu: dieser Release-Report.
- Neu: fünf Production-Screenshots unter
  `docs/reports/assets/MAYS-REPORTAGEN-RELEASE-02/`.
- Geändert: `AI_AUDITINDEX.md`, `docs/RELEASE-GATE.md`,
  `docs/RELEASE-CHECKLIST.md`.
- Keine Änderungen an Anwendungscode, Inhalten, Rechtstexten, `vercel.json`,
  Sitemap oder Reportagen in diesem Release-Schritt.

## 12. Bestätigung „keine Dateien geändert“

Nicht zutreffend: Dokumentations- und Screenshot-Dateien wurden geändert. Am
deployten Anwendungscode wurde nach `304a6e3` nichts geändert.

## 13. Offene Fragen

1. Search Console: URL-Präfix verifizieren und Sitemap einreichen.
2. Reale Social-Previews bei LinkedIn/X/WhatsApp/Slack prüfen.
3. Soft-404 für unbekannte Slugs: Edge-404 oder dokumentierte Akzeptanz.
4. CSP-Entscheidung.
5. Vercel-DPA/Tarif und KI-Training final bewerten.
6. Rechte Dritter an KI-Illustrationen redaktionell prüfen.

## 14. Risiken

- Social-Metadaten sind statisch korrekt, aber externe Plattform-Caches können
  verzögert sein; keine Garantie für einen bestimmten Preview.
- Unbekannte Slugs liefern weiterhin HTTP 200 mit 404-UI und JS-`noindex`.
- Keine CSP; bestehende Header-Schutzmaßnahmen sind aktiv.
- Vercel-Hobby-/DPA-/KI-Trainingsstatus bleibt eine Betreiberentscheidung.
- Keine Garantie gegenüber Dritten bei KI-Bildrechten.

## 15. Empfohlene nächste Aktionen

1. Search Console anbinden und Sitemap einreichen.
2. Social-Preview-Stichproben auf den Zielplattformen durchführen.
3. Soft-404- und CSP-Entscheidung treffen.
4. DPA-/KI-Trainingsstatus dokumentieren.
5. Mit MARKETING-03 (organische Reichweite) beginnen, sofern freigegeben.

## 16. Resume-Punkt

Produktion ist auf `304a6e3` live und verifiziert. Nächster inhaltlicher Schritt ist
MARKETING-03; der lokale Release-Report ist committed, aber nicht gepusht. Bei Bedarf
kann der Doku-Commit separat freigegeben und gepusht werden.
