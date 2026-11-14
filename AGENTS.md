# AGENTS.md — Mays-Reportagen

Erweiterbares Online-Reportagemagazin (Vite 8, React 19, TypeScript, statisches
Hosting). Kein Backend, keine Datenbank, kein Tracking. Erste Titelgeschichte:
Bakteriophagen. Lizenz GPL-3.0.

## Read first

1. `AI_AUDITLOG.md` — verbindlicher Report- und Recovery-Workflow.
2. `AI_AUDITINDEX.md` — alle Reports; Header mit `git rev-parse --short HEAD` abgleichen.
3. `docs/RELEASE-CHECKLIST.md` — offene Blocker (Recht, Bildrechte, Domain).
4. `docs/WISSENSCHAFTLICHER-QUELLEN-AUDIT.md` — bevor du Inhalte oder Zahlen änderst.
5. `docs/REPORTAGEN-ARCHITEKTUR.md`, `docs/STORYTELLING-ENGINE.md`,
   `docs/DESIGN-SYSTEM.md`, `docs/BILDHERKUNFT.md`.

## Commands (verifiziert)

```bash
npm install
npm run dev        # http://localhost:5173
npm run verify     # ESLint + tsc + 31 Unit-Tests + Build
npm run e2e        # 52/50 Tests × Chromium/Firefox/WebKit (4 Skips), Port 4317
npx vitest run src/App.test.tsx -t "Archiv"   # einzelner Test
SITE_URL=https://<domain> npm run sitemap      # Domain ist bewusst nicht gesetzt
```

Playwright-Screenshots landen in `docs/reports/assets/MAYS-REPORTAGEN-*/` und werden
nur im Chromium-Projekt geschrieben, damit Browserläufe sie nicht überschreiben.

## Struktur

- `src/content/reportagen.ts` — Registry, Status (`published`/`draft`), Featured-Priorität.
- `src/content/bakteriophagen.ts` — Inhalt, 14 Quellen, Akzentfarben.
- `src/content/legal.ts` — Betreiberangaben; `null` heißt „fehlt“, niemals erfinden.
- `src/pages/` — Start, Archiv `/reportagen`, Reportage, Über uns, Impressum,
  Datenschutz, Bildnachweis, 404.
- `src/story/` — inhaltsunabhängige Storytelling-Engine; Inhalte liegen unter
  `src/content/stories/`.
- `public/media/phagen/` — ausgelieferte WebP-Derivate + OG-Bild.
- `assets/source/` — unveränderte Originalbilder (nicht im Build).
- `docs/reports/` — Audit-/Abnahmebelege; `docs/reports/assets/<TASK-ID>/` Screenshots.

## Hard rules

- **Kein Push, Merge oder Deployment ohne ausdrückliche Freigabe.** Nur lokale Commits.
- Keine Änderungen an anderen Projekten unter `/home/dci-student/projects/`.
- Reports auf Deutsch unter `docs/reports/<NN>-<MM>-<TASK>-EXECUTION_LOG.md`, mit allen
  16 Pflichtpunkten und einer Zeile in `AI_AUDITINDEX.md`.
- Jeder Subagent erhält die Reportpflicht in den Prompt; der Orchestrator legt den
  Report hier ab und indiziert ihn.
- Keine Ergebnisse behaupten, die nicht mit Befehl, Output und HEAD-SHA belegt sind.
- Rechtliche Platzhalter nicht mit erfundenen Namen/Adressen füllen. Impressum und
  Datenschutz bleiben `noindex`, solange `isLegalComplete === false`.
- KI-Bilder immer als Illustration kennzeichnen; niemals als Mikroskopaufnahme ausgeben.
- Story-Animationen nie automatisch starten; Inhalte müssen ohne Animation lesbar sein
  und `prefers-reduced-motion` respektieren.
- Ganze Kapitel/Sections nie per `opacity: 0` verstecken. Scroll-Effekte dürfen nur
  dekorativ sein (Transform) und müssen Inhalte ohne JS sichtbar lassen.
- Helles Editorial-Design beibehalten: Marineblau auf Off-White/Pastell, Text-Akzente
  dunkler als Flächen-Akzente, Hero bleibt der einzige dunkle Block.
- Keine Cookies, Analytics oder externen Font-/Tracking-Dienste ergänzen.
- Bestehende Reportage-URLs müssen dauerhaft erreichbar bleiben; Entwürfe über
  `status: 'draft'` ausschließen, nicht durch Löschen der Route.

## Gotchas

- Ports 4173/4180 sind oft von Schwesterprojekten belegt; dieses Projekt nutzt 4317.
- WebKit braucht Systembibliotheken (`libavif16` u. a.). Ohne sudo:
  `npx playwright install --with-deps` auf einem Rechner mit Rechten; sonst WebKit als
  „nicht verfügbar“ dokumentieren.
- Zahlen und Quellen sind datiert (14.11.2026). Bei Änderungen Audit aktualisieren.
- `vercel.json` ist vorbereitet, aber nicht deployt; Domain-abhängige Werte fehlen.
