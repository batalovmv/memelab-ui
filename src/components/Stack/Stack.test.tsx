import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Stack } from './Stack';

describe('Stack', () => {
  it('renders vertical flex by default', () => {
    render(<Stack data-testid="stack"><span>A</span></Stack>);
    expect(screen.getByTestId('stack')).toHaveClass('flex', 'flex-col');
  });

  it('renders horizontal flex', () => {
    render(<Stack direction="horizontal" data-testid="stack"><span>A</span></Stack>);
    expect(screen.getByTestId('stack')).toHaveClass('flex', 'flex-row');
  });

  it('applies gap class', () => {
    render(<Stack gap={2} data-testid="stack"><span>A</span></Stack>);
    expect(screen.getByTestId('stack')).toHaveClass('gap-2');
  });

  it('applies align class', () => {
    render(<Stack align="center" data-testid="stack"><span>A</span></Stack>);
    expect(screen.getByTestId('stack')).toHaveClass('items-center');
  });

  it('applies justify class', () => {
    render(<Stack justify="between" data-testid="stack"><span>A</span></Stack>);
    expect(screen.getByTestId('stack')).toHaveClass('justify-between');
  });

  it('applies flex-wrap when wrap=true', () => {
    render(<Stack wrap data-testid="stack"><span>A</span></Stack>);
    expect(screen.getByTestId('stack')).toHaveClass('flex-wrap');
  });
});
