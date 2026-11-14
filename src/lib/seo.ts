import { useEffect } from 'react';

const SEO_ATTR = 'data-managed-seo';

function setMeta(attribute: 'name' | 'property', key: string, content: string): void {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    element.setAttribute(SEO_ATTR, 'true');
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setLink(
  rel: string,
  href: string,
  extra?: Record<string, string>,
  selector = `link[rel="${rel}"]`,
): void {
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    element.setAttribute(SEO_ATTR, 'true');
    document.head.appendChild(element);
  }
  element.href = href;
  Object.entries(extra ?? {}).forEach(([name, value]) => element?.setAttribute(name, value));
}

export interface SeoInput {
  title: string;
  description: string;
  canonicalPath: string;
  image: string;
  imageAlt: string;
  type?: 'website' | 'article';
  preloadImage?: string;
  preloadSrcSet?: string;
  jsonLd?: Record<string, unknown>;
  noIndex?: boolean;
}

export function useSeo(input: SeoInput): void {
  const {
    title,
    description,
    canonicalPath,
    image,
    imageAlt,
    type = 'website',
    preloadImage,
    preloadSrcSet,
    jsonLd,
    noIndex = false,
  } = input;

  useEffect(() => {
    document.title = title;
    const absolute = (path: string) =>
      typeof window === 'undefined' ? path : new URL(path, window.location.origin).href;

    setMeta('name', 'description', description);
    setMeta('name', 'robots', noIndex ? 'noindex,follow' : 'index,follow');
    setLink('canonical', absolute(canonicalPath));
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:image', absolute(image));
    setMeta('property', 'og:image:alt', imageAlt);
    setMeta('property', 'og:url', absolute(canonicalPath));
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', absolute(image));
    setMeta('name', 'twitter:image:alt', imageAlt);

    if (preloadImage) {
      setLink(
        'preload',
        absolute(preloadImage),
        {
          as: 'image',
          ...(preloadSrcSet ? { imagesrcset: preloadSrcSet, imagesizes: '100vw' } : {}),
        },
        'link[rel="preload"][as="image"]',
      );
    }

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute(SEO_ATTR, 'true');
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      script?.remove();
    };
  }, [
    title,
    description,
    canonicalPath,
    image,
    imageAlt,
    type,
    preloadImage,
    preloadSrcSet,
    jsonLd,
    noIndex,
  ]);
}

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
    url: input.path,
    image: [input.image],
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
