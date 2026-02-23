import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { NotificationBell } from './NotificationBell';

describe('NotificationBell', () => {
  it('renders with default bell icon', () => {
    render(<NotificationBell />);
    expect(screen.getByRole('button', { name: /notifications/i })).toBeInTheDocument();
  });

  it('shows count badge', () => {
    render(<NotificationBell count={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('caps count at maxCount', () => {
    render(<NotificationBell count={150} maxCount={99} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('hides badge when count is 0', () => {
    render(<NotificationBell count={0} />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('hides badge when count is undefined', () => {
    render(<NotificationBell />);
    // No badge span should exist
    const button = screen.getByRole('button');
    const badges = button.querySelectorAll('.bg-rose-500');
    expect(badges.length).toBe(0);
  });

  it('includes count in aria-label', () => {
    render(<NotificationBell count={3} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Notifications (3)');
  });

  it('uses custom aria-label', () => {
    render(<NotificationBell count={3} aria-label="Custom label" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Custom label');
  });

  it('fires onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<NotificationBell onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('accepts custom icon', () => {
    render(<NotificationBell icon={<span data-testid="custom-icon">🔔</span>} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('supports disabled state', () => {
    render(<NotificationBell disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders ping animation when ping=true and has count', () => {
    const { container } = render(<NotificationBell count={1} ping />);
    expect(container.querySelector('.animate-ping')).toBeInTheDocument();
  });
});
