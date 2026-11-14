# Release-Gate-Matrix — MAYS-REPORTAGEN-04

**Stand:** 14. November 2026
**Entscheidung:** **NO-GO** — technisch vorbereitet, rechtlich und domainseitig blockiert.
Kein Push, Merge oder Deployment in diesem Task.

## Gate-Matrix

| # | Gate | Status | Beleg | Offener Punkt |
| --- | --- | --- | --- | --- |
| 1 | Repository & Build | **PASS** | sauberer Baum, `npm run verify` | — |
| 2 | Unit-Tests | **PASS** | 31/31 | — |
| 3 | Browser-E2E | **PASS lokal** | 155 passed / 4 skipped (Chromium 53, Firefox/WebKit je 51 + 2 Skips) | Zielhost/echte Geräte |
| 4 | Accessibility | **PASS lokal** | axe WCAG 2.1 A/AA: 0 Violations | Zielhost |
| 5 | Performance | **PASS lokal** | Lighthouse 99/100/100/100; LCP 0,8 s, CLS 0, TBT 130 ms | Zielhost/Netz |
| 6 | Vercel-Konfiguration | **VORBEREITET** | `vercel.json`, JSON validiert | Deployment/Preview |
| 7 | Domain & SEO | **BLOCKED** | Sitemap-Generator getestet; keine Domain | Domain, Sitemap, robots-Zeile |
| 8 | Betreiberangaben | **BLOCKED** | `src/content/legal.ts` | 6 Pflichtfelder fehlen |
| 9 | Rechtliche Prüfung | **BLOCKED** | Entwürfe, keine Freigabe | Anwaltliche Prüfung |
| 10 | Bildrechte/KI | **BLOCKED** | `docs/BILDHERKUNFT.md` | Rechte, Werkzeug, Lizenz |
| 11 | Sicherheitsheader | **TEILWEISE** | Header in `vercel.json` | CSP/HSTS-Entscheidung |
| 12 | CI | **VORBEREITET** | `.github/workflows/ci.yml` | erster Lauf nach Push |
| 13 | Quellen-Audit | **PASS** | 14/14 Quellen, `docs/WISSENSCHAFTLICHER-QUELLEN-AUDIT.md` | periodische Prüfung |
| 14 | Deployment | **BLOCKED** | keine Freigabe | separater Release-Entscheid |

## 1. Vercel-Konfiguration

Geprüft und ergänzt (`vercel.json`, nicht deployt):

- `framework: vite`, `installCommand: npm ci`, `buildCommand: npm run build`,
  `outputDirectory: dist`.
- SPA-Rewrite `/(.*) → /index.html` für clientseitige Routen. Statische Dateien haben
  bei Vercel Vorrang; `/media`, `/fonts`, `/assets` werden direkt ausgeliefert.
- Security-Header: `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`.
- Cache: gehashte `/assets` und `/media` ein Jahr immutable; `/fonts` sieben Tage.
- `/impressum` und `/datenschutz` erhalten zusätzlich `X-Robots-Tag: noindex, follow`,
  solange die Entwürfe unvollständig sind.
- Keine Domain, keine Umgebungsvariable und kein Deploy nötig. `SITE_URL` wird nur
  lokal beim Sitemap-Erzeugen gesetzt.

**Bekannte Grenze:** Unbekannte Slugs liefern durch den SPA-Rewrite HTTP 200 mit
404-Oberfläche (Soft-404). Ein echter 404-Status wäre nur mit SSR/Edge-Routing möglich.
Vor dem Release entscheiden, ob das akzeptiert wird.

**Nicht gesetzt:** CSP und HSTS. Eine CSP muss gegen die tatsächlich ausgelieferten
Skripte/JSON-LD getestet werden; HSTS ist domainabhängig. Beides ist bewusst offen.

## 2. Sitemap, Canonical und SEO

- Generator: `scripts/generate-sitemap.mjs`; verlangt eine echte HTTPS-Domain und
  erfindet keine.
- Standardumfang: `/`, `/reportagen`, `/reportagen/bakteriophagen`, `/ueber-uns`,
  `/bildnachweis` — **5 URLs**. Rechtliche Entwürfe sind ausgeschlossen.
- Nach rechtlicher Freigabe:
  `INCLUDE_LEGAL=true SITE_URL=https://<domain> npm run sitemap` → **7 URLs**.
- Sitemap wird **nicht** committet, solange die Domain fehlt.
- `robots.txt` erlaubt Crawling; die `Sitemap:`-Zeile wird erst mit Domain ergänzt.
- Canonical, OG und Twitter-URLs werden zur Laufzeit gegen `window.location.origin`
  absolut aufgelöst; `NewsArticle`-JSON-LD ist vorhanden.
- **Grenze:** Reportage-Metadaten sind clientseitig. Suchmaschinen, die JS ausführen,
  sehen sie; Social-Crawler ohne JS sehen ggf. nur die statischen Home-Metadaten.
  Für einen belastbaren Social-Preview wäre Pre-Rendering/Edge-Metadata nötig.
- Keine erfundene Domain, kein Tracking, keine Search-Console-Anbindung.

## 3. Fehlende Betreiberangaben (exakt)

`src/content/legal.ts` enthält acht `null`-Felder. Sechs davon sind Pflichtfelder und
blockieren den Release:

| Feld | Verwendung | Status |
| --- | --- | --- |
| `operatorName` | Impressum § 5 DDG, Datenschutz Verantwortlicher | **fehlt** |
| `operatorAddress` | Impressum, Datenschutz | **fehlt** |
| `contactEmail` | Impressum, Datenschutz | **fehlt** |
| `responsiblePerson` | Redaktionell verantwortlich § 18 Abs. 2 MStV | **fehlt** |
| `responsibleAddress` | Redaktionell verantwortlich | **fehlt** |
| `hostingProvider` | Datenschutz, Hosting/AVV | **fehlt** |
| `vatId` | Impressum, optional | fehlt (optional) |
| `supervisoryAuthority` | Datenschutz, Beschwerdestelle | fehlt (optional, aber empfohlen) |

Zusätzlich fehlen außerhalb des Codes:

- Name/Anschrift des Hosters, Auftragsverarbeitungsvertrag, Log-Aufbewahrung,
  Serverstandort.
- Datum der finalen Rechtsprüfung und Freigabe durch die verantwortliche Person.
- Entscheidung zur Streitbeilegung (§ 36 VSBG) und ggf. Umsatzsteuer-ID.
- Rechtliche Prüfung von Impressum und Datenschutz; keine eigenmächtige Freigabe.

**Entwurfsprüfung:** Die Struktur (§ 5 DDG, § 18 Abs. 2 MStV) ist vorhanden; es wurden
keine persönlichen Daten erfunden. Die Aussagen zu Cookies/Tracking, lokalen Fonts und
fehlenden Formularen sind durch den Code gedeckt. Die Seiten bleiben bis zur
Vervollständigung `noindex` (Meta zur Laufzeit, `X-Robots-Tag` für Vercel).

## 4. KI-Bildherkunft und Bildnachweise

- Alle drei Originale sind KI-generierte Illustrationen, keine Mikroskopaufnahmen.
- Die PNGs enthalten **keine EXIF-/IPTC-/XMP-/Text-Metadaten** zu Werkzeug, Modell,
  Prompt, Urheber oder Lizenz.
- SHA-256-Prüfsummen der Originale und Derivate sind in `docs/BILDHERKUNFT.md`
  dokumentiert.
- Kennzeichnung im Produkt: Alt-Text, Bildunterschrift, Hero-Meta, `/bildnachweis`.
- Designreferenzen werden nicht ausgeliefert.

**Blocker:** Nutzungsrechte, Urheber/Freigabe, KI-Kennzeichnung nach den anzuwendenden
Regeln und die Entscheidung, ob die Bilder öffentlich verwendet werden dürfen.

## 5. CI

Neu: `.github/workflows/ci.yml` (nicht ausgeführt, kein Push):

- `npm ci`
- `npm run verify` (ESLint, TypeScript, 31 Unit-Tests, Build)
- `npx playwright install --with-deps chromium firefox webkit`
- `npx playwright test`
- Fehlerartefakte aus `test-results` bei Failure

Lokal wurden alle Schritte bereits ausgeführt. Der Workflow läuft erst nach einem Push
oder Pull Request. WebKit benötigt auf dem Host weiterhin den lokalen
`libavif16`-Workaround; CI installiert die Systemabhängigkeiten.

## 6. Go/No-Go

**NO-GO.** Technische Gates sind grün, aber ohne Betreiberangaben, Rechtsprüfung,
Bildrechte und Domain darf nicht veröffentlicht werden. Der nächste Release-Gate-Lauf
muss mindestens diese vier Blocker schließen und danach die Zielumgebung prüfen.
