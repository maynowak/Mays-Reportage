import { Fragment } from 'react';
import { NeonButton } from '../components/ui/NeonButton';
import { ScienceBand } from '../components/science/ScienceBand';
import { IconArrow } from '../components/ui/icons';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import type { Story } from './types';
import { ShareBar } from './components/ShareBar';
import { StoryChapterFrame } from './components/StoryChapterFrame';
import { StoryChapterNav } from './components/StoryChapterNav';
import { StorySources } from './components/StorySources';

export function StoryReader({
  story,
  researchDate,
}: {
  story: Story;
  researchDate: string;
}) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="container story-layout">
      <StoryChapterNav chapters={story.chapters} />

      <article className="story" aria-label="Reportagetext">
        {story.chapters.map((chapter, index) => (
          <Fragment key={chapter.id}>
            <StoryChapterFrame
              chapter={chapter}
              sources={story.sources}
              reducedMotion={reducedMotion}
            />
            {index === 1 && <ScienceBand variant="story" />}
          </Fragment>
        ))}

        <ScienceBand variant="story-end" />

        <StorySources sources={story.sources} />

        <aside className="medical-note" id="hinweis" aria-labelledby="medical-note-title">
          <span className="medical-note__icon" aria-hidden="true">
            +
          </span>
          <div>
            <h2 id="medical-note-title">Medizinischer Hinweis</h2>
            <p>{story.medicalNote}</p>
          </div>
        </aside>

        <ShareBar title={story.title} />

        <footer className="story-footer">
          <p>
            Recherche und Quellenprüfung: {researchDate}. Die Darstellung ist eine
            wissenschaftsjournalistische Einordnung, keine Therapieempfehlung.
          </p>
          <NeonButton variant="ghost" to="/reportagen">
            Alle Reportagen
            <IconArrow className="btn__icon" />
          </NeonButton>
        </footer>
      </article>
    </div>
  );
}
