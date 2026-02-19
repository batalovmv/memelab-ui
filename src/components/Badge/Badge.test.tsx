import { render, screen } from '@testing-library/react';

import { Badge, Pill } from './Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { rerender } = render(<Badge variant="neutral">Neutral</Badge>);
    expect(screen.getByText('Neutral')).toHaveClass('bg-white/10', 'text-white/90');

    rerender(<Badge variant="primary">Primary</Badge>);
    expect(screen.getByText('Primary')).toHaveClass('bg-primary/15', 'text-primary');

    rerender(<Badge variant="success">Success</Badge>);
    expect(screen.getByText('Success')).toHaveClass('bg-emerald-500/15', 'text-emerald-400');

    rerender(<Badge variant="successSolid">Success Solid</Badge>);
    expect(screen.getByText('Success Solid')).toHaveClass('bg-emerald-600', 'text-white');

    rerender(<Badge variant="warning">Warning</Badge>);
    expect(screen.getByText('Warning')).toHaveClass('bg-amber-500/15', 'text-amber-400');

    rerender(<Badge variant="danger">Danger</Badge>);
    expect(screen.getByText('Danger')).toHaveClass('bg-rose-500/15', 'text-rose-400');

    rerender(<Badge variant="dangerSolid">Danger Solid</Badge>);
    expect(screen.getByText('Danger Solid')).toHaveClass('bg-rose-600', 'text-white');

    rerender(<Badge variant="accent">Accent</Badge>);
    expect(screen.getByText('Accent')).toHaveClass('bg-accent/15', 'text-accent-light');
  });

  it('applies size classes', () => {
    const { rerender } = render(<Badge size="sm">Small</Badge>);
    expect(screen.getByText('Small')).toHaveClass('text-xs', 'px-2.5', 'py-1');

    rerender(<Badge size="md">Medium</Badge>);
    expect(screen.getByText('Medium')).toHaveClass('text-sm', 'px-3', 'py-1.5');
  });

  it('applies default variant and size', () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge).toHaveClass('bg-white/10'); // neutral variant
    expect(badge).toHaveClass('text-xs'); // sm size
  });

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom</Badge>);
    expect(screen.getByText('Custom')).toHaveClass('custom-class');
  });

  it('passes through HTML attributes', () => {
    render(
      <Badge data-testid="test-badge" title="Test title">
        Test
      </Badge>,
    );
    const badge = screen.getByTestId('test-badge');
    expect(badge).toHaveAttribute('title', 'Test title');
  });

  it('renders as span element', () => {
    render(<Badge>Span</Badge>);
    expect(screen.getByText('Span').tagName).toBe('SPAN');
  });
});

describe('Pill', () => {
  it('Pill alias works', () => {
    render(<Pill variant="success">Success Pill</Pill>);
    const pill = screen.getByText('Success Pill');
    expect(pill).toBeInTheDocument();
    expect(pill).toHaveClass('bg-emerald-500/15');
  });

  it('Pill has same behavior as Badge', () => {
    const { rerender } = render(<Pill size="md">Medium</Pill>);
    expect(screen.getByText('Medium')).toHaveClass('text-sm');

    rerender(<Pill variant="primary">Primary</Pill>);
    expect(screen.getByText('Primary')).toHaveClass('bg-primary/15');
  });
});
