# MAYS-REPORTAGEN-04 — Release Foundation — Execution Log

**Status:** ABGESCHLOSSEN / LOKAL VERIFIZIERT / **RELEASE NO-GO** / **KEIN PUSH / KEIN DEPLOY**
**Audit-Zeitpunkt:** 2026-11-14, Europe/Berlin
**Git-Baseline:** Branch `main`, HEAD `c83271b`, Arbeitsbaum clean, 3 Commits vor
`origin/main`. Neue Commits: `6df5895` (Vercel/Sitemap), `2c9c090` (CI);
Doku-/Beleg-Commit: siehe `git log`.
**Scope:** Vercel-Releasekonfiguration, Sitemap/Canonical/SEO, exakte Betreiberlücken,
Bildprovenienz, Rechtsentwürfe, CI, Release-Gate-Matrix. Kein Redesign, keine neue
Reportage, keine Engine-Änderung.

---

## 1. Baseline-Prüfung

- `git status`: clean; `main` 3 Commits vor `origin/main` (`0dabd09..c83271b`).
- 31 Unit-Tests, 152 Playwright-Tests / 4 Skips, Lighthouse 100/100/100/100 aus
  MAYS-REPORTAGEN-DESIGN-01 bestätigt.
- Nach den neuen Sitemap-Tests: **155 passed / 4 skipped** (Chromium 53, Firefox 51,
  WebKit 51; je 2 Skips).
- Keine anderen Projekte verändert.

## 2. Vercel-Konfiguration

`vercel.json` geprüft und gehärtet:

- explizit `framework: vite`, `installCommand: npm ci`, `buildCommand: npm run build`,
  `outputDirectory: dist`.
- SPA-Rewrite `/(.*) → /index.html`; statische Assets bleiben vorrangig.
- Security-Header unverändert vorhanden.
- Cache: `/assets` und `/media` ein Jahr immutable; `/fonts` sieben Tage.
- `/impressum` und `/datenschutz` erhalten `X-Robots-Tag: noindex, follow`, bis die
  Entwürfe vollständig sind.
- JSON validiert. **Nicht deployt.**

**Offen:** Soft-404 durch SPA-Rewrite (HTTP 200), CSP/HSTS bewusst nicht gesetzt.

## 3. Sitemap und SEO

`scripts/generate-sitemap.mjs` erweitert:

- HTTPS-Domain ist Pflicht; keine erfundene Domain.
- Standard: 5 öffentliche URLs (`/`, `/reportagen`, Reportage, `/ueber-uns`,
  `/bildnachweis`).
- Rechtsseiten sind standardmäßig ausgeschlossen (sie sind `noindex`).
- Nach Freigabe: `INCLUDE_LEGAL=true` → 7 URLs.
- Tests decken 5/7 URLs und die Ablehnung von HTTP-Domains ab.
- `robots.txt` dokumentiert beide Kommandos; die `Sitemap:`-Zeile bleibt bis zur Domain
  offen.

Canonical/OG/Twitter werden zur Laufzeit gegen die Origin absolut aufgelöst;
`NewsArticle`-JSON-LD bleibt erhalten. **Grenze:** Reportage-Metadaten sind
clientseitig; Social-Crawler ohne JS sehen ggf. nur die statischen Home-Metadaten.

## 4. Fehlende Betreiberangaben (exakt)

Pflichtfelder (alle `null`):

1. `operatorName`
2. `operatorAddress`
3. `contactEmail`
4. `responsiblePerson`
5. `responsibleAddress`
6. `hostingProvider`

Zusätzlich fehlen (optional bzw. außerhalb des Codes): `vatId`,
`supervisoryAuthority`, AVV/Log-Retention/Serverstandort, Streitbeilegungs-Entscheidung,
finale Rechtsprüfung. Es wurden keine Angaben erfunden. Details:
`docs/RELEASE-GATE.md`.

## 5. Rechtliche Entwürfe

Impressum und Datenschutz sind vorhanden, strukturell korrekt (§ 5 DDG,
§ 18 Abs. 2 MStV), aber **Entwürfe**. Die Aussagen zu fehlenden Cookies/Tracking,
lokalen Fonts und fehlenden Formularen sind durch den Code gedeckt. Beide Seiten bleiben
`noindex` (Meta + Vercel-Header). Keine rechtliche Freigabe durch diesen Task.

## 6. KI-Bildherkunft

`docs/BILDHERKUNFT.md` ergänzt um:

- SHA-256-Prüfsummen aller drei Originale und fünf ausgelieferten Derivate.
- Feststellung: keine EXIF-/IPTC-/XMP-/Text-Metadaten, keine Angaben zu Werkzeug,
  Modell, Prompt, Urheber oder Lizenz.
- Rechteklärung bleibt Blocker; Kennzeichnung als KI-Illustration ist im Produkt
  vorhanden.

## 7. CI

Neu: `.github/workflows/ci.yml`:

- `npm ci` → `npm run verify` (Lint, TypeScript, 31 Unit-Tests, Build)
- Playwright-Browser mit Systemabhängigkeiten installieren
- `npx playwright test` über Chromium/Firefox/WebKit
- Fehlerartefakte bei Failure

Workflow ist noch nicht gelaufen (kein Push). YAML validiert. WebKit braucht auf diesem
Host weiterhin den lokalen `libavif16`-Workaround; CI installiert die Abhängigkeiten.

## 8. Release-Gate-Matrix

Vollständig in `docs/RELEASE-GATE.md`. Ergebnis:

| Gate | Status |
| --- | --- |
| Repo/Build/Unit | PASS |
| Browser-E2E | PASS lokal |
| Accessibility | PASS lokal (axe 0) |
| Performance | PASS lokal (Lighthouse 99/100/100/100) |
| Vercel-Konfiguration | VORBEREITET |
| Domain/SEO | **BLOCKED** |
| Betreiberangaben | **BLOCKED** (6 Pflichtfelder) |
| Rechtliche Prüfung | **BLOCKED** |
| Bildrechte/KI | **BLOCKED** |
| Sicherheitsheader | TEILWEISE (CSP/HSTS offen) |
| CI | VORBEREITET, nicht gelaufen |
| Deployment | **BLOCKED** |

**Entscheidung: NO-GO.**

## 9. Testergebnisse

| Prüfung | Ergebnis |
| --- | --- |
| ESLint / TypeScript / Build | PASS |
| Unit-Tests | 31/31 |
| Playwright gesamt | **155 passed, 4 skipped** |
| Chromium / Firefox / WebKit | 53 / 51+2 Skips / 51+2 Skips |
| axe WCAG 2.1 A/AA | 0 Violations |
| Lighthouse Story (mobil) | 99 Performance, 100 A11y, 100 Best Practices, 100 SEO |
| LCP / CLS / TBT | 0,8 s / 0 / 130 ms |
| Vercel JSON | valide |
| Sitemap 5/7 | PASS |
| CI-YAML | valide; nicht ausgeführt |

## 10. Git-Status und Änderungen

Neu/geändert: `vercel.json`, `scripts/generate-sitemap.mjs`, `public/robots.txt`,
`.github/workflows/ci.yml`, `e2e/seo.spec.ts`, `docs/RELEASE-GATE.md`,
`docs/BILDHERKUNFT.md`, `docs/RELEASE-CHECKLIST.md`, `README.md`, `AGENTS.md`.

Es wurden Dateien geändert; „keine Dateien geändert“ trifft nicht zu.
Kein Push, Merge, Deployment, keine Änderung an anderen Projekten.
Terraform: keine Prüfung, da kein IaC vorhanden ist.

## 11. Klassifikation

**ORANGE — technisch release-vorbereitet, Veröffentlichung blockiert.** Die technischen
Gates sind grün; sechs Betreiberpflichtfelder, Rechtsprüfung, Bildrechte und Domain sind
externe Blocker.

## 12. Offene Punkte

1. Sechs Betreiberpflichtfelder + optionale Angaben eintragen.
2. Impressum/Datenschutz rechtlich prüfen und freigeben.
3. Bildrechte/KI-Kennzeichnung klären.
4. Domain festlegen, Sitemap erzeugen, `robots.txt`-Sitemapzeile ergänzen.
5. Zielhost/echte Geräte prüfen; Soft-404- und CSP/HSTS-Entscheidung treffen.
6. Ersten CI-Lauf nach Push abwarten.

## 13. Resume-Punkt

Arbeitsstand ist clean und lokal vollständig geprüft. Fortsetzung bei rechtlicher
Freigabe/Domain; danach Release-Gate erneut ausführen. Kein Deploy.
