# MARKETING-03 — Organic Growth Launch

**Stand:** 15. November 2026
**Status:** **VORBEREITET — Veröffentlichung und Search-Console-Verifikation warten auf die Betreiberin.**
**Ziel:** Erste organische Sichtbarkeit für Mays-Reportagen und die Titelgeschichte
„Bakteriophagen gegen resistente Bakterien“.
**Grenzen:** Keine bezahlte Werbung, kein Tracking, keine automatischen Posts, keine
neuen Reportagen, keine Website-Änderungen in diesem Schritt.

---

## 1. Baseline

- Production: `304a6e3`, Deployment `dpl_H4ydqQxfKmQXypHt8LAecuqwYe1Q`, READY.
- `origin/main`: `304a6e3`.
- Lokaler HEAD vor MARKETING-03: `c51b388` (Release-Dokumentation, nicht gepusht).
- Arbeitsbaum clean; MARKETING-03 erzeugt ausschließlich Dokumentation.
- Produktionswebsite: https://mays-reportage.vercel.app/
- Titelgeschichte: https://mays-reportage.vercel.app/reportagen/bakteriophagen

## 2. Google Search Console — Vorbereitung

### Ausgangslage

In diesem Lauf wurde **keine Search-Console-Property angelegt oder verifiziert**. Es lag
kein autorisierter Google-Kontozugriff vor. Es werden daher **keine** Search-Console-
Daten, Indexierungszahlen, Impressionen oder Rankings behauptet.

### Empfohlene Property

**URL-Präfix-Property:** `https://mays-reportage.vercel.app/`

Die URL-Präfix-Property erfasst genau dieses Protokoll und diesen Host. Eine
Domain-Property würde eine DNS-Bestätigung verlangen; die DNS-Kontrolle über
`vercel.app` liegt nicht bei der Betreiberin. Deshalb ist das URL-Präfix der passende
und kleinste sinnvolle Zuschnitt.

Quelle: Google, „Website- oder Plattform-Property zur Search Console hinzufügen“,
https://support.google.com/webmasters/answer/34592?hl=de (abgerufen 15.11.2026).

### Eigentumsbestätigung — Optionen

| Methode | Aufwand | Bewertung |
| --- | --- | --- |
| HTML-Datei im Website-Root | Token-Datei von Google, Ablage in `public/`, Build + Deploy | **Empfohlen:** keine Änderung an App-Code oder Tracking; Datei muss ohne Login erreichbar sein. |
| HTML-Meta-Tag im `<head>` | Token in das HTML-Template, Build + Deploy | Möglich; betrifft aber das ausgelieferte HTML und erfordert einen Code-/Deploy-Schritt. |
| DNS-TXT/CNAME | DNS-Zugriff auf die Domain | Für die URL-Präfix-Property nicht erforderlich; für `vercel.app` nicht verfügbar. |
| Google Analytics/Tag Manager | Zusätzliches Tracking | **Nicht verwenden:** widerspricht der Tracking-freien Ausrichtung. |

**Erforderliche Betreiberaktion:** Google-Konto autorisieren, URL-Präfix-Property
anlegen, Bestätigungsdatei oder Meta-Token bereitstellen. Ohne diesen Token wird
nichts an der Website geändert und keine Verifikation behauptet.

**GSC-01-Stand (16.11.2026):** Die originale Datei
`google426c8ebaa607666d.html` liegt bytegenau unter
`public/google426c8ebaa607666d.html` (SHA-256
`4ddd9841d3de4229eeb61181ee9cca0004bb2311675abaeb11f4e9595d268691`) und ist
produktiv ausgeliefert. Zusätzlich liegt die zweite Datei
`googlea37c2005c0abca88.html` bytegenau unter `public/`; ihr Deploy steht noch aus.
Die Search Console ist weiterhin **nicht verifiziert**; Bestätigung, Sitemap-
Einreichung und URL-Prüfung stehen aus. Details:
`docs/reports/14-01-MAYS-REPORTAGEN-GSC-01-VERIFICATION.md` und
`docs/reports/15-01-MAYS-REPORTAGEN-GSC-02-VERIFICATION.md`.

Quelle: Google, „Meine Website-Inhaberschaft bestätigen“,
https://support.google.com/webmasters/answer/9008080?hl=de (abgerufen 15.11.2026).

### Sitemap und URL-Prüfung

Nach der Verifikation:

1. Im Sitemaps-Bericht `https://mays-reportage.vercel.app/sitemap.xml` einreichen.
2. URL-Prüftool für `https://mays-reportage.vercel.app/` öffnen.
3. URL-Prüftool für `https://mays-reportage.vercel.app/reportagen/bakteriophagen` öffnen.
4. Live-Test ausführen und den Status „URL ist für Google verfügbar“ prüfen.
5. Indexierung für beide URLs beantragen.
6. Danach „Seitenindexierung“ und „Leistung“ beobachten.

Wichtig: Eine Sitemap-Einreichung und eine Indexierungsanfrage sind Hinweise, keine
Garantie für Aufnahme oder Ranking. Die Property sammelt laut Google bereits vor der
Bestätigung erste Daten, aber Daten können mehrere Tage verzögert sein.

Quellen:
- Sitemap: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=de
- Sitemaps-Bericht: https://support.google.com/webmasters/answer/7451001?hl=de
- URL-Prüftool: https://support.google.com/webmasters/answer/9012289?hl=de

### Technischer SEO-Status (Live-Prüfung 15.11.2026)

| Prüfung | Ergebnis |
| --- | --- |
| `/` | 200, `index,follow`, Canonical `/`, JSON-LD `WebSite` |
| `/reportagen` | 200, `index,follow`, Canonical `/reportagen`, JSON-LD `CollectionPage` |
| `/reportagen/bakteriophagen` | 200, `index,follow`, Canonical Reportage, JSON-LD `NewsArticle` |
| `/ueber-uns` | 200, `index,follow`, Canonical korrekt, kein JSON-LD |
| `/impressum` | 200, `index,follow`, Canonical korrekt, kein JSON-LD |
| `/datenschutz` | 200, `index,follow`, Canonical korrekt, kein JSON-LD |
| `/bildnachweis` | 200, `index,follow`, Canonical korrekt, kein JSON-LD |
| `robots.txt` | 200, `User-agent: *`, `Allow: /`, Sitemap-Zeile |
| `sitemap.xml` | 200, 7 URLs |
| Googlebot-UA | 200 auf allen öffentlichen Routen, kein Block |
| Statische Social-Metadaten | 0 Fehler über Twitterbot/Facebook/LinkedIn/Standard-UA |
| Soft-404 | **Offen:** unbekannter Slug = HTTP 200, statisch `index,follow`, Canonical Home; JS setzt danach `noindex` |

**Bewertung:** Die sieben veröffentlichten Routen sind technisch indexierbar. Der
Soft-404 ist ein bekannter Restpunkt und wird in diesem Auftrag nicht umgebaut. Er kann
in der Search Console als Soft-404 oder Duplikat erscheinen. Eine Edge-404-Lösung oder
eine dokumentierte Akzeptanz ist eine separate Betreiberentscheidung.

## 3. Keyword-Recherche

### Methode und Grenzen

- Am 15.11.2026 wurden deutschsprachige Google-Autocomplete-Vorschläge
  (`hl=de`, `gl=de`) zu den Themenfeldern abgerufen.
- Zusätzlich wurden die vorhandenen, geprüften Quellen der Reportage sowie
  BfArM, RKI und WHO für die inhaltliche Einordnung herangezogen.
- **Keine Suchvolumina, CPCs, Keyword-Difficulty-Werte oder Wettbewerbsdaten.**
  Diese Werte wurden nicht mit einem autorisierten Tool gemessen und werden nicht
  geschätzt.
- Autocomplete ist dynamisch, orts- und sprachabhängig. Ein Vorschlag belegt eine
  beobachtete Formulierung, keine Nachfragemenge.
- Es werden keine medizinischen Behandlungen beworben und keine Behandlungswünsche
  mit Termin-/Kauf-CTA bedient.

### Beobachtete Autocomplete-Formulierungen

Beispiele, nicht vollständig, ohne Mengenangabe:

- `bakteriophagen therapie`, `bakteriophagen was ist das`, `bakteriophagen aufbau`,
  `bakteriophagen vermehrungszyklus`, `bakteriophagen therapie blasenentzündung`,
  `bakteriophagen georgien`, `bakteriophagen kaufen`
- `phagentherapie deutschland`, `phagentherapie uniklinik frankfurt`,
  `phagentherapie nachteile`, `phagentherapie georgien`,
  `phagentherapie krankenkasse`, `phagentherapie zulassung`,
  `phagentherapie kosten`, `phagentherapie belgien kosten`,
  `phagentherapie belgien kontakt`
- `antibiotikaresistenzen bedeutung`, `ursachen`, `deutschland`, `europa`,
  `weltweit`, `entstehung`, `statistik`
- `multiresistente bakterien krankenhaus`, `behandlung`, `definition`,
  `beispiele`, `im urin`

Für `bakteriophagen wasser` und `militärmedizin phagen` lieferte Autocomplete am
Prüftag keine Vorschläge. Das ist **kein** Beleg für fehlende Nachfrage; diese
Themen werden redaktionell aus der Reportage und den Quellen abgeleitet.

### Cluster und Intent

| Cluster | Beispielhafte Suchanfragen | Intent | Passender Inhalt | Redaktionelle Antwort |
| --- | --- | --- | --- | --- |
| Bakteriophagen-Grundlagen | was ist das, Aufbau, Vermehrungszyklus | informativ | `#biologie` | Viren, die Bakterien infizieren; spezifisch; lytischer Zyklus; keine Therapieempfehlung. |
| Phagentherapie allgemein | phagentherapie, Nachteile, Zulassung | medizinische Information | `#forschung`, `#zentren` | Kein zugelassenes Standardverfahren in DE/EU; individuelle Heilversuche; EMA-Entwurf und Leitlinie 2026 einordnen. |
| Antibiotikaresistenzen | Ursachen, Bedeutung, Deutschland, Statistik | informativ/medizinisch | `#bedrohung` | Resistenz ist natürliche Entwicklung, wird durch unsachgemäßen Einsatz beschleunigt; keine Heilversprechen. |
| Multiresistente Bakterien | Definition, Krankenhaus, Behandlung | medizinische Information | `#bedrohung` | Mehrfachresistenzen und Krankenhauskontext erklären; keine Selbstbehandlung. |
| Deutschland | phagentherapie deutschland, zugelassen, Kosten, Krankenkasse, Charité/Frankfurt | Behandlungs-/Zugangssuche | `#zentren` | Nur belegte Zentren nennen; individuelle Heilversuche; keine Kosten-/Erstattungszusage; Charité/Frankfurt nicht ohne Quelle ergänzen. |
| Belgien | phagentherapie belgien, Kosten, Kontakt | Behandlungs-/Zugangssuche | `#militaer` | Belgisches Magistralmodell seit 2016; Militärkrankenhaus-Fallserie 260/15; Zugang nur über ärztliche Prüfung, keine Garantie. |
| Wasser/Umwelt | bakteriophagen wasser, teichwasser, abwasser | informativ/wissenschaftlich | `#teichwasser` | Probenahme, Isolierung, Matching, Qualitätskontrolle; aus einer Probe wird kein Fertigmedikament. |
| Militärmedizin | phagentherapie bundeswehr, militärmedizin phagen | wissenschaftlich/medizinisch | `#militaer` | Brüssel und Bundeswehrkrankenhaus Berlin/PhagoFlow belegt; keine pauschale Militär-Sonderzulassung. |
| Studien/Evidenz | phagentherapie studie, studien, nebenwirkungen, erfahrungen | wissenschaftlich/medizinisch | `#forschung`, `#faktencheck` | Pirnay 2024: 100 Fälle, 77,2/61,3 % der dokumentierten Infektionen; retrospektiv, unkontrolliert; 15 unerwünschte Ereignisse; keine allgemeine Heilungswahrscheinlichkeit. |
| Kauf/Selbstmedikation/Off-Label | bakteriophagen kaufen, therapie blasenentzündung, krebs, hund | Behandlungs-/Kaufabsicht | Keine eigene Seite | Nicht mit Kauf-CTA bedienen. Auf fehlende Zulassung, ärztliche Prüfung und Risiken verweisen; keine neue dünne Content-Seite ohne Fachprüfung. |

### Quellen der Keyword-Einordnung

- Google Autocomplete, deutsch/Deutschland, 15.11.2026:
  `https://suggestqueries.google.com/complete/search?client=firefox&hl=de&gl=de&q=<query>`
- BfArM, Antibiotikaresistenzen/Bakteriophagen:
  https://www.bfarm.de/DE/Aktuelles/Themendossiers/Antibiotikaresistenzen/_node.html
- BfArM, Europäisches Arzneibuch, Phage therapy medicinal products:
  https://www.bfarm.de/DE/Arzneimittel/Zulassung/Zulassungsrelevante-Themen/Arzneibuch/News/europaeisches-arzneibuch-bakteriophagen.html
- RKI, FAQ Antibiotikaresistenz:
  https://www.rki.de/DE/Themen/Infektionskrankheiten/Antibiotikaresistenz/FAQ/FAQ-gesamt.html
- WHO/Europa, Antimicrobial resistance (19.09.2024):
  https://www.who.int/europe/news-room/fact-sheets/item/antimicrobial-resistance
- Willy & Bröcker, Bundesgesundheitsblatt 2025:
  https://doi.org/10.1007/s00103-025-04063-z
- Pirnay et al., Nature Microbiology 2024:
  https://doi.org/10.1038/s41564-024-01705-x
- Djebara et al., Viruses 2019:
  https://doi.org/10.3390/v11030265
- DZIF, Leitlinie 2026:
  https://www.dzif.de/de/gemeinsame-standards-fuer-den-einsatz-von-phagen-gegen-schwer-behandelbare-infektionen
- EMA, Qualitätsanforderungen für Phagenarzneimittel:
  https://www.ema.europa.eu/en/scientific-guidelines/quality-aspects-phage-therapy-medicinal-products
- G-BA Innovationsfonds, PhagoFlow:
  https://innovationsfonds.g-ba.de/projekte/ptmhbp.251
- Bundestag, Wissenschaftliche Dienste, Rechtliche Grundlagen der Phagentherapie (Januar 2025):
  https://www.bundestag.de/resource/blob/1038326/WD-8-086-24-pdf.pdf

### Nicht Ziel dieser Kampagne

- Keine Suchmaschinen-Anzeigen, keine bezahlten Platzierungen.
- Keine Keyword-Stuffing-Seiten, keine automatisch generierten FAQ-Seiten.
- Keine medizinische Beratung, keine Heilversprechen, keine Kosten-/Erstattungszusage.
- Keine Aussagen zu Suchvolumina oder Rankings ohne Messung.

## 4. Organische Kommunikationsstrategie

### Leitlinien

1. **Ein Beitrag pro Anlass, nicht pro Kanal gleichzeitig.** Keine Massenposts.
2. **Nur Kanäle mit eigener, autorisierter Präsenz.** Keine Fake-Accounts, keine
   automatisierten Crossposts.
3. **Transparenz:** Autorin/Redaktion nennen, Quelle verlinken, Unsicherheiten und
   KI-Illustration kennzeichnen.
4. **Keine Community-Werbung ohne Regelprüfung.** In Foren/Gruppen nur posten, wenn
   Selbstverlinkung erlaubt ist; keine Drive-by-Links, keine Wiederholung in vielen
   Gruppen, keine Votes/Reaktionen manipulieren.
5. **Keine Empfehlung von Behandlungen.** Bei Behandlungsfragen auf ärztliche Prüfung
   und die begrenzte Evidenz verweisen.
6. **Kein Tracking:** Keine UTM-Parameter mit Personenbezug, keine Pixel, keine
   Kurzlink-Dienste mit Profilbildung. Die Ziel-URL bleibt die normale Reportage-URL.

### Vier Wochen — Redaktionskalender

Start: Montag, 16. November 2026. Alle Zeiten sind redaktionelle Vorschläge; die
Betreiberin gibt jeden Beitrag vor Veröffentlichung frei.

| Woche | Tag | Kanal/Format | Inhalt | Text |
| --- | --- | --- | --- | --- |
| 1 | Mo 16.11. | Search Console (Betreiberin) | Property anlegen, Verifikation, Sitemap, URL-Prüfung | Kein Post |
| 1 | Di 17.11. | Eigene Kanäle/E-Mail, nur an bekannte Kontakte | Sachliche Veröffentlichungsankündigung | **Ankündigung** |
| 1 | Do 19.11. | LinkedIn | Die Entdeckung der Bakteriophagen | **LinkedIn 1** |
| 2 | Di 24.11. | LinkedIn | Was steckt im Teichwasser? | **LinkedIn 2** |
| 2 | Do 26.11. | LinkedIn-Artikel/langformat | Forschungsbeitrag zur Evidenz | **Forschungsbeitrag** |
| 3 | Di 01.12. | LinkedIn | Antibiotikaresistenzen verstehen | **LinkedIn 3** |
| 3 | Do 03.12. | Ein Kurzkanal (Mastodon/Bluesky/X) | Militärmedizin und Phagenforschung | **Teaser 1** |
| 4 | Di 08.12. | Ein Kurzkanal (Mastodon/Bluesky/X) | Was Studien tatsächlich zeigen | **Teaser 2** |
| 4 | Do 10.12. | Community/Reply | Fragen beantworten, Quellen nachreichen, keinen neuen Post erzwingen | Kein Pflichtpost |
| 4 | So 13.12. | Search Console/manuell | Erste monatliche Auswertung | Template |

**Puffer:** Wenn ein Beitrag keine Resonanz hat, wird er nicht wiederholt oder in
mehrere Gruppen kopiert. Stattdessen wird die Suchintention für den nächsten Monat
anhand der Search-Console-Daten geschärft.

### Kanalregeln

- **LinkedIn:** Drei unterschiedliche Beiträge, jeweils ein Link, kein Link in einem
  Kommentar „verstecken“, keine automatisierten Wiederholungen.
- **Mastodon/Bluesky/X:** Kurztexte nur auf einem tatsächlich vorhandenen, autorisierten
  Konto; Zeichenlimit und Bild-Alt-Text beachten.
- **Wissenschaftliche Communities/Foren:** Zuerst Regeln lesen; nur mit
  Redaktionsfreigabe; keine Werbung für Behandlungen; keine Massen-DMs.
- **Suchmaschinen:** Keine zusätzlichen Manipulationen. Search Console liefert die
  Messbasis; organische Rankings bleiben unversprochen.
- **Organische Verlinkungen:** Keine bezahlten Links, keine Linktausch-Netzwerke.
  Zitierte Institutionen nicht ungefragt markieren oder zu Backlinks drängen.

## 5. Social Preview — technischer Stand

Geprüft am 15.11.2026 auf der Produktionsdomain:

| Feld | Wert |
| --- | --- |
| Titel | „Bakteriophagen gegen resistente Bakterien — Mays-Reportagen“ |
| OG-Description | „Was hinter Teichwasser, Phagentherapie und der militärischen Anwendung in Europa steckt.“ |
| OG-Bild | `https://mays-reportage.vercel.app/media/phagen/og-phagen.jpg` |
| Bildauflösung | **1200 × 630 px**, JPEG, 160.318 Bytes |
| Bild-Alt | KI-generierte Illustration; ausdrücklich keine Mikroskopaufnahme |
| Canonical | `https://mays-reportage.vercel.app/reportagen/bakteriophagen` |
| Twitter Card | `summary_large_image`, Titel/Description/Bild gesetzt |
| No-JS-Abruf | 200 bei Twitterbot, Facebook, LinkedIn und Standard-UA |

**Technische Metadaten-Verifikation:** bestanden.

**Tatsächliche Plattformdarstellung:** **nicht getestet.** Es lagen keine
autorisierten LinkedIn-/X-/Facebook-/Slack-Zugänge oder -Werkzeuge vor. Es wird
nicht behauptet, dass eine bestimmte Vorschau, Bildbeschneidung oder Cache-Version
auf einer Plattform erscheint. Nach Autorisierung können LinkedIn Post Inspector,
Facebook Sharing Debugger oder ein eigener Slack/Discord-Workspace genutzt werden;
Plattform-Caches können verzögert sein.

## 6. Messkonzept

**Primärquelle:** Google Search Console, Property `https://mays-reportage.vercel.app/`.
**Keine** Google Analytics, keine Cookies, keine zusätzlichen Tracking-Skripte.

Kennzahlen:

1. **Indexierte Seiten** — Bericht „Seitenindexierung“, nicht mit Sitemap-URL-Zahl
   verwechseln.
2. **Impressionen** — Einblendungen in Google-Suchergebnissen.
3. **Klicks** — Klicks aus Google-Suchergebnissen.
4. **CTR** — Klicks ÷ Impressionen.
5. **Durchschnittliche Position** — nur als Durchschnitt, keine Ranggarantie.
6. **Suchanfragen** — Queries-Dimension, insbesondere nicht-markenbezogen.
7. **Sichtbarkeit der Reportage** — Seitenfilter
   „Enthält `/reportagen/bakteriophagen`“; Impressionen, Klicks, CTR, Position.

Die monatliche Vorlage liegt in `docs/MARKETING-03-MONTHLY-MEASUREMENT.md`.

**Baseline:** Ohne verifizierte Property gibt es in diesem Lauf **keine** Search-
Console-Werte. Die erste Zeile bleibt `n/a`, nicht `0`. Erste aussagekräftige Daten
erst nach Verifikation und mehreren Tagen Datenerfassung.

## 7. Risiken und Entscheidungen

- **Search Console nicht verifiziert:** blockiert belastbare Messung, nicht die
  technische Indexierbarkeit.
- **Soft-404:** unbekannte Slugs liefern 200 und statisch `index,follow`; JS setzt
  `noindex`. Dokumentiert, nicht in diesem Auftrag behoben.
- **Keine Volumendaten:** Keyword-Priorisierung bleibt qualitativ; keine erfundenen
  Suchvolumina.
- **Behandlungssuche:** Hohe Sensibilität bei „kaufen“, „Kosten“, „Klinik“,
  „Blasenentzündung“, „Krebs“. Keine Werbe- oder Behandlungsversprechen.
- **Externe Vorschauen:** technische Metadaten sind korrekt, Plattformdarstellung
  bleibt ungeprüft.
- **Bildrechte:** KI-Illustration bleibt als solche gekennzeichnet; Rechte Dritter
  bleiben redaktioneller Restpunkt.
- **Keine Ranking-/Indexierungsgarantie.**

## 8. Offene Betreiberaktionen

1. Google-Konto für Search Console autorisieren und URL-Präfix-Property anlegen.
2. Verifikationsdatei oder Meta-Token bereitstellen; separaten Deploy freigeben.
3. Property verifizieren, `sitemap.xml` einreichen, Startseite und Reportage per
   URL-Prüftool testen.
4. Alle sieben Texte redaktionell freigeben; Kanäle und Konten bestätigen.
5. Keine automatisierten Posts; Veröffentlichung manuell durch die Betreiberin.
6. Entscheidung zu Soft-404, CSP und Bildrechten Dritter treffen.
7. Nach vier Wochen die monatliche Auswertung ausfüllen.

## 9. Quellen und Stand

Alle inhaltlichen Aussagen der Entwürfe stützen sich auf die 14 geprüften Quellen der
Reportage und den Quellen-Audit vom 14.11.2026. Ergänzend für die Suchintention:
BfArM, RKI, WHO/Europa und die Search-Console-Dokumentation (siehe Abschnitte 2 und 3).

**Keine Suchvolumina, keine Rankingdaten, keine Plattform-Preview-Behauptung.**
