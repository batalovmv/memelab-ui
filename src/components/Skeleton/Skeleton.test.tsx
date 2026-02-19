import { render } from '@testing-library/react';

import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders div', () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('has aria-hidden=true', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('has animate-pulse class', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass('animate-pulse');
  });

  it('applies rounded-lg by default', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass('rounded-lg');
  });

  it('applies rounded-full when circle=true', () => {
    const { container } = render(<Skeleton circle />);
    expect(container.firstChild).toHaveClass('rounded-full');
    expect(container.firstChild).not.toHaveClass('rounded-lg');
  });

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="w-20 h-20" />);
    expect(container.firstChild).toHaveClass('w-20', 'h-20');
  });
});
