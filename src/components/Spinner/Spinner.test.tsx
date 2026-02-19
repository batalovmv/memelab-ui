import { render } from '@testing-library/react';

import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with aria-hidden', () => {
    const { container } = render(<Spinner />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveAttribute('aria-hidden', 'true');
  });

  it('has animate-spin class', () => {
    const { container } = render(<Spinner />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveClass('animate-spin');
  });

  it('applies size classes for sm', () => {
    const { container } = render(<Spinner size="sm" />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveClass('h-3', 'w-3', 'border');
  });

  it('applies size classes for md', () => {
    const { container } = render(<Spinner size="md" />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveClass('h-4', 'w-4', 'border-2');
  });

  it('applies size classes for lg', () => {
    const { container } = render(<Spinner size="lg" />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveClass('h-6', 'w-6', 'border-2');
  });

  it('applies default size md', () => {
    const { container } = render(<Spinner />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveClass('h-4', 'w-4', 'border-2');
  });

  it('applies custom className', () => {
    const { container } = render(<Spinner className="custom-spinner" />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveClass('custom-spinner');
  });

  it('has rounded-full class', () => {
    const { container } = render(<Spinner />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveClass('rounded-full');
  });

  it('has border color classes', () => {
    const { container } = render(<Spinner />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveClass('border-white/15', 'border-t-primary');
  });

  it('renders as span element', () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild?.nodeName).toBe('SPAN');
  });
});
