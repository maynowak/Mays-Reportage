# Storytelling-Engine

Die Engine rendert interaktive, scrollgesteuerte Reportagen. Sie ist von den Inhalten
getrennt: Kapitel sind Daten (`src/content/stories/*`), die Engine (`src/story/`) kennt
deren Texte nicht. Die Magazin-Startseite, das Archiv und der Hero bleiben unabhängig.

## Aufbau

| Pfad | Aufgabe |
| --- | --- |
| `src/story/types.ts` | Datenmodell für Story und sieben Kapiteltypen |
| `src/content/stories/*.story.ts` | konkrete Kapitel, Quellen, medizinischer Hinweis |
| `src/story/StoryReader.tsx` | Layout, Kapitel, Quellen, Hinweis, Teilen |
| `src/story/components/StoryChapterNav.tsx` | Desktop-Rail, mobile Kapitelauswahl |
| `src/story/components/chapters/*` | Renderer je Kapiteltyp |
| `src/story/components/SourceChips.tsx` | kontextuelle Quellenlinks |

`ReportagePage` wählt anhand des Slugs: Gibt es eine Story, rendert `StoryReader`;
andere Reportagen fallen auf den klassischen Artikel-Renderer zurück. So bleibt die
Magazinarchitektur unverändert und künftige Reportagen können wahlweise langformig
oder interaktiv erscheinen.

## Kapiteltypen

| `kind` | Interaktion | Komponente |
| --- | --- | --- |
| `intro` | Scroll-Reveal, Pull-Quote | `IntroChapterView` |
| `phage-cycle` | manueller 5-Stufen-Stepper, `aria-live`, SVG-Schema | `PhageCycleView` |
| `process` | visueller 5-Schritt-Fluss, Warnhinweis | `ProcessView` |
| `timeline` | Sprungmarken + vollständige Ereigniskarten | `TimelineView` |
| `evidence` | Kennzahlen, Balken, Methodik, unerwünschte Ereignisse | `EvidenceView` |
| `institutions` | Kategorie-Filter (Forschung/Studien/Heilversuche/Angebote) | `InstitutionsView` |
| `factcheck` | native `<details>`, alle Antworten öffnen/schließen | `FactCheckView` |

Neue Kapiteltypen brauchen einen Eintrag in `StoryChapter` (types.ts), eine View und
einen Fall in `StoryChapterFrame`. Neue Reportagen dagegen nur eine Story-Datei und
einen Eintrag in `src/content/stories/index.ts` – Engine und Startseite bleiben
unberührt.

## Kapitel, Licht und Rhythmus

Seit MAYS-REPORTAGEN-DESIGN-01 nutzt die Story das helle Editorial-Design
(`docs/DESIGN-SYSTEM.md`). Jedes Kapitel hat eine optionale `question`, eine farbige
Fläche und serifenbetonte Überschriften. Ganze Kapitel werden **nicht** per
`opacity: 0` versteckt; Scroll-Effekte sind rein dekorative Transforms. Dadurch bleiben
Inhalte in Full-Page-Screenshots, ohne JS und bei schnellem Scrollen sichtbar.

## Navigation und Fortschritt

- `useActiveChapter` beobachtet die Kapitel per `IntersectionObserver`.
- Desktop: sticky Kapitel-Rail mit `aria-current="location"`.
- Mobil: sticky Kapitelstatus + natives `<dialog>` mit Sprungmarken.
- `ReadingProgress` (bestehende Komponente) zeigt den Lesefortschritt am Seitenkopf.
- Jedes Kapitel hat eine stabile ID (`#biologie`, `#forschung`, …) und
  `scroll-margin-top`, damit Deep Links nicht unter dem Header landen.

## Quellen und Overlays

Quellen werden als Chips (`S1` … `S14`) an der jeweiligen Aussage verlinkt und am Ende
vollständig mit externem Link gelistet. `InfoDialog` (natives `<dialog>`) erklärt
Fachbegriffe und Methodik; Schließen per Button, Escape oder Backdrop.

## Accessibility

- Alle Interaktionen sind echte Buttons oder Links; der Stepper ist per Tastatur
  bedienbar, der aktuelle Schritt hat `aria-current="step"`.
- Der Stepper startet nie automatisch; Inhalte sind ohne Animation vollständig lesbar.
- `aria-live` meldet den aktuellen Schritt, SVGs haben `<title>`/`<desc>` und eine
  sichtbare Bildunterschrift („schematische Illustration“).
- `prefers-reduced-motion` deaktiviert Float-, Puls-, DNA- und Balkenanimationen;
  die Engine setzt zusätzlich `is-reduced`.
- Axe-Check (WCAG 2.1 A/AA) läuft über alle Seiten inklusive Mobilmenü; die Story-Seite
  wird zusätzlich in geöffneten Dialog-/Faktencheck-Zuständen geprüft.

## Performance

- Nur CSS-Transforms/-Opacity und `IntersectionObserver`; keine Animations- oder
  3D-Bibliothek.
- SVG ist inline und statisch; Stufenwechsel ändern nur Klassen/Opacity.
- Kein Scroll-Listener für die Kapitel, nur der bestehende Fortschrittsbalken.
- LCP bleibt das vorgeladene Hero-WebP; CLS 0 durch Font-Preload und feste Maße.
- Lighthouse (mobil, lokal): 100 Performance/Accessibility/Best Practices/SEO;
  LCP 0,8 s, CLS 0, TBT 70 ms (Story).

## Inhaltsregeln

Neue Kapitel dürfen nur Aussagen aus `docs/WISSENSCHAFTLICHER-QUELLEN-AUDIT.md`
verwenden. Jede Zahl braucht Bezugsgröße und Quelle; keine Heilversprechen, keine
Sterblichkeitszahlen ohne belastbare Quelle. Bei neuen Quellen zuerst den Audit
erweitern, dann die Story.
