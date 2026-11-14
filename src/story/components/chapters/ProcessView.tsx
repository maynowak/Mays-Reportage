import type { ProcessChapter } from '../../types';
import type { Source } from '../../../content/types';
import { SourceChips } from '../SourceChips';

export function ProcessView({
  chapter,
  sources,
}: {
  chapter: ProcessChapter;
  sources: Source[];
}) {
  return (
    <div className="process-view">
      <ol className="process-flow">
        {chapter.steps.map((step, index) => (
          <li key={step.title} className="process-step">
            <span className="process-step__number" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            <SourceChips ids={step.sourceIds} sources={sources} />
          </li>
        ))}
      </ol>

      <aside className="story-callout story-callout--warning">
        <h3>Wasserprobe ist kein Arzneimittel</h3>
        <p>{chapter.warning}</p>
        <SourceChips ids={chapter.warningSourceIds} sources={sources} />
      </aside>
    </div>
  );
}
