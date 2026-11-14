export interface Source {
  id: string;
  label: string;
  url: string;
}

export interface Stat {
  value: string;
  label: string;
  note?: string;
}

export type Block =
  | { kind: 'callout'; tone: 'fact' | 'warning' | 'info'; title: string; text: string; source?: string }
  | { kind: 'steps'; title: string; items: { title: string; text: string }[] }
  | { kind: 'stats'; items: Stat[] }
  | { kind: 'table'; caption: string; head: string[]; rows: string[][] }
  | { kind: 'quote'; text: string; attribution: string }
  | { kind: 'list'; title: string; items: string[] }
  | { kind: 'entries'; title: string; items: { id: string; title: string; text: string; source?: string }[] }
  | { kind: 'sources'; items: Source[] };

export interface Section {
  id: string;
  kicker: string;
  title: string;
  paragraphs: string[];
  blocks: Block[];
}

export interface HeroImage {
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
  alt: string;
  ogImage: string;
  caption?: string;
}

export interface Reportage {
  slug: string;
  status: 'published' | 'draft';
  title: string;
  eyebrow: string;
  headlineLead: string;
  headlineAccent: string;
  subheadline: string;
  teaser: string;
  readingTime: string;
  researchDate: string;
  publishedAt: string;
  priority: number;
  tags: string[];
  accent: { primary: string; secondary: string; warm: string };
  hero: HeroImage;
  facts: Stat[];
  sections: Section[];
  medicalNote: string;
  sources: Source[];
}

export interface UpcomingReportage {
  title: string;
  topic: string;
  teaser: string;
  accent: string;
}
