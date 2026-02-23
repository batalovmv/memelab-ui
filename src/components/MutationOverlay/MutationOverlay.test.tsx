import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MutationOverlay } from './MutationOverlay';

describe('MutationOverlay', () => {
  it('does not render overlay for idle status', () => {
    const { container } = render(<MutationOverlay status="idle" />);
    expect(container.firstChild).toBeNull();
  });

  it('shows spinner for saving status', () => {
    const { container } = render(<MutationOverlay status="saving" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('shows success icon and text for saved status', () => {
    const { container } = render(<MutationOverlay status="saved" />);
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(container.querySelector('svg.text-green-400')).toBeInTheDocument();
  });

  it('shows error message for error status', () => {
    render(<MutationOverlay status="error" errorText="Failed to save" />);
    expect(screen.getByText('Failed to save')).toBeInTheDocument();
  });
});
