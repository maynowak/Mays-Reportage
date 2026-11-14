import { phagenReportage } from './bakteriophagen';
import type { Reportage, UpcomingReportage } from './types';

export const site = {
  name: 'Mays-Reportagen',
  claim: 'Die Wissenschaft des Möglichen',
  description:
    'Unabhängiges Online-Reportagemagazin über Wissenschaft, Medizin und die Menschen dahinter.',
  issue: 'Ausgabe 01 · 2026',
} as const;

export const publishedReportagen: Reportage[] = [phagenReportage];

/** New reportagen only need a new entry here – the hero and routes are generic. */
export const upcomingReportagen: UpcomingReportage[] = [
  {
    title: 'Resistenz ohne Grenzen',
    topic: 'Antibiotikaresistenzen',
    teaser:
      'Wie Erreger gegen unsere stärksten Medikamente immun werden – und welche Wege aus der Krise führen.',
    accent: '#c2412d',
  },
  {
    title: 'Die unsichtbare Fabrik',
    topic: 'Mikrobiom',
    teaser:
      'Was die Gemeinschaft aus Bakterien, Viren und Pilzen in und auf uns wirklich leistet.',
    accent: '#6d5bd0',
  },
  {
    title: 'Ein Gesundheitswesen, das rechnet',
    topic: 'One Health',
    teaser:
      'Warum menschliche Gesundheit ohne Tier- und Umweltgesundheit nicht zu haben ist.',
    accent: '#008b84',
  },
];

export function listPublishedReportagen(): Reportage[] {
  return selectPublished(publishedReportagen);
}

/** Published-only selection keeps drafts out of hero, archive and routing. */
export function selectPublished<T extends { status: 'published' | 'draft'; priority: number; slug: string }>(
  reportagen: T[],
): T[] {
  return reportagen
    .filter((reportage) => reportage.status === 'published')
    .sort((a, b) => b.priority - a.priority || a.slug.localeCompare(b.slug));
}

export function getFeaturedReportage(): Reportage {
  const [featured] = listPublishedReportagen();
  if (!featured) throw new Error('Keine veröffentlichte Reportage vorhanden.');
  return featured;
}

export function getReportage(slug: string | undefined): Reportage | undefined {
  return publishedReportagen.find(
    (reportage) => reportage.slug === slug && reportage.status === 'published',
  );
}

export function getOtherReportagen(slug: string): Reportage[] {
  return listPublishedReportagen().filter((reportage) => reportage.slug !== slug);
}
