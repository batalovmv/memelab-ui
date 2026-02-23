import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Heading } from './Heading';

describe('Heading', () => {
  it('renders h2 by default', () => {
    render(<Heading>Title</Heading>);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders correct heading level', () => {
    for (const level of [1, 3, 4, 5, 6] as const) {
      const { unmount } = render(<Heading level={level}>Title</Heading>);
      expect(screen.getByRole('heading', { level })).toBeInTheDocument();
      unmount();
    }
  });

  it('applies size class override', () => {
    render(<Heading size="xs">Title</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('text-sm');
  });

  it('applies gradient color', () => {
    render(<Heading color="gradient">Title</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('text-gradient');
  });

  it('applies muted color', () => {
    render(<Heading color="muted">Title</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('text-white/70');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLHeadingElement>();
    render(<Heading ref={ref}>Title</Heading>);
    expect(ref.current?.tagName).toBe('H2');
  });
});
