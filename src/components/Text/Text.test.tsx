import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Text } from './Text';

describe('Text', () => {
  it('renders as p by default', () => {
    render(<Text>Paragraph</Text>);
    expect(screen.getByText('Paragraph').tagName).toBe('P');
  });

  it('renders as span when inline', () => {
    render(<Text inline>Inline text</Text>);
    expect(screen.getByText('Inline text').tagName).toBe('SPAN');
  });

  it('applies size classes', () => {
    render(<Text size="xs" data-testid="t">Text</Text>);
    expect(screen.getByTestId('t')).toHaveClass('text-xs');
  });

  it('applies color variants', () => {
    render(<Text color="danger" data-testid="t">Text</Text>);
    expect(screen.getByTestId('t')).toHaveClass('text-rose-400');
  });

  it('applies weight', () => {
    render(<Text weight="semibold" data-testid="t">Text</Text>);
    expect(screen.getByTestId('t')).toHaveClass('font-semibold');
  });

  it('truncates with truncate prop', () => {
    render(<Text truncate data-testid="t">Long text</Text>);
    expect(screen.getByTestId('t')).toHaveClass('truncate');
  });
});
