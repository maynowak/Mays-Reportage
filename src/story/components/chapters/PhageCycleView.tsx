import { useId, useState } from 'react';
import type { PhageCycleChapter } from '../../types';
import type { Source } from '../../../content/types';
import { InfoDialog } from '../InfoDialog';
import { SourceChips } from '../SourceChips';

export function PhageCycleView({
  chapter,
  sources,
  reducedMotion,
}: {
  chapter: PhageCycleChapter;
  sources: Source[];
  reducedMotion: boolean;
}) {
  const [stageIndex, setStageIndex] = useState(0);
  const stage = chapter.stages[stageIndex];
  const stageNumber = stageIndex + 1;
  const total = chapter.stages.length;
  const baseId = useId().replace(/:/g, '');
  const symbolId = `phage-symbol-${baseId}`;
  const titleId = `phage-title-${baseId}`;
  const descId = `phage-desc-${baseId}`;

  const goTo = (index: number) => {
    setStageIndex(Math.min(total - 1, Math.max(0, index)));
  };

  return (
    <div className="phage-cycle">
      <div className="phage-visual-wrap">
        <div
          className={`phage-visual${reducedMotion ? ' is-reduced' : ''}`}
          data-stage={stageNumber}
        >
          <svg
            className="phage-visual__svg"
            viewBox="0 0 800 420"
            role="img"
            aria-labelledby={`${titleId} ${descId}`}
          >
            <title id={titleId}>Schematischer lytischer Phagenzyklus</title>
            <desc id={descId}>
              Stufe {stageNumber} von {total}: {stage.title}. {stage.short} {stage.detail}
            </desc>

            <defs>
              <linearGradient id={`bacterium-${baseId}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffb199" />
                <stop offset="48%" stopColor="#ff7865" />
                <stop offset="100%" stopColor="#d94a63" />
              </linearGradient>
              <linearGradient id={`phage-${baseId}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00b8b0" />
                <stop offset="55%" stopColor="#00b8b0" />
                <stop offset="100%" stopColor="#14243a" />
              </linearGradient>
              <g id={symbolId}>
                <g fill="none" stroke="#00736d" strokeWidth="6" strokeLinecap="round">
                  <path d="M0 -46 26 -28 26 10 0 28 -26 10 -26 -28Z" fill="#b9eeea" />
                  <path d="M0 28v42" />
                  <path d="M-13 70h26" />
                  <path d="M0 70-26 98M0 70 26 98M0 78-34 94M0 78 34 94" />
                  <path d="M-10 -22c10 8 10 20 0 28s-10 20 0 28" stroke="#00b8b0" strokeWidth="2.5" opacity=".9" />
                </g>
              </g>
            </defs>

            <g className="phage-visual__grid" aria-hidden="true">
              {Array.from({ length: 9 }, (_, index) => (
                <line
                  key={`v-${index}`}
                  x1={80 + index * 80}
                  y1="0"
                  x2={80 + index * 80}
                  y2="420"
                />
              ))}
              {Array.from({ length: 5 }, (_, index) => (
                <line
                  key={`h-${index}`}
                  x1="0"
                  y1={50 + index * 80}
                  x2="800"
                  y2={50 + index * 80}
                />
              ))}
            </g>

            <g className="bacterium" aria-hidden="true">
              <rect
                className="bacterium__body"
                x="430"
                y="140"
                width="300"
                height="150"
                rx="75"
                fill={`url(#bacterium-${baseId})`}
              />
              <ellipse className="bacterium__shine" cx="505" cy="175" rx="55" ry="22" />
              <path
                className="bacterium__nucleoid"
                d="M480 215c25-30 55 20 85-6s50 26 85 2"
              />
              <path className="bacterium__fimbriae" d="M440 150l-24-24M460 140l-12-30M700 150l24-26M690 285l26 22M450 285l-26 22" />
              <g className="progeny">
                <use href={`#${symbolId}`} transform="translate(495 195) scale(.22)" />
                <use href={`#${symbolId}`} transform="translate(560 235) scale(.18)" />
                <use href={`#${symbolId}`} transform="translate(620 180) scale(.24)" />
                <use href={`#${symbolId}`} transform="translate(675 235) scale(.16)" />
              </g>
              <g className="lysis">
                <path d="M520 140l18 36-26 16 30 48" />
                <path d="M610 140l-16 40 28 12-22 48" />
                <path d="M680 160l-24 34 22 22-18 34" />
                <circle cx="470" cy="120" r="4" />
                <circle cx="705" cy="110" r="5" />
                <circle cx="740" cy="200" r="3" />
                <circle cx="455" cy="310" r="4" />
                <circle cx="620" cy="330" r="3" />
              </g>
            </g>

            <circle className="binding-ring" cx="432" cy="215" r="56" aria-hidden="true" />
            <circle className="attachment-dot" cx="430" cy="215" r="7" aria-hidden="true" />

            <g className="phage phage--free" aria-hidden="true">
              <use href={`#${symbolId}`} transform="translate(168 148) scale(1.36)" />
            </g>
            <g className="phage phage--attached" aria-hidden="true">
              <use href={`#${symbolId}`} transform="translate(386 215) rotate(90) scale(.98)" />
            </g>
            <path
              className="dna-path"
              d="M420 215c34-22 58 24 96 0s62 24 102 0"
              aria-hidden="true"
            />
          </svg>

          <div className="phage-visual__hud" aria-hidden="true">
            <span>Stufe {String(stageNumber).padStart(2, '0')}</span>
            <span>{stage.title}</span>
          </div>
        </div>

        <p className="phage-caption">{chapter.caption}</p>
      </div>

      <div className="phage-panel">
        <p className="section-kicker">Schritt {String(stageNumber).padStart(2, '0')}</p>
        <h3>{stage.title}</h3>
        <p>{stage.detail}</p>
        <p className="visually-hidden" aria-live="polite">
          Schritt {stageNumber} von {total}: {stage.title}. {stage.detail}
        </p>
        <SourceChips ids={stage.sourceIds} sources={sources} />

        <div className="phage-controls">
          <button
            type="button"
            className="story-control"
            onClick={() => goTo(stageIndex - 1)}
            disabled={stageIndex === 0}
          >
            ← Zurück
          </button>

          <ol className="phage-steps" aria-label="Schritte des Zyklus">
            {chapter.stages.map((item, index) => (
              <li key={item.title}>
                <button
                  type="button"
                  className={`phage-steps__button${index === stageIndex ? ' is-active' : ''}`}
                  aria-label={`Schritt ${index + 1}: ${item.title}`}
                  aria-current={index === stageIndex ? 'step' : undefined}
                  onClick={() => goTo(index)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ol>

          <button
            type="button"
            className="story-control"
            onClick={() => goTo(stageIndex + 1)}
            disabled={stageIndex === total - 1}
          >
            Weiter →
          </button>
        </div>

        <InfoDialog
          title="Begriffe zum Phagenzyklus"
          trigger="Begriffe erklärt"
        >
          <dl className="term-list">
            <dt>Kapsid</dt>
            <dd>Die Proteinhülle, die das Erbgut des Phagen umschließt.</dd>
            <dt>Schwanzfasern</dt>
            <dd>Strukturen, mit denen der Phage passende Oberflächenmerkmale des Bakteriums erkennt.</dd>
            <dt>Lytisch</dt>
            <dd>
              Der Phage vermehrt sich im Bakterium und zerstört die Wirtszelle am Ende des Zyklus.
            </dd>
            <dt>Spezifisch</dt>
            <dd>
              Phagen befallen nicht beliebige Zellen, sondern bestimmte Bakterienarten oder Stämme.
            </dd>
          </dl>
        </InfoDialog>
      </div>
    </div>
  );
}
