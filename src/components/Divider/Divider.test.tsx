import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Divider } from './Divider';

describe('Divider', () => {
  it('renders horizontal divider as hr by default', () => {
    const { container } = render(<Divider />);
    const separator = screen.getByRole('separator');

    expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
    expect(container.querySelector('hr')).toBeInTheDocument();
  });

  it('renders vertical divider as div', () => {
    const { container } = render(<Divider orientation="vertical" />);
    const separator = screen.getByRole('separator');

    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    expect(container.querySelector('div[role="separator"]')).toBeInTheDocument();
  });

  it('renders label between divider lines', () => {
    render(<Divider label="OR" />);
    expect(screen.getByText('OR')).toBeInTheDocument();
  });
});
