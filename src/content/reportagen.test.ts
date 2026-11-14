import { describe, expect, it } from 'vitest';
import {
  getFeaturedReportage,
  getOtherReportagen,
  getReportage,
  listPublishedReportagen,
  publishedReportagen,
  selectPublished,
  upcomingReportagen,
} from './reportagen';

describe('reportage registry', () => {
  it('features the Bakteriophagen story as the highest priority entry', () => {
    expect(getFeaturedReportage().slug).toBe('bakteriophagen');
    expect(getFeaturedReportage().priority).toBeGreaterThanOrEqual(100);
  });

  it('sorts published reportagen by priority descending', () => {
    const priorities = listPublishedReportagen().map((reportage) => reportage.priority);
    expect(priorities).toEqual([...priorities].sort((a, b) => b - a));
  });

  it('keeps slugs unique and resolvable', () => {
    const slugs = publishedReportagen.map((reportage) => reportage.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(getReportage(slug)?.slug).toBe(slug));
    expect(getReportage('does-not-exist')).toBeUndefined();
  });

  it('excludes the current story from related stories', () => {
    expect(getOtherReportagen('bakteriophagen')).toHaveLength(0);
  });

  it('excludes drafts from the published selection and hero', () => {
    const drafts = [
      { status: 'draft' as const, priority: 999, slug: 'entwurf' },
      { status: 'published' as const, priority: 10, slug: 'live' },
    ];
    expect(selectPublished(drafts).map((entry) => entry.slug)).toEqual(['live']);
    expect(listPublishedReportagen().every((entry) => entry.status === 'published')).toBe(true);
    expect(getReportage('entwurf')).toBeUndefined();
  });

  it('provides upcoming teasers without published links', () => {
    expect(upcomingReportagen.length).toBeGreaterThan(0);
    upcomingReportagen.forEach((item) => {
      expect(item.title).toBeTruthy();
      expect(item.teaser).toBeTruthy();
    });
  });

  it('keeps every source id unique and linked', () => {
    const sourceIds = getFeaturedReportage().sources.map((source) => source.id);
    expect(new Set(sourceIds).size).toBe(sourceIds.length);
    getFeaturedReportage().sources.forEach((source) => {
      expect(source.url).toMatch(/^https:\/\//);
    });
  });

  it('renders every section with a heading and body copy', () => {
    getFeaturedReportage().sections.forEach((section) => {
      expect(section.id).toBeTruthy();
      expect(section.title).toBeTruthy();
      expect(section.paragraphs.length).toBeGreaterThan(0);
      expect(section.blocks.length).toBeGreaterThan(0);
    });
  });
});
