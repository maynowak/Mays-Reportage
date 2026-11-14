# Release-Gate-Matrix — MAYS-REPORTAGEN-05A

**Stand:** 14. November 2026
**Entscheidung:** **NO-GO bis zur rechtlichen Freigabe.** Die Betreiber- und
Hosting-Konfiguration ist eingetragen; Rechtstexte und Bildrechte sind noch nicht
freigegeben. Kein Push, Merge oder Deployment.

## Gate-Matrix

| # | Gate | Status | Beleg | Offener Punkt |
| --- | --- | --- | --- | --- |
| 1 | Repository & Build | **PASS** | sauberer Baum, `npm run verify` | — |
| 2 | Unit-Tests | **PASS** | 33/33 | — |
| 3 | Browser-E2E | **PASS lokal** | 149 passed / 4 skipped (Chromium 51, Firefox/WebKit je 49 + 2 Skips) | Zielhost/echte Geräte |
| 4 | Accessibility | **PASS lokal** | axe WCAG 2.1 A/AA: 0 Violations | Zielhost |
| 5 | Performance | **PASS lokal** | Lighthouse 99/100/100/100; LCP 0,8 s, CLS 0, TBT 130 ms | Zielhost/Netz |
| 6 | Vercel-Konfiguration | **VORBEREITET** | `vercel.json`, JSON validiert | Deployment/Preview |
| 7 | Domain & SEO | **VORBEREITET** | Domain bestätigt, Sitemap 7 URLs, robots.txt | Indexierung nach Deploy prüfen |
| 8 | Betreiberangaben | **ERLEDIGT** | `src/content/legal.ts` vollständig | Schreibweise Anschrift bestätigen |
| 9 | Rechtliche Prüfung | **BLOCKED** | Entwürfe, keine Freigabe | Anwaltliche Prüfung |
| 10 | Bildrechte/KI | **TEILWEISE** | Herkunft dokumentiert (OpenAI) | Nutzungsrechte/Lizenz |
| 11 | Sicherheitsheader | **TEILWEISE** | Header in `vercel.json` | CSP/HSTS-Entscheidung |
| 12 | CI | **VORBEREITET** | `.github/workflows/ci.yml` | erster Lauf nach Push |
| 13 | Quellen-Audit | **PASS** | 14/14 Quellen | periodische Prüfung |
| 14 | Deployment | **BLOCKED** | keine Freigabe | separater Release-Entscheid |

## 1. Betreiberangaben

Die sechs Pflichtfelder in `src/content/legal.ts` sind mit den von der Betreiberin
bereitgestellten Angaben befüllt. Die Werte werden aus Datenschutzgründen **nicht in
diesem Dokument, in Auditlogs, Screenshots oder Test-Fixtures dupliziert**.

- Betreiberin und inhaltlich verantwortliche Person sind dieselbe Person.
- Die Anschrift erscheint öffentlich **nur im Impressum**; die Datenschutzseite verweist
  für die Postanschrift auf das Impressum. Im Impressum wird sie für die
  Verantwortlichenangabe mit „Anschrift wie oben“ referenziert.
- Keine Handelsregister-, Umsatzsteuer- oder Aufsichtsbehördenangaben wurden ergänzt.
- **Bestätigt:** Schreibweise der Anschrift von der Betreiberin.

## 2. Impressum

Struktur angepasst:

- **Anbieterkennzeichnung nach § 5 DDG und § 18 Abs. 1 MStV:** Name, Anschrift,
  E-Mail.
- **Verantwortlich im Sinne des § 18 Abs. 2 MStV:** dieselbe Person, Anschrift wie oben.
- Keine erfundenen Register-, Steuer- oder Aufsichtsangaben.
- Die frühere Streitbeilegungs-Platzhaltersektion wurde entfernt, da keine
  einschlägige Angabe vorliegt und keine Teilnahme behauptet wird.
- Die Seite ist nicht mehr `noindex`; der Entwurfshinweis entfällt.

## 3. Datenschutz

Geprüft gegen den tatsächlichen Code und die Vercel-Dokumentation:

- Statische Auslieferung über Vercel; keine Vercel Functions, API-Routen, Formulare,
  Accounts, Newsletter, Cookies, Analytics oder Tracking.
- Vercel verarbeitet nach eigener Privacy Notice technisch erforderliche
  Verbindungsdaten (u. a. IP-Adresse, Zeitpunkt, Ressource, User-Agent, Statuscode).
- Log-Aufbewahrung ist tarifabhängig (Vercel: Hobby 1 Stunde, Pro 1 Tag; statische
  Anfragen ggf. nur über Log Drains). Die konkrete Einstellung ist im Vercel-Konto zu
  prüfen.
- Vercel stellt eine DPA für Enterprise-/Pro-Tarife bereit. Ob der genutzte Tarif
  erfasst ist und eine Vereinbarung vorliegt, ist im Konto zu prüfen.
- Übermittlung in die USA möglich; Vercel verweist auf EU-U.S. DPF und
  Standardvertragsklauseln. Konkrete Grundlage tarif-/vertragsabhängig prüfen.
- Schriftarten lokal; externe Quellen erst nach Klick; kein Consent-Banner nötig, da
  keine einwilligungspflichtigen Technologien eingesetzt werden.

**Keine fiktiven Verarbeitungsprozesse** dokumentiert. Verbleibende Prüfung:
tatsächlicher Vercel-Tarif, DPA-Status, Log-Retention, Serverregion.

## 4. Domain, Canonical, Sitemap, robots

Bestätigte Domain: **https://mays-reportage.vercel.app** (in `site.config.json`).

- Canonical, OG, Twitter und JSON-LD werden gegen diese Domain absolut aufgelöst –
  nicht mehr gegen `window.location.origin`.
- `public/sitemap.xml` enthält **7 URLs** inklusive Impressum/Datenschutz.
- `robots.txt` enthält die Sitemap-Zeile.
- Vercel-Rewrites und Header geprüft; die früheren `X-Robots-Tag`-Header für die
  Rechtsseiten wurden entfernt, da die Seiten jetzt indexierbar sind.
- **Grenze:** Reportage-Metadaten werden clientseitig gesetzt. Social-Crawler ohne JS
  sehen ggf. die statischen Home-Metadaten; für belastbare Social-Previews wäre
  Pre-Rendering nötig.
- Nach Deploy: Statuscodes, Sitemap, robots, Canonical, Rich Results prüfen.

## 5. Bildherkunft

- Titelmotiv und Desktop-Designreferenz wurden nach Angaben der Betreiberin mit
  **OpenAI-Bildgenerierung** erstellt.
- Keine EXIF-/IPTC-/XMP-/Text-Metadaten zu Modell, Prompt, Urheber oder Lizenz.
- SHA-256-Prüfsummen in `docs/BILDHERKUNFT.md`.
- Kennzeichnung als KI-Illustration vorhanden.
- **Offen:** Nutzungsrechte/Lizenz; keine Lizenzgarantie wird behauptet.

## 6. CI und Sicherheit

- CI-Workflow vorhanden (verify + drei Browser), noch nicht gelaufen.
- Security-Header vorhanden; CSP/HSTS bewusst offen (CSP muss gegen JSON-LD/Skripte
  getestet werden; HSTS ist domainabhängig).
- Soft-404 durch SPA-Rewrite bleibt eine bekannte Grenze.

## 7. Go/No-Go

**NO-GO** bis zur anwaltlichen Prüfung von Impressum/Datenschutz und Klärung der
Bildrechte. Danach: Vercel-Tarif/DPA/Logs prüfen,
deployen, Indexierung und Zielumgebung verifizieren.
