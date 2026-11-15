import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LivingScienceBackground } from './LivingScienceBackground';

describe('LivingScienceBackground', () => {
  it('is decorative, non-interactive and layered', () => {
    const { container } = render(<LivingScienceBackground variant="story" />);
    const background = container.querySelector('.living-science');

    expect(background).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelectorAll('.living-science__layer')).toHaveLength(3);
    expect(container.querySelectorAll('a, button, input')).toHaveLength(0);
  });
});
