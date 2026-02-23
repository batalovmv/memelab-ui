import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Drawer } from './Drawer';

describe('Drawer', () => {
  it('does not render when closed', () => {
    render(<Drawer isOpen={false} onClose={vi.fn()}>Content</Drawer>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog when open', () => {
    render(<Drawer isOpen onClose={vi.fn()}>Content</Drawer>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('has aria-modal="true"', () => {
    render(<Drawer isOpen onClose={vi.fn()}>Content</Drawer>);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('applies aria-label', () => {
    render(<Drawer isOpen onClose={vi.fn()} ariaLabel="Settings">Content</Drawer>);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Settings');
  });

  it('applies size and side classes', () => {
    render(<Drawer isOpen onClose={vi.fn()} side="left" size="lg">Content</Drawer>);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('w-96');
    expect(dialog).toHaveClass('inset-y-0', 'left-0');
  });

  it('applies bottom side classes', () => {
    render(<Drawer isOpen onClose={vi.fn()} side="bottom" size="md">Content</Drawer>);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('h-1/3');
    expect(dialog).toHaveClass('inset-x-0', 'bottom-0');
  });

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn();
    render(<Drawer isOpen onClose={onClose}><button>Inside</button></Drawer>);
    const dialog = screen.getByRole('dialog');
    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Drawer isOpen onClose={onClose}>Content</Drawer>);
    const backdrop = screen.getByRole('presentation').querySelector('[aria-hidden="true"]')!;
    await user.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on backdrop click when closeOnBackdrop=false', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Drawer isOpen onClose={onClose} closeOnBackdrop={false}>Content</Drawer>);
    const backdrop = screen.getByRole('presentation').querySelector('[aria-hidden="true"]')!;
    await user.click(backdrop);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('locks body scroll when open', () => {
    const { unmount } = render(<Drawer isOpen onClose={vi.fn()}>Content</Drawer>);
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
  });
});
