import { useEffect, useState } from 'react';
import type { Section } from '../../content/types';

export function ArticleToc({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-18% 0px -68% 0px', threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className="article-toc" aria-label="Inhaltsverzeichnis">
      <p className="article-toc__label">In dieser Reportage</p>
      <nav>
        <ol>
          {sections.map((section, index) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={activeId === section.id ? 'is-active' : undefined}
                aria-current={activeId === section.id ? 'true' : undefined}
              >
                <span className="article-toc__index">{String(index + 1).padStart(2, '0')}</span>
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <a className="article-toc__top" href="#seitenanfang">
        Nach oben
      </a>
    </aside>
  );
}
