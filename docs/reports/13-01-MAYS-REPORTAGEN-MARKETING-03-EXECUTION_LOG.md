# MARKETING-03 — Organic Growth Launch — Execution Log

## 1. Status

**YELLOW — PLANUNG UND ASSETS FERTIG; SEARCH CONSOLE UND VERÖFFENTLICHUNG
WARTEN AUF DIE BETREIBERIN.**

Keine Verifikation der Search Console, keine Veröffentlichung, kein Push, kein
Deployment und keine automatischen Posts.

## 2. Audit-Zeitpunkt

15. November 2026.

## 3. Git-Branch und HEAD

- Branch `main`, Upstream `origin/main`.
- `origin/main` und Production: `304a6e3`.
- Lokaler HEAD vor diesem Auftrag: `c51b388` (Release-Dokumentation, nicht gepusht).
- Lokal 1 Commit vor `origin/main`; Arbeitsbaum zu Beginn clean.
- Dieser Report und die Marketingdateien folgen als lokaler Doku-Commit.

## 4. Audit-Scope

- Baseline und Governance prüfen.
- Search-Console-Vorbereitung und technische SEO-Signale der Produktion prüfen.
- Deutschsprachige Keyword-Recherche ohne erfundene Volumina.
- Vierwöchigen organischen Redaktionsplan erstellen.
- Sieben veröffentlichungsfertige Textentwürfe erstellen.
- Social-Preview-Metadaten technisch prüfen; tatsächliche Plattformdarstellung
  ausdrücklich nicht behaupten.
- Datenschutzfreundliche Messvorlage erstellen.
- Keine Website-Änderungen, keine neuen Reportagen, kein CMS, kein Tracking.

## 5. Abgeschlossene Audit-Abschnitte

1. Git- und Produktionsbaseline verifiziert.
2. AGENTS.md, Auditindex, Marketingplan, SEO-Audit und Quellen-Audit gelesen.
3. Produktionsrouten, robots.txt, Sitemap und Canonicals geprüft.
4. Indexierbarkeit, Noindex-Verhalten und strukturierte Daten geprüft.
5. Google-Autocomplete-Signale und offizielle Quellen ausgewertet.
6. Suchintentionen klassifiziert; keine Volumendaten erfunden.
7. Vierwochenkalender und Kanalregeln erstellt.
8. Sieben Textentwürfe erstellt und Quellenbezug dokumentiert.
9. Technische Social-Metadaten und OG-Bild geprüft.
10. Monatliche Search-Console-Vorlage erstellt.
11. Offene Betreiberaktionen dokumentiert.

## 6. Tatsächliche Findings

### Search Console

- In diesem Lauf **keine Property verifiziert** und **kein Google-Kontozugriff**
  verwendet.
- Es gibt daher **keine** Search-Console-Impressionen, Klicks, CTR, Positionen oder
  Indexierungszahlen in diesem Bericht.
- Empfohlene Property: URL-Präfix `https://mays-reportage.vercel.app/`.
- Verifikation per HTML-Datei im Root ist die kleinste Lösung; HTML-Meta-Tag ist
  möglich. DNS ist für die URL-Präfix-Property nicht nötig und für `vercel.app`
  nicht verfügbar.
- Sitemap-Einreichung und URL-Prüfung sind vorbereitet, aber nicht ausgeführt.
- Ein Sitemap-/Indexierungsantrag ist keine Garantie für Indexierung oder Ranking.

### Technische SEO-Signale

- Alle sieben öffentlichen Routen: HTTP 200.
- Öffentliche Seiten: `index,follow`, korrekte absolute Canonicals.
- `robots.txt`: 200, `User-agent: *`, `Allow: /`, Sitemap-Zeile.
- `sitemap.xml`: 200, 7 URLs.
- Googlebot-UA: 200 auf allen öffentlichen Routen.
- JSON-LD: Home `WebSite`, Archiv `CollectionPage`, Reportage `NewsArticle`;
  Informations-/Rechtstexte ohne JSON-LD.
- Social-/No-JS-Metadaten: 0 Fehler über Twitterbot, Facebook, LinkedIn und
  Standard-UA.
- **Soft-404:** unbekannter Slug `/reportagen/gibt-es-nicht` liefert HTTP 200,
  statisch `index,follow` und Canonical Home; erst nach JavaScript `noindex,follow`
  und 404-UI. Das ist ein bekannter Restpunkt und wurde nicht umgebaut.

### Keyword-Recherche

- Google-Autocomplete (de/DE, 15.11.2026) liefert u. a.:
  - `bakteriophagen therapie`, `bakteriophagen was ist das`,
    `bakteriophagen aufbau`, `bakteriophagen vermehrungszyklus`,
    `bakteriophagen therapie blasenentzündung`, `bakteriophagen kaufen`
  - `phagentherapie deutschland`, `phagentherapie uniklinik frankfurt`,
    `phagentherapie nachteile`, `phagentherapie krankenkasse`,
    `phagentherapie zulassung`, `phagentherapie kosten`,
    `phagentherapie belgien kosten`, `phagentherapie belgien kontakt`
  - `antibiotikaresistenzen ursachen`, `bedeutung`, `deutschland`, `europa`,
    `weltweit`, `statistik`
  - `multiresistente bakterien krankenhaus`, `behandlung`, `definition`,
    `beispiele`, `im urin`
- Für Wasser und Militärmedizin lieferte Autocomplete am Prüftag keine Vorschläge.
  Das ist kein Beleg für fehlende Nachfrage; die Cluster wurden redaktionell aus der
  Reportage abgeleitet.
- **Keine Suchvolumina, CPCs, Difficulty-Werte oder Wettbewerbsdaten.** Diese wurden
  nicht gemessen und nicht geschätzt.
- Intent-Kategorien: informativ, wissenschaftlich, medizinische Information,
  Behandlung-/Zugangssuche. Treatment-/Kaufabsichten werden nicht mit Werbe- oder
  Heilversprechen bedient.

### Kampagne

- Vierwochenkalender 16.11.–13.12.2026 mit maximal zwei Beiträgen pro Woche.
- Drei differenzierte LinkedIn-Beiträge:
  - Entdeckung/Historischer Kontext
  - Teichwasser/Methodik
  - Antibiotikaresistenzen/Einordnung
- Zwei Kurzteaser: Militärmedizin und Studienevidenz.
- Ein längerer Forschungsbeitrag zur Pirnay-Fallserie und Evidenzgrenze.
- Ein sachlicher Ankündigungstext.
- Alle Texte unter derselben Reportage-URL; keine UTM-/Kurzlink-Profile.
- Keine automatischen Posts, keine Massen-DMs, keine bezahlte Reichweite.
- Texte enthalten Quellenbezug, KI-Bildkennzeichnung und medizinische
  Zurückhaltung; der Forschungsbeitrag enthält den Hinweis „keine
  Therapieempfehlung“.

### Social Preview

Technisch geprüft:

- Titel: „Bakteriophagen gegen resistente Bakterien — Mays-Reportagen“
- OG-Description: Teaser der Reportage
- OG-Bild: absolute URL, **1200 × 630 px**, JPEG, 160.318 Bytes
- Alt-Text: KI-generierte Illustration, ausdrücklich keine Mikroskopaufnahme
- Canonical: Reportage-URL
- Twitter Card: `summary_large_image` mit Titel, Description und Bild

**Nicht geprüft:** tatsächliche Darstellung auf LinkedIn/X/Facebook/Slack. Es lagen
keine autorisierten Plattformkonten oder -werkzeuge vor. Technische Metadaten sind
kein Beweis für eine bestimmte Plattform-Vorschau oder deren Cache.

### Messung

- Primärquelle: Search Console.
- Kennzahlen: indexierte Seiten, Impressionen, Klicks, CTR, durchschnittliche
  Position, Suchanfragen, Reportage-Sichtbarkeit per Seitenfilter.
- Monatliche Vorlage: `docs/MARKETING-03-MONTHLY-MEASUREMENT.md`.
- Keine Google Analytics, keine Cookies, keine zusätzlichen Tracking-Skripte.
- Baseline bleibt `n/a`, bis die Property verifiziert ist; keine Nullwerte
  erfinden.

## 7. Evidenz / Dateireferenzen

- `docs/MARKETING-03-ORGANIC-GROWTH-PLAN.md` — Strategie, Search Console,
  Keyword-Cluster, Kalender, Kanalregeln, Preview, Messkonzept.
- `docs/MARKETING-03-SOCIAL-DRAFTS.md` — sieben fertige Texte mit Quellenbezug.
- `docs/MARKETING-03-MONTHLY-MEASUREMENT.md` — monatliche Vorlage.
- `docs/MARKETING-02-03-PLAN.md` — Statusverweis auf MARKETING-03.
- `AI_AUDITINDEX.md` — neuer Eintrag.
- `docs/reports/13-01-MAYS-REPORTAGEN-MARKETING-03-EXECUTION_LOG.md` — dieser Report.

Quellen für Keyword-/Intent-Einordnung:

- Google Autocomplete, de/DE, 15.11.2026:
  `https://suggestqueries.google.com/complete/search?client=firefox&hl=de&gl=de&q=<query>`
- Google Search Console Property:
  https://support.google.com/webmasters/answer/34592?hl=de
- Google Inhaberschaft:
  https://support.google.com/webmasters/answer/9008080?hl=de
- Google Sitemap:
  https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=de
- Google URL-Prüftool:
  https://support.google.com/webmasters/answer/9012289?hl=de
- Google Leistungsbericht:
  https://support.google.com/webmasters/answer/7576553?hl=de
- BfArM, Antibiotikaresistenzen/Phagen:
  https://www.bfarm.de/DE/Aktuelles/Themendossiers/Antibiotikaresistenzen/_node.html
- RKI, FAQ Antibiotikaresistenz:
  https://www.rki.de/DE/Themen/Infektionskrankheiten/Antibiotikaresistenz/FAQ/FAQ-gesamt.html
- WHO/Europa, Antimicrobial resistance:
  https://www.who.int/europe/news-room/fact-sheets/item/antimicrobial-resistance
- Willy & Bröcker 2025: https://doi.org/10.1007/s00103-025-04063-z
- Pirnay et al. 2024: https://doi.org/10.1038/s41564-024-01705-x
- Djebara et al. 2019: https://doi.org/10.3390/v11030265
- DZIF-Leitlinie 2026:
  https://www.dzif.de/de/gemeinsame-standards-fuer-den-einsatz-von-phagen-gegen-schwer-behandelbare-infektionen
- EMA-Entwurf:
  https://www.ema.europa.eu/en/scientific-guidelines/quality-aspects-phage-therapy-medicinal-products
- G-BA PhagoFlow: https://innovationsfonds.g-ba.de/projekte/ptmhbp.251
- Bundestag, Rechtliche Grundlagen:
  https://www.bundestag.de/resource/blob/1038326/WD-8-086-24-pdf.pdf

## 8. Klassifikation

**YELLOW.** Die organische Kampagne ist vollständig vorbereitet und technisch
prüfbar. Die Search-Console-Verifikation und jede Veröffentlichung hängen von
Betreiberfreigaben und autorisierten Konten ab. Es gibt keine Ranking- oder
Indexierungsgarantie.

## 9. Terraform

Keine Terraform-Prüfung ausgeführt: Im Repository existiert keine
Terraform-/IaC-Konfiguration. Keine Cloud-Infrastruktur geändert.

## 10. Git-Status

- Vor MARKETING-03: `main` 1 Commit vor `origin/main`, clean.
- `origin/main` und Production unverändert `304a6e3`.
- Neue Dateien sind ausschließlich Dokumentation.
- Nach diesem Report: lokaler Doku-Commit; kein Push, Merge oder Deployment.
- Keine Änderungen an anderen Projekten.

## 11. Geänderte Dateien

- Neu: `docs/MARKETING-03-ORGANIC-GROWTH-PLAN.md`
- Neu: `docs/MARKETING-03-SOCIAL-DRAFTS.md`
- Neu: `docs/MARKETING-03-MONTHLY-MEASUREMENT.md`
- Neu: `docs/reports/13-01-MAYS-REPORTAGEN-MARKETING-03-EXECUTION_LOG.md`
- Geändert: `docs/MARKETING-02-03-PLAN.md`, `AI_AUDITINDEX.md`
- Keine Änderungen an App-Code, Inhalten, Rechtstexten, `vercel.json`, Sitemap,
  Tests oder Produktionskonfiguration.

## 12. Bestätigung „keine Dateien geändert“

Nicht zutreffend: Es wurden ausschließlich Marketing-/Auditdokumente geändert.
Am Anwendungscode und an der Produktionswebsite wurde nichts geändert.

## 13. Offene Fragen

1. Welches Google-Konto und welche Property dürfen verwendet werden?
2. HTML-Datei oder Meta-Tag als Verifikationsmethode?
3. Ist ein zusätzlicher Deploy für die Verifikationsdatei freigegeben?
4. Welche Social-Konten sind tatsächlich vorhanden und autorisiert?
5. Werden die Texte vor Veröffentlichung fachlich/redaktionell geprüft?
6. Soft-404: Edge-404 oder dokumentierte Akzeptanz?
7. Sollen später belegte Zentren-/Kostenfragen als eigene Inhalte folgen? Dafür
   wären aktuelle Primärquellen und eine medizinische/redaktionelle Prüfung nötig.

## 14. Risiken

- Ohne Search-Console-Verifikation keine belastbare organische Messung.
- Ohne Suchvolumendaten keine quantitative Keyword-Priorisierung.
- Soft-404 kann Indexierungsberichte verunreinigen.
- Falsche oder veraltete Zentren-/Kostenangaben wären bei Behandlungssuche besonders
  riskant; deshalb keine unbelegten Aussagen.
- Plattform-Vorschauen können trotz korrekter Metadaten anders aussehen oder
  verzögert cachen.
- Keine Ranking-, Indexierungs- oder Reichweitengarantie.
- Keine medizinische Beratung; keine Heilversprechen.
- KI-Bildrechte Dritter bleiben ein redaktioneller Restpunkt.

## 15. Empfohlene nächste Aktionen

1. Betreiberin autorisiert Search Console und stellt Verifikationstoken bereit.
2. Verifikationsdatei separat deployen; Property bestätigen.
3. Sitemap einreichen; Startseite und Reportage per URL-Prüftool testen.
4. Texte und Kanäle freigeben; erste Welle manuell veröffentlichen.
5. Nach vier Wochen monatliche Auswertung ausfüllen.
6. Soft-404- und CSP-Entscheidung separat behandeln.
7. Keine bezahlte Werbung, kein Tracking, keine automatischen Posts.

## 16. Resume-Punkt

Alle Marketing-03-Unterlagen liegen lokal vor. Nächster externer Schritt ist die
Search-Console-Autorisierung durch die Betreiberin. Produktion bleibt unverändert
auf `304a6e3`; der lokale Doku-Commit wird nicht gepusht.
