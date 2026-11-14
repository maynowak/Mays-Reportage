import type { Source } from '../../content/types';
import type { StoryChapter } from '../types';
import { IntroChapterView } from './chapters/IntroChapterView';
import { PhageCycleView } from './chapters/PhageCycleView';
import { ProcessView } from './chapters/ProcessView';
import { TimelineView } from './chapters/TimelineView';
import { EvidenceView } from './chapters/EvidenceView';
import { InstitutionsView } from './chapters/InstitutionsView';
import { FactCheckView } from './chapters/FactCheckView';

export function StoryChapterFrame({
  chapter,
  index,
  sources,
  reducedMotion,
}: {
  chapter: StoryChapter;
  index: number;
  sources: Source[];
  reducedMotion: boolean;
}) {
  const titleId = `${chapter.id}-title`;

  return (
    <section
      className={`story-chapter story-chapter--${chapter.kind}`}
      id={chapter.id}
      data-chapter={chapter.id}
      aria-labelledby={titleId}
    >
      <header className="story-chapter__head">
        <span className="story-chapter__number" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        {chapter.question && <p className="story-chapter__question">{chapter.question}</p>}
        <p className="section-kicker">{chapter.kicker}</p>
        <h2 id={titleId}>{chapter.title}</h2>
        <p className="story-chapter__lead">{chapter.lead}</p>
      </header>

      <ChapterBody chapter={chapter} sources={sources} reducedMotion={reducedMotion} />
    </section>
  );
}

function ChapterBody({
  chapter,
  sources,
  reducedMotion,
}: {
  chapter: StoryChapter;
  sources: Source[];
  reducedMotion: boolean;
}) {
  switch (chapter.kind) {
    case 'intro':
      return <IntroChapterView chapter={chapter} sources={sources} />;
    case 'phage-cycle':
      return (
        <PhageCycleView chapter={chapter} sources={sources} reducedMotion={reducedMotion} />
      );
    case 'process':
      return <ProcessView chapter={chapter} sources={sources} />;
    case 'timeline':
      return <TimelineView chapter={chapter} sources={sources} />;
    case 'evidence':
      return <EvidenceView chapter={chapter} sources={sources} reducedMotion={reducedMotion} />;
    case 'institutions':
      return <InstitutionsView chapter={chapter} sources={sources} />;
    case 'factcheck':
      return <FactCheckView chapter={chapter} sources={sources} />;
    default:
      return null;
  }
}
