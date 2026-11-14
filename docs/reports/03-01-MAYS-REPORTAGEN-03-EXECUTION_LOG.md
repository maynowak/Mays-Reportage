# MAYS-REPORTAGEN-03 — Cinematic Interactive Storytelling — Execution Log

**Status:** ABGESCHLOSSEN / LOKAL VERIFIZIERT / PUSH DURCH NUTZER FREIGEGEBEN / **KEIN DEPLOY**
**Audit-Zeitpunkt:** 2026-11-14, Europe/Berlin
**Git-Baseline:** Branch `main`, HEAD `140de46` (10 lokale Commits nach `de6616b`).
Neue Commits: `82de9c8` (Engine), `fc6f07d` (Tests); Docs-/Beleg-Commit folgt als
letzter Commit dieses Tasks.
**Scope:** Wiederverwendbare Storytelling-Engine, sieben Kapitel der Phagen-Reportage,
Interaktionen, Accessibility, Performance, SEO/Sharing, Tests und Belege.
**Freigabe:** Der Nutzer hat einen Git-Push ausdrücklich freigegeben. Deployment,
Merge und Veröffentlichung bleiben untersagt.

---

## 1. Governance und Baseline

`AGENTS.md`, `AI_AUDITLOG.md`, der Abschlussbericht MAYS-REPORTAGEN-02 und der
wissenschaftliche Quellen-Audit wurden gelesen. Der Git-Stand wurde vor Beginn geprüft:
10 lokale Commits, sauberer Arbeitsbaum, 25 Unit-Tests, 39 Playwright-Tests je Browser.
Bestehende Tests und Funktionen wurden nicht entfernt; der klassische Artikel-Renderer
bleibt als Fallback für Reportagen ohne Story erhalten.

## 2. Architektur der Storytelling-Engine

- **Datengetrennt:** `src/story/` enthält die Engine, `src/content/stories/` die Inhalte.
  Die Engine importiert keine Phagen-Texte; die Startseite importiert keinen Renderer.
- **Sieben Kapiteltypen:** `intro`, `phage-cycle`, `process`, `timeline`, `evidence`,
  `institutions`, `factcheck` (Typen in `src/story/types.ts`).
- **Renderer-Auswahl:** `StoryChapterFrame` schaltet exhaustiv über `kind`; neue
  Reportagen benötigen nur eine Story-Datei + Registry-Eintrag.
- **Fallback:** `ReportagePage` rendert `StoryReader`, wenn `getStory(slug)` existiert;
  sonst den bisherigen Artikelpfad mit `ArticleToc`/`ArticleBlocks`.
- **Navigation:** Desktop-Rail mit `IntersectionObserver` und `aria-current="location"`;
  mobil sticky Kapitelstatus + natives `<dialog>` mit Sprungmarken.
- **Fortschritt:** bestehende `ReadingProgress`-Komponente bleibt erhalten.
- **Quellen:** kontextuelle `SourceChips` (`S1`…`S14`) verlinken auf die vollständige
  Quellenliste; alle 14 Quellen bleiben mit externem Link erhalten.
- **Overlays:** natives `<dialog>` für Begriffe und Methodik; Schließen per Button,
  Escape und Backdrop.
- **Teilen:** Link kopieren, E-Mail, optional Web Share API – ohne Tracking-Skripte.

## 3. Umgesetzte Kapitel

1. **Die unsichtbare Bedrohung** – hero-nahe Einordnung, Penicillin/Resistenzen,
   offene Frage, Pull-Quote aus S1. Keine Sterblichkeitszahlen.
2. **Die Bakterienfresser** – manuell steuerbarer 5-Stufen-Zyklus (Annäherung, Bindung,
   Erbgut, Vermehrung, Aufbrechen), SVG-Schema, `aria-live`, Begriffedialog.
3. **Die Spur im Teichwasser** – fünfstufiger Prozess von der Umweltprobe bis zur
   Qualitätskontrolle, Warnhinweis „Wasserprobe ist kein Arzneimittel“, keine
   Kultivierungs- oder Selbstanwendungsanleitung.
4. **Europa und die Militärmedizin** – interaktive Zeitleiste mit belegten Stationen
   2005, 2007, 2013–2018, 2019, 2024, 20.06.2025, 2025/26, 21.09.2026.
5. **Was sagt die Wissenschaft?** – 77,2 % und 61,3 % **der dokumentierten Infektionen**,
   Methodik direkt daneben, 15 unerwünschte Ereignisse (7 nicht-schwere vermutete
   Arzneimittelreaktionen), keine Heilungswahrscheinlichkeit.
6. **Wo wird geforscht und behandelt?** – Filter nach Forschung, klinischer Forschung,
   individuellen Heilversuchen und erreichbaren Angeboten; keine Garantie.
7. **Faktencheck** – sechs Fragen mit Quellenchips und „Alle öffnen/schließen“.

Wissenschaftliche Zuordnung: `docs/WISSENSCHAFTLICHER-QUELLEN-AUDIT.md`, Abschnitt
„Verwendung in der interaktiven Story“. Es wurden keine neuen Zahlen oder Jahreszahlen
erfunden.

## 4. Accessibility

- Kapitel-Navigation, Stepper, Filter, Zeitleiste und Faktencheck sind echte Buttons/Links.
- Stepper startet nie automatisch; `aria-current="step"`, `aria-live` und sichtbare
  Beschreibungen; SVGs mit `<title>`/`<desc>`.
- `prefers-reduced-motion` deaktiviert Float-, Puls-, DNA- und Balkenanimationen; die
  Engine setzt zusätzlich `is-reduced`.
- Mobile Kapitelauswahl als natives Dialog; Touch-Ziele ≥ 40–44 px.
- axe-core (WCAG 2.1 A/AA): **0 Violations** auf allen Seiten, zusätzlich geprüft mit
  geöffnetem Begriffedialog und geöffnetem Faktencheck.

## 5. Tatsächliche Testergebnisse

| Prüfung | Ergebnis |
| --- | --- |
| ESLint 10.15.0 | **PASS**, 0 Fehler/Warnungen |
| TypeScript (`tsc --noEmit`) | **PASS** |
| Unit-Tests (Vitest) | **31/31 PASS** (5 Dateien) |
| Production Build | **PASS** |
| Playwright Chromium | **51/51 PASS** |
| Playwright Firefox | **49/49 PASS**, 2 Skips (Clipboard, Screenshot-Erfassung) |
| Playwright WebKit | **49/49 PASS**, 2 Skips (dito) |
| Gesamt E2E | **149 passed, 4 skipped** |
| Responsive | 320/390/768/1024/1440 px ohne horizontalen Überlauf |
| Reduced Motion | Stepper und Inhalte funktionieren, Animationen deaktiviert |
| Tastatur | Enter auf „Weiter“ und Kapitel-Link getestet |
| axe-core | 0 Violations (WCAG 2.1 A/AA) |
| Lighthouse mobil (Home + Story) | **100 / 100 / 100 / 100** (Performance, Accessibility, Best Practices, SEO) |
| Lighthouse LCP / CLS / TBT (Story) | 0,8 s / 0 / 70 ms |
| Playwright CLS (Home + Story) | 0,0000 |
| Playwright LCP lokal | Chromium 196 ms · Firefox 173 ms · WebKit 1.489 ms |
| Bundle-Budget | JS 106,1 kB gzip, CSS 11,5 kB gzip |

**WebKit-Hinweis:** Auf dem Host fehlt `libavif16`; für die lokale Verifikation wurde
die Bibliothek nach `/tmp` entpackt und der Playwright-Browser-Wrapper im Benutzer-Cache
ergänzt (`PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1`). Das Repository wurde dafür
nicht verändert. CI/Release benötigt `npx playwright install --with-deps`.

**Nicht ausgeführt:** echtes Mobilgerät, Safari/macOS-Hardware, Lasttest, Deployment,
anwaltliche/medizinische Freigabe, Tracking-/Consent-Prüfung. Terraform: **keine**
Prüfung, da kein IaC im Repository vorhanden ist.

## 6. Performance-Befunde

- Interaktionen nutzen ausschließlich CSS-Transitions/-Keyframes und
  `IntersectionObserver`; keine Animations- oder 3D-Bibliothek.
- Stufenwechsel ändern nur `data-stage`/Opacity; das SVG bleibt statisch.
- Kein zusätzlicher Scroll-Listener für die Kapitel; der bestehende Fortschrittsbalken
  bleibt der einzige globale Scroll-Handler.
- LCP bleibt das vorgeladene Hero-WebP (136 kB bei 1280 px); CLS 0 durch Font-Preload
  und feste Bildmaße. Lighthouse bestätigt 100 Performance mobil.
- Die Story vergrößert das JS-Bundle von 95,8 auf 106,1 kB gzip (+10,3 kB), CSS von
  8,3 auf 11,5 kB gzip; beide Budgets (< 160 kB / < 15 kB) werden eingehalten.

## 7. SEO, Kapitel und Sharing

- Bestehende Metadaten bleiben: Title, Description, Canonical, OG, Twitter,
  `NewsArticle`-JSON-LD, Hero-Preload.
- Alle sieben Kapitel haben eigene IDs (`#bedrohung`, `#biologie`, `#teichwasser`,
  `#militaer`, `#forschung`, `#zentren`, `#faktencheck`) und `scroll-margin-top` für
  Deep Links; die Quellenliste bleibt `#quellen`.
- Kontextuelle Quellenlinks an jeder Aussage; vollständige Quellenliste am Ende.
- Teilen ohne externe Skripte: Link kopieren, E-Mail, optionale Web Share API.
- Keine Analytics, keine Cookies, keine Social-Media-Einbettung.

## 8. Screenshots

Unter `docs/reports/assets/MAYS-REPORTAGEN-03/`:

- `story-top-1440.png` (Hero + Kapitel 1)
- `story-bedrohung-1440.png`, `story-biologie-1440.png`, `story-teichwasser-1440.png`
- `story-militaer-1440.png`, `story-forschung-1440.png`, `story-zentren-1440.png`
- `story-faktencheck-1440.png`, `factcheck-open-1440.png`
- `institutions-filter-1440.png`, `story-sources-1440.png`
- `phage-stage-3.png`, `phage-stage-5.png`
- `story-biologie-390.png`, `story-mobile-top-390.png`
- `chapter-dialog-390.png`, `factcheck-open-390.png`
- `lighthouse-summary.json`

## 9. Git-Status und Änderungen

Neu: `src/story/**`, `src/content/stories/**`, `src/styles/story.css`,
`e2e/story.spec.ts`, `docs/STORYTELLING-ENGINE.md`, Report-Assets und Execution Log.
Geändert: `src/pages/ReportagePage.tsx`, `src/main.tsx`, `src/App.test.tsx`,
`src/styles/layout.css`, `e2e/reportagen.spec.ts`, `e2e/performance.spec.ts`,
`README.md`, `AGENTS.md`, `docs/REPORTAGEN-ARCHITEKTUR.md`,
`docs/WISSENSCHAFTLICHER-QUELLEN-AUDIT.md`, Screenshots der 01A/02-Belege.

Es wurden Dateien geändert; „keine Dateien geändert“ trifft nicht zu.
Kein Merge, kein Deployment, keine Änderung an anderen Projekten.
Push erfolgt nach diesem Commit gemäß ausdrücklicher Nutzerfreigabe.

## 10. Klassifikation

**YELLOW — technisch release-nah, weiterhin nicht veröffentlichungsfähig.**
Story, Interaktionen, Accessibility und Performance sind lokal vollständig grün.
Blockierend bleiben die aus MAYS-REPORTAGEN-02 bekannten Punkte: Betreiberangaben,
Bildrechte/KI-Kennzeichnung, Hosting/Domain und rechtliche Prüfung.

## 11. Offene Aufgaben

1. Betreiber- und Verantwortungsangaben ergänzen; Impressum/Datenschutz freigeben.
2. Bildrechte der KI-Illustrationen klären.
3. Domain/Hosting festlegen, Sitemap erzeugen, `vercel.json` deployen (separate Freigabe).
4. Echte Geräte/Safari-Hardware und Lighthouse auf dem Zielhost prüfen.
5. Story-Inhalte bei Quellenänderungen erneut auditieren.
6. Optional: zweite Reportage mit der Engine anlegen, um die Wiederverwendung zu belegen.
7. Optional: CI-Workflow für `verify` + Playwright (inkl. WebKit-Dependencies).

## 12. Empfehlung für MAYS-REPORTAGEN-04

**MAYS-REPORTAGEN-04 — Release Gate & Second Story.** Zuerst die rechtlichen und
Bildrechts-Blocker schließen und die Domain festlegen; danach eine zweite, kürzere
Reportage ausschließlich mit vorhandenen Kapiteltypen anlegen, um die Engine im
Redaktionsalltag zu testen. Parallel `npm run verify` und Playwright in CI verankern.
Kein Ausbau der Engine vor diesem Realitätscheck.

## 13. Resume-Punkt

Arbeitsstand ist getestet und commitet. Fortsetzung bei rechtlicher Freigabe/Domain oder
bei der zweiten Reportage. Keine laufenden Schreibvorgänge; der lokale Preview-Server
ist nicht Teil des Lieferstands.
