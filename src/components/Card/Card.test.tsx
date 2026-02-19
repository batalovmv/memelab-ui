import { render, screen } from '@testing-library/react';

import { Card } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders with surface class by default', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('surface');
  });

  it('applies glass class when variant="glass"', () => {
    const { container } = render(<Card variant="glass">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('glass');
    expect(card).not.toHaveClass('surface');
  });

  it('applies surface class when variant="surface"', () => {
    const { container } = render(<Card variant="surface">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('surface');
    expect(card).not.toHaveClass('glass');
  });

  it('adds surface-hover when hoverable', () => {
    const { container } = render(<Card hoverable>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('surface-hover');
  });

  it('does not add surface-hover when hoverable is false', () => {
    const { container } = render(<Card hoverable={false}>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).not.toHaveClass('surface-hover');
  });

  it('combines hoverable with glass variant', () => {
    const { container } = render(
      <Card variant="glass" hoverable>
        Content
      </Card>,
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('glass');
    expect(card).toHaveClass('surface-hover');
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('custom-class');
  });

  it('passes through HTML attributes', () => {
    render(
      <Card data-testid="test-card" title="Test title">
        Content
      </Card>,
    );
    const card = screen.getByTestId('test-card');
    expect(card).toHaveAttribute('title', 'Test title');
  });

  it('renders as div element', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('passes onClick handler', () => {
    const onClick = vi.fn();
    render(<Card onClick={onClick}>Clickable</Card>);
    screen.getByText('Clickable').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
