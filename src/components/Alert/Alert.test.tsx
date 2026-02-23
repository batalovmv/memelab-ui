import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Alert } from './Alert';

describe('Alert', () => {
  it.each([
    ['info', 'border-blue-500'],
    ['success', 'border-emerald-500'],
    ['warning', 'border-amber-500'],
    ['error', 'border-rose-500'],
  ] as const)('applies correct class for %s variant', (variant, expectedClass) => {
    render(
      <Alert variant={variant} title="Notice">
        Message
      </Alert>,
    );
    expect(screen.getByRole('alert')).toHaveClass(expectedClass);
  });

  it('renders title and children', () => {
    render(
      <Alert title="Connection restored">
        Everything is up again.
      </Alert>,
    );

    expect(screen.getByText('Connection restored')).toBeInTheDocument();
    expect(screen.getByText('Everything is up again.')).toBeInTheDocument();
  });

  it('calls onDismiss when dismiss button is clicked', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();

    render(<Alert onDismiss={onDismiss}>Dismiss me</Alert>);

    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not render dismiss button without onDismiss', () => {
    render(<Alert>No dismiss callback</Alert>);
    expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument();
  });
});
