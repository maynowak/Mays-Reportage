import type { Source } from '../../content/types';
import { IconExternal } from '../../components/ui/icons';

export function StorySources({ sources }: { sources: Source[] }) {
  return (
    <section className="story-sources" id="quellen" aria-labelledby="quellen-title">
      <p className="section-kicker">Quellen</p>
      <h2 id="quellen-title">Quellen und weiterführende Links</h2>
      <p className="story-sources__intro">
        Alle Quellen wurden für den Recherchestand 14. November 2026 auf Existenz, Metadaten
        und die jeweils verwendete Aussage geprüft. Die Einträge sind anklickbar.
      </p>
      <ol className="source-list">
        {sources.map((source) => (
          <li
            key={source.id}
            className="source-list__item"
            id={`quelle-${source.id.toLowerCase()}`}
          >
            <span className="source-list__id">{source.id}</span>
            <div>
              <span className="source-list__label">{source.label}</span>
              <a
                className="source-list__link"
                href={source.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                Originalquelle öffnen
                <IconExternal className="source-list__icon" />
              </a>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
