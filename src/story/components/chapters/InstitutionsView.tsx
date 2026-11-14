import { useState } from 'react';
import type { InstitutionsChapter, PlaceCategory } from '../../types';
import type { Source } from '../../../content/types';
import { SourceChips } from '../SourceChips';

type Filter = 'all' | PlaceCategory;

export function InstitutionsView({
  chapter,
  sources,
}: {
  chapter: InstitutionsChapter;
  sources: Source[];
}) {
  const [filter, setFilter] = useState<Filter>('all');
  const labels = new Map(chapter.categories.map((category) => [category.id, category.label]));
  const visiblePlaces =
    filter === 'all'
      ? chapter.places
      : chapter.places.filter((place) => place.categories.includes(filter));

  return (
    <div className="institutions-view">
      <dl className="institution-legend">
        {chapter.categories.map((category) => (
          <div key={category.id}>
            <dt>{category.label}</dt>
            <dd>{category.description}</dd>
          </div>
        ))}
      </dl>

      <div className="institution-filter" role="group" aria-label="Einrichtungen filtern">
        <button
          type="button"
          className={`institution-filter__button${filter === 'all' ? ' is-active' : ''}`}
          aria-pressed={filter === 'all'}
          onClick={() => setFilter('all')}
        >
          Alle
        </button>
        {chapter.categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`institution-filter__button${filter === category.id ? ' is-active' : ''}`}
            aria-pressed={filter === category.id}
            onClick={() => setFilter(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <p className="institution-count" aria-live="polite">
        {visiblePlaces.length} {visiblePlaces.length === 1 ? 'Einrichtung' : 'Einrichtungen'}
        {filter === 'all' ? ' im Überblick' : ' in dieser Kategorie'}
      </p>

      <div className="institution-grid">
        {visiblePlaces.map((place) => (
          <article key={place.id} className="institution-card">
            <ul className="institution-card__badges" aria-label="Kategorien">
              {place.categories.map((category) => (
                <li key={category} className="badge">
                  {labels.get(category) ?? category}
                </li>
              ))}
            </ul>
            <p className="institution-card__location">{place.location}</p>
            <h3>{place.name}</h3>
            <p className="institution-card__type">{place.type}</p>
            <p>{place.text}</p>
            <p className="institution-card__offer">
              <strong>Angebot:</strong> {place.offer}
            </p>
            <SourceChips ids={place.sourceIds} sources={sources} />
          </article>
        ))}
      </div>

      <aside className="story-callout story-callout--warning">
        <h3>Keine Behandlungsgarantie</h3>
        <p>{chapter.caveat}</p>
      </aside>
    </div>
  );
}
