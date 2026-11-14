import type { TimelineChapter } from '../../types';
import type { Source } from '../../../content/types';
import { SourceChips } from '../SourceChips';

export function TimelineView({
  chapter,
  sources,
}: {
  chapter: TimelineChapter;
  sources: Source[];
}) {
  return (
    <div className="timeline-view">
      <nav className="timeline-rail" aria-label="Stationen der Zeitleiste">
        <ol>
          {chapter.events.map((event) => (
            <li key={event.id}>
              <a href={`#${event.id}`} className="timeline-rail__link">
                <span className="timeline-rail__date">{event.date}</span>
                <span className="timeline-rail__title">{event.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <ol className="timeline-cards">
        {chapter.events.map((event) => (
          <li key={event.id} id={event.id} className="timeline-card">
            <div className="timeline-card__marker" aria-hidden="true" />
            <div className="timeline-card__body">
              <div className="timeline-card__meta">
                <span className="badge">{event.tag}</span>
                <span className="timeline-card__date">{event.date}</span>
              </div>
              <h3>{event.title}</h3>
              <p>{event.text}</p>
              <SourceChips ids={event.sourceIds} sources={sources} />
            </div>
          </li>
        ))}
      </ol>

      <p className="timeline-note">
        Die Zeitleiste nennt nur Stationen, die im Quellen-Audit belegt sind. Sie zeigt keine
        allgemeine Zulassung und keine Behandlungsgarantie.
      </p>
    </div>
  );
}
