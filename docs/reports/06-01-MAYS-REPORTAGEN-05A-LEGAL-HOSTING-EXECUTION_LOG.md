# MAYS-REPORTAGEN-05A — Legal & Hosting Configuration — Execution Log

**Status:** ABGESCHLOSSEN / LOKAL VERIFIZIERT / **PUSH NUR MIT GESONDERTER FREIGABE**
**Entscheidung:** Release weiterhin **NO-GO** bis zur rechtlichen und Bildrechte-Freigabe.
**Audit-Zeitpunkt:** 2026-11-14, Europe/Berlin
**Git-Baseline:** Branch `main`, HEAD `d7717ca`, Arbeitsbaum clean, 6 Commits vor
`origin/main`. Neue Commits: `3767efe` (Legal), `8156f13` (SEO); Doku-/Beleg-Commit
folgt als letzter Commit.
**Scope:** Betreiber-/Hostingangaben, Impressum, Datenschutz, Domain/Canonical/Sitemap,
Bildherkunft. Keine neue Reportage, kein Redesign, keine Engine-Änderung.

---

## 1. Baseline

`git status` clean, `d7717ca`, 6 Commits vor `origin/main`. AGENTS.md und Auditindex
gelesen. 33 Unit-Tests nach neuen Legal-Tests, 149 E2E-Tests / 4 Skips, Lighthouse
99/100/100/100. Keine anderen Projekte verändert.

## 2. Betreiberangaben

Die von der Betreiberin bereitgestellten Angaben sind in `src/content/legal.ts`
eingetragen. Sie werden aus Datenschutzgründen **nicht in diesem Report, in
Screenshots, Auditlogs oder Test-Fixtures wiederholt**.

- Betreiberin und inhaltlich verantwortliche Person sind dieselbe Person.
- Die Anschrift erscheint öffentlich nur im Impressum; die Datenschutzseite verweist
  für die Postanschrift auf das Impressum.
- Die Schreibweise der Anschrift wurde von der Betreiberin am 14.11.2026 bestätigt.
- Keine Handelsregister-, Umsatzsteuer- oder Aufsichtsbehördenangaben erfunden; die
  entsprechenden optionalen Felder wurden entfernt.

## 3. Impressum

- Anbieterkennzeichnung nach § 5 DDG und § 18 Abs. 1 MStV (Name, Anschrift, E-Mail).
- Verantwortlich im Sinne des § 18 Abs. 2 MStV (dieselbe Person, „Anschrift wie oben“).
- Platzhaltersektion zur Streitbeilegung entfernt; keine nicht belegte Teilnahme
  behauptet.
- Kein Entwurfshinweis mehr; die Seite ist indexierbar.
- Keine Register-/Steuer-/Aufsichtsangaben ergänzt.

## 4. Datenschutz

Geprüft gegen Code und Vercel-Dokumentation:

- Statische Auslieferung, keine Functions/API/Formulare/Accounts/Cookies/Analytics.
- Vercel verarbeitet technisch erforderliche Verbindungsdaten (IP, Zeitpunkt,
  Ressource, User-Agent, Status).
- Log-Aufbewahrung tarifabhängig (Hobby 1 h, Pro 1 Tag; statische Anfragen ggf. nur
  über Log Drains); im Konto zu prüfen.
- DPA von Vercel für Enterprise/Pro; Tarif-/Vertragsstatus im Konto prüfen.
- Übermittlung in die USA möglich; Vercel verweist auf EU-U.S. DPF und SCC; konkrete
  Grundlage tarifabhängig.
- Lokale Fonts, keine externen Embeds, externe Links erst nach Klick.
- Kein Consent-Banner, da keine einwilligungspflichtigen Technologien.

Keine fiktiven Verarbeitungsprozesse dokumentiert.

## 5. Domain und SEO

Bestätigte Domain in `site.config.json`:

- Canonical, OG, Twitter und JSON-LD werden gegen die Produktionsdomain absolut
  aufgelöst (nicht mehr `window.location.origin`).
- `public/sitemap.xml` mit 7 URLs erzeugt und committed.
- `robots.txt` mit Sitemap-Zeile aktualisiert.
- `X-Robots-Tag`-Header für Impressum/Datenschutz entfernt (Seiten sind indexierbar).
- Vercel-Konfiguration validiert.
- **Grenze:** Reportage-Metadaten bleiben clientseitig; Social-Crawler ohne JS sehen
  ggf. nur die statischen Home-Metadaten. Nach Deploy prüfen.

## 6. Bildherkunft

- Titelmotiv und Desktop-Designreferenz wurden nach Angaben der Betreiberin mit
  OpenAI-Bildgenerierung erstellt.
- Keine Metadaten zu Modell/Prompt/Urheber/Lizenz; SHA-256 in
  `docs/BILDHERKUNFT.md`.
- Keine Lizenzgarantie behauptet. Nutzungsrechte bleiben vor Veröffentlichung zu klären.
- KI-Kennzeichnung in Alt-Text, Caption, Hero-Meta und `/bildnachweis`.

## 7. Tests und Build

| Prüfung | Ergebnis |
| --- | --- |
| ESLint / TypeScript / Build | PASS |
| Unit-Tests | 33/33 |
| Playwright gesamt | 149 passed / 4 skipped |
| Chromium / Firefox / WebKit | 51 / 49+2 / 49+2 |
| axe WCAG 2.1 A/AA | 0 Violations |
| Lighthouse Story | 99 Performance, 100 A11y/Best Practices/SEO |
| LCP / CLS / TBT | 0,8 s / 0 / 130 ms |
| Sitemap | 7 URLs |
| Vercel-JSON | valide |
| Canonical/robots | geprüft |

Keine Screenshots von Impressum/Datenschutz mit Betreiberdaten erzeugt oder committed.

## 8. Git-Status und Änderungen

Neu/geändert: `src/content/legal.ts`, `src/content/legal.test.ts`,
`src/pages/LegalPages.tsx`, `src/content/site.ts`, `site.config.json`,
`src/lib/seo.ts`, `src/lib/seo.test.ts`, `src/content/reportagen.ts`, `index.html`,
`scripts/generate-sitemap.mjs`, `public/sitemap.xml`, `public/robots.txt`,
`vercel.json`, `e2e/seo.spec.ts`, `e2e/release.spec.ts`, `src/App.test.tsx`,
`docs/BILDHERKUNFT.md`, `docs/RELEASE-GATE.md`, `docs/RELEASE-CHECKLIST.md`, README,
AGENTS.

Es wurden Dateien geändert; „keine Dateien geändert“ trifft nicht zu.
Kein Push, Merge, Deployment, keine Änderung an anderen Projekten.
Terraform: keine Prüfung, da kein IaC vorhanden ist.

## 9. Klassifikation

**ORANGE — Konfiguration vollständig, Freigabe offen.** Betreiber-/Hostingdaten und
Domain sind gesetzt; Rechtstexte und Bildrechte sind nicht durch Dritte freigegeben.

## 10. Noch zu prüfen

1. Anwaltliche Prüfung von Impressum und Datenschutz.
2. Vercel-Tarif, DPA-Status, Log-Aufbewahrung und Serverregion im Konto.
3. Nutzungsrechte/Lizenz der OpenAI-generierten Illustrationen.
4. Nach Deploy: Indexierung, Sitemap, robots, Canonical, Social-Preview,
   Soft-404- und CSP/HSTS-Entscheidung.
5. Erster CI-Lauf nach Push.

## 11. Betreiberentscheidung erforderlich

- Freigabe der Rechtstexte nach Prüfung.
- Freigabe der Bildnutzung.
- Freigabe von Push/Deployment.
- Entscheidung zu Social-Preview/Pre-Rendering und Verbraucherstreitbeilegung.

## 12. Resume-Punkt

Arbeitsstand ist clean, getestet und lokal commitet. Fortsetzung bei rechtlicher
Freigabe; kein Deploy.
