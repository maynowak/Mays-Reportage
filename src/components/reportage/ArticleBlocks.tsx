import type { Block, Section } from '../../content/types';
import { IconArrow, IconExternal } from '../ui/icons';

function Callout({ block }: { block: Extract<Block, { kind: 'callout' }> }) {
  return (
    <aside className={`callout callout--${block.tone}`}>
      <h3 className="callout__title">{block.title}</h3>
      <p>{block.text}</p>
      {block.source && (
        <a className="callout__source" href="#quellen">
          Quelle: {block.source}
        </a>
      )}
    </aside>
  );
}

function Steps({ block }: { block: Extract<Block, { kind: 'steps' }> }) {
  return (
    <div className="steps">
      <h3 className="block-title">{block.title}</h3>
      <ol className="steps__list">
        {block.items.map((item, index) => (
          <li key={item.title} className="steps__item">
            <span className="steps__index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Stats({ block }: { block: Extract<Block, { kind: 'stats' }> }) {
  return (
    <div className="stat-grid stat-grid--article">
      {block.items.map((stat) => (
        <div key={stat.label} className="stat-card">
          <span className="stat-card__value">{stat.value}</span>
          <span className="stat-card__label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

function DataTable({ block }: { block: Extract<Block, { kind: 'table' }> }) {
  return (
    <figure className="data-table">
      <figcaption>{block.caption}</figcaption>
      <div className="data-table__scroll">
        <table>
          <thead>
            <tr>
              {block.head.map((cell) => (
                <th key={cell} scope="col">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, index) =>
                  index === 0 ? (
                    <th key={cell} scope="row">
                      {cell}
                    </th>
                  ) : (
                    <td key={cell}>{cell}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

function Quote({ block }: { block: Extract<Block, { kind: 'quote' }> }) {
  return (
    <blockquote className="pullquote">
      <p>{block.text}</p>
      <footer>{block.attribution}</footer>
    </blockquote>
  );
}

function ListBlock({ block }: { block: Extract<Block, { kind: 'list' }> }) {
  return (
    <div className="bullet-block">
      <h3 className="block-title">{block.title}</h3>
      <ul>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function Entries({ block }: { block: Extract<Block, { kind: 'entries' }> }) {
  return (
    <div className="entries">
      <h3 className="block-title">{block.title}</h3>
      <div className="entries__grid">
        {block.items.map((item) => (
          <article key={item.id} className="entry-card">
            <span className="entry-card__id" aria-hidden="true">
              {item.id}
            </span>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
            {item.source && <span className="entry-card__source">Quelle: {item.source}</span>}
          </article>
        ))}
      </div>
    </div>
  );
}

function Sources({ block }: { block: Extract<Block, { kind: 'sources' }> }) {
  return (
    <ol className="source-list">
      {block.items.map((source) => (
        <li key={source.id} className="source-list__item" id={`quelle-${source.id.toLowerCase()}`}>
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
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case 'callout':
      return <Callout block={block} />;
    case 'steps':
      return <Steps block={block} />;
    case 'stats':
      return <Stats block={block} />;
    case 'table':
      return <DataTable block={block} />;
    case 'quote':
      return <Quote block={block} />;
    case 'list':
      return <ListBlock block={block} />;
    case 'entries':
      return <Entries block={block} />;
    case 'sources':
      return <Sources block={block} />;
    default:
      return null;
  }
}

export function ArticleSection({ section }: { section: Section }) {
  return (
    <section className="article-section" id={section.id}>
      <p className="section-kicker">{section.kicker}</p>
      <h2>{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph} className="article-section__lead">
          {paragraph}
        </p>
      ))}
      {section.blocks.map((block, index) => (
        <BlockView key={`${block.kind}-${index}`} block={block} />
      ))}
    </section>
  );
}

export function SourceRefLink() {
  return (
    <a className="inline-link" href="#quellen">
      Quellen <IconArrow className="inline-link__icon" />
    </a>
  );
}
