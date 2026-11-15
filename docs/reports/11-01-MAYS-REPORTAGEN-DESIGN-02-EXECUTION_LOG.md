# DESIGN-02 — Living Science Background & Typography — Execution Log

**Status:** **GREEN LOKAL / PRODUCTION-DEPLOYMENT AUSSTEHEND**
**Audit-Zeitpunkt:** 15. November 2026
**Git-Baseline:** `eb1d2f7`, clean, 4 Commits vor `origin/main`; Production `a6331e9`.
**Neue Commits:** `80341b7` (Typografie), `8a0d354` (Living-Science-Hintergrund),
`e85a895` (Screenshot-Settling), `da05aa5` (Band-Zentrierung); Doku-/Beleg-Commit
`16f72b9` plus dieser Nachtrag.
**Kein Push, Merge oder Deployment.**

---

## 1. Baseline und Governance

AGENTS.md und Auditindex gelesen. Baseline clean, 4 Commits vor Remote, Production
`a6331e9`. Keine anderen Projekte, keine neuen Reportagen, kein Frameworkwechsel.
MARKETING-02-Static-Metadata, Hero, Rechtstexte und Inhalte bleiben unverändert.

## 2. Typografie

- Fließtext: `#243247` (statt `#334155`).
- Sekundärtexte: `#405269` / `#4b5c72`.
- Überschriften bleiben `#14243a`; Text-Akzente `#00736D` / `#B23A27`.
- Basis 16,5 px, Zeilenhöhe 1,7; kein künstlich aufgehellter Text, keine dünnen
  Gewichte.
- Lesegrade angehoben bei: Untertiteln, Story-Leads, Kapiteltexten, Teaser,
  Infokarten, Prozess-/Timeline-Texten, Faktencheck, Quellen, Navigation, Buttons,
  Badges und rechtlichen Hinweisen.
- Keine Schriftfamilien geändert (Fraunces, Inter, Archivo Black bleiben).

**Kontrast (gemessen):**

| Farbe | Weiß | Page | Türkis | Lavendel |
| --- | --- | --- | --- | --- |
| `#14243a` | 15,6 | 14,9 | 14,3 | 13,4 |
| `#243247` | 13,0 | 12,4 | 11,8 | 11,1 |
| `#405269` | 8,0 | 7,6 | 7,3 | 6,9 |
| `#4b5c72` | 6,8 | 6,5 | 6,3 | 5,9 |
| `#00736d` | 5,7 | 5,5 | 5,2 | 4,9 |
| `#b23a27` | 6,0 | 5,7 | 5,4 | 5,1 |

Alle Textpaare ≥ 4,5:1. axe bestätigt 0 Violations.

## 3. Living Science Background

Neu: `LivingScienceBackground` + `ScienceBand`, rein dekorativ, ohne neue Bildassets.

- Drei SVG-Ebenen mit DNA-Fragmenten, stilisierten Phagen, Tropfen, Lichtpunkten und
  weichen türkis/violetten Verläufen.
- Kontinuierliche Abwärtsbewegung über CSS-Transforms:
  150 s (fern), 105 s (mittel), 72 s (nah) – räumliche Tiefe statt Partikelregen.
- Keine 3D-Engine, keine Videos, keine schweren Filter; GPU-freundliche Transforms.
- Integration:
  - Hero-Übergang zur hellen Magazinwelt (`transition`).
  - Ein Band zwischen ausgewählten Story-Kapiteln (`story`).
  - Ein Band vor dem Quellenbereich (`story-end`).
- Hero-Unterkante im Home-Flow bündig, keine weißen Radius-Artefakte.
- Artikel-/Textkarten bleiben opak; das Band liegt nicht über Text, Buttons oder Dialogen.
- `aria-hidden="true"`, `pointer-events:none`, keine Fokuszziele.
- Reduced Motion: Ebenen statisch, Animation `none`.
- Mobile: ferne Ebene ausgeblendet, Bandhöhe reduziert.
- Theme über CSS-Variablen (`--science-teal`, `--science-violet`, …) und
  `living-science--microbiology`; weitere Themen später möglich, ohne die
  Reportage-Engine zu ändern.
- Kein `opacity: 0`-Verstecken von Kapiteln; bestehende Sichtbarkeitsregression bleibt
  abgesichert.

## 4. Tests

| Prüfung | Ergebnis |
| --- | --- |
| ESLint / TypeScript / Build | PASS |
| Unit-Tests | **39/39** |
| Playwright gesamt | **192 passed / 6 skipped** |
| Chromium / Firefox / WebKit | 66 / 63+3 / 63+3 |
| axe WCAG 2.1 A/AA | 0 Violations |
| Reduced Motion | Hintergrund statisch, Animation `none` |
| Responsive | 320/390/768/1024/1440 ohne Überlauf |
| Kapitel sichtbar | alle `opacity: 1`; Abstände um Science-Band geprüft |
| Navigation | bestehende Tests PASS |
| Static HTML | 7 Routen, Social-/No-JS-Metadaten unverändert PASS |

### Performance (lokal)

| Seite | Vor DESIGN-02 | Nach DESIGN-02 |
| --- | --- | --- |
| Home Lighthouse | 100/100/100/100 | 100/100/100/100 |
| Story Lighthouse | 95–100 Performance | **96** Performance, 100/100/100 |
| LCP / CLS | 0,8–1,1 s / 0 | 0,8 s / 0 |
| TBT Story | 240–260 ms | 240 ms |

Lokale Lighthouse-Varianz; Zielhost-Messung bleibt Release-Gate.

## 5. Screenshots / Vorher-Nachher

`docs/reports/assets/MAYS-REPORTAGEN-DESIGN-02/`:

- `comparison-home-top-1440.png`
- `comparison-positioning-1440.png`
- `comparison-story-biologie-1440.png`
- `before-home-top-1440/390`, `before-home-positioning-1440`,
  `before-story-biologie-1440/390`
- `after-home-top-1440/390`, `after-home-positioning-1440`
- `after-science-transition-1440/390`
- `after-story-biologie-1440/390`

## 6. MARKETING-02 / Release-Sicherheit

- Statische HTML-Metadaten für 7 Routen, Vercel-Rewrites, Sitemap, Canonical,
  OG/Twitter, JSON-LD und No-JS-Tests bleiben PASS.
- Keine Änderung an Rechtstexten, Betreiberdaten, Reportagen oder Navigation.
- Keine neuen Assets; keine Änderung an `vercel.json`/Sitemap.
- Production bleibt `a6331e9`; Marketing-02 und Design-02 sind noch nicht deployt.

## 7. Git-Status

Neu: `src/components/science/*`, `src/styles/science.css`, `e2e/science.spec.ts`,
Screenshots und dieser Report.
Geändert: Typografie-CSS, `CinematicHero`, `HomePage`, `StoryReader`, `main.tsx`,
`hero.css`, `e2e/story.spec.ts`, `DESIGN-SYSTEM.md`, README/AGENTS/Release-Doku.

Es wurden Dateien geändert; „keine Dateien geändert“ trifft nicht zu.
Kein Push, Merge, Deployment; keine anderen Projekte.
Terraform: keine Prüfung, da kein IaC vorhanden.

## 8. Production-Preflight nach Redesign (lokal)

- Build/Unit/E2E/A11y/Lighthouse: PASS.
- Statische HTML-Generierung: 7 Dateien; Rewrite-Reihenfolge unverändert.
- 7 Routen lokal 200 mit individuellen Metadaten.
- Social-UA-Request unverändert korrekt.
- Production noch alt; Post-Deployment-Testplan aus MARKETING-02 gilt weiter.

## 9. Klassifikation

**GREEN lokal / DEPLOYMENT PENDING.** Keine technischen Release-Blocker durch
DESIGN-02; Produktion bewusst unverändert.

## 10. Offene Punkte / MARKETING-03

1. Deployment von MARKETING-02 + DESIGN-02 nach Freigabe; danach Production-Smoke.
2. Search Console, Sitemap-Einreichung, reale Social-Previews.
3. Soft-404, CSP, Vercel-DPA/KI-Training, Bildrechte Dritter.
4. MARKETING-03 organische Reichweite wie geplant; keine Tracking-Skripte/Ads.

## 11. Resume-Punkt

Lokal clean, getestet und dokumentiert. Nächster Schritt: Freigabe für Push/Deploy.
