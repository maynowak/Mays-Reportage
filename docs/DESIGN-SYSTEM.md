# Designsystem — Light Editorial

Leitmotiv: **Staunen statt Datenverwaltung.** Das Magazin ist hell, freundlich und
leseorientiert; der Hero bleibt der einzige bewusst dunkle, filmische Block.

## Farben

| Rolle | Token | Wert |
| --- | --- | --- |
| Seitenhintergrund | `--page` | `#f8fafc` |
| Karten/Flächen | `--surface` | `#ffffff` |
| Kapitel Türkis | `--surface-alt` | `#e8f8f7` |
| Kapitel Lavendel | `--surface-lavender` | `#f0ebff` |
| Warme Fläche | `--surface-warm` | `#fff7ed` |
| Überschriften | `--heading` | `#14243a` |
| Fließtext | `--body-text` | `#334155` |
| Sekundärtext | `--muted` / `--muted-2` | `#55677c` / `#526479` |
| Akzent (Text/Icons) | `--accent` | `#00736d` |
| Akzent (Flächen/Illustration) | `--accent-bright` | `#00b8b0` |
| Koralle (Text) | `--coral` | `#b23a27` |
| Koralle (Flächen) | `--coral-bright` | `#ff7865` |
| Violett | `--violet` | `#6d5bd0` |

Die Textvarianten sind bewusst dunkler als die im Briefing genannten Flächenfarben
(`#00b8b0`, `#ff7865`): Nur so erreichen kleine Labels und Links 4,5:1 auf Off-White,
Türkis und Lavendel. Die hellen Töne bleiben für Flächen, Balken und Illustrationen.

## Typografie

- **Hero/Logo:** Archivo Black (`--font-display`), nur für den filmischen Einstieg.
- **Editorial:** Fraunces Variable (`--font-serif`), Überschriften, Fragen, Zitate,
  Kennzahlen. Keine Großschreibung der Kapitelüberschriften.
- **UI/Fließtext:** Inter Variable (`--font-body`).
- Fließtext 1,05–1,16 rem, Zeilenhöhe 1,7–1,85; mobile Kapitelüberschriften
  `clamp(1.8rem, 8vw, 2.35rem)`.
- Alle Fonts sind lokal, latin-subset, preloaded; keine externen Font-CDNs.

## Kapitelrhythmus

Jedes Kapitel ist eine abgerundete Fläche mit eigener Tönung und einer großen
journalistischen Frage:

| Kapitel | Fläche | Besonderheit |
| --- | --- | --- |
| 01 Bedrohung | Weiß → Warm → Türkis | Drop-Cap, große Frage, Zitatkarte |
| 02 Bakterienfresser | `--surface-alt` | großes Schema, Stepper, Erklärpanel |
| 03 Teichwasser | Weiß | 2-spaltige Prozess-Infografik, Warnbox |
| 04 Europa/Militär | `--surface-lavender` | Zeitleiste mit Koralle-Rhythmus |
| 05 Wissenschaft | `--surface-alt` | große Serif-Zahlen, Methodik-Panel |
| 06 Zentren | Weiß | Filter, Karten mit Farbkante |
| 07 Faktencheck | Lavendel → Türkis | Entdeckerkarten, 2 Spalten |

Kapitel haben `scroll-margin-top`; die Kapitel-Navigation bleibt sticky, verdeckt aber
keine Inhalte dauerhaft. Kein Kapitel wird per Opacity versteckt (siehe unten).

## Komponenten

- **Header:** über dem Hero transparent mit weißer Schrift, sonst fest auf Off-White
  mit Marineblau. Mobile Menü als helle Fläche.
- **Hero:** unverändertes Bild, Zoom, Partikel, Phagen, Headline, Primär-CTA in hellem
  Türkis mit dunkler Schrift, Sekundär-CTA als dunkle Glasfläche.
- **Phagen-Zyklus:** helles Schema (Koralle-Bakterium, Türkis-Phage), Stepper,
  Erklärpanel, Begriffedialog; keine Auto-Animation.
- **Infografiken:** Prozess (2 Spalten, letzte Karte volle Breite), Zeitleiste,
  Kennzahlenbalken, Einrichtungsfilter, Faktencheck.
- **Quellen:** Chips an der Aussage, vollständige Liste am Ende, optisch untergeordnet.
- **Footer:** sehr helle Türkisfläche, Marineblau, kein zweiter Dark-Block.

## Bewegung

- Keine `opacity: 0`-Verstecke für ganze Kapitel oder Sections. Inhalte sind immer
  sichtbar, auch in Full-Page-Screenshots, ohne JS und bei schnellem Scrollen.
- Optionaler Scroll-Effekt nur als Transform über
  `@supports (animation-timeline: view())`; Reduced Motion deaktiviert ihn.
- Weitere Bewegung: Hero-Zoom, Partikel, Phagen-Float, CTA-Sheen, Hover.
  Alles CSS, keine Animations- oder 3D-Bibliothek.
- `prefers-reduced-motion` deaktiviert alle Animationen und Transitions.

## Wiederverwendung

Die Palette ist markenweit; reportagespezifische Akzente kommen aus
`Reportage.accent` (Hero, Featured Cards). Neue Reportagen erben Layout und Typografie
und können eigene Kapiteltypen/Illustrationen ergänzen, ohne die Engine zu ändern.
Keine Farb- oder Bildabhängigkeit von der Phagen-Story in globalen Komponenten.

## Regeln für neue Inhalte

1. Keine dunklen Dashboard-Karten; Flächen weiß oder pastell, Text Marineblau.
2. Pro Kapitel eine Frage oder ein Zitat als visueller Einstieg.
3. Zahlen groß, Bezugsgröße und methodische Grenze direkt daneben.
4. Quellen sichtbar, aber nicht dominanter als der Text.
5. Kontrast vor Markenfarbe: Text-Akzente dunkler als Flächen-Akzente.
6. Keine Full-Section-Reveals mit `opacity: 0`.
