import { phagenReportage } from '../bakteriophagen';
import type { Story } from '../../story/types';

/**
 * Inhalte der interaktiven Titelgeschichte. Das Story-Engine-Modul kennt keine
 * dieser Texte; es rendert ausschließlich die hier definierten Kapiteltypen.
 */
export const phagenStory: Story = {
  slug: 'bakteriophagen',
  title: 'BACTERIA CAN BE FOUGHT.',
  chapters: [
    {
      kind: 'intro',
      sourceIds: ['S1', 'S3', 'S4', 'S8'],
      id: 'bedrohung',
      navLabel: 'Bedrohung',
      kicker: '01 · Die unsichtbare Bedrohung',
      title: 'Wenn Antibiotika nicht mehr greifen',
      lead: 'Die Geschichte beginnt nicht mit einem Wundermittel, sondern mit einer offenen Frage: Was tun, wenn bakterielle Infektionen auf die übliche Behandlung nicht mehr ansprechen?',
      paragraphs: [
        'Antibiotika gehören zu den wichtigsten Werkzeugen der modernen Medizin. Die Entdeckung des Penicillins war ein Wendepunkt – doch Bakterien können Resistenzen entwickeln, und die einstige Wunderwaffe wird stumpf. Genau diese Ausgangslage beschreibt die Deutschlandfunk-Reportage „Die Wiederentdeckung“.',
        'Für bakterielle Infektionen, die auf übliche Behandlungen nicht ansprechen, suchen Forschung und Kliniken nach Alternativen. Eine davon ist die Phagentherapie. Sie ist kein fertiges Standardprodukt, sondern ein Forschungs- und Einzelfallverfahren, das ärztliche Prüfung und passende Phagen voraussetzt.',
        'Diese Reportage folgt der Spur: von der Idee über die Umweltprobe bis zu den Zentren, die heute mit Bakteriophagen arbeiten – und zu der Frage, was die Forschung tatsächlich belegen kann.',
      ],
      pullquote: {
        text: 'Der Sieg der Menschen über die Bakterien ist nicht von Dauer.',
        attribution: 'Deutschlandfunk, 23.12.2018 · Quelle S1',
      },
    },
    {
      kind: 'phage-cycle',
      id: 'biologie',
      navLabel: 'Bakterienfresser',
      kicker: '02 · Die Bakterienfresser',
      title: 'Wie ein Phage ein Bakterium angreift',
      lead: 'Bakteriophagen sind Viren, die Bakterien befallen. Der lytische Zyklus lässt sich in fünf Schritten erklären – wissenschaftlich vereinfacht und schematisch.',
      stages: [
        {
          title: 'Annäherung',
          short: 'Der Phage trifft auf ein passendes Bakterium.',
          detail:
            'Bakteriophagen sind hochspezifisch. Sie docken nicht an beliebige Zellen an, sondern an geeignete Bakterienarten oder sogar einzelne Stämme.',
          sourceIds: ['S1'],
        },
        {
          title: 'Bindung',
          short: 'Der Phage heftet sich an die Bakterienoberfläche.',
          detail:
            'Die Fasern des Phagen erkennen Strukturen auf der Bakterienhülle. Passt der Phage nicht zum Erreger, kommt der Zyklus nicht in Gang.',
          sourceIds: ['S1', 'S4'],
        },
        {
          title: 'Erbgut',
          short: 'Das Phagenerbgut gelangt in die Bakterienzelle.',
          detail:
            'Nach der Bindung kann das Erbgut des Phagen in das Bakterium eindringen. Die Zelle wird nun für die Vermehrung des Phagen umfunktioniert.',
          sourceIds: ['S1', 'S4'],
        },
        {
          title: 'Vermehrung',
          short: 'Neue Phagenbestandteile entstehen.',
          detail:
            'Im Inneren des Bakteriums werden Bestandteile neuer Phagen hergestellt und zusammengesetzt. Die Bakterienzelle produziert dabei nicht mehr ihre eigenen Proteine.',
          sourceIds: ['S1', 'S4'],
        },
        {
          title: 'Aufbrechen',
          short: 'Bei lytischen Phagen bricht die Bakterienzelle auf.',
          detail:
            'Lytische Phagen zerstören die Wirtszelle und setzen neue Phagen frei. Nicht alle Phagen verhalten sich so; die Darstellung zeigt den lytischen Zyklus.',
          sourceIds: ['S1', 'S4'],
        },
      ],
      caption:
        'Schematische Illustration, wissenschaftlich vereinfacht. Keine Mikroskopaufnahme. Die Darstellung zeigt einen lytischen Zyklus.',
    },
    {
      kind: 'process',
      id: 'teichwasser',
      navLabel: 'Teichwasser',
      kicker: '03 · Die Spur im Teichwasser',
      title: 'Von der Wasserprobe zur geprüften Zubereitung',
      lead: 'Die Deutschlandfunk-Reportage zeigt, wie Phagen aus einer Umweltprobe gewonnen werden. Fünf Schritte führen von der Probe bis zur medizinischen Qualitätskontrolle – dazwischen liegt kontrollierte Laborarbeit.',
      steps: [
        {
          title: 'Umweltprobe',
          text:
            'Mikrobiologin Dr. Christine Rohde entnimmt mit einem Reporter Teichwasser auf einem Institutsgelände der DSMZ in Braunschweig, um neue Phagen zu isolieren.',
          sourceIds: ['S1'],
        },
        {
          title: 'Laboruntersuchung',
          text:
            'Im Labor werden die Proben aufgearbeitet. Phagen lassen sich aus Teichen, Flüssen, Kläranlagen und klinischen Abwässern isolieren.',
          sourceIds: ['S1'],
        },
        {
          title: 'Phagenidentifikation',
          text:
            'Speziallabore prüfen, welche Phagen den konkreten Bakterienstamm angreifen. Entscheidend ist der nachgewiesene Erreger, nicht der Wohnort der Patientin oder des Patienten.',
          sourceIds: ['S1', 'S4', 'S8'],
        },
        {
          title: 'Wirksamkeitsprüfung',
          text:
            'Eine Phagenbank oder ein Speziallabor testet die Aktivität gegen das Bakterienisolat. Nur passende Phagen kommen für eine weitere Aufbereitung infrage.',
          sourceIds: ['S8', 'S4'],
        },
        {
          title: 'Medizinische Qualitätskontrolle',
          text:
            'Geeignete Phagen werden unter Qualitätskontrolle vermehrt, gereinigt und charakterisiert. Herstellung und Anwendung liegen in ärztlicher Verantwortung.',
          sourceIds: ['S4', 'S8'],
        },
      ],
      warning:
        'Eine Wasserprobe ist kein Arzneimittel. Die Auswahl eines passenden Phagen erfolgt unter kontrollierten Laborbedingungen. Diese Seite gibt keine Anleitung zur Kultivierung oder zur medizinischen Selbstanwendung.',
      warningSourceIds: ['S1', 'S4', 'S8'],
    },
    {
      kind: 'timeline',
      id: 'militaer',
      navLabel: 'Europa & Militär',
      kicker: '04 · Europa und die Militärmedizin',
      title: 'Eine Geschichte in Stationen',
      lead: 'Die militärische Verbindung ist real – sie bedeutet aber keine allgemeine Zulassung nur für Soldaten. Die Zeitleiste folgt den belegten Stationen der europäischen Phagenforschung.',
      events: [
        {
          id: 'timeline-frueh',
          date: 'Anfang 20. Jahrhundert',
          title: 'Phagenforschung und ihre Verdrängung',
          text:
            'Bakteriophagen werden entdeckt und in der Medizin erprobt. Im Westen wird die Phagentherapie um die 1940er Jahre weitgehend aufgegeben; in Osteuropa und der früheren Sowjetunion lebt sie weiter, mit dem Eliava-Institut in Tiflis als Zentrum.',
          tag: 'Forschung',
          sourceIds: ['S2', 'S7'],
        },
        {
          id: 'timeline-wroclaw',
          date: '2005',
          title: 'Phage Therapy Unit in Wrocław',
          text:
            'Das Hirszfeld-Institut eröffnet eine eigene Phage Therapy Unit. Behandlungen erfolgen nach einem von einer Bioethik-Kommission genehmigten Protokoll und werden im Einzelfall geprüft.',
          tag: 'Europa',
          sourceIds: ['S7'],
        },
        {
          id: 'timeline-bruessel',
          date: '2007',
          title: 'Königin-Astrid-Militärkrankenhaus, Brüssel',
          text:
            'Das belgische Militärkrankenhaus beginnt, Phagen in ausgewählten Fällen einzusetzen. Grundlage sind individuelle Heilversuche, keine allgemeine Zulassung.',
          tag: 'Militär',
          sourceIds: ['S2'],
        },
        {
          id: 'timeline-anfragen',
          date: '2013–2018',
          title: '260 Therapieanfragen in Belgien',
          text:
            'Das Brüsseler Krankenhaus dokumentiert 260 Anfragen, aus denen 15 Behandlungen hervorgehen. Die Anfragen kommen überwiegend aus den Niederlanden, Belgien und Frankreich; 2,3 % stammen aus Deutschland.',
          tag: 'Militär',
          sourceIds: ['S2'],
        },
        {
          id: 'timeline-publikation',
          date: '2019',
          title: 'Auswertung der Brüsseler Anfragen',
          text:
            'Djebara et al. veröffentlichen die Analyse der 260 Anfragen und der 15 Behandlungen in der Fachzeitschrift Viruses.',
          tag: 'Publikation',
          sourceIds: ['S2'],
        },
        {
          id: 'timeline-studie',
          date: '2024',
          title: '100 konsekutive Fälle',
          text:
            'Eine internationale Fallserie wertet 100 aufeinanderfolgende Patientenfälle aus 35 Kliniken in zwölf Ländern aus. Die Daten sind retrospektiv und unkontrolliert.',
          tag: 'Forschung',
          sourceIds: ['S3'],
        },
        {
          id: 'timeline-phagoflow',
          date: '20.06.2025',
          title: 'Beschluss zu PhagoFlow',
          text:
            'Der Gemeinsame Bundesausschuss dokumentiert den Beschluss zum Projekt PhagoFlow am Bundeswehrkrankenhaus Berlin. Es ist ein Forschungs- und Versorgungsprojekt, keine Marktzulassung.',
          tag: 'Deutschland',
          sourceIds: ['S6', 'S14'],
        },
        {
          id: 'timeline-ema',
          date: '23.10.2025–30.04.2026',
          title: 'EMA-Konsultation zu Qualitätsanforderungen',
          text:
            'Die Europäische Arzneimittel-Agentur lässt einen Leitlinienentwurf zu Qualitätsanforderungen für Phagenarzneimittel konsultieren. Der Entwurf ist kein zugelassenes Arzneimittel.',
          tag: 'Regulierung',
          sourceIds: ['S5'],
        },
        {
          id: 'timeline-leitlinie',
          date: '21.09.2026',
          title: 'Internationale Konsensleitlinie',
          text:
            'In Nature Medicine erscheint eine konsensbasierte Leitlinie zur personalisierten Phagentherapie mit mehr als 60 Empfehlungen. Sie ist ein Standardisierungsschritt, keine pauschale Zulassung.',
          tag: 'Regulierung',
          sourceIds: ['S4', 'S12'],
        },
      ],
    },
    {
      kind: 'evidence',
      id: 'forschung',
      navLabel: 'Wissenschaft',
      kicker: '05 · Was sagt die Wissenschaft?',
      title: 'Zwei Zahlen und ihre Grenzen',
      lead: 'Die viel zitierte Fallserie aus dem Jahr 2024 nennt zwei Prozentwerte. Beide beziehen sich auf dokumentierte Infektionen – nicht auf die Wahrscheinlichkeit, dass ein Mensch geheilt wird.',
      metrics: [
        {
          id: 'metric-improvement',
          display: '77,2 %',
          value: 77.2,
          label: 'klinische Verbesserung',
          denominator: 'der dokumentierten Infektionen',
          caveat: 'Keine Heilungswahrscheinlichkeit für einzelne Personen.',
          sourceIds: ['S3'],
        },
        {
          id: 'metric-eradication',
          display: '61,3 %',
          value: 61.3,
          label: 'Erreger nicht mehr nachweisbar',
          denominator: 'der dokumentierten Infektionen',
          caveat: 'Kein Beleg für eine dauerhafte Eradikation bei allen Betroffenen.',
          sourceIds: ['S3'],
        },
      ],
      limitations: [
        'Retrospektive Beobachtungsstudie ohne randomisierte Kontrollgruppe.',
        '100 aufeinanderfolgende Fälle aus 35 Kliniken in zwölf Ländern, Beobachtungszeitraum 2008–2022.',
        'Phagen wurden häufig zusammen mit Antibiotika angewendet; ohne Antibiotika war die Eradikation seltener.',
        'Die Autoren betonen die unkontrollierte Natur der Daten; Kausalität lässt sich daraus nicht ableiten.',
      ],
      adverse: {
        title: 'Dokumentierte unerwünschte Ereignisse',
        text:
          'In der Fallserie wurden 15 unerwünschte Ereignisse berichtet, darunter sieben nicht-schwere vermutete Arzneimittelreaktionen. Die Zahlen ersetzen keine individuelle Risikobewertung.',
        sourceIds: ['S3'],
      },
    },
    {
      kind: 'institutions',
      id: 'zentren',
      navLabel: 'Zentren',
      kicker: '06 · Wo wird geforscht und behandelt?',
      title: 'Forschung, Studium, Heilversuch, Angebot',
      lead: 'Nicht jede Einrichtung, die Phagen erforscht, behandelt auch Patientinnen und Patienten. Die folgenden Karten unterscheiden Forschung, klinische Forschung, individuelle Heilversuche und tatsächlich erreichbare Angebote.',
      categories: [
        {
          id: 'forschung',
          label: 'Forschungseinrichtungen',
          description: 'Isolieren, charakterisieren und prüfen Phagen – daraus folgt keine automatische Behandlung.',
        },
        {
          id: 'studien',
          label: 'Klinische Forschung',
          description: 'Fallserien und Forschungsprojekte. Sie sind keine reguläre Zulassung und kein Behandlungsanspruch.',
        },
        {
          id: 'heilversuche',
          label: 'Individuelle Heilversuche',
          description: 'Behandlung nach ärztlicher Prüfung und passendem Phagen – im Einzelfall, ohne Garantie.',
        },
        {
          id: 'angebote',
          label: 'Erreichbare Angebote',
          description: 'Nach den Quellen nur mit Einzelfallprüfung; Verfügbarkeit und Rechtsrahmen können sich ändern.',
        },
      ],
      places: [
        {
          id: 'place-dsmz',
          name: 'DSMZ Braunschweig',
          location: 'Deutschland',
          categories: ['forschung'],
          type: 'Forschungsumfeld',
          text:
            'Die Deutsche Sammlung von Mikroorganismen und Zellkulturen ist in der Reportage Schauplatz der Teichwasser-Probenahme und der Isolierung neuer Phagen. Die Quelle beschreibt keine Behandlung von Patientinnen und Patienten.',
          offer: 'Kein Behandlungsangebot in der Quelle genannt.',
          sourceIds: ['S1'],
        },
        {
          id: 'place-regensburg',
          name: 'Phage Center Regensburg',
          location: 'Deutschland',
          categories: ['forschung', 'heilversuche', 'angebote'],
          type: 'Forschung und Compassionate Use',
          text:
            'Das Zentrum betreibt Phagen-Matching, Herstellung und Qualitätskontrolle. Phagenzubereitungen werden im Rahmen eines individuellen Heilversuchs in Zusammenarbeit mit behandelnden Kliniken bereitgestellt.',
          offer: 'Individueller Heilversuch nach ärztlicher Anfrage; keine allgemeine Behandlungsgarantie.',
          sourceIds: ['S8'],
        },
        {
          id: 'place-wroclaw',
          name: 'Hirszfeld-Institut, Phage Therapy Unit',
          location: 'Wrocław, Polen',
          categories: ['forschung', 'heilversuche', 'angebote'],
          type: 'Forschung und Einzelfallbehandlung',
          text:
            'Die 2005 eröffnete Einheit behandelt nach einem von einer Bioethik-Kommission genehmigten Protokoll und prüft jeden Fall einzeln. Das Institut forscht seit Jahrzehnten zu Bakteriophagen.',
          offer: 'Einzelfallprüfung; keine Garantie auf Aufnahme oder Behandlung.',
          sourceIds: ['S7'],
        },
        {
          id: 'place-eliava',
          name: 'Eliava-Institut',
          location: 'Tiflis, Georgien',
          categories: ['forschung'],
          type: 'Historisches Forschungszentrum',
          text:
            'Tiflis gilt als historischer Schwerpunkt der Phagentherapie. Georgien liegt außerhalb der EU; die ARTE-Reportage begleitet die Reise eines Patienten dorthin.',
          offer: 'Außerhalb des EU-Regelungsrahmens; keine pauschale Behandlungszusage.',
          sourceIds: ['S2', 'S10'],
        },
        {
          id: 'place-bruessel',
          name: 'Königin-Astrid-Militärkrankenhaus',
          location: 'Brüssel, Belgien',
          categories: ['heilversuche', 'angebote'],
          type: 'Militärkrankenhaus',
          text:
            'Seit 2007 werden Phagen in ausgewählten Fällen eingesetzt. Zwischen 2013 und 2018 gingen 260 Anfragen ein, von denen 15 zu Behandlungen führten.',
          offer: 'Individuelle Fälle; keine allgemeine Zulassung nur für Soldaten.',
          sourceIds: ['S2'],
        },
        {
          id: 'place-studie',
          name: 'Belgisches Phagen-Konsortium',
          location: 'Belgien / international',
          categories: ['studien'],
          type: 'Retrospektive Fallserie',
          text:
            'Die 2024 veröffentlichte Auswertung umfasst 100 aufeinanderfolgende Fälle aus 35 Kliniken in zwölf Ländern. Sie beschreibt Ergebnisse, rekrutiert aber keine neuen Patientinnen und Patienten.',
          offer: 'Kein Behandlungsangebot; wissenschaftliche Auswertung.',
          sourceIds: ['S3'],
        },
        {
          id: 'place-phagoflow',
          name: 'PhagoFlow · Bundeswehrkrankenhaus Berlin',
          location: 'Berlin, Deutschland',
          categories: ['studien'],
          type: 'Forschungs- und Versorgungsprojekt',
          text:
            'PhagoFlow erprobte die individualisierte Herstellung und klinische Nutzung von Phagenpräparaten. Der G-BA dokumentiert die Förderung und einen Beschluss vom 20. Juni 2025.',
          offer: 'Forschungs- und Versorgungsprojekt; keine generelle Marktzulassung.',
          sourceIds: ['S6', 'S14'],
        },
      ],
      caveat:
        'Keine der genannten Einrichtungen garantiert eine Behandlung. Die Verfügbarkeit hängt von Diagnose, Bakterienisolat, passendem Phagen, medizinischer Einschätzung und rechtlichem Rahmen ab. Diese Übersicht ersetzt keine individuelle medizinische Beratung.',
    },
    {
      kind: 'factcheck',
      id: 'faktencheck',
      navLabel: 'Faktencheck',
      kicker: '07 · Faktencheck',
      title: 'Sechs Fragen, sechs Antworten',
      lead: 'Kurze Antworten auf häufige Annahmen – jede mit einem nachvollziehbaren Quellenverweis. Die Antworten sind keine Therapieempfehlung.',
      items: [
        {
          id: 'fact-worms',
          question: 'Sind Bakteriophagen Würmer?',
          answer:
            'Nein. Bakteriophagen sind Viren, die Bakterien befallen. Sie docken an geeignete Bakterien an und können sich in deren Zellen vermehren.',
          sourceIds: ['S1'],
        },
        {
          id: 'fact-pond',
          question: 'Kommen Phagen in Teichwasser vor?',
          answer:
            'Ja. Phagen lassen sich aus Teichen, Flüssen, Kläranlagen und klinischen Abwässern isolieren. Teichwasser selbst ist kein Arzneimittel und darf nicht als Therapie verwendet werden.',
          sourceIds: ['S1'],
        },
        {
          id: 'fact-resistant',
          question: 'Können Phagen antibiotikaresistente Bakterien angreifen?',
          answer:
            'Phagen wirken spezifisch gegen bestimmte Bakterienarten oder Stämme und können auch Erreger treffen, die auf Antibiotika nicht mehr ansprechen. Ob ein konkreter Phage zum konkreten Erreger passt, muss im Labor geprüft werden.',
          sourceIds: ['S1', 'S3', 'S4'],
        },
        {
          id: 'fact-approved',
          question: 'Ist die Phagentherapie allgemein zugelassen?',
          answer:
            'Nein. In der EU ist sie kein zugelassenes Standardverfahren. Behandlungen erfolgen als individuelle Heilversuche oder im Rahmen von Forschung; die EMA konsultiert Qualitätsanforderungen, und 2026 erschien eine Konsensleitlinie.',
          sourceIds: ['S4', 'S5', 'S8', 'S9'],
        },
        {
          id: 'fact-military',
          question: 'Wird sie ausschließlich vom Militär verwendet?',
          answer:
            'Nein. Militärkrankenhäuser waren wichtige Stationen, aber auch zivile Einrichtungen in Wrocław und Regensburg sowie internationale Fallserien befassen sich mit Phagentherapie. Eine pauschale Sonderzulassung nur für das Militär lässt sich aus den Quellen nicht ableiten.',
          sourceIds: ['S2', 'S7', 'S8'],
        },
        {
          id: 'fact-replace',
          question: 'Können Phagen Antibiotika vollständig ersetzen?',
          answer:
            'Dafür gibt es keinen Beleg. In der Fallserie wurden Phagen häufig zusammen mit Antibiotika angewendet; ohne Antibiotika war die Eradikation seltener. Die personalisierte Auswahl und die Kombination bleiben Gegenstand von Forschung und Leitlinien.',
          sourceIds: ['S3', 'S4'],
        },
      ],
      note:
        'Diese Antworten fassen den Stand der geprüften Quellen zusammen. Sie sind keine Empfehlung zur Selbstbehandlung und ersetzen keine ärztliche Beratung.',
    },
  ],
  sources: phagenReportage.sources,
  medicalNote: phagenReportage.medicalNote,
};
