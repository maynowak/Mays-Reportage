# MARKETING-03 — Monatliche Search-Console-Auswertung

**Zweck:** Datenschutzfreundliche, monatliche Auswertung der organischen Sichtbarkeit.
**Primärquelle:** Google Search Console, Property `https://mays-reportage.vercel.app/`.
**Nicht verwenden:** Google Analytics, Cookies, zusätzliche Tracking-Skripte,
personenbezogene Profile.

---

## 1. Baseline

| Feld | Wert |
| --- | --- |
| Erster Berichtsmonat | noch offen |
| Property verifiziert | **nein** (in diesem Lauf nicht verifiziert) |
| Sitemap eingereicht | **nein bestätigt** |
| Search-Console-Daten | **keine** |
| Baseline-Status | `n/a` — nicht `0` |

Die erste Zeile wird erst nach Verifikation und mehreren Tagen Datenerfassung
ausgefüllt. Fehlende Werte bleiben `n/a`; sie werden nicht als Null interpretiert.

---

## 2. Kennzahlen und Definitionen

| Kennzahl | Quelle | Definition |
| --- | --- | --- |
| Indexierte Seiten | Bericht „Seitenindexierung“ | Von Google indexierte Seiten; nicht gleich Sitemap-URL-Zahl. |
| Impressionen | Bericht „Leistung“ | Einblendungen der Website in Google-Suchergebnissen. |
| Klicks | Bericht „Leistung“ | Klicks aus Google-Suchergebnissen. |
| CTR | Berechnet | `Klicks ÷ Impressionen`; als Prozentwert darstellen. |
| Durchschnittliche Position | Bericht „Leistung“ | Durchschnittliche Position; keine Ranggarantie und kein „Visibility Score“. |
| Suchanfragen | Bericht „Leistung“, Dimension „Suchanfragen“ | Query-Liste; nicht-markenbezogene Queries separat beobachten. |
| Reportage-Sichtbarkeit | Bericht „Leistung“, Seitenfilter | Filter: Seite enthält `/reportagen/bakteriophagen`. |
| Sitemap-Status | Bericht „Sitemaps“ | 7 URLs, Verarbeitung, Fehler. |
| URL-Status | URL-Prüftool | Startseite und Reportage: indexierbar, Canonical, letztes Crawling. |

Google dokumentiert Klicks, Impressionen, CTR und durchschnittliche Position im
Leistungsbericht:
https://support.google.com/webmasters/answer/7576553?hl=de

---

## 3. Monatliche Vorlage

**Berichtsmonat:** `JJJJ-MM`
**Datenstand:** `TT.MM.JJJJ`
**Property:** `https://mays-reportage.vercel.app/`
**Verifiziert:** `ja/nein`
**Sitemap eingereicht:** `ja/nein`

### Gesamtwerte

| Kennzahl | Vormonat | Berichtsmonat | Veränderung | Anmerkung |
| --- | ---: | ---: | ---: | --- |
| Indexierte Seiten |  |  |  |  |
| Impressionen |  |  |  |  |
| Klicks |  |  |  |  |
| CTR |  |  |  |  |
| Durchschnittliche Position |  |  |  |  |

### Suchanfragen — Top 10

| Suchanfrage | Impressionen | Klicks | CTR | Position | Markenbezug? |
| --- | ---: | ---: | ---: | ---: | --- |
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |

### Seiten — Top 10

| Seite | Impressionen | Klicks | CTR | Position |
| --- | ---: | ---: | ---: | ---: |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

### Titelgeschichte separat

Filter: Seite enthält `/reportagen/bakteriophagen`

| Kennzahl | Vormonat | Berichtsmonat | Anmerkung |
| --- | ---: | ---: | --- |
| Impressionen |  |  |  |
| Klicks |  |  |  |
| CTR |  |  |  |
| Durchschnittliche Position |  |  |  |
| Top-Query 1 |  |  |  |
| Top-Query 2 |  |  |  |
| Top-Query 3 |  |  |  |

### Qualität und Technik

| Prüfung | Status | Anmerkung |
| --- | --- | --- |
| Sitemap 7 URLs |  |  |
| Startseite indexierbar |  |  |
| Reportage indexierbar |  |  |
| Canonical korrekt |  |  |
| Soft-404 unbekannter Slug |  |  |
| Strukturierte Daten erkannt |  |  |
| Core Web Vitals |  |  |

### Redaktionelle Einordnung

**Was ist neu?**
-

**Welche Suchanfragen zeigen echtes Interesse?**
-

**Welche Seiten/Queries verlieren?**
-

**Welche Maßnahme folgt daraus?** (maximal eine pro Monat)
-

**Was wird ausdrücklich nicht getan?**
- Keine Keyword-Stuffing-Seiten, keine Kauf-/Behandlungsversprechen, keine
  zusätzlichen Tracking-Skripte.

---

## 4. Monatsroutine

1. Am 2.–3. Werktag des Folgemonats Daten für den abgeschlossenen Kalendermonat
   abrufen (Search Console kann verzögert sein).
2. Gesamtwerte und Top-Queries/Seiten exportieren.
3. Reportage-Filter setzen und separat dokumentieren.
4. Indexierungs- und Sitemap-Status prüfen.
5. Auffälligkeiten ohne Kausalitätsbehauptung notieren.
6. Genau eine nächste Maßnahme festlegen.
7. Keine personenbezogenen Daten, keine Nutzerprofile, keine Cookies ergänzen.

## 5. Interpretationsregeln

- Search-Console-Daten sind aggregiert und können verzögert, gefiltert oder aus
  Datenschutzgründen unvollständig sein.
- Eine Impression ist keine Garantie für eine Sichtung; „URL ist auf Google“ heißt
  nicht, dass die Seite für eine bestimmte Query erscheint.
- Ein Positionswert ist ein Durchschnitt, kein Ranking-Versprechen.
- Bei sehr kleinen Zahlen sind Prozentveränderungen wenig aussagekräftig; absolute
  Werte und die tatsächlichen Queries nennen.
- Marken- und Nicht-Marken-Queries getrennt betrachten; Markenbegriffe wie „Mays“,
  „Mays-Reportagen“ nicht als allgemeine Nachfrage interpretieren.
- Keine Aussagen über Umsatz, Conversions oder Werbe-ROI: Es gibt kein Tracking und
  keine kommerzielle Kampagne.
