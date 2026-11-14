import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { phagenReportage } from '../../content/bakteriophagen';
import { CinematicHero } from './CinematicHero';

describe('CinematicHero', () => {
  it('renders the headline, subheadline and working CTAs from reportage data', () => {
    render(
      <MemoryRouter>
        <CinematicHero reportage={phagenReportage} />
      </MemoryRouter>,
    );

    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveTextContent('Bacteria can be');
    expect(title).toHaveTextContent('fought.');
    expect(
      screen.getByText('Wenn Antibiotika an ihre Grenzen kommen, beginnt eine neue Geschichte.'),
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /Reportage entdecken/i })).toHaveAttribute(
      'href',
      '/reportagen/bakteriophagen',
    );
    expect(screen.getByRole('button', { name: /Wie funktioniert das/i })).toBeInTheDocument();
  });

  it('serves responsive hero media with alt text and dimensions', () => {
    render(
      <MemoryRouter>
        <CinematicHero reportage={phagenReportage} />
      </MemoryRouter>,
    );

    const image = screen.getByAltText(phagenReportage.hero.alt);
    expect(image).toHaveAttribute('srcset', phagenReportage.hero.srcSet);
    expect(image).toHaveAttribute('sizes', '100vw');
    expect(image).toHaveAttribute('width', '1672');
    expect(image).toHaveAttribute('height', '941');
    expect(image).toHaveAttribute('fetchpriority', 'high');
  });

  it('applies the reportage accent colours as CSS variables', () => {
    const { container } = render(
      <MemoryRouter>
        <CinematicHero reportage={phagenReportage} />
      </MemoryRouter>,
    );

    const hero = container.querySelector<HTMLElement>('.hero');
    expect(hero?.style.getPropertyValue('--accent')).toBe(phagenReportage.accent.primary);
    expect(hero?.style.getPropertyValue('--accent-2')).toBe(phagenReportage.accent.secondary);
  });
});
