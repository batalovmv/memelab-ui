import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { LoadingScreen } from './LoadingScreen';

describe('LoadingScreen', () => {
  it('renders with role="status"', () => {
    render(<LoadingScreen />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders a spinner', () => {
    const { container } = render(<LoadingScreen />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('renders message when provided', () => {
    render(<LoadingScreen message="Loading your data…" />);
    expect(screen.getByText('Loading your data…')).toBeInTheDocument();
  });

  it('does not render message when not provided', () => {
    const { container } = render(<LoadingScreen />);
    expect(container.querySelector('p')).toBeNull();
  });

  it('applies custom className', () => {
    render(<LoadingScreen className="custom-class" />);
    expect(screen.getByRole('status')).toHaveClass('custom-class');
  });

  it('uses full viewport height', () => {
    render(<LoadingScreen />);
    expect(screen.getByRole('status')).toHaveClass('min-h-screen');
  });
});
