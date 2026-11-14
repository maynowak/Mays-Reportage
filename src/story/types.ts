import type { Source } from '../content/types';

export interface StorySourceRef {
  sourceIds: string[];
}

export interface ChapterBase {
  id: string;
  kicker: string;
  title: string;
  navLabel: string;
  lead: string;
}

export interface IntroChapter extends ChapterBase {
  kind: 'intro';
  paragraphs: string[];
  sourceIds?: string[];
  pullquote?: { text: string; attribution: string };
}

export interface CycleStage extends StorySourceRef {
  title: string;
  short: string;
  detail: string;
}

export interface PhageCycleChapter extends ChapterBase {
  kind: 'phage-cycle';
  stages: CycleStage[];
  caption: string;
}

export interface ProcessStep extends StorySourceRef {
  title: string;
  text: string;
}

export interface ProcessChapter extends ChapterBase {
  kind: 'process';
  steps: ProcessStep[];
  warning: string;
  warningSourceIds: string[];
}

export interface TimelineEvent extends StorySourceRef {
  id: string;
  date: string;
  title: string;
  text: string;
  tag: string;
}

export interface TimelineChapter extends ChapterBase {
  kind: 'timeline';
  events: TimelineEvent[];
}

export interface EvidenceMetric extends StorySourceRef {
  id: string;
  display: string;
  value: number;
  label: string;
  denominator: string;
  caveat: string;
}

export interface EvidenceChapter extends ChapterBase {
  kind: 'evidence';
  metrics: EvidenceMetric[];
  limitations: string[];
  adverse: { title: string; text: string } & StorySourceRef;
}

export type PlaceCategory = 'forschung' | 'studien' | 'heilversuche' | 'angebote';

export interface StoryPlace extends StorySourceRef {
  id: string;
  name: string;
  location: string;
  categories: PlaceCategory[];
  type: string;
  text: string;
  offer: string;
}

export interface InstitutionsChapter extends ChapterBase {
  kind: 'institutions';
  categories: { id: PlaceCategory; label: string; description: string }[];
  places: StoryPlace[];
  caveat: string;
}

export interface FactItem extends StorySourceRef {
  id: string;
  question: string;
  answer: string;
}

export interface FactCheckChapter extends ChapterBase {
  kind: 'factcheck';
  items: FactItem[];
  note: string;
}

export type StoryChapter =
  | IntroChapter
  | PhageCycleChapter
  | ProcessChapter
  | TimelineChapter
  | EvidenceChapter
  | InstitutionsChapter
  | FactCheckChapter;

export type StoryChapterKind = StoryChapter['kind'];

export interface Story {
  slug: string;
  title: string;
  chapters: StoryChapter[];
  sources: Source[];
  medicalNote: string;
}
