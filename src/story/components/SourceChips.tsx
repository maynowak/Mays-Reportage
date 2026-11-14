import type { Source } from '../../content/types';

export function SourceChips({
  ids,
  sources,
  label = 'Quellen',
}: {
  ids: string[];
  sources: Source[];
  label?: string;
}) {
  const byId = new Map(sources.map((source) => [source.id, source]));
  if (ids.length === 0) return null;

  return (
    <div className="source-chips" aria-label={label}>
      <span className="source-chips__label">Quellen:</span>
      {ids.map((id) => {
        const source = byId.get(id);
        if (!source) {
          return (
            <span key={id} className="source-chip source-chip--missing">
              {id}
            </span>
          );
        }
        return (
          <a
            key={id}
            className="source-chip"
            href={`#quelle-${id.toLowerCase()}`}
            aria-label={`Quelle ${id}: ${source.label}`}
          >
            {id}
          </a>
        );
      })}
    </div>
  );
}
