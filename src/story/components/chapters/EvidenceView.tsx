import type { CSSProperties } from 'react';
import type { EvidenceChapter } from '../../types';
import type { Source } from '../../../content/types';
import { InfoDialog } from '../InfoDialog';
import { SourceChips } from '../SourceChips';

export function EvidenceView({
  chapter,
  sources,
  reducedMotion,
}: {
  chapter: EvidenceChapter;
  sources: Source[];
  reducedMotion: boolean;
}) {
  return (
    <div className="evidence-view">
      <div className="evidence-metrics">
        {chapter.metrics.map((metric) => (
          <article key={metric.id} className="metric-card" aria-labelledby={`${metric.id}-label`}>
            <p className="metric-card__value">{metric.display}</p>
            <h3 id={`${metric.id}-label`}>{metric.label}</h3>
            <p className="metric-card__denominator">{metric.denominator}</p>
            <div className="metric-bar" aria-hidden="true">
              <span
                className={reducedMotion ? 'is-static' : undefined}
                style={{ '--metric-value': `${metric.value}%` } as CSSProperties}
              />
            </div>
            <p className="metric-card__caveat">{metric.caveat}</p>
            <SourceChips ids={metric.sourceIds} sources={sources} />
          </article>
        ))}
      </div>

      <div className="evidence-grid">
        <section className="evidence-panel" aria-labelledby="evidence-limits-title">
          <div className="evidence-panel__head">
            <h3 id="evidence-limits-title">So ist die Studie gebaut</h3>
            <InfoDialog
              title="Studientyp verstehen"
              trigger="Begriffe"
            >
              <dl className="term-list">
                <dt>Retrospektiv</dt>
                <dd>Die Daten wurden nachträglich aus bereits dokumentierten Fällen ausgewertet.</dd>
                <dt>Beobachtungsstudie</dt>
                <dd>
                  Es gibt keine vom Studienteam gesteuerte Vergleichsgruppe; beobachtet wird,
                  was in der Versorgung dokumentiert wurde.
                </dd>
                <dt>Randomisierte Kontrollgruppe</dt>
                <dd>
                  Eine zufällige Zuteilung zu Behandlung und Vergleichsgruppe fehlt in dieser
                  Fallserie. Deshalb sind keine ursächlichen Schlüsse möglich.
                </dd>
              </dl>
            </InfoDialog>
          </div>
          <ul className="bullet-block">
            {chapter.limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
        </section>

        <aside className="story-callout story-callout--warning" aria-labelledby="adverse-title">
          <h3 id="adverse-title">{chapter.adverse.title}</h3>
          <p>{chapter.adverse.text}</p>
          <SourceChips ids={chapter.adverse.sourceIds} sources={sources} />
        </aside>
      </div>

      <p className="evidence-note">
        Die Balken visualisieren die genannten Prozentwerte. Sie sind keine
        Heilungswahrscheinlichkeit und keine Prognose für einzelne Personen.
      </p>
    </div>
  );
}
