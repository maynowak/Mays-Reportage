import { useId, useRef } from 'react';
import type { StoryChapter } from '../types';
import { useActiveChapter } from '../hooks/useActiveChapter';
import { closeDialog, openDialog } from './dialogControls';

export function StoryChapterNav({ chapters }: { chapters: StoryChapter[] }) {
  const activeId = useActiveChapter(chapters);
  const activeIndex = Math.max(
    0,
    chapters.findIndex((chapter) => chapter.id === activeId),
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  return (
    <>
      <nav className="story-nav" aria-label="Kapitel dieser Reportage">
        <p className="story-nav__label">Kapitel</p>
        <ol className="story-nav__list">
          {chapters.map((chapter, index) => {
            const active = chapter.id === activeId;
            return (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.id}`}
                  className={`story-nav__link${active ? ' is-active' : ''}`}
                  aria-current={active ? 'location' : undefined}
                >
                  <span className="story-nav__index">{String(index + 1).padStart(2, '0')}</span>
                  <span>{chapter.navLabel}</span>
                </a>
              </li>
            );
          })}
        </ol>
        <a className="story-nav__sources" href="#quellen">
          Quellen &amp; Hinweise
        </a>
      </nav>

      <div className="story-mobile-nav">
        <span className="story-mobile-nav__status" aria-live="polite">
          <span>Kapitel</span> {String(activeIndex + 1).padStart(2, '0')} /{' '}
          {String(chapters.length).padStart(2, '0')}
        </span>
        <button
          type="button"
          className="story-mobile-nav__button"
          aria-haspopup="dialog"
          onClick={() => openDialog(dialogRef.current)}
        >
          Kapitel wählen
        </button>
      </div>

      <dialog
        ref={dialogRef}
        className="story-dialog story-dialog--chapters"
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeDialog(dialogRef.current);
        }}
      >
        <div className="story-dialog__head">
          <h3 id={titleId}>Kapitel</h3>
          <button
            type="button"
            className="story-dialog__close"
            aria-label="Kapitelauswahl schließen"
            onClick={() => closeDialog(dialogRef.current)}
          >
            ×
          </button>
        </div>
        <nav aria-label="Kapitelauswahl" className="story-dialog__chapters">
          <ol>
            {chapters.map((chapter, index) => (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.id}`}
                  className={chapter.id === activeId ? 'is-active' : undefined}
                  onClick={() => closeDialog(dialogRef.current)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {chapter.navLabel}
                </a>
              </li>
            ))}
            <li>
              <a href="#quellen" onClick={() => closeDialog(dialogRef.current)}>
                <span>∞</span>
                Quellen &amp; Hinweise
              </a>
            </li>
          </ol>
        </nav>
      </dialog>
    </>
  );
}
