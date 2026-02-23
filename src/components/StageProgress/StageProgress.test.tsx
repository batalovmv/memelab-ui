import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { StageProgress } from './StageProgress';

describe('StageProgress', () => {
  const stages = ['Draft', 'Review', 'Publish', 'Done'];

  it('renders all stages', () => {
    render(<StageProgress stages={stages} activeStage={1} />);

    expect(screen.getByText('Draft')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
    expect(screen.getByText('Publish')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('highlights current stage', () => {
    render(<StageProgress stages={stages} activeStage={1} />);
    const activeStage = screen.getByText('Review');

    expect(activeStage).toHaveClass('text-white');
  });

  it('marks completed stages', () => {
    render(<StageProgress stages={stages} activeStage={2} />);

    const first = screen.getByText('Draft');
    const second = screen.getByText('Review');

    expect(first).toHaveClass('text-emerald-400');
    expect(second).toHaveClass('text-emerald-400');
    expect(first.querySelector('svg')).toBeInTheDocument();
    expect(second.querySelector('svg')).toBeInTheDocument();
  });
});
