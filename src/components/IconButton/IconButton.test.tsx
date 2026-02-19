import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';

import { IconButton } from './IconButton';

const icon = <svg data-testid="icon" />;

describe('IconButton', () => {
  it('renders button with aria-label', () => {
    render(<IconButton icon={icon} aria-label="Close" />);
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('renders icon', () => {
    render(<IconButton icon={icon} aria-label="Close" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies primary variant class', () => {
    render(<IconButton icon={icon} aria-label="Action" variant="primary" />);
    expect(screen.getByRole('button')).toHaveClass('bg-primary');
  });

  it('applies ghost variant class by default', () => {
    render(<IconButton icon={icon} aria-label="Action" />);
    expect(screen.getByRole('button')).toHaveClass('hover:bg-white/10');
  });

  it('applies sm size classes', () => {
    render(<IconButton icon={icon} aria-label="Action" size="sm" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-7', 'h-7');
  });

  it('applies md size classes by default', () => {
    render(<IconButton icon={icon} aria-label="Action" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-9', 'h-9');
  });

  it('applies lg size classes', () => {
    render(<IconButton icon={icon} aria-label="Action" size="lg" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-11', 'h-11');
  });

  it('handles disabled state', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<IconButton icon={icon} aria-label="Action" disabled onClick={onClick} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<IconButton ref={ref} icon={icon} aria-label="Action" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('defaults type to button', () => {
    render(<IconButton icon={icon} aria-label="Action" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('sets type=submit when specified', () => {
    render(<IconButton icon={icon} aria-label="Action" type="submit" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
