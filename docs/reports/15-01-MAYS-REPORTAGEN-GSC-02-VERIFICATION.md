# GSC-02 — Second Google Account Verification

## 1. Status

**GREEN LOKAL — ZWEITE VERIFIZIERUNGSDATEI VORBEREITET / DEPLOYMENT AUSSTEHEND.**

Kein Push, kein Deployment und keine Google-Verifikation in diesem Schritt.

## 2. Audit-Zeitpunkt

17. November 2026.

## 3. Git-Baseline und HEAD

- Branch `main`, Upstream `origin/main`.
- Production und `origin/main`: `6c960c4`.
- Lokaler HEAD vor GSC-02: `dd1df44`.
- Lokal 1 Dokumentationscommit vor `origin/main`; Arbeitsbaum zu Beginn clean.
- GSC-02 folgt als lokaler Commit; kein Push.

## 4. Scope

- Neue Originaldatei `googlea37c2005c0abca88.html` bytegenau übernehmen.
- Bestehende Datei `google426c8ebaa607666d.html` erhalten.
- Vercel-Catch-all für beide Verifizierungspfade ausnehmen.
- Build, TypeScript, Unit-Tests und direkten Dateizugriff prüfen.
- Sieben öffentliche Routen, Sitemap und robots.txt unverändert lassen.
- Keine Änderungen an Design, Storytelling, Marketing, Recht oder Tracking.

## 5. Eingebundene Dateien

| Datei | Größe | SHA-256 |
| --- | ---: | --- |
| `google426c8ebaa607666d.html` (bestehend) | 53 Bytes | `4ddd9841d3de4229eeb61181ee9cca0004bb2311675abaeb11f4e9595d268691` |
| `googlea37c2005c0abca88.html` (neu) | 53 Bytes | `36f65e045c42254850b0170a827dc7b25a970597f80a6fe3bcd17f88ef775e99` |

Inhalte:

```text
google-site-verification: google426c8ebaa607666d.html
google-site-verification: googlea37c2005c0abca88.html
```

Beide Dateien liegen unter `public/`; die neue Datei wurde aus
`/home/dci-student/Downloads/googlea37c2005c0abca88.html` unverändert kopiert.

## 6. Build und Tests

| Prüfung | Ergebnis |
| --- | --- |
| ESLint | PASS |
| TypeScript | PASS |
| Unit-Tests | **39/39 PASS** |
| Production Build | PASS |
| Statische Metadaten | 7 Routen |
| `public/` → `dist/` | beide Dateien byteidentisch |
| Vite-Preview | beide Dateien HTTP 200, `text/html`, 53 Bytes |
| Vercel-Routingtest | beide Dateien direkt, nicht `index.html` |

## 7. Vercel-Rewrites

Der Catch-all wurde auf beide exakten Verifizierungspfade erweitert:

```json
{
  "source": "/((?!google426c8ebaa607666d\\.html|googlea37c2005c0abca88\\.html).*)",
  "destination": "/index.html"
}
```

Damit werden beide Google-Dateien direkt ausgeliefert. Alle anderen Pfade und die
sieben expliziten Routen bleiben unverändert.

Geprüft mit `vercel dev --local`:

- `google426c8ebaa607666d.html` → 200, exakter Inhalt
- `googlea37c2005c0abca88.html` → 200, exakter Inhalt
- alle sieben öffentlichen Routen → 200
- keine Änderung an Sitemap, robots.txt oder Route-Rewrites

## 8. Öffentliche Verifizierungspfade

Nach Freigabe und Deployment:

```text
https://mays-reportage.vercel.app/google426c8ebaa607666d.html
https://mays-reportage.vercel.app/googlea37c2005c0abca88.html
```

Erwartet: jeweils HTTP 200, `Content-Type: text/html`, exakt 53 Bytes und der
jeweilige unveränderte SHA-256.

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

## 10. Sicherheit und Datenschutz

- Keine Google-Analytics-, Tag-Manager- oder sonstigen Tracking-Skripte ergänzt.
- Keine Cookies, keine externen Dienste, keine Änderung an Rechtstexten.
- Beide Verifizierungsdateien enthalten nur den öffentlichen Google-Bestätigungstext.
- Keine Änderung an anderen Projekten.

## 11. Klassifikation

**GREEN LOKAL.** Beide Dateien sind unverändert eingebunden, der Build ist grün und
beide Pfade sind lokal erreichbar. Die Search-Console-Verifikation ist nicht
durchgeführt und wird nicht behauptet.

## 12. Terraform

Keine Terraform-Prüfung: Im Repository existiert keine Terraform-/IaC-Konfiguration.
Keine Cloud-Infrastruktur geändert.

## 13. Git-Status

- Vor GSC-02: `dd1df44`, 1 Commit vor `origin/main`, clean.
- Neu: `public/googlea37c2005c0abca88.html`, `vercel.json`-Erweiterung,
  GSC-02-Report und Auditindex-Zeile.
- Kein Push, Merge oder Deployment.

## 14. Geänderte Dateien

- Neu: `public/googlea37c2005c0abca88.html`
- Geändert: `vercel.json` (zweiter exakter Verifizierungspfad)
- Neu: `docs/reports/15-01-MAYS-REPORTAGEN-GSC-02-VERIFICATION.md`
- Geändert: `AI_AUDITINDEX.md`, `docs/RELEASE-GATE.md`,
  `docs/RELEASE-CHECKLIST.md`, `docs/MARKETING-03-ORGANIC-GROWTH-PLAN.md`
- Keine Änderungen an App-Code, Inhalten, Sitemap, robots.txt oder Rechtstexten.

## 15. Freigabe- und Folgestatus

**Deployment: NICHT FREIGEGEBEN.** Nach separater Freigabe:

1. Fast-Forward-Push und Vercel-Production-Deployment.
2. Beide Google-Pfade mit HTTP 200 und exaktem SHA-256 prüfen.
3. Erst danach die neue Property in der Search Console bestätigen.
4. Sitemap `https://mays-reportage.vercel.app/sitemap.xml` einreichen.
5. Startseite und Phagen-Reportage per URL-Prüftool kontrollieren.
6. Keine erfolgreiche Indexierung ohne tatsächlichen Nachweis behaupten.

## 16. Resume-Punkt

Lokal ist alles für die Betreiberfreigabe vorbereitet. Nächster Schritt ist die
ausdrückliche Freigabe für Push und Deployment; danach Datei-Smoke-Test und
Search-Console-Verifikation. Production bleibt bis dahin auf `6c960c4`.
