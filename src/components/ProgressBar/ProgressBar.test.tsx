import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('renders progress bar with expected value and width', () => {
    render(<ProgressBar value={50} max={200} />);
    const bar = screen.getByRole('progressbar');
    const fill = bar.firstElementChild as HTMLElement;

    expect(bar).toHaveAttribute('aria-valuenow', '50');
    expect(fill).toHaveStyle({ width: '25%' });
  });

  it('renders label when provided', () => {
    render(<ProgressBar value={30} label="Upload progress" />);
    expect(screen.getByText('Upload progress')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { rerender } = render(<ProgressBar value={10} variant="primary" />);
    let fill = screen.getByRole('progressbar').firstElementChild as HTMLElement;
    expect(fill).toHaveClass('bg-primary');

    rerender(<ProgressBar value={10} variant="success" />);
    fill = screen.getByRole('progressbar').firstElementChild as HTMLElement;
    expect(fill).toHaveClass('bg-emerald-500');

    rerender(<ProgressBar value={10} variant="warning" />);
    fill = screen.getByRole('progressbar').firstElementChild as HTMLElement;
    expect(fill).toHaveClass('bg-amber-500');

    rerender(<ProgressBar value={10} variant="danger" />);
    fill = screen.getByRole('progressbar').firstElementChild as HTMLElement;
    expect(fill).toHaveClass('bg-rose-500');
  });
});
