import { SITE_URL } from '../content/site';

export function buildArticleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  image: string;
  publishedAt: string;
  section: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: input.title,
    description: input.description,
    url: new URL(input.path, SITE_URL).href,
    image: [new URL(input.image, SITE_URL).href],
    datePublished: input.publishedAt,
    dateModified: input.publishedAt,
    articleSection: input.section,
    inLanguage: 'de',
    publisher: {
      '@type': 'Organization',
      name: 'Mays-Reportagen',
    },
  };
}

export function buildWebsiteJsonLd(input: {
  name: string;
  description: string;
  path?: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: input.name,
    description: input.description,
    url: new URL(input.path ?? '/', SITE_URL).href,
    inLanguage: 'de',
  };
}

export function buildCollectionJsonLd(input: {
  name: string;
  description: string;
  path: string;
  items: { name: string; path: string }[];
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    description: input.description,
    url: new URL(input.path, SITE_URL).href,
    inLanguage: 'de',
    hasPart: input.items.map((item) => ({
      '@type': 'Article',
      name: item.name,
      url: new URL(item.path, SITE_URL).href,
    })),
  };
}
