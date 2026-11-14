import type { IntroChapter } from '../../types';
import type { Source } from '../../../content/types';
import { SourceChips } from '../SourceChips';

export function IntroChapterView({
  chapter,
  sources,
}: {
  chapter: IntroChapter;
  sources: Source[];
}) {
  return (
    <div className="intro-view">
      <div className="intro-view__prose">
        {chapter.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {chapter.sourceIds && <SourceChips ids={chapter.sourceIds} sources={sources} />}
      </div>

      {chapter.pullquote && (
        <blockquote className="story-pullquote">
          <p>{chapter.pullquote.text}</p>
          <footer>{chapter.pullquote.attribution}</footer>
        </blockquote>
      )}
    </div>
  );
}
