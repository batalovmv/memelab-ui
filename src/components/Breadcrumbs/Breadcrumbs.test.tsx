import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Breadcrumbs } from './Breadcrumbs';

describe('Breadcrumbs', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Library', href: '/library' },
    { label: 'Current Page' },
  ];

  it('renders all items', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Library')).toBeInTheDocument();
    expect(screen.getByText('Current Page')).toBeInTheDocument();
  });

  it('last item has aria-current="page"', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByText('Current Page')).toHaveAttribute('aria-current', 'page');
  });

  it('renders links with href', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  });

  it('renders button when onClick provided', () => {
    const onClick = vi.fn();
    render(<Breadcrumbs items={[{ label: 'Home', onClick }, { label: 'Current' }]} />);
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
  });

  it('fires onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Breadcrumbs items={[{ label: 'Home', onClick }, { label: 'Current' }]} />);
    await user.click(screen.getByRole('button', { name: 'Home' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders separator between items', () => {
    render(<Breadcrumbs items={items} separator={<span data-testid="sep">/</span>} />);
    expect(screen.getAllByTestId('sep')).toHaveLength(2);
  });

  it('returns null for empty items', () => {
    const { container } = render(<Breadcrumbs items={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
