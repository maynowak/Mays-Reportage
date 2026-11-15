import { Link } from 'react-router-dom';
import { NeonButton } from '../components/ui/NeonButton';
import { IconArrow } from '../components/ui/icons';
import { useSeo } from '../lib/seo';

const PRINCIPLES = [
  {
    title: 'Recherche vor Tempo',
    text: 'Jede Titelgeschichte wird recherchiert, gegengeprüft und mit Recherchestand veröffentlicht. Zahlen werden nur mit ihrer Quelle und ihrem Geltungsbereich genannt.',
  },
  {
    title: 'Quellen sichtbar machen',
    text: 'Am Ende jeder Reportage stehen die verwendeten wissenschaftlichen, behördlichen und journalistischen Quellen – verlinkt und nachvollziehbar.',
  },
  {
    title: 'Keine Heilversprechen',
    text: 'Wir berichten über Forschung, nicht über Therapieempfehlungen. Medizinische Entscheidungen gehören in ärztliche Hände.',
  },
];

export function AboutPage() {
  useSeo({
    title: 'Über uns — Mays-Reportagen',
    description:
      'Wie Mays-Reportagen arbeitet: Recherche, sichtbare Quellen und die Grenzen zwischen Bericht und medizinischer Empfehlung.',
    canonicalPath: '/ueber-uns',
    image: '/media/phagen/og-phagen.jpg',
    imageAlt: 'Mays-Reportagen',
  });

  return (
    <div className="page">
      <header className="page-hero">
        <div className="container page-hero__inner">
          <p className="section-kicker">Über uns</p>
          <h1>
            Geschichten, die bewegen. <span className="text-gradient">Wissen, das bleibt.</span>
          </h1>
          <p>
            Mays-Reportagen ist ein unabhängiges, kostenloses und nicht kommerzielles
            Wissenschafts- und Recherchemagazin. Es erzählt Geschichten aus Medizin,
            Forschung und Gesellschaft – lang genug für den Zusammenhang, klar genug für
            den Alltag.
          </p>
        </div>
      </header>

      <section className="about-section">
        <div className="container about-section__grid">
          <div>
            <p className="section-kicker">Warum es uns gibt</p>
            <h2>Hintergründe statt Schlagzeilen.</h2>
          </div>
          <div>
            <p>
              Viele Wissenschaftsthemen werden auf einen Satz verkürzt. Mays-Reportagen nimmt sich
              Zeit für den Weg davor: welche Frage am Anfang stand, welche Studien wirklich etwas
              belegen und wo die Unsicherheit beginnt. Das Magazin ist kostenlos und bleibt
              vorerst nicht kommerziell.
            </p>
            <p>
              Die erste Titelgeschichte widmet sich der Phagentherapie. Sie verbindet eine
              dokumentierte Teichwasser-Spur mit der militärischen Anwendung in Belgien und
              Deutschland, mit internationalen Zentren und einer viel zitierten Fallserie aus dem
              Jahr 2024.
            </p>
            <p>
              Das Magazin ist bewusst erweiterbar gebaut: Jede Reportage bringt ihr eigenes
              Titelmotiv, ihre eigene Akzentfarbe und ihre eigenen Quellen mit. Die Startseite
              zeigt die aktuelle Titelgeschichte nach redaktioneller Priorität – offen für
              weitere wissenschaftliche Themen.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <p className="section-kicker">Arbeitsweise</p>
          <h2>Drei Regeln.</h2>
          <div className="principles">
            {PRINCIPLES.map((principle, index) => (
              <article className="principle" key={principle.title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container about-note" id="hinweis">
          <p className="section-kicker">Transparenz</p>
          <h2>Medizinischer Hinweis</h2>
          <p>
            Die Inhalte von Mays-Reportagen dienen der Information. Sie ersetzen keine
            medizinische Beratung, Diagnose oder Behandlung. Bei gesundheitlichen Fragen wenden
            Sie sich bitte an qualifiziertes medizinisches Fachpersonal.
          </p>
          <p className="about-note__fine">
            Der Quellcode des Magazins ist offen einsehbar und steht unter der GPL-3.0-Lizenz.
          </p>
        </div>
      </section>

      <section className="about-cta">
        <div className="container about-cta__inner">
          <div>
            <p className="section-kicker">Loslesen</p>
            <h2>Die erste Titelgeschichte</h2>
          </div>
          <NeonButton to="/reportagen/bakteriophagen" className="btn--hero">
            Bakteriophagen entdecken
            <IconArrow className="btn__icon" />
          </NeonButton>
        </div>
      </section>

      <p className="container page-back">
        <Link to="/" className="inline-link">
          ← Zurück zur Startseite
        </Link>
      </p>
    </div>
  );
}
