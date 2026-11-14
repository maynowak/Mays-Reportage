# Release-Gate-Matrix — MAYS-REPORTAGEN-05B

**Stand:** 14. November 2026
**Entscheidung:** **Keine automatische Freigabe.** Veröffentlichung erst nach
Betreiberentscheidungen, aktuellem Deployment und Produktionsprüfung.
Kein Push, Merge oder Deployment in diesem Task.

## 1. Tatsächlicher Vercel-Zustand

Read-only geprüft mit Vercel CLI 65.1.0 (keine Einstellungen geändert):

- Projekt **mays-reportage**, Plan **Hobby** (Vercel-Team read-only geprüft).
- Domain `https://mays-reportage.vercel.app` ist verbunden und liefert HTTP 200.
- **Die Produktion ist veraltet:** letztes Deployment ist ca. 8 Stunden alt,
  `/impressum`, `/datenschutz`, `/reportagen/*` und `/sitemap.xml` liefern **404**,
  `robots.txt` enthält noch den alten Kommentar. Die lokalen Commits ab 05A sind nicht
  deployt.
- Projekt-Region **iad1** (Sandbox/Functions); statische Auslieferung über das globale
  Vercel-Edge-Netz (beobachtet: `fra1`).
- Runtime-Logs: **Hobby = 1 Stunde**; statische Anfragen werden laut Vercel nur bei
  Cache-Auslieferung geloggt, vollständige statische Logs nur über Log Drains
  (Hobby: keine Drains).
- Security-Header in Produktion: HSTS, `X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`. **Keine CSP.**

### Hobby: kommerzielle Nutzung, DPA, KI-Training

- Vercel Terms § 4: Hobby nur für **persönliche oder nicht-kommerzielle** Nutzung.
  Die Website hat derzeit keine Werbung/Monetarisierung; die Betreiberin muss
  „nicht-kommerziell“ bestätigen oder auf Pro wechseln.
- DPA: Die Vercel-DPA-Seite gilt für **Enterprise- und Pro-Tarife**. Der DPA-Status
  für Hobby ist zu klären (Upgrade auf Pro oder schriftliche Bestätigung von Vercel).
- KI-Modelltraining: Für Hobby ist es laut Vercel **standardmäßig opt-in**. Die
  aktuelle Team-/Projekt-Einstellung ist nicht über die CLI lesbar. Manuell prüfen:
  `https://vercel.fyi/team-data-preferences` (Team Settings → Data Preferences) und
  danach die Projekteinstellungen; für dieses Projekt opt-out setzen.
- Kommerzielle Nutzung, DPA und Modelltraining sind **Betreiberentscheidungen**, keine
  automatischen Code-Fehler.

## 2. Gate-Matrix

| # | Gate | Status | Beleg | Nächster Schritt |
| --- | --- | --- | --- | --- |
| 1 | Build & Unit | **PASS** | 33/33, Build PASS | — |
| 2 | Browser-E2E | **PASS lokal** | 149 passed / 4 skipped | Zielhost |
| 3 | Accessibility | **PASS lokal** | axe 0 Violations | Zielhost |
| 4 | Performance | **PASS lokal** | Lighthouse 99/100/100/100 | Zielhost |
| 5 | Vercel-Repo-Konfiguration | **PASS** | `vercel.json` valide | Deploy |
| 6 | Produktionsdeployment | **NOT VERIFIED / STALE** | SPA-Routen und Sitemap 404 | Aktuellen Commit deployen |
| 7 | Canonical/Sitemap/robots lokal | **PASS** | 7 URLs, Domain korrekt | Produktion prüfen |
| 8 | Betreiberangaben | **PASS** | vollständig, Anschrift bestätigt | — |
| 9 | Rechtstexte | **PENDING OPERATOR DECISION** | Entwürfe geprüft | Freigabe/Prüfung entscheiden |
| 10 | Bildrechte | **PENDING OPERATOR DECISION** | OpenAI-Herkunft dokumentiert | Nutzung freigeben |
| 11 | Hobby/kommerziell | **PENDING OPERATOR DECISION** | Terms § 4 | Nicht-kommerziell bestätigen oder Pro |
| 12 | DPA / KI-Training | **PENDING OPERATOR DECISION** | Hobby/DPA/Data Preferences | Pro/DPA klären, opt-out |
| 13 | Security-Header | **PARTIAL** | HSTS etc. vorhanden | CSP-Entscheidung |
| 14 | CI | **PENDING** | Workflow vorhanden | Erster Lauf nach Push |
| 15 | Deployment | **PENDING** | kein Push/Deploy | Freigabe |

## 3. Rechtstexte

- Impressum: § 5 DDG, § 18 Abs. 1 und Abs. 2 MStV; Betreiberin = verantwortliche
  Person; Anschrift nur einmal öffentlich, Verantwortlichenangabe „Anschrift wie oben“.
- Datenschutz: statische Auslieferung, keine Cookies/Analytics/Formulare/Accounts,
  Vercel-Logs, tarifabhängige Retention, DPA-Hinweis, US-Übermittlung, lokale Fonts.
- Keine Register-, Umsatzsteuer- oder Aufsichtsbehördenangaben erfunden.
- Eine anwaltliche Prüfung ist **nicht gesetzlich vorgeschrieben**; die Betreiberin
  entscheidet über Umfang und Inanspruchnahme externer Beratung. Offene
  Unsicherheiten: Hobby-DPA, Log-Retention/Region, internationale Übermittlung,
  Verbraucherstreitbeilegung, KI-Kennzeichnung.

## 4. Bildrechte (OpenAI)

Dokumentiert in `docs/OPENAI-BILD-RECHTE.md`:

- OpenAI Europe Terms (16.01.2026): Nutzerin besitzt Output; OpenAI überträgt ihre
  Rechte. Das gilt nur gegenüber OpenAI, nicht als Garantie gegenüber Dritten.
- Output kann nicht einzigartig sein; ähnliche Ergebnisse anderer Nutzer sind möglich.
- Keine Rechtefreigabe Dritter; mögliche Ähnlichkeiten zu Personen/Marken sind vor
  Veröffentlichung redaktionell zu prüfen.
- KI-Kennzeichnung ist vorhanden; keine Garantie auf zusätzliche gesetzliche
  Kennzeichnungspflichten.
- Betreiberin muss die Bildnutzung freigeben.

## 5. Technische Restpunkte

- Produktionsdomain ist verbunden, aber die aktuelle Version ist nicht deployt.
- Soft-404: lokal HTTP 200; nach neuem Deploy erneut prüfen.
- CSP/HSTS: HSTS ist in Produktion vorhanden; CSP fehlt und muss gegen Skripte/JSON-LD
  getestet werden.
- Social-Preview: Reportage-Metadaten sind clientseitig; Pre-Rendering wäre für
  Crawler ohne JS nötig.
- CI: Workflow vorhanden, noch nicht gelaufen.

## 6. Konkreter Veröffentlichungsablauf

1. Betreiberin entscheidet: nicht-kommerzielle Hobby-Nutzung **oder** Pro/Enterprise.
2. Falls Hobby: KI-Training in Team/Project Data Preferences deaktivieren; DPA-Status
   schriftlich klären. Falls Pro: DPA abschließen/prüfen.
3. Rechtstexte und Bildnutzung freigeben (externe Beratung optional, nicht gesetzlich
   vorgeschrieben).
4. Aktuellen Stand pushen (separate Freigabe), CI abwarten, deployen (separate
   Freigabe).
5. Produktion prüfen: `/`, `/reportagen/*`, `/impressum`, `/datenschutz`,
   `/sitemap.xml`, `robots.txt`, Canonical, Statuscodes, Header.
6. Lighthouse/axe auf Zielhost; Social-Preview prüfen; Soft-404-Entscheidung.
7. Erst dann Veröffentlichung freigeben.

## 7. Entscheidung

**Keine automatische Freigabe.** Technisch ist der lokale Stand bereit; die
Produktion ist veraltet, und Hobby/DPA/KI-Training sowie Rechtstexte/Bildrechte
benötigen Betreiberentscheidungen.
