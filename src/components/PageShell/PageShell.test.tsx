import { render, screen } from '@testing-library/react';

import { PageShell } from './PageShell';

describe('PageShell', () => {
  it('renders children in main element', () => {
    render(<PageShell>Page content</PageShell>);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveTextContent('Page content');
  });

  it('applies default maxWidth xl class (max-w-7xl)', () => {
    render(<PageShell>Content</PageShell>);
    expect(screen.getByRole('main')).toHaveClass('max-w-7xl');
  });

  it('applies sm maxWidth class', () => {
    render(<PageShell maxWidth="sm">Content</PageShell>);
    expect(screen.getByRole('main')).toHaveClass('max-w-2xl');
  });

  it('renders header', () => {
    render(
      <PageShell header={<div data-testid="header">Header</div>}>
        Content
      </PageShell>,
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders default background orbs when variant=plain', () => {
    const { container } = render(<PageShell variant="plain">Content</PageShell>);
    const ariaHidden = container.querySelector('[aria-hidden="true"]');
    expect(ariaHidden).toBeInTheDocument();
  });

  it('does not render default background when variant=minimal', () => {
    const { container } = render(<PageShell variant="minimal">Content</PageShell>);
    const ariaHidden = container.querySelector('[aria-hidden="true"]');
    expect(ariaHidden).not.toBeInTheDocument();
  });

  it('renders custom background', () => {
    render(
      <PageShell background={<div data-testid="custom-bg">BG</div>}>
        Content
      </PageShell>,
    );
    expect(screen.getByTestId('custom-bg')).toBeInTheDocument();
  });

  it('does not render default background when custom background is provided', () => {
    const { container } = render(
      <PageShell background={<div data-testid="custom-bg">BG</div>}>
        Content
      </PageShell>,
    );
    const ariaHiddenElements = container.querySelectorAll('[aria-hidden="true"]');
    expect(ariaHiddenElements).toHaveLength(0);
  });

  it('applies className', () => {
    const { container } = render(<PageShell className="custom-class">Content</PageShell>);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
