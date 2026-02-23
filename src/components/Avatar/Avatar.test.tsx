import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders image when src is provided', () => {
    render(<Avatar src="/avatar.png" alt="Profile image" name="Jane Doe" />);
    expect(screen.getByRole('img', { name: 'Profile image' })).toHaveAttribute('src', '/avatar.png');
  });

  it('renders initials fallback when src is missing', () => {
    render(<Avatar name="Jane Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('applies size classes for sm, md and lg', () => {
    const { rerender } = render(<Avatar name="Size Test" size="sm" />);
    let root = screen.getByLabelText('Size Test').parentElement as HTMLElement;
    expect(root).toHaveClass('w-8', 'h-8');

    rerender(<Avatar name="Size Test" size="md" />);
    root = screen.getByLabelText('Size Test').parentElement as HTMLElement;
    expect(root).toHaveClass('w-10', 'h-10');

    rerender(<Avatar name="Size Test" size="lg" />);
    root = screen.getByLabelText('Size Test').parentElement as HTMLElement;
    expect(root).toHaveClass('w-12', 'h-12');
  });
});
