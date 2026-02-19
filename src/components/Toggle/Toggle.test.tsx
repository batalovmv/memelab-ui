import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('renders switch role', () => {
    render(<Toggle checked={false} onChange={() => {}} aria-label="Toggle switch" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('reflects checked state via aria-checked', () => {
    const { rerender } = render(<Toggle checked={false} onChange={() => {}} aria-label="Toggle" />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');

    rerender(<Toggle checked={true} onChange={() => {}} aria-label="Toggle" />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onChange on click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} aria-label="Toggle" />);

    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('calls onChange with opposite value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(<Toggle checked={true} onChange={onChange} aria-label="Toggle" />);

    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(false);

    onChange.mockClear();
    rerender(<Toggle checked={false} onChange={onChange} aria-label="Toggle" />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('disabled prevents click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} disabled aria-label="Toggle" />);

    await user.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders label when provided', () => {
    render(<Toggle checked={false} onChange={() => {}} label="Enable notifications" />);
    expect(screen.getByText('Enable notifications')).toBeInTheDocument();
  });

  it('uses label as aria-label when aria-label not provided', () => {
    render(<Toggle checked={false} onChange={() => {}} label="Enable notifications" />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-label', 'Enable notifications');
  });

  it('prefers explicit aria-label over label', () => {
    render(<Toggle checked={false} onChange={() => {}} label="Visible label" aria-label="Screen reader label" />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-label', 'Screen reader label');
  });

  it('applies size classes', () => {
    const { rerender } = render(<Toggle checked={false} onChange={() => {}} size="sm" aria-label="Small toggle" />);
    expect(screen.getByRole('switch')).toHaveClass('w-9', 'h-5');

    rerender(<Toggle checked={false} onChange={() => {}} size="md" aria-label="Medium toggle" />);
    expect(screen.getByRole('switch')).toHaveClass('w-11', 'h-6');
  });

  it('applies default size', () => {
    render(<Toggle checked={false} onChange={() => {}} aria-label="Toggle" />);
    expect(screen.getByRole('switch')).toHaveClass('w-11', 'h-6'); // md is default
  });

  it('applies checked background color', () => {
    const { rerender } = render(<Toggle checked={true} onChange={() => {}} aria-label="Toggle" />);
    expect(screen.getByRole('switch')).toHaveClass('bg-primary');

    rerender(<Toggle checked={false} onChange={() => {}} aria-label="Toggle" />);
    expect(screen.getByRole('switch')).toHaveClass('bg-surface-300');
  });

  it('applies disabled styles', () => {
    render(<Toggle checked={false} onChange={() => {}} disabled aria-label="Toggle" />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveClass('opacity-50', 'cursor-not-allowed');
    expect(toggle).toBeDisabled();
  });

  it('has button type', () => {
    render(<Toggle checked={false} onChange={() => {}} aria-label="Toggle" />);
    expect(screen.getByRole('switch')).toHaveAttribute('type', 'button');
  });
});
