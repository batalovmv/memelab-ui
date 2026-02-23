import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { VisuallyHidden } from './VisuallyHidden';

describe('VisuallyHidden', () => {
  it('renders children', () => {
    render(<VisuallyHidden>Hidden text</VisuallyHidden>);
    expect(screen.getByText('Hidden text')).toBeInTheDocument();
  });

  it('applies sr-only-like inline styles', () => {
    render(<VisuallyHidden>Hidden</VisuallyHidden>);
    const el = screen.getByText('Hidden');
    expect(el).toHaveStyle({ position: 'absolute', width: '1px', height: '1px' });
  });

  it('renders as span by default', () => {
    render(<VisuallyHidden>Text</VisuallyHidden>);
    expect(screen.getByText('Text').tagName).toBe('SPAN');
  });

  it('renders as div when as="div"', () => {
    render(<VisuallyHidden as="div">Text</VisuallyHidden>);
    expect(screen.getByText('Text').tagName).toBe('DIV');
  });

  it('passes through additional props', () => {
    render(<VisuallyHidden data-testid="vh-el">Text</VisuallyHidden>);
    expect(screen.getByTestId('vh-el')).toBeInTheDocument();
  });
});
