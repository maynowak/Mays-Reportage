# GSC-01 — Google Search Console Verification

## 1. Status

**GREEN LOKAL — VERIFIZIERUNGSDATEI VORBEREITET / DEPLOYMENT AUSSTEHEND.**

Kein Push, kein Deployment und keine Google-Verifikation in diesem Schritt. Die
Bestätigung in der Search Console erfolgt erst nach der separaten Freigabe und
erfolgreichen Auslieferung.

## 2. Audit-Zeitpunkt

16. November 2026.

## 3. Git-Baseline und HEAD

- Branch `main`, Upstream `origin/main`.
- Production und `origin/main`: `304a6e3`.
- Lokaler HEAD vor GSC-01: `8117e1f`.
- Lokal 2 Dokumentationscommits vor `origin/main`; Arbeitsbaum zu Beginn clean.
- GSC-01 folgt als lokaler Commit; kein Push.

## 4. Scope

- Originale Google-HTML-Verifizierungsdatei unverändert übernehmen.
- Ablage unter `public/`, Dateiname und Inhalt bytegenau erhalten.
- Build, TypeScript, Unit-Tests und direkten Dateizugriff prüfen.
- Vercel-Rewrite so prüfen, dass die Datei nicht auf `index.html` fällt.
- Sieben öffentliche Routen, Sitemap und robots.txt unverändert lassen.
- Keine Tracking-/Analytics-Skripte, keine Marketing-/Design-/Story-Änderungen.

## 5. Eingebundene Verifizierungsdatei

| Feld | Wert |
| --- | --- |
| Originaldateiname | `google426c8ebaa607666d.html` |
| Ablage | `public/google426c8ebaa607666d.html` |
| Größe | 53 Bytes |
| SHA-256 | `4ddd9841d3de4229eeb61181ee9cca0004bb2311675abaeb11f4e9595d268691` |
| Inhalt | `google-site-verification: google426c8ebaa607666d.html` |
| Veränderung | keine; bytegenau übernommen |

## 6. Build und Tests

| Prüfung | Ergebnis |
| --- | --- |
| ESLint | PASS |
| TypeScript | PASS |
| Unit-Tests | **39/39 PASS** |
| Production Build | PASS |
| Statische Metadaten | 7 Routen |
| `public/` → `dist/` | byteidentisch, gleicher SHA-256 |
| Direkter Preview-Zugriff | 200, `text/html;charset=utf-8`, 53 Bytes |
| Preview-Inhalt | byteidentisch zur Originaldatei |

Die Datei wird von Vite unverändert nach `dist/google426c8ebaa607666d.html`
kopiert.

## 7. Vercel-Rewrites

Der bestehende Catch-all `/(.*) → /index.html` wurde für den exakten
Verifizierungspfad ausgenommen:

```json
{
  "source": "/((?!google426c8ebaa607666d\\.html).*)",
  "destination": "/index.html"
}
```

Damit greift der SPA-Fallback nicht für
`/google426c8ebaa607666d.html`; alle anderen Pfade bleiben unverändert.

Geprüft mit `vercel dev --local`:

- `/google426c8ebaa607666d.html` → 200, exakter 53-Byte-Inhalt
- gleicher Pfad mit Query-String → 200, exakter Inhalt
- alle sieben öffentlichen Routen → 200
- keine Änderung an Sitemap, robots.txt oder den expliziten Route-Rewrites

Hinweis: `vercel dev --local` bildet die statische Produktionsauslieferung nicht
vollständig ab; die direkte Datei- und Routenprüfung erfolgte zusätzlich über den
Vite-Production-Preview. Die Rewrite-Reihenfolge wurde in der Konfiguration geprüft.

## 8. Öffentlicher Verifizierungspfad

Nach Freigabe und Deployment:

```text
https://mays-reportage.vercel.app/google426c8ebaa607666d.html
```

Erwartet: HTTP 200, `Content-Type: text/html`, exakt 53 Bytes, Inhalt
`google-site-verification: google426c8ebaa607666d.html`.

## 9. Bestehende Routen und statische Dateien

| Pfad | Preview-Ergebnis |
| --- | --- |
| `/` | 200 |
| `/reportagen` | 200 |
| `/reportagen/bakteriophagen` | 200 |
| `/ueber-uns` | 200 |
| `/impressum` | 200 |
| `/datenschutz` | 200 |
| `/bildnachweis` | 200 |
| `/sitemap.xml` | 200, unverändert |
| `/robots.txt` | 200, unverändert |

Sitemap und robots.txt wurden inhaltlich nicht verändert. Die sieben statischen
HTML-Routen bleiben erhalten.

## 10. Sicherheit und Datenschutz

- Keine Google-Analytics-, Tag-Manager- oder sonstigen Tracking-Skripte ergänzt.
- Keine Cookies, keine externen Dienste, keine Änderung an Rechtstexten.
- Die Verifizierungsdatei enthält nur den von Google vorgegebenen öffentlichen
  Bestätigungstext; sie enthält kein Secret.
- Keine Änderung an anderen Projekten.

## 11. Klassifikation

**GREEN LOKAL.** Die Datei ist unverändert eingebunden, der Build ist grün und der
exakte Pfad ist lokal erreichbar. Die externe Search-Console-Verifikation ist noch
nicht durchgeführt und wird nicht behauptet.

## 12. Terraform

Keine Terraform-Prüfung: Im Repository existiert keine Terraform-/IaC-Konfiguration.
Keine Cloud-Infrastruktur geändert.

## 13. Git-Status

- Vor GSC-01: `8117e1f`, 2 Commits vor `origin/main`, clean.
- Neu: `public/google426c8ebaa607666d.html`, `vercel.json`-Ausnahme,
  GSC-01-Report und Auditindex-Zeile.
- Kein Push, Merge oder Deployment.

## 14. Geänderte Dateien

- Neu: `public/google426c8ebaa607666d.html`
- Geändert: `vercel.json` (exakte Ausnahme vom SPA-Fallback)
- Neu: `docs/reports/14-01-MAYS-REPORTAGEN-GSC-01-VERIFICATION.md`
- Geändert: `AI_AUDITINDEX.md`, `docs/RELEASE-GATE.md`,
  `docs/RELEASE-CHECKLIST.md`, `docs/MARKETING-03-ORGANIC-GROWTH-PLAN.md`
- Keine Änderungen an App-Code, Inhalten, Sitemap, robots.txt oder Rechtstexten.

## 15. Freigabe- und Folgestatus

**Deployment: NICHT FREIGEGEBEN.** Nach separater Freigabe:

1. Fast-Forward-Push und Vercel-Production-Deployment.
2. `https://mays-reportage.vercel.app/google426c8ebaa607666d.html` mit HTTP 200
   und exaktem SHA-256 prüfen.
3. Erst danach in der Search Console „Bestätigen“.
4. Sitemap `https://mays-reportage.vercel.app/sitemap.xml` einreichen.
5. Startseite per URL-Prüftool kontrollieren.
6. Phagen-Reportage per URL-Prüftool kontrollieren.
7. Keine erfolgreiche Indexierung behaupten, solange kein tatsächlicher Nachweis
   vorliegt.

## 16. Resume-Punkt

Lokal ist alles für die Betreiberfreigabe vorbereitet. Nächster Schritt ist die
ausdrückliche Freigabe für Push und Deployment; danach Datei-Smoke-Test und
Search-Console-Verifikation. Production bleibt bis dahin auf `304a6e3`.
