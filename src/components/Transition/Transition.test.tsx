import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Transition } from './Transition';

describe('Transition', () => {
  it('renders children when show=true', () => {
    render(<Transition show>Hello</Transition>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('does not render when show=false (unmountOnHide default)', () => {
    render(<Transition show={false}>Hidden</Transition>);
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('applies transition-all class on wrapper div', () => {
    render(<Transition show>Content</Transition>);
    // The Transition component wraps children in a <div> with transition-all
    const el = screen.getByText('Content');
    expect(el).toHaveClass('transition-all');
  });

  it('sets aria-hidden=true when show=false and unmountOnHide=false', () => {
    const { rerender } = render(
      <Transition show unmountOnHide={false}>Content</Transition>,
    );
    rerender(
      <Transition show={false} unmountOnHide={false}>Content</Transition>,
    );
    expect(screen.getByText('Content')).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies custom duration as inline style', () => {
    render(<Transition show duration={500}>Content</Transition>);
    expect(screen.getByText('Content')).toHaveStyle({ transitionDuration: '500ms' });
  });

  it('applies exit classes when show transitions to false with unmountOnHide=false', () => {
    const { rerender } = render(
      <Transition show unmountOnHide={false} preset="scale">Content</Transition>,
    );
    rerender(
      <Transition show={false} unmountOnHide={false} preset="scale">Content</Transition>,
    );
    const el = screen.getByText('Content');
    expect(el).toHaveClass('opacity-0', 'scale-95');
  });

  it('unmounts after duration when show becomes false', () => {
    vi.useFakeTimers();
    const { rerender } = render(<Transition show duration={200}>Content</Transition>);
    expect(screen.getByText('Content')).toBeInTheDocument();

    rerender(<Transition show={false} duration={200}>Content</Transition>);
    // Still mounted during animation
    expect(screen.queryByText('Content')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
    vi.useRealTimers();
  });
});
