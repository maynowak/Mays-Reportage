import type { Reportage } from './types';

const sources = [
  {
    id: 'S1',
    label: 'Deutschlandfunk, 23.12.2018 – „Die Wiederentdeckung“ (Teichwasser-Szene)',
    url: 'https://www.deutschlandfunk.de/die-wiederentdeckung-alte-wirkstoffe-gegen-neue-resistenzen-100.html',
  },
  {
    id: 'S2',
    label: 'Djebara et al., Viruses 2019;11(3):265 – Militärkrankenhaus Brüssel, 260 Anfragen',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6466067/',
  },
  {
    id: 'S3',
    label: 'Pirnay et al., Nature Microbiology 2024 – 100 konsekutive Fälle, 35 Kliniken',
    url: 'https://www.nature.com/articles/s41564-024-01705-x',
  },
  {
    id: 'S4',
    label: 'Würstle et al., Nature Medicine, 21.09.2026 – Konsensleitlinie',
    url: 'https://www.nature.com/articles/s41591-026-04654-6',
  },
  {
    id: 'S5',
    label: 'EMA – Qualitätsanforderungen für Phagenarzneimittel (Entwurf, Konsultation bis 30.04.2026)',
    url: 'https://www.ema.europa.eu/en/scientific-guidelines/quality-aspects-phage-therapy-medicinal-products',
  },
  {
    id: 'S6',
    label: 'G-BA Innovationsfonds – PhagoFlow, Beschluss vom 20.06.2025',
    url: 'https://innovationsfonds.g-ba.de/projekte/ptmhbp.251',
  },
  {
    id: 'S7',
    label: 'Hirszfeld-Institut, Polen – Phage Therapy Unit (seit 2005)',
    url: 'https://hirszfeld.pl/en/structure/iitd-pan-medical-center/phage-therapy-unit/',
  },
  {
    id: 'S8',
    label: 'Phage Center Regensburg – Patienteninformationen',
    url: 'https://phagecenter-regensburg.de/de/unterstuetzung.html',
  },
  {
    id: 'S9',
    label: 'ARD alpha-doku – „Was ist gut an Viren?“',
    url: 'https://www.ardmediathek.de/video/alpha-doku/was-ist-gut-an-viren/ard-alpha/Y3JpZDovL2JyLmRlL3ZpZGVvLzg2YzVhMmNhLWIyN2ItNDM1MS1hNzBiLTlhY2Q2YzcxYjQ1Zg',
  },
  {
    id: 'S10',
    label: 'ARTE Re: – „Hoffnung auf Heilung – Phagentherapie in Georgien“ (TV-Premiere 28.09.2022)',
    url: 'https://www.fernsehserien.de/arte-re/folgen/938-hoffnung-auf-heilung-phagentherapie-in-georgien-1583573',
  },
  {
    id: 'S11',
    label: 'Bundestag, Wissenschaftliche Dienste – Rechtliche Grundlagen der Phagentherapie (Sachstand, Januar 2025)',
    url: 'https://www.bundestag.de/resource/blob/1038326/WD-8-086-24-pdf.pdf',
  },
  {
    id: 'S12',
    label: 'Deutsches Zentrum für Infektionsforschung – Leitlinie 2026',
    url: 'https://www.dzif.de/de/gemeinsame-standards-fuer-den-einsatz-von-phagen-gegen-schwer-behandelbare-infektionen',
  },
  {
    id: 'S13',
    label: 'Deutschlandfunk, 19.01.2022 – „Mit Viren gegen Bakterien“',
    url: 'https://www.deutschlandfunk.de/bakteriophagen-killen-viren-100.html',
  },
  {
    id: 'S14',
    label: 'Willy & Bröcker, Bundesgesundheitsblatt 2025 – Phagentherapie in Deutschland, Update 2025',
    url: 'https://link.springer.com/article/10.1007/s00103-025-04063-z',
  },
];

export const phagenReportage: Reportage = {
  slug: 'bakteriophagen',
  status: 'published',
  title: 'Bakteriophagen gegen resistente Bakterien',
  eyebrow: 'Die spektakuläre Reportage',
  headlineLead: 'Bacteria can be',
  headlineAccent: 'fought.',
  subheadline: 'Wenn Antibiotika an ihre Grenzen kommen, beginnt eine neue Geschichte.',
  teaser:
    'Was hinter Teichwasser, Phagentherapie und der militärischen Anwendung in Europa steckt.',
  readingTime: '12 Min',
  researchDate: '14. November 2026',
  publishedAt: '2026-11-14',
  priority: 100,
  tags: ['Medizin', 'Mikrobiologie', 'Antibiotikaresistenzen'],
  accent: { primary: '#3fe8ff', secondary: '#ff4fa3', warm: '#ffb02e' },
  hero: {
    src: '/media/phagen/phagen-hero-1280.webp',
    srcSet:
      '/media/phagen/phagen-hero-640.webp 640w, /media/phagen/phagen-hero-960.webp 960w, /media/phagen/phagen-hero-1280.webp 1280w, /media/phagen/phagen-hero-1672.webp 1672w',
    sizes: '100vw',
    width: 1672,
    height: 941,
    alt: 'KI-generierte Illustration: Eine erschrockene Frau links blickt auf eine riesige, pink leuchtende Bakterie rechts, die von mehreren leuchtenden Bakteriophagen angegriffen wird.',
    ogImage: '/media/phagen/og-phagen.jpg',
    caption:
      'KI-generierte Illustration: Bakteriophagen attackieren ein resistentes Bakterium. Keine Mikroskopaufnahme. Bild: Mays-Reportagen.',
  },
  facts: [
    { value: '> 100', label: 'Jahre Forschung' },
    { value: '77,2 %', label: 'klinische Verbesserung', note: 'der dokumentierten Infektionen' },
    { value: '61,3 %', label: 'Erreger nicht mehr nachweisbar', note: 'der dokumentierten Infektionen' },
    { value: '35', label: 'Kliniken in 12 Ländern', note: 'Fallserie 2008–2022' },
  ],
  sections: [
    {
      id: 'biologie',
      kicker: '01 · Biologie',
      title: 'Die Biologie hinter der Phagentherapie',
      paragraphs: [
        'Bakteriophagen sind Viren, keine Würmer. Sie docken an geeignete Bakterien an und können sich in deren Zellen vermehren. Bei lytischen Phagen wird das Wirtsbakterium dabei zerstört. Sie wirken meist sehr spezifisch gegen bestimmte Bakterienarten oder sogar einzelne Stämme.',
      ],
      blocks: [
        {
          kind: 'callout',
          tone: 'info',
          title: 'Warum die Suche wieder aktuell ist',
          text: 'Die Entdeckung des Penicillins war ein Wendepunkt der Medizin. Doch der Erfolg gegen Bakterien ist nicht von Dauer: Resistenzen machen die einstigen Wunderwaffen stumpf. Die Deutschlandfunk-Reportage beschreibt genau diese Ausgangslage – und warum man sich wieder auf Bakteriophagen besinnt.',
          source: 'S1',
        },
        {
          kind: 'steps',
          title: 'Wie eine individuell angepasste Behandlung abläuft',
          items: [
            {
              title: 'Erreger identifizieren',
              text: 'Ärztinnen und Ärzte gewinnen eine klinische Probe und bestimmen das krankheitsverursachende Bakterium.',
            },
            {
              title: 'Passende Phagen suchen',
              text: 'Eine Phagenbank oder ein Speziallabor prüft, welche Phagen diesen Bakterienstamm angreifen.',
            },
            {
              title: 'Aufbereiten und prüfen',
              text: 'Geeignete Phagen werden unter Qualitätskontrolle vermehrt und von unerwünschten Bestandteilen gereinigt.',
            },
            {
              title: 'Gezielt anwenden',
              text: 'Die behandelnde Klinik entscheidet über Form, Dosis, mögliche Kombination mit Antibiotika und medizinische Überwachung.',
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'fact',
          title: 'Die Teichwasser-Spur: konkret belegt',
          text: 'In der Deutschlandfunk-Reportage „Die Wiederentdeckung“ (23.12.2018) sammelt Mikrobiologin Christine Rohde mit einem Reporter Teichwasser auf einem Institutsgelände, um neue Phagen zu isolieren. Sie sagt dort: „Wir schöpfen jetzt mal einen Liter Teichwasser!“',
          source: 'S1',
        },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'Was die Wasserprobe bedeutet',
          text: 'Phagen können aus Teichen, Flüssen, Kläranlagen und klinischen Abwässern isoliert werden. Teichwasser selbst darf nicht als Therapie verwendet werden. Für den Einsatz am Menschen sind gezielte Isolierung, Erreger-Matching, Herstellung, Reinheitsprüfung und ärztliche Verantwortung erforderlich. Es ist auch nicht belegt, dass ein Patient in der gesuchten Dokumentation persönlich Teichwasser mitgebracht hat. Wichtig: Für die Wahl der Phagen ist der nachgewiesene Bakterienstamm ausschlaggebend – nicht der Wohnort des Patienten.',
          source: 'S1, S4, S8',
        },
      ],
    },
    {
      id: 'militaer',
      kicker: '02 · Militär & Zentren',
      title: 'Militär und internationale Zentren',
      paragraphs: [
        'Die militärische Verbindung ist real – sie bedeutet aber keine allgemeine Zulassung nur für Soldaten. Sowohl in Belgien als auch in Deutschland wurden individuelle Behandlungen unter speziellen medizinischen und rechtlichen Voraussetzungen durchgeführt.',
      ],
      blocks: [
        {
          kind: 'callout',
          tone: 'info',
          title: 'Belgien · Königin-Astrid-Militärkrankenhaus (Brüssel)',
          text: 'Seit 2007 setzte das Krankenhaus Phagen in ausgewählten Fällen ein. Eine 2019 veröffentlichte Auswertung dokumentierte 260 Therapieanfragen von April 2013 bis April 2018, aus denen 15 Behandlungen hervorgingen. Die Anfragen kamen überwiegend aus den Niederlanden, Belgien und Frankreich; 2,3 % der Anfragenden stammten aus Deutschland. Belgien etablierte einen besonderen Rahmen für patientenindividuelle, sogenannte magistrale Phagenzubereitungen.',
          source: 'S2',
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Deutschland · Bundeswehrkrankenhaus Berlin / PhagoFlow',
          text: 'Das Projekt PhagoFlow erprobte die individualisierte Herstellung und klinische Nutzung von Phagenpräparaten. Der Gemeinsame Bundesausschuss dokumentiert die Projektförderung und einen Beschluss vom 20. Juni 2025. Das ist ein Forschungs- und Versorgungsprojekt – keine generelle Marktzulassung.',
          source: 'S6, S14',
        },
        {
          kind: 'table',
          caption: 'Weitere bekannte Anlaufstellen (Stand: 14. November 2026)',
          head: ['Standort', 'Charakter der Behandlung / des Angebots'],
          rows: [
            [
              'Polen, Wrocław · Hirszfeld-Institut',
              'Phage Therapy Unit seit 2005. Behandlung nach einem von einer Bioethik-Kommission genehmigten Protokoll; Einzelfallprüfung. [S7]',
            ],
            [
              'Deutschland, Regensburg · Phage Center',
              'Phagen-Matching, Herstellung und Bereitstellung für individuelle Heilversuche in Zusammenarbeit mit behandelnden Kliniken. [S8]',
            ],
            [
              'Georgien, Tiflis · Eliava-Tradition',
              'Historischer Schwerpunkt der Phagentherapie; Georgien liegt außerhalb der EU. Eine Dokumentation begleitet die Reise eines Patienten dorthin. [S10]',
            ],
          ],
        },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'Wichtig für Betroffene',
          text: 'Die Verfügbarkeit hängt von Diagnose, Bakterienisolat, passendem Phagen, medizinischer Einschätzung und rechtlichem Rahmen ab. Keine der genannten Einrichtungen garantiert eine Behandlung.',
        },
      ],
    },
    {
      id: 'forschung',
      kicker: '03 · Forschung',
      title: 'Forschung, Erfolgschancen und Grenzen',
      paragraphs: [
        'Eine viel zitierte internationale Untersuchung analysierte 100 aufeinanderfolgende Patientenfälle mit insgesamt mehreren behandelten Infektionen in 35 Krankenhäusern in 29 Städten und zwölf Ländern. Der Beobachtungszeitraum reichte vom 1. Januar 2008 bis 30. April 2022; koordiniert wurde die Fallserie von einem belgischen Konsortium. Die Ergebnisse wurden 2024 in Nature Microbiology veröffentlicht.',
      ],
      blocks: [
        {
          kind: 'stats',
          items: [
            {
              value: '77,2 %',
              label: 'der dokumentierten Infektionen zeigten eine klinische Verbesserung',
            },
            {
              value: '61,3 %',
              label: 'der dokumentierten Infektionen wiesen den Zielerreger nicht mehr nach',
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'Diese Zahlen sind keine allgemeine Heilungswahrscheinlichkeit',
          text: 'Es handelte sich um eine retrospektive Beobachtungsstudie ohne randomisierte Kontrollgruppe. Phagen wurden häufig zusammen mit Antibiotika angewendet; die Autoren betonen die unkontrollierte Natur der Daten. In der Fallserie wurden 15 unerwünschte Ereignisse berichtet, darunter sieben nicht-schwere vermutete Arzneimittelreaktionen. Die Prozentwerte beziehen sich auf dokumentierte Infektionen, nicht auf alle Patientinnen und Patienten.',
          source: 'S3',
        },
        {
          kind: 'list',
          title: 'Warum ist das keine zugelassene Standardbehandlung?',
          items: [
            'Die Phagen müssen oft für einen konkreten Bakterienstamm ausgewählt werden; ein universelles Präparat reicht häufig nicht aus.',
            'Für Wirksamkeit, Sicherheit, Herstellung, Qualität und Langzeitbeobachtung sind standardisierte Daten und kontrollierte Studien notwendig.',
            'Individuell hergestellte Präparate passen nur eingeschränkt in klassische Verfahren für industriell gefertigte Arzneimittel.',
            'Wirtschaftliche und organisatorische Hürden können die Entwicklung zusätzlich bremsen; eine gezielte Sperre zugunsten der Antibiotikaindustrie ist jedoch nicht belegt.',
          ],
        },
        {
          kind: 'callout',
          tone: 'fact',
          title: 'Was ist 2026 neu?',
          text: 'Am 21. September 2026 wurde in Nature Medicine eine internationale Konsensleitlinie zur personalisierten Phagentherapie publiziert. Sie wurde unter Federführung der Deutschen Gesellschaft für Infektiologie im methodischen Rahmen der AWMF erarbeitet und enthält mehr als 60 Empfehlungen zu Grundprinzipien, Infrastruktur, Herstellung, Qualitätskontrolle, Anwendung und Forschung. Die EMA hatte einen Entwurf für Qualitätsanforderungen veröffentlicht; dessen Konsultation lief vom 23. Oktober 2025 bis 30. April 2026. Beides sind wichtige Standardisierungsschritte, keine pauschale Zulassung aller Phagenpräparate.',
          source: 'S4–S5, S12',
        },
      ],
    },
    {
      id: 'dokumentation',
      kicker: '04 · Spurensuche',
      title: 'Welche Dokumentation könnte es gewesen sein?',
      paragraphs: [
        'Die ursprüngliche Sendung ist noch nicht eindeutig identifiziert. Diese vier überprüfbaren Spuren sind besonders relevant:',
      ],
      blocks: [
        {
          kind: 'entries',
          title: 'Vier überprüfbare Spuren',
          items: [
            {
              id: 'A',
              title: 'Deutschlandfunk – „Die Wiederentdeckung“ (23.12.2018)',
              text: 'Sehr starke Übereinstimmung beim Wasser: dokumentierte Teichwasser-Probenahme mit Christine Rohde, DSMZ Braunschweig. Es handelt sich um einen Radiobeitrag, nicht um eine Fernsehdokumentation.',
              source: 'S1',
            },
            {
              id: 'B',
              title: 'ARD alpha – „Was ist gut an Viren?“ (22.11.2022)',
              text: 'Bericht über eine Patientin mit Mukoviszidose und multiresistenten Keimen; internationale Suche nach Phagenbehandlungen und Zulassungsproblematik.',
              source: 'S9',
            },
            {
              id: 'C',
              title: 'ARTE Re: – „Hoffnung auf Heilung – Phagentherapie in Georgien“ (2022)',
              text: 'Ein Mann aus Deutschland reist nach Tiflis, nachdem eine langjährige bakterielle Infektion infolge einer Knieoperation auf die übliche Behandlung nicht ansprach.',
              source: 'S10',
            },
            {
              id: 'D',
              title: 'Niederländische Fernsehdokumentationen (2017)',
              text: 'Die Fachpublikation des Brüsseler Militärkrankenhauses nennt die TV-Sendungen „Bacteriofagen: een alternatief voor antibiotica?“ (21.03.2017) und „Dokters van Morgen over bacteriën“ (24.10.2017). Danach stiegen dort die Therapieanfragen.',
              source: 'S2',
            },
          ],
        },
        {
          kind: 'quote',
          text: 'Sehr wahrscheinlich geht es um Bakteriophagen. Die Teichwasser-Szene und der Militärbezug lassen sich jeweils unabhängig belegen. Ob beide aus derselben Sendung stammen, bleibt offen.',
          attribution: 'Recherchebewertung',
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Einordnung der „militärischen Sonderzulassung“',
          text: 'Die verfügbare Literatur beschreibt einzelne Heilversuche, magistrale Zubereitungen und Forschungsprojekte. Eine pauschale Zulassung nur für das EU-Militär bei gleichzeitigem Ausschluss der Zivilbevölkerung lässt sich daraus nicht ableiten. Auch eine belegte absichtliche Blockade wegen wirtschaftlicher Interessen der Antibiotikabranche liegt in den herangezogenen Quellen nicht vor.',
          source: 'S2, S4–S6, S11',
        },
      ],
    },
    {
      id: 'quellen',
      kicker: '05 · Quellen',
      title: 'Quellen und weiterführende Links',
      paragraphs: [
        'Die folgenden wissenschaftlichen, behördlichen und journalistischen Quellen wurden für den Bericht herangezogen. Alle Einträge sind anklickbar. Stand der Recherche: 14. November 2026. Die Quellen wurden für diesen Stand auf Existenz, Metadaten und die jeweils verwendete Aussage geprüft.',
      ],
      blocks: [{ kind: 'sources', items: sources }],
    },
  ],
  medicalNote:
    'Die Phagentherapie ist für ausgewählte schwere oder schwer behandelbare bakterielle Infektionen ein Forschungs- und Einzelfallverfahren. Die Anwendung setzt ärztliche Prüfung, Erregerdiagnostik und geprüfte Präparate voraus. Der Bericht dient der Information, nicht als Anleitung zur Selbstbehandlung.',
  sources,
};
