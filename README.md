# Mays-Reportagen

Erweiterbares Online-Reportagemagazin über Wissenschaft, Medizin und die Menschen
dahinter. Erste Titelgeschichte: **Bakteriophagen gegen resistente Bakterien** –
Teichwasser, Phagentherapie und die militärische Anwendung in Europa.

Die Startseite zeigt die aktuelle Titelgeschichte nach redaktioneller Priorität.
Jede Reportage bringt ihr eigenes Titelmotiv, ihre eigene Akzentfarbe und ihre
eigenen Quellen mit; die Hero-Komponente bleibt generisch.

## Entwicklung

```bash
npm install
npm run dev        # http://localhost:5173
npm run verify     # TypeScript + Unit-Tests + Produktions-Build
npm run e2e        # Playwright: 320/390/768/1024/1440 px, Screenshots
```

`npm run e2e` schreibt die Abnahme-Screenshots nach
`docs/reports/assets/MAYS-REPORTAGEN-01A/`.

## Struktur

| Pfad | Inhalt |
| --- | --- |
| `src/content/reportagen.ts` | Reportage-Registry, Featured-Priorität, geplante Themen |
| `src/content/bakteriophagen.ts` | Inhalt, Quellen und Akzentfarben der Titelgeschichte |
| `src/components/hero/CinematicHero.tsx` | responsiver Hero, Partikel, CTAs |
| `public/media/phagen/` | ausgelieferte Hero-Varianten (WebP 640–1672) + OG-Bild |
| `assets/source/` | unveränderte Originalbilder (nicht Teil des Builds) |
| `docs/reports/` | Audit- und Abnahmebelege, Screenshots |

Siehe `docs/REPORTAGEN-ARCHITEKTUR.md`, um eine neue Titelgeschichte zu ergänzen.

## Bilder

Das Titelbild ist eine Designreferenz aus dem Auftrag und wird als
`assets/source/phagen-hero.png` unverändert aufbewahrt. Ausgeliefert werden nur
optimierte WebP-Derivate; die beiden Referenzbilder (Desktop/Mobil) liegen unter
`docs/reports/assets/MAYS-REPORTAGEN-01A/` und werden nicht produktiv genutzt.

## Lizenz

GPL-3.0 – siehe `LICENSE`.
