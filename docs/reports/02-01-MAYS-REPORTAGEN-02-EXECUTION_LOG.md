# MAYS-REPORTAGEN-02 — Editorial & Release Readiness — Execution Log

**Status:** ABGESCHLOSSEN / LOKAL VERIFIZIERT / **KEIN PUSH / KEIN MERGE / KEIN DEPLOY**
**Audit-Zeitpunkt:** 2026-11-14, Europe/Berlin
**Git-Baseline:** Branch `main`, HEAD `9522451` (4 Commits nach `de6616b`).
Neue Commits: `c05c4e6` (Inhalt), `e7640d4` (Architektur/Recht/SEO), `2ab6be3` (Tests).
**Scope:** Wissenschaftliches Quellen-Review, Magazinarchitektur, rechtlich-redaktionelle
Grundlagen, technische Qualität inkl. axe/Firefox/WebKit, SEO-Releasevorbereitung.
**Freigabe:** Keine. Veröffentlichung bleibt separater menschlicher Entscheidung vorbehalten.

---

## 1. Governance und Baseline

`AGENTS.md` und `AI_AUDITLOG.md` wurden vor Beginn gelesen. Die Baseline wurde am
tatsächlichen Repository geprüft: 4 lokale Commits, 19 Unit-Tests, 15 Playwright-Tests
(Chromium), Build PASS. Arbeitsstände wurden nicht verworfen; keine Änderungen an anderen
Projekten unter `/home/dci-student/projects/`.

`AGENTS.md` war veraltet („kein App-Code, keine Builds“) und wurde auf den realen Stand
(Vite/React, Befehle, Rechts-/Reportregeln) aktualisiert.

## 2. Wissenschaftlicher Quellen-Audit (14 Quellen)

Vollständige Matrix: `docs/WISSENSCHAFTLICHER-QUELLEN-AUDIT.md`.

**Methode:** Abruf jeder URL am 14.11.2026 mit Browser-User-Agent; Prüfung von
HTTP-Status, Titel-/Zitationsmetadaten; DOI-Abgleich über Crossref; Abgleich der
verwendeten Aussage mit Abstract/Seitentext.

**Ergebnis:** Alle 14 Quellen existieren, alle URLs antworteten mit HTTP 200
(S14 Springer mit Bot-Schutz → Metadaten über Crossref verifiziert).

Bestätigte Kernzahlen (S3, Pirnay et al., Nature Microbiology 2024):
100 konsekutive Fälle, 35 Kliniken, 29 Städte, 12 Länder, 01/2008–04/2022,
77,2 % klinische Verbesserung und 61,3 % Erreger-Eradikation – jeweils bezogen auf
**Infektionen**, nicht auf Personen. Unkontrollierte retrospektive Beobachtungsstudie;
15 unerwünschte Ereignisse (7 nicht-schwere vermutete Arzneimittelreaktionen).

Weitere bestätigte Punkte: Belgien seit 2007 / 260 Anfragen / 15 Behandlungen (S2),
PhagoFlow mit G-BA-Beschluss 20.06.2025 (S6), Konsensleitlinie 21.09.2026 (S4, S12),
EMA-Konsultation 23.10.2025–30.04.2026 (S5), Wrocław seit 2005 (S7), Regensburg
Compassionate Use (S8), Sendetermine S9/S10 (S9), Rechts-Sachstand Januar 2025 (S11).

**Korrekturen:**

| Befund | Korrektur |
| --- | --- |
| „Belgien etablierte 2018 …“ nicht belegt | Jahreszahl entfernt |
| „auch Zivilpersonen“ nicht explizit belegt | durch belegte Länderverteilung ersetzt (2,3 % Deutschland) |
| Nenner „auswertbare Infektionen“ unpräzise | „dokumentierte Infektionen“ |
| „bakteriologisch nachverfolgt“ war Interpretation | „dokumentierte Infektionen“ |
| S11 fälschlich „(2024)“ | Sachstand Januar 2025 |
| S14 ohne Autoren/Untertitel | Willy & Bröcker, „Update 2025“ |
| S7 „experimentelles Protokoll“ zu stark | „von einer Bioethik-Kommission genehmigtes Protokoll“ |
| Historische Antibiotika-Rolle fehlte | belegte Kontextbox aus S1 ergänzt |
| Sicherheitsdaten fehlten | 15 unerwünschte Ereignisse ergänzt |

Keine Heilversprechen; medizinischer Hinweis bleibt sichtbar.

## 3. Magazinarchitektur

- `Reportage.status` (`published`/`draft`) eingeführt; `selectPublished()` filtert Entwürfe
  aus Hero, Archiv, Related-Liste und Routing. Unit-Test mit Draft-Fixture vorhanden.
- Featured-Priorisierung: absteigende `priority`, deterministischer Slug-Tie-Break;
  leere Registry wirft einen klaren Fehler statt `undefined` zu rendern.
- Neues Archiv `/reportagen`: alle veröffentlichten Geschichten + getrennte
  „In Vorbereitung“-Themen. Header/Footer verlinken es.
- Dauerhafte URLs bleiben erhalten (`/reportagen/:slug`), alte Reportagen werden nicht
  durch neue Prioritäten ersetzt.
- Unbekannte Slugs rendern die 404-Seite und setzen `robots: noindex,follow`.
- SEO pro Reportage: Title, Description, Canonical, OG, Twitter, `NewsArticle`-JSON-LD,
  Preload des Hero-Bildes. Unit- und E2E-Tests decken dies ab.
- Keine zusätzlichen Frameworks; nur ESLint/Axe/Playwright-Tooling.

## 4. Rechtlich-redaktionelle Grundlagen

| Anforderung | Status | Beleg |
| --- | --- | --- |
| Impressum | **Entwurf vorhanden** | `/impressum`, `src/content/legal.ts` |
| Datenschutz | **Entwurf vorhanden** | `/datenschutz` |
| Über uns | vorhanden | `/ueber-uns` |
| Quellenangaben | vorhanden | 14 Quellen, `#quellen` |
| Redaktionelle Verantwortlichkeit | **Platzhalter** | `legal.ts`, `REQUIRED_LEGAL_FIELDS` |
| KI-Kennzeichnung | vorhanden | Alt-Text, Caption, Hero-Meta, `/bildnachweis` |
| Bildherkunft | dokumentiert | `docs/BILDHERKUNFT.md`, `/bildnachweis` |

Es wurden **keine** persönlichen Daten erfunden. Solange `isLegalComplete === false`,
zeigen Impressum/Datenschutz einen Entwurfshinweis und sind `noindex`. Sechs
Pflichtfelder fehlen: Betreibername, Anschrift, E-Mail, verantwortliche Person,
deren Anschrift, Hosting-Anbieter.

## 5. Technische Qualitätsprüfung

| Prüfung | Ergebnis |
| --- | --- |
| ESLint 10.15.0 (`npm run lint`) | **PASS**, 0 Fehler/Warnungen |
| TypeScript (`tsc --noEmit`) | **PASS** |
| Unit-Tests (Vitest) | **25/25 PASS** (4 Dateien) |
| Production Build | **PASS** |
| Playwright Chromium | **39/39 PASS** |
| Playwright Firefox | **39/39 PASS** |
| Playwright WebKit | **39/39 PASS** (lokaler Dependency-Workaround, s. u.) |
| axe-core WCAG 2.1 A/AA | **0 Violations** auf 7 Seiten + Mobilmenü |
| Responsive | 320/390/768/1024/1440 px, kein horizontaler Überlauf |
| Reduced Motion | Partikel/Animationen deaktiviert (CSS + Test) |
| CLS (lokal) | **0,0000** nach Font-Preload |
| LCP (lokal, synthetisch) | Chromium 132 ms · Firefox 139 ms · WebKit 1.358 ms |
| Bundle-Budget | JS **95,8 kB gzip**, CSS **8,3 kB gzip** |
| Hero-Bildbudget | 1280-WebP 136 kB; alle Varianten < 250 kB |

**WebKit-Hinweis:** Auf dem Host fehlte `libavif16`; WebKit konnte ohne sudo nicht
starten. Für die lokale Verifikation wurde `libavif16` nach `/tmp` entpackt und der
Playwright-Browser-Wrapper im Benutzer-Cache um diesen Pfad ergänzt
(`PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1`). Das Repository selbst wurde dafür nicht
verändert. Auf CI/Release-Rechnern ist `npx playwright install --with-deps` erforderlich;
ohne diese Rechte bleibt WebKit „nicht verfügbar“.

**Nicht ausgeführt:** echtes Gerät, Safari/macOS, Lighthouse, Last-/Netzwerktests,
medizinische Fachprüfung, Anwaltliche Prüfung. Terraform: **keine** Checks, da kein
Terraform/IaC im Repository vorhanden ist.

## 6. SEO-Releasevorbereitung

- Canonical, OG, Twitter Cards und `NewsArticle`-JSON-LD werden pro Seite/Reportage
  gesetzt; URLs werden zur Laufzeit gegen die Origin absolut aufgelöst.
- `robots.txt` wird ausgeliefert (`Allow: /`), E2E-getestet.
- Sitemap-Generator (`scripts/generate-sitemap.mjs`) erzeugt 7 URLs, getestet mit
  `SITE_URL=https://example.org`; **keine Sitemap committet**, weil die Domain fehlt.
- `vercel.json` vorbereitet: SPA-Rewrite, Security-Header, Cache-Header. Nicht deployt.
- Indexierung: öffentliche Seiten `index,follow`; Rechtsentwürfe und 404 `noindex`.
- LCP: Hero-Preload, `srcSet` 640–1672, feste Dimensionen, `fetchpriority=high`,
  selbst gehostete, vorgeladene Fonts, kein Render-Blocking von Drittanbietern.
- Keine Tracking-/Analytics-Skripte, keine Cookies.

## 7. Screenshots

- `docs/reports/assets/MAYS-REPORTAGEN-01A/` — aktualisierte Hero-/Reportage-Belege
- `docs/reports/assets/MAYS-REPORTAGEN-02/archiv-1440.png`
- `docs/reports/assets/MAYS-REPORTAGEN-02/archiv-390.png`
- `docs/reports/assets/MAYS-REPORTAGEN-02/impressum-1440.png`
- `docs/reports/assets/MAYS-REPORTAGEN-02/datenschutz-1440.png`
- `docs/reports/assets/MAYS-REPORTAGEN-02/bildnachweis-1440.png`
- `docs/reports/assets/MAYS-REPORTAGEN-02/404-390.png`
- `docs/reports/assets/MAYS-REPORTAGEN-02/reportage-768.png`

## 8. Git-Status und Änderungen

Neue/aktualisierte Dateien (Auszug): `src/content/{legal,reportagen,types,bakteriophagen}.ts`,
`src/pages/{ArchivePage,LegalPages,NotFoundPage,ReportagePage}.tsx`, `src/lib/seo.ts`,
`src/styles/{fonts,pages,layout,tokens}.css`, `public/fonts/*`, `public/robots.txt`,
`scripts/generate-sitemap.mjs`, `vercel.json`, `eslint.config.js`,
`e2e/{accessibility,performance,release,seo}.spec.ts`, `playwright.config.ts`,
`docs/{BILDHERKUNFT,RELEASE-CHECKLIST,WISSENSCHAFTLICHER-QUELLEN-AUDIT}.md`,
`README.md`, `AGENTS.md`, Screenshots.

Entfernt: ungenutzter 2-MB-PNG-Fallback `public/media/phagen/phagen-hero-1672.png`
(Original bleibt unter `assets/source/`).

Es wurden Dateien geändert; „keine Dateien geändert“ trifft nicht zu.
Kein Push, kein Merge, kein Deployment, keine AWS-/Terraform-/Cognito-Änderung.

## 9. Klassifikation

**YELLOW — technisch release-nah, rechtlich nicht veröffentlichungsfähig.**
Alle technischen Gates sind lokal grün. Blockierend sind fehlende Betreiberangaben,
ungeklärte Bildrechte, Hosting/Domain und die rechtliche Prüfung.

## 10. Offene Fragen

1. Wer ist Betreiber und redaktionell verantwortlich (Name, Anschrift, E-Mail)?
2. Welcher Hoster (AVV, Log-Aufbewahrung, Serverstandort)?
3. Sind die KI-Illustrationen für eine öffentliche Nutzung freigegeben, und welche
   KI-Kennzeichnung ist anzuwenden?
4. Welche Domain ist produktiv? Erst dann Sitemap und `robots.txt`-Sitemapzeile.
5. Sollen die drei geplanten Themen ausgearbeitet werden?
6. Ist eine anwaltliche Prüfung von Impressum/Datenschutz vorgesehen?

## 11. Risiken

- SPA liefert für unbekannte URLs technisch HTTP 200 mit 404-UI (Soft-404); Suchmaschinen
  erkennen `noindex`, aber ein echter 404-Status wäre nur mit SSR/Edge-Routing möglich.
- Keine CSP; Security-Header sind vorbereitet, aber nicht deployt.
- Quellenangaben sind datiert; Links können sich ändern.
- WebKit-Verifikation hing von einer lokalen Systembibliothek ab.
- Bildrechte sind der größte inhaltliche Blocker.

## 12. Empfohlene nächste Schritte

1. Betreiberangaben und Hosting festlegen, Rechtstexte prüfen, `noindex` entfernen.
2. Bildrechte/KI-Kennzeichnung klären.
3. Domain setzen, Sitemap erzeugen, `vercel.json` deployen (separate Freigabe).
4. Lighthouse auf dem Zielhost, echte Geräte, Safari/macOS.
5. Quellen jährlich oder bei Inhaltsänderungen erneut prüfen.

## 13. Resume-Punkt

Arbeitsstand ist sauber committet und lokal vollständig getestet. Fortsetzung bei
rechtlichen Angaben/Domain; keine laufenden Schreibvorgänge, kein Serverprozess
erforderlich. Der abschließende Push/Deploy bleibt ausdrücklich untersagt.
