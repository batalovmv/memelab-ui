import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DotIndicator } from './DotIndicator';

describe('DotIndicator', () => {
  it('renders correct number of dots', () => {
    render(<DotIndicator remaining={2} max={5} />);

    const meter = screen.getByRole('meter', { name: '2/5' });
    expect(meter.querySelectorAll('span')).toHaveLength(5);
  });

  it('shows filled and empty states based on remaining value', () => {
    render(<DotIndicator remaining={2} max={5} />);

    const dots = screen.getByRole('meter', { name: '2/5' }).querySelectorAll('span');
    expect(dots).toHaveLength(5);

    expect(dots[0]).toHaveClass('bg-amber-400');
    expect(dots[1]).toHaveClass('bg-amber-400');
    expect(dots[2]).toHaveClass('bg-amber-400');
    expect(dots[3]).toHaveClass('bg-amber-400/30');
    expect(dots[4]).toHaveClass('bg-amber-400/30');
  });

  it('renders label when showLabel is enabled', () => {
    render(<DotIndicator remaining={3} max={6} showLabel />);
    expect(screen.getByText('3/6')).toBeInTheDocument();
  });
});
