# MAYS-REPORTAGEN-05B — Final Release Preflight — Execution Log

**Status:** PREFLIGHT ABGESCHLOSSEN / **KEINE FREIGABE** / **KEIN PUSH / KEIN DEPLOY**
**Audit-Zeitpunkt:** 2026-11-14, Europe/Berlin
**Git-Baseline:** Branch `main`, HEAD `69dc13c`, clean, 9 Commits vor `origin/main`.
**Scope:** Read-only Vercel-Kontoprüfung, OpenAI-Bildrechte, Rechtstexte,
technische Release-Prüfung, Entscheidungsmatrix.
**Keine Änderungen an Storytelling, Design, Reportagen oder anderen Projekten.**

---

## 1. Vercel-Kontoprüfung (read-only)

Mit Vercel CLI 65.1.0 geprüft, keine Einstellungen verändert:

- Plan: **Hobby**.
- Projekt `mays-reportage`; Domain `https://mays-reportage.vercel.app` verbunden,
  HTTP 200.
- Letztes Production-Deployment ca. 8 Stunden alt. Die Produktion ist **veraltet**:
  `/impressum`, `/datenschutz`, `/reportagen/*`, `/sitemap.xml` liefern 404;
  `robots.txt` ist die alte Fassung. Die Commits ab 05A sind nicht deployt.
- Region: Projekt `iad1` (Functions/Sandbox); statische Auslieferung über Edge
  (beobachtet `fra1`).
- Runtime-Logs: Hobby **1 Stunde**; statische Anfragen laut Vercel nur bei
  Cache-Auslieferung, vollständige statische Logs nur über Log Drains (Hobby keine).
- Security-Header in Produktion: HSTS, X-Content-Type-Options, X-Frame-Options,
  Referrer-Policy, Permissions-Policy; **keine CSP**.

### Entscheidungen, die nur die Betreiberin treffen kann

1. **Kommerzielle Nutzung:** Hobby ist laut Vercel Terms § 4 nur persönlich/
   nicht-kommerziell. Die Website hat keine Monetarisierung; Bestätigung oder Pro.
2. **DPA:** Vercel-DPA gilt laut Anbieter für Enterprise/Pro. Hobby-Status klären
   (Upgrade oder schriftliche Bestätigung).
3. **KI-Modelltraining:** Hobby ist standardmäßig opt-in. Aktuelle Einstellung nicht
   per CLI lesbar. Manuell: `https://vercel.fyi/team-data-preferences`
   (Team Settings → Data Preferences), danach Projekteinstellungen; opt-out setzen.
4. Region/Logs: keine Änderung nötig, aber im Konto verifizieren.

## 2. OpenAI-Bildrechte

Neu dokumentiert: `docs/OPENAI-BILD-RECHTE.md`.

- OpenAI Europe Terms (16.01.2026): Nutzerin besitzt Output; OpenAI überträgt ihre
  Rechte. Gilt nur gegenüber OpenAI.
- Keine Einzigartigkeit; ähnliche Outputs anderer Nutzer möglich. Keine
  Rechtefreigabe Dritter; Ähnlichkeiten zu Personen/Marken prüfen.
- KI-Kennzeichnung vorhanden; keine Garantie für zusätzliche gesetzliche Pflichten.
- Betreiberin muss Bildnutzung freigeben. Keine Lizenzgarantie.

## 3. Rechtstexte

- Impressum/Datenschutz gegen tatsächliche Konfiguration geprüft.
- Betreiberangaben vollständig; Anschrift-Schreibweise bestätigt; Anschrift nur einmal
  öffentlich, Verantwortlichenangabe verweist darauf.
- Datenschutz um Vercel-Data-Preferences/KI-Training-Hinweis ergänzt; keine fiktiven
  Prozesse.
- Eine anwaltliche Prüfung ist nicht gesetzlich vorgeschrieben. Die Betreiberin
  entscheidet über externe Beratung; offene Unsicherheiten sind Hobby-DPA,
  Logs/Region, internationale Übermittlung, Verbraucherstreitbeilegung und
  KI-Kennzeichnung.

## 4. Technische Prüfung

- Build, ESLint, TypeScript, 33 Unit-Tests: PASS.
- E2E: 149 passed / 4 skipped (Chromium 51, Firefox/WebKit je 49+2).
- Nach der Datenschutz-Textänderung: 33 Unit-Tests + 15 gezielte A11y/SEO-Tests PASS.
- axe: 0 Violations; Lighthouse 99/100/100/100 (05A, unverändertes Layout).
- Canonical/Sitemap/robots lokal korrekt (7 URLs, Produktionsdomain).
- Produktion: veraltetes Deployment; SPA-Routen/Sitemap 404.
- Soft-404 lokal 200; nach Deploy erneut prüfen.
- CSP fehlt; HSTS in Produktion vorhanden.

## 5. Entscheidungsmatrix

| Gate | Status |
| --- | --- |
| Build/Unit/E2E/A11y/Performance lokal | PASS |
| Repo-Vercel-Konfiguration | PASS |
| Produktionsdeployment | NOT VERIFIED / STALE |
| Domain/Canonical/Sitemap lokal | PASS |
| Betreiberangaben | PASS |
| Rechtstexte | PENDING OPERATOR DECISION |
| Bildrechte | PENDING OPERATOR DECISION |
| Hobby/kommerziell | PENDING OPERATOR DECISION |
| DPA/KI-Training | PENDING OPERATOR DECISION |
| Security-Header | PARTIAL |
| CI | PENDING erster Lauf |
| Deployment | PENDING |

## 6. Veröffentlichungsablauf

1. Hobby vs. Pro entscheiden; bei Pro DPA prüfen.
2. Data Preferences: KI-Modelltraining für das Projekt deaktivieren.
3. Rechtstexte und Bildnutzung freigeben; externe Beratung optional.
4. Push freigeben, CI abwarten, deployen (separate Freigaben).
5. Produktion prüfen: alle Routen, Sitemap, robots, Canonical, Header, Soft-404.
6. Zielhost-Lighthouse/axe und Social-Preview prüfen.
7. Erst dann veröffentlichen.

## 7. Git-Status und Änderungen

Geändert: `src/pages/LegalPages.tsx` (Datenschutz-Hinweis Data Preferences),
`docs/BILDHERKUNFT.md`, `docs/RELEASE-GATE.md`, `docs/RELEASE-CHECKLIST.md`,
`README.md`. Neu: `docs/OPENAI-BILD-RECHTE.md`, dieser Report.

Es wurden Dateien geändert; „keine Dateien geändert“ trifft nicht zu.
Kein Push, Merge, Deployment, keine Änderung an anderen Projekten.
Terraform: keine Prüfung, da kein IaC vorhanden ist.

## 8. Klassifikation

**ORANGE / PENDING OPERATOR DECISION.** Lokal technisch bereit; Produktion veraltet,
Hobby/DPA/Training, Rechtstexte und Bildrechte benötigen Entscheidungen.

## 9. Offene Entscheidungen

- Nicht-kommerzielle Hobby-Nutzung bestätigen oder Pro/Enterprise wählen.
- DPA-Status klären.
- KI-Modelltraining opt-out.
- Rechtstexte freigeben.
- Bildnutzung freigeben.
- Push/Deploy freigeben.
- CSP/HSTS und Social-Preview/Soft-404 entscheiden.
- Erster CI-Lauf.

## 10. Resume-Punkt

Arbeitsstand ist clean, getestet und dokumentiert. Fortsetzung bei Betreiberfreigabe;
kein Deploy.
