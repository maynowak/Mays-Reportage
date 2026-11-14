import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { phagenStory } from '../content/stories/bakteriophagen.story';
import { StoryReader } from './StoryReader';

function renderStory() {
  return render(
    <MemoryRouter>
      <StoryReader story={phagenStory} researchDate="14. November 2026" />
    </MemoryRouter>,
  );
}

describe('StoryReader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all seven chapters and chapter navigation', () => {
    renderStory();

    expect(screen.getByRole('heading', { level: 2, name: 'Wenn Antibiotika nicht mehr greifen' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Wie ein Phage ein Bakterium angreift' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Von der Wasserprobe zur geprüften Zubereitung' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Eine Geschichte in Stationen' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Zwei Zahlen und ihre Grenzen' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Forschung, Studium, Heilversuch, Angebot' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Sechs Fragen, sechs Antworten' })).toBeInTheDocument();

    const nav = screen.getByRole('navigation', { name: 'Kapitel dieser Reportage' });
    for (const chapter of phagenStory.chapters) {
      expect(within(nav).getByRole('link', { name: new RegExp(chapter.navLabel) })).toHaveAttribute(
        'href',
        `#${chapter.id}`,
      );
    }
  });

  it('steps through the five phage stages and disables impossible moves', async () => {
    const user = userEvent.setup();
    renderStory();

    expect(screen.getByRole('heading', { level: 3, name: 'Annäherung' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Zurück/ })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: /Weiter/ }));
    expect(screen.getByRole('heading', { level: 3, name: 'Bindung' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Schritt 5: Aufbrechen' }));
    expect(screen.getByRole('heading', { level: 3, name: 'Aufbrechen' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Weiter/ })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: /Zurück/ }));
    expect(screen.getByRole('heading', { level: 3, name: 'Vermehrung' })).toBeInTheDocument();
  });

  it('offers a clickable timeline and filters institutions by category', async () => {
    const user = userEvent.setup();
    renderStory();

    const rail = screen.getByRole('navigation', { name: 'Stationen der Zeitleiste' });
    expect(within(rail).getByRole('link', { name: /Königin-Astrid/ })).toHaveAttribute(
      'href',
      '#timeline-bruessel',
    );
    expect(screen.getAllByText('260 Therapieanfragen in Belgien').length).toBeGreaterThan(0);

    expect(screen.getByRole('heading', { name: 'PhagoFlow · Bundeswehrkrankenhaus Berlin' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Forschungseinrichtungen' }));

    expect(screen.queryByRole('heading', { name: 'PhagoFlow · Bundeswehrkrankenhaus Berlin' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'DSMZ Braunschweig' })).toBeInTheDocument();
    expect(screen.getByText('4 Einrichtungen in dieser Kategorie')).toBeInTheDocument();
  });

  it('opens all fact-check answers and exposes source links', async () => {
    const user = userEvent.setup();
    const { container } = renderStory();

    const items = container.querySelectorAll<HTMLDetailsElement>('.factcheck-item');
    expect(items).toHaveLength(6);
    expect([...items].every((item) => !item.open)).toBe(true);

    await user.click(screen.getByRole('button', { name: 'Alle Antworten öffnen' }));
    expect([...items].every((item) => item.open)).toBe(true);

    await user.click(screen.getByRole('button', { name: 'Alle schließen' }));
    expect([...items].every((item) => !item.open)).toBe(true);

    expect(screen.getByText('Sind Bakteriophagen Würmer?')).toBeInTheDocument();
  });

  it('copies the current URL without external tracking', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    renderStory();

    await user.click(screen.getByRole('button', { name: 'Link kopieren' }));

    expect(writeText).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Link kopiert.')).toBeInTheDocument();
  });

  it('keeps the medical note and all 14 source references', () => {
    renderStory();

    expect(screen.getByRole('heading', { name: 'Medizinischer Hinweis' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Originalquelle öffnen/i })).toHaveLength(14);
    expect(screen.getByRole('heading', { name: 'Keine Behandlungsgarantie' })).toBeInTheDocument();
  });
});
