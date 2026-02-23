import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { StatCard } from './StatCard';

describe('StatCard', () => {
  it('renders value and label', () => {
    render(<StatCard value="1,024" label="Total memes" />);

    expect(screen.getByText('1,024')).toBeInTheDocument();
    expect(screen.getByText('Total memes')).toBeInTheDocument();
  });

  it('renders trend information when provided', () => {
    render(<StatCard value={120} label="Views" trend={{ value: 12, label: 'vs last week' }} />);
    expect(screen.getByText('+12 vs last week')).toBeInTheDocument();
  });

  it('renders icon when icon prop is passed', () => {
    render(<StatCard value={99} label="Engagement" icon={<span data-testid="stat-icon">icon</span>} />);
    expect(screen.getByTestId('stat-icon')).toBeInTheDocument();
  });
});
