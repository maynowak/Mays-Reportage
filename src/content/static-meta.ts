import { getFeaturedReportage, listPublishedReportagen, site } from './reportagen';
import { buildArticleJsonLd, buildCollectionJsonLd, buildWebsiteJsonLd } from '../lib/structured-data';

export interface StaticPageMeta {
  path: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  type: 'website' | 'article';
  jsonLd?: Record<string, unknown>;
  publishedTime?: string;
  section?: string;
}

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

export { OG_WIDTH, OG_HEIGHT };

export function buildStaticPages(): StaticPageMeta[] {
  const featured = getFeaturedReportage();
  const published = listPublishedReportagen();
  const genericImage = featured.hero.ogImage;
  const genericAlt = 'KI-generierte Illustration von Bakteriophagen und einer Bakterie.';

  const pages: StaticPageMeta[] = [
    {
      path: '/',
      title: site.title,
      description: site.description,
      image: genericImage,
      imageAlt: featured.hero.alt,
      type: 'website',
      jsonLd: buildWebsiteJsonLd({
        name: site.name,
        description: site.description,
        path: '/',
      }),
    },
    {
      path: '/reportagen',
      title: 'Alle Reportagen — Mays-Reportagen',
      description:
        'Das Archiv von Mays-Reportagen: veröffentlichte Titelgeschichten und angekündigte Themen.',
      image: genericImage,
      imageAlt: genericAlt,
      type: 'website',
      jsonLd: buildCollectionJsonLd({
        name: 'Alle Reportagen',
        description: 'Veröffentlichte Wissenschaftsreportagen von Mays-Reportagen.',
        path: '/reportagen',
        items: published.map((reportage) => ({
          name: reportage.title,
          path: `/reportagen/${reportage.slug}`,
        })),
      }),
    },
    ...published.map((reportage) => ({
      path: `/reportagen/${reportage.slug}`,
      title: `${reportage.title} — Mays-Reportagen`,
      description: reportage.teaser,
      image: reportage.hero.ogImage,
      imageAlt: reportage.hero.alt,
      type: 'article' as const,
      jsonLd: buildArticleJsonLd({
        title: reportage.title,
        description: reportage.teaser,
        path: `/reportagen/${reportage.slug}`,
        image: reportage.hero.ogImage,
        publishedAt: reportage.publishedAt,
        section: reportage.tags[0] ?? 'Reportage',
      }),
      publishedTime: reportage.publishedAt,
      section: reportage.tags[0] ?? 'Reportage',
    })),
    {
      path: '/ueber-uns',
      title: 'Über uns — Mays-Reportagen',
      description:
        'Wie Mays-Reportagen arbeitet: unabhängige Recherche, sichtbare Quellen und die Grenzen zwischen Bericht und medizinischer Empfehlung.',
      image: genericImage,
      imageAlt: genericAlt,
      type: 'website',
    },
    {
      path: '/impressum',
      title: 'Impressum — Mays-Reportagen',
      description:
        'Impressum und Anbieterkennzeichnung von Mays-Reportagen, einem redaktionellen Wissenschaftsmagazin.',
      image: genericImage,
      imageAlt: genericAlt,
      type: 'website',
    },
    {
      path: '/datenschutz',
      title: 'Datenschutz — Mays-Reportagen',
      description:
        'Datenschutzhinweise von Mays-Reportagen: statisches Hosting bei Vercel, keine Cookies, kein Tracking, lokal gespeicherte Schriftarten.',
      image: genericImage,
      imageAlt: genericAlt,
      type: 'website',
    },
    {
      path: '/bildnachweis',
      title: 'Bildnachweis — Mays-Reportagen',
      description:
        'Herkunft und Kennzeichnung der KI-generierten Illustrationen von Mays-Reportagen.',
      image: genericImage,
      imageAlt: genericAlt,
      type: 'website',
    },
  ];

  return pages;
}
