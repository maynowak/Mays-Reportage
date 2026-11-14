# MAYS-REPORTAGEN-DESIGN-01 — Light Editorial Experience — Execution Log

**Status:** ABGESCHLOSSEN / LOKAL VERIFIZIERT / **KEIN PUSH / KEIN DEPLOY**
**Audit-Zeitpunkt:** 2026-11-14, Europe/Berlin
**Git-Baseline:** Branch `main`, HEAD `0dabd09` (15 Commits). Neue Commits:
`beecaf9` (Designsystem), `4d65fb4` (Tests); Beleg-/Docs-Commit folgt als letzter
Commit dieses Tasks.
**Scope:** Helles Editorial-Design, Kapitelrhythmus, Beseitigung der großen Leerstelle,
responsive und barrierefreie Überarbeitung der bestehenden Komponenten.
**Freigabe:** Kein Push, Merge oder Deployment ohne ausdrückliche Freigabe.

---

## 1. Governance und Baseline

`AGENTS.md`, `AI_AUDITLOG.md`, `AI_AUDITINDEX.md` und der Design-/Story-Kontext wurden
gelesen. Baseline geprüft: sauberer Baum, 15 Commits, 31 Unit-Tests, 52/50 E2E-Tests.
Es wurden keine anderen Projekte verändert.

## 2. Bestandsaufnahme

Die alte Darstellung war überwiegend dunkel (`#04070f`, `#081120`), mit vielen
gleichförmigen Panels, kleinen Mono-Labels und harten Hell-Dunkel-Wechseln. Der Hero war
stark, die Lesewelt darunter wirkte technisch. Mobile war funktional, aber kontrastarm
und textlastig.

Gemessen an der alten Reportage (1440 px):

- alle sieben Kapitel waren zunächst `opacity: 0.03–0.10` bzw. unsichtbar
- Kapitel 2–7 lagen unterhalb des Viewports und reservierten trotzdem ihre volle Höhe
- der Abstand zwischen letztem Kapitel und Quellen war im Layout nur ca. 33 px

## 3. Ursache der großen Leerstelle (behoben)

**Ursache:** `useScrollReveal` setzte für jedes `[data-reveal]`-Element
`opacity: 0` und `translateY(20px)`, bis ein `IntersectionObserver` es freischaltete.
Die gesamten, teils 2.000–3.800 px hohen `.story-chapter`-Sektionen trugen dieses
Attribut. Im Full-Page-Screenshot, bei schnellem Scrollen oder vor dem ersten
Intersection-Event blieben riesige Flächen unsichtbar, behielten aber ihre Layout-Höhe.

**Nicht die Ursache:** keine `min-height`, kein Scroll-Container, keine Sticky-Höhe,
kein Margin. Der Layout-Abstand vor den Quellen war klein; unsichtbar war der Inhalt
darüber.

**Fix:** Kapitel-Reveal entfernt, Hook und globale Reveal-Verbergung gelöscht. Kapitel
sind immer sichtbar. Optionaler Scroll-Effekt nur noch als Transform über
`@supports (animation-timeline: view())`, ohne Opacity. Gemessen nach dem Fix:

- alle sieben Kapitel `opacity: 1` direkt nach dem Laden
- Abstand letztes Kapitel → Quellen: 35 px
- Body-Hintergrund: `rgb(248, 250, 252)`

## 4. Neues Designsystem

- Off-White `#f8fafc`, Weiß, Türkis `#e8f8f7`, Lavendel `#f0ebff`, Warm `#fff7ed`.
- Marineblau `#14243a`, Fließtext `#334155`.
- Akzent für Text/Icons: `#00736d`; Flächen-Türkis `#00b8b0`.
- Koralle für Text: `#b23a27`; Flächen-Koralle `#ff7865`.
- Serif-Editorialschrift **Fraunces**, Sans **Inter**, Hero weiter **Archivo Black**.
- Alle Fonts lokal, latin-subset, vorgeladen; keine externen Font-CDNs.

Die Textfarben wurden bewusst dunkler als die Briefing-Flächenfarben gewählt, um
4,5:1 auf Off-White/Türkis/Lavendel zu erreichen. Details: `docs/DESIGN-SYSTEM.md`.

## 5. Umgesetzte Komponenten

- **Header:** transparent/weiß über dem Hero, sonst fest auf Off-White mit Marineblau;
  mobiles Menü hell; Logo/Farbe adaptiv.
- **Hero:** Originalbild, Zoom, Partikel, Phagen und Headline unverändert; Primär-CTA
  jetzt helltürkis mit dunkler Schrift, Sekundär-CTA als dunkle Glasfläche.
- **Kapitel:** abwechselnd weiße, türkise und lavendelne Flächen, große Serif-Fragen,
  Kapitelnummern, Drop-Cap, Zitatkarte.
- **Phagenzyklus:** größeres, helles Schema mit Koralle-Bakterium und Türkis-Phage,
  deutlich sichtbarer Phage, vollbreites Erklärpanel, Stepper unverändert.
- **Prozess:** von fünf engen Spalten auf zweispaltige Infografik umgestellt; letzte
  Karte volle Breite; keine Worttrennungen mehr.
- **Zeitleiste:** Lavendelfläche, Koralle-Rhythmus, weiße Karten.
- **Wissenschaft:** große Serif-Zahlen, Koralle-Caveats, Methodik-Panel.
- **Zentren:** Filter, Karten mit farbigen Oberkanten, pastellfarbene Badges.
- **Faktencheck:** zweispaltige Entdeckerkarten mit nativen Details.
- **Quellen/Teilen/Dialoge/Footer:** hell, optisch untergeordnet, ohne Dark-Block.

## 6. Responsive und Lesbarkeit

Geprüft bei **320 / 390 / 768 / 1024 / 1440 px**:

- kein horizontaler Überlauf
- Kapitelüberschriften 1,8–2,35 rem mobil, Fließtext 1,05–1,16 rem
- Touch-Ziele ≥ 40–44 px (Stepper, Filter, Menü, Dialoge)
- Prozess mobil einspaltig, Desktop zweispaltig
- Faktencheck mobil einspaltig
- Kapitel-Navigation sticky, aber mit `scroll-margin-top`; keine verdeckten Ankerziele
- Hero auf Mobil gestapelt; Bild und CTAs vollständig sichtbar

## 7. Accessibility

- axe-core WCAG 2.1 A/AA: **0 Violations** auf Home, Archiv, Reportage, Über uns,
  Impressum, Datenschutz, Bildnachweis.
- Zusätzlich geprüft mit geöffnetem Begriffedialog und geöffnetem Faktencheck: 0.
- Kontraste: Akzenttext `#00736d` (≥ 4,9:1 auf Pastell), Koralle `#b23a27` (≥ 4,7:1),
  Fließtext `#334155` (> 9:1).
- Tastaturbedienung, Screenreader-Texte, Reduced Motion und Touch unverändert getestet.

## 8. Tatsächliche Testergebnisse

| Prüfung | Ergebnis |
| --- | --- |
| ESLint 10.15.0 | **PASS**, 0 Fehler/Warnungen |
| TypeScript (`tsc --noEmit`) | **PASS** |
| Unit-Tests | **31/31 PASS** |
| Production Build | **PASS** |
| Playwright Chromium | **52/52 PASS** |
| Playwright Firefox | **50/50 PASS**, 2 Skips |
| Playwright WebKit | **50/50 PASS**, 2 Skips |
| Gesamt E2E | **152 passed, 4 skipped** |
| axe-core | **0 Violations** (inkl. Dialog/Faktencheck) |
| Lighthouse mobil (Home + Story) | **100 / 100 / 100 / 100** |
| Lighthouse LCP / CLS / TBT (Story) | 0,8 s / 0 / 70 ms |
| Playwright CLS (Home + Story) | **0,0000** |
| Bundle | JS 106,1 kB gzip, CSS 12,6 kB gzip |
| Reduced Motion | PASS |
| Neue Regression „Kapitel sichtbar“ | PASS (Opacity 1, Abstand 35 px) |

WebKit lief lokal erneut nur mit dem bekannten `libavif16`-Workaround
(`PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1`); Repository unverändert.
Terraform: **keine** Prüfung, da kein IaC vorhanden ist.

**Nicht ausgeführt:** echtes Mobilgerät, Safari/macOS-Hardware, Deployment,
anwaltliche/medizinische Freigabe.

## 9. Screenshots und Vergleich

`docs/reports/assets/MAYS-REPORTAGEN-DESIGN-01/`:

- `comparison-reportage-top.png` — Vorher/Nachher Einstieg
- `comparison-reportage-chapter2.png` — Vorher/Nachher Kapitel 2
- `comparison-home.png` — Vorher/Nachher Startseite
- `before-*` (14 dunkle Belege aus MAYS-REPORTAGEN-03/01A/02)
- `after-home-1440.png`, `after-home-390.png`
- `after-story-top-1440.png`, `after-story-top-390.png`
- `after-story-bedrohung/biologie/teichwasser/militaer/forschung/zentren/faktencheck/quellen-1440.png`
- `after-story-biologie-390.png`, `after-factcheck-390.png`
- `after-factcheck-open-1440.png`, `after-institutions-filter-1440.png`
- `after-archive-1440.png`, `after-about-1440.png`, `after-impressum-1440.png`
- `lighthouse-summary.json`

## 10. Git-Status und Änderungen

Geändert: `src/styles/tokens.css`, `story.css`, `home.css`, `article.css`, `layout.css`,
`pages.css`, `hero.css`, `src/components/layout/SiteHeader.tsx`,
`src/story/components/StoryChapterFrame.tsx`, `PhageCycleView.tsx`,
`src/pages/*`, `src/content/stories/bakteriophagen.story.ts`, `src/content/*`,
`index.html`, `e2e/story.spec.ts`, `README.md`, `AGENTS.md`, Architektur-/Engine-Doku,
Screenshots der 01A/02/03-Belege.

Neu: `public/fonts/fraunces-*.woff2`, `docs/DESIGN-SYSTEM.md`,
`docs/reports/04-01-MAYS-REPORTAGEN-DESIGN-01-EXECUTION_LOG.md`,
`docs/reports/assets/MAYS-REPORTAGEN-DESIGN-01/**`.

Entfernt: `src/hooks/useScrollReveal.ts` (Ursache der Leerstelle).
Es wurden Dateien geändert; „keine Dateien geändert“ trifft nicht zu.
Kein Push, Merge, Deployment, keine Änderung an anderen Projekten.

## 11. Klassifikation

**YELLOW — gestalterisch und technisch abgenommen, Veröffentlichung weiterhin offen.**
Blockierend bleiben die bekannten Punkte: Betreiberangaben, Bildrechte, Domain/Hosting
und rechtliche Prüfung.

## 12. Offene Punkte

1. Betreiber-/Hosting-/Rechteangaben und Domain (unverändert aus 01A/02).
2. Echte Geräte/Safari-Hardware und Lighthouse auf dem Zielhost.
3. Kein automatischer CI-Lauf; Playwright/axe lokal ausgeführt.
4. Optional: redaktionelle Freigabe der neuen Fragen und Kapiteltexte.
5. Optional: zweite Reportage mit eigener Akzentfarbe, um das Farbschema zu prüfen.

## 13. Empfohlene nächste Schritte

1. Rechtliche und Bildrechts-Blocker schließen, Domain festlegen.
2. Design auf einer zweiten Reportage real testen (nur vorhandene Kapiteltypen).
3. CI um `npm run verify`, Playwright und axe erweitern.

## 14. Resume-Punkt

Arbeitsstand ist lokal commitet und vollständig getestet. Fortsetzung bei einer zweiten
Reportage oder der rechtlichen Freigabe; keine laufenden Schreibvorgänge.
