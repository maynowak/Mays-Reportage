import { useRef } from 'react';
import type { FactCheckChapter } from '../../types';
import type { Source } from '../../../content/types';
import { SourceChips } from '../SourceChips';

export function FactCheckView({
  chapter,
  sources,
}: {
  chapter: FactCheckChapter;
  sources: Source[];
}) {
  const detailsRefs = useRef<Array<HTMLDetailsElement | null>>([]);

  const setAll = (open: boolean) => {
    detailsRefs.current.forEach((details) => {
      if (details) details.open = open;
    });
  };

  return (
    <div className="factcheck-view">
      <div className="factcheck-tools">
        <button type="button" className="story-control" onClick={() => setAll(true)}>
          Alle Antworten öffnen
        </button>
        <button type="button" className="story-control" onClick={() => setAll(false)}>
          Alle schließen
        </button>
      </div>

      <div className="factcheck-list">
        {chapter.items.map((item, index) => (
          <details
            key={item.id}
            className="factcheck-item"
            id={item.id}
            ref={(element) => {
              detailsRefs.current[index] = element;
            }}
          >
            <summary className="factcheck-item__summary">
              <span>{item.question}</span>
              <span className="factcheck-item__icon" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="factcheck-item__body">
              <p>{item.answer}</p>
              <SourceChips ids={item.sourceIds} sources={sources} />
            </div>
          </details>
        ))}
      </div>

      <p className="factcheck-note">{chapter.note}</p>
    </div>
  );
}
