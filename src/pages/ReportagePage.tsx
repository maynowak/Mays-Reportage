import { useParams } from 'react-router-dom';
import { NeonButton } from '../components/ui/NeonButton';
import { IconArrow } from '../components/ui/icons';
import { ReadingProgress } from '../components/layout/ReadingProgress';
import { ArticleSection } from '../components/reportage/ArticleBlocks';
import { ArticleToc } from '../components/reportage/ArticleToc';
import { RelatedReportagen } from '../components/reportage/RelatedReportagen';
import { ReportageHero } from '../components/reportage/ReportageHero';
import { getReportage } from '../content/reportagen';
import { getStory } from '../content/stories';
import { StoryReader } from '../story/StoryReader';
import { buildArticleJsonLd, useSeo } from '../lib/seo';
import { NotFoundPage } from './NotFoundPage';

export function ReportagePage() {
  const { slug } = useParams();
  const reportage = getReportage(slug);
  const story = getStory(reportage?.slug);

  useSeo({
    title: reportage ? `${reportage.title} — Mays-Reportagen` : 'Reportage nicht gefunden — Mays-Reportagen',
    description: reportage?.teaser ?? 'Diese Reportage ist nicht verfügbar.',
    canonicalPath: reportage ? `/reportagen/${reportage.slug}` : '/reportagen',
    image: reportage?.hero.ogImage ?? '/media/phagen/og-phagen.jpg',
    imageAlt: reportage?.hero.alt ?? 'Mays-Reportagen',
    type: 'article',
    preloadImage: reportage?.hero.src,
    preloadSrcSet: reportage?.hero.srcSet,
    noIndex: !reportage,
    jsonLd: reportage
      ? buildArticleJsonLd({
          title: reportage.title,
          description: reportage.teaser,
          path: `/reportagen/${reportage.slug}`,
          image: reportage.hero.ogImage,
          publishedAt: reportage.publishedAt,
          section: reportage.tags[0] ?? 'Reportage',
        })
      : undefined,
  });

  if (!reportage) {
    return <NotFoundPage />;
  }

  return (
    <div id="seitenanfang">
      <ReadingProgress />
      <ReportageHero reportage={reportage} />

      {story ? (
        <StoryReader story={story} researchDate={reportage.researchDate} />
      ) : (
        <div className="container article-layout">
          <ArticleToc sections={reportage.sections} />

          <article className="article-body" aria-label="Reportagetext">
            {reportage.sections.map((section) => (
              <ArticleSection key={section.id} section={section} />
            ))}

            <aside className="medical-note" id="hinweis" aria-labelledby="medical-note-title">
              <span className="medical-note__icon" aria-hidden="true">
                +
              </span>
              <div>
                <h2 id="medical-note-title">Medizinischer Hinweis</h2>
                <p>{reportage.medicalNote}</p>
              </div>
            </aside>

            <footer className="article-footer">
              <p>
                Recherche und Quellenprüfung: {reportage.researchDate}. Erstellt als strukturierte
                Zusammenfassung einer Recherche zur Phagentherapie.
              </p>
              <NeonButton variant="ghost" to="/#reportagen">
                Alle Reportagen
                <IconArrow className="btn__icon" />
              </NeonButton>
            </footer>
          </article>
        </div>
      )}

      <RelatedReportagen slug={reportage.slug} />
    </div>
  );
}
