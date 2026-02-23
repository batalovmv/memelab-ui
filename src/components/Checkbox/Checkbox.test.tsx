import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders a checkbox input', () => {
    render(<Checkbox aria-label="Accept terms" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('reflects checked state', () => {
    const { rerender } = render(<Checkbox checked={false} onChange={() => {}} aria-label="Check" />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();

    rerender(<Checkbox checked={true} onChange={() => {}} aria-label="Check" />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('renders label when provided', () => {
    render(<Checkbox label="Remember me" />);
    expect(screen.getByText('Remember me')).toBeInTheDocument();
  });

  it('links label to input via htmlFor/id', () => {
    render(<Checkbox label="Accept terms" id="terms" />);
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'terms');
  });

  it('generates unique id when not provided', () => {
    render(<Checkbox label="Auto id" />);
    const input = screen.getByRole('checkbox');
    expect(input).toHaveAttribute('id');
    expect(input.id).toBeTruthy();
  });

  it('renders error message when provided', () => {
    render(<Checkbox error="This field is required" aria-label="Check" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByText('This field is required')).toHaveClass('text-rose-400');
  });

  it('is disabled when disabled prop is set', () => {
    render(<Checkbox disabled aria-label="Disabled check" />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('applies opacity and cursor styles when disabled', () => {
    render(<Checkbox disabled label="Disabled" />);
    const label = screen.getByText('Disabled').closest('label');
    expect(label).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('sets indeterminate property on input element', () => {
    render(<Checkbox indeterminate aria-label="Indeterminate" />);
    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
  });

  it('forwards ref to the input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} aria-label="Ref checkbox" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.type).toBe('checkbox');
  });

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox checked={false} onChange={onChange} aria-label="Clickable" />);

    await user.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox checked={false} onChange={onChange} disabled aria-label="Disabled" />);

    await user.click(screen.getByRole('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
