import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CooldownRing } from './CooldownRing';

describe('CooldownRing', () => {
  it('renders svg image element', () => {
    render(<CooldownRing duration={60} remaining={45} />);
    expect(screen.getByRole('img', { name: 'Cooldown: 45 seconds remaining' })).toBeInTheDocument();
  });

  it('shows rounded-up remaining value in center label', () => {
    render(<CooldownRing duration={30} remaining={12.2} />);
    expect(screen.getByText('13')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    render(<CooldownRing duration={20} remaining={10} size="lg" />);
    const label = screen.getByText('10');
    const root = label.parentElement as HTMLElement;

    expect(root).toHaveClass('w-16', 'h-16');
  });
});
