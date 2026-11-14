# SEO- & Discoverability-Audit — MARKETING-01

**Stand:** 14. November 2026
**Domain:** https://mays-reportage.vercel.app
**Produktionsstand:** `a670327` (Deployment `dpl_5D1bkJXxmJ8vojMWc9YCuFmkgvAw`)
**Keine Ranking-Garantie.** Geprüft wurden Technik, Indexierbarkeit und Metadaten.

## 1. Google-Indexierung

| Prüfung | Ergebnis |
| --- | --- |
| `robots.txt` | 200; `User-agent: *`, `Allow: /`, Sitemap-Zeile |
| Sitemap | 200; 7 URLs; alle URLs 200 |
| Canonical | korrekt pro Seite, absolute Produktionsdomain |
| `noindex` | nur 404-Seite (`noindex,follow`); öffentliche Seiten `index,follow` |
| Googlebot-Zugriff | HTTP 200, kein Block |
| JS-Rendering | React-Inhalte rendern im Browser korrekt |
| Statischer HTML-Fallback | **Gap:** Reportage-URL liefert ohne JS die Home-Metadaten |
| Soft-404 | **Gap:** unbekannte Slugs liefern HTTP 200 + 404-UI + JS-`noindex` |

**Bewertung:** Suchmaschinen mit JS-Rendering (Googlebot) können die Seiten erfassen.
Social-Crawler und Clients ohne JS sehen für Reportagen die Home-`title`/OG-Daten.
Für belastbare Social-Previews ist Pre-Rendering oder Edge-Metadata nötig.

## 2. Metadaten (mit JS)

| Seite | Title | Canonical | robots |
| --- | --- | --- | --- |
| `/` | Mays-Reportagen — Wissenschaft statt Wunder | `/` | index |
| `/reportagen` | Alle Reportagen — Mays-Reportagen | `/reportagen` | index |
| `/reportagen/bakteriophagen` | Bakteriophagen gegen resistente Bakterien — Mays-Reportagen | Reportage-URL | index |
| `/impressum` | Impressum — Mays-Reportagen | `/impressum` | index |
| `/datenschutz` | Datenschutz — Mays-Reportagen | `/datenschutz` | index |
| `/bildnachweis` | Bildnachweis — Mays-Reportagen | `/bildnachweis` | index |

- Open Graph/Twitter-Cards sind absolut und korrekt (mit JS).
- `NewsArticle`-JSON-LD für die Reportage: Headline, Description, URL, Image,
  Datum, Section, Sprache, Publisher.
- OG-Bild: 1200 × 630, absolute URL, Alt-Text.
- Bilder: alle mit Alt-Text; Hero mit `srcSet`, Dimensionen, Preload.
- Home/Reportage: genau eine H1, mehrere semantische H2.

## 3. Technische SEO

| Prüfung | Ergebnis |
| --- | --- |
| HTTP-Status aller öffentlichen Routen | 200 |
| Interne Links | 200 (inkl. Anker) |
| Mobile 390 px | kein horizontaler Überlauf |
| Lighthouse mobil Home | **100** Performance, 100 A11y, 100 Best Practices, 100 SEO |
| Lighthouse mobil Reportage | **100** Performance, 100 A11y, 100 Best Practices, 100 SEO |
| LCP / CLS / TBT Home | 0,9 s / 0 / 30 ms |
| LCP / CLS / TBT Reportage | 1,1 s / 0 / 80 ms |
| axe WCAG 2.1 A/AA | 0 Violations (Home/Reportage) |
| Security-Header | HSTS, nosniff, XFO, Referrer/Permissions vorhanden |
| CSP | **fehlt** (offene Entscheidung) |
| Cache | HTML `must-revalidate`; Assets/Fonts/Media gecacht |

## 4. Findings

### Hoch / vor organischem Wachstum beheben

1. **Social-/No-JS-Metadaten:** Reportage-URLs liefern statisch Home-Title/OG.
   Empfehlung: Pre-Rendering/Edge-Metadata für alle Reportagen.
2. **Soft-404:** unbekannte Slugs liefern 200. Empfehlung: Edge-404 oder akzeptieren
   und dokumentieren; für Suchmaschinen ist die JS-`noindex`-Lösung nur teilweise
   wirksam.

### Mittel

3. **Search Console** noch nicht angebunden; Verifikation/Sitemap-Einreichung offen.
4. **CSP** fehlt; Header sind sonst solide.
5. **Social Cards** nutzen für alle Seiten dasselbe OG-Bild; reportagespezifische
   Social-Cards wären besser.

### Niedrig

6. `changefreq` in der Sitemap wird von Google ignoriert (kein Fehler).
7. Kein `og:image:width`/`height`; Hinzufügen ist optional.
8. Keine `hreflang`-Angaben nötig (einsprachig).

## 5. Google Search Console — Vorbereitung

Keine Konto-Verknüpfung ohne Betreiberautorisierung.

1. Betreiberin meldet sich bei Search Console an.
2. **URL-Präfix-Property** `https://mays-reportage.vercel.app/` anlegen
   (Domain-Property per DNS ist bei `vercel.app` nicht möglich).
3. Verifikation per HTML-Meta-Tag oder HTML-Datei; Token von der Betreiberin
   bereitstellen lassen und erst dann committen/deployen.
4. Sitemap `https://mays-reportage.vercel.app/sitemap.xml` einreichen.
5. URL Inspection für `/` und `/reportagen/bakteriophagen`; Rendering prüfen.
6. Indexierung und Core Web Vitals beobachten; keine Ranking-Garantie.

## 6. Priorisierte Empfehlungen

1. Pre-Rendering/Edge-Metadata für Reportage-OG und statische Titles.
2. Edge-404 für unbekannte Slugs.
3. Search Console verifizieren und Sitemap einreichen.
4. CSP definieren und testen.
5. Reportagespezifische Social-Cards erzeugen.
6. Externe Quellenlinks periodisch prüfen.
