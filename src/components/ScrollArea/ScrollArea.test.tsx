import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ScrollArea } from './ScrollArea';

describe('ScrollArea', () => {
  it('renders children', () => {
    render(<ScrollArea>Scrollable content</ScrollArea>);
    expect(screen.getByText('Scrollable content')).toBeInTheDocument();
  });

  it('applies maxHeight as inline style', () => {
    render(<ScrollArea maxHeight={300} data-testid="sa">Content</ScrollArea>);
    expect(screen.getByTestId('sa')).toHaveStyle({ maxHeight: '300px' });
  });

  it('applies vertical overflow by default', () => {
    render(<ScrollArea data-testid="sa">Content</ScrollArea>);
    const el = screen.getByTestId('sa');
    expect(el).toHaveClass('overflow-y-auto', 'overflow-x-hidden');
  });

  it('applies horizontal overflow', () => {
    render(<ScrollArea orientation="horizontal" data-testid="sa">Content</ScrollArea>);
    const el = screen.getByTestId('sa');
    expect(el).toHaveClass('overflow-x-auto', 'overflow-y-hidden');
  });

  it('applies both overflow', () => {
    render(<ScrollArea orientation="both" data-testid="sa">Content</ScrollArea>);
    expect(screen.getByTestId('sa')).toHaveClass('overflow-auto');
  });

  it('hides scrollbar when hideScrollbar=true', () => {
    render(<ScrollArea hideScrollbar data-testid="sa">Content</ScrollArea>);
    expect(screen.getByTestId('sa')).toHaveClass('no-scrollbar');
  });
});
