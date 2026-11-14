import type { Story } from '../../story/types';
import { phagenStory } from './bakteriophagen.story';

const stories: Record<string, Story> = {
  [phagenStory.slug]: phagenStory,
};

export function getStory(slug: string | undefined): Story | undefined {
  return slug ? stories[slug] : undefined;
}

export function listStories(): Story[] {
  return Object.values(stories);
}
