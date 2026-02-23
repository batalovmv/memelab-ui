import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Popover } from './Popover';

describe('Popover', () => {
  it('does not show content initially', () => {
    render(
      <Popover content={<span>Popup</span>}>
        <button>Open</button>
      </Popover>,
    );
    expect(screen.queryByText('Popup')).not.toBeInTheDocument();
  });

  it('shows content on click', async () => {
    const user = userEvent.setup();
    render(
      <Popover content={<span>Popup</span>}>
        <button>Open</button>
      </Popover>,
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByText('Popup')).toBeInTheDocument();
  });

  it('toggles closed on second click', async () => {
    const user = userEvent.setup();
    render(
      <Popover content={<span>Popup</span>}>
        <button>Open</button>
      </Popover>,
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByText('Popup')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.queryByText('Popup')).not.toBeInTheDocument();
  });

  it('sets aria-expanded on trigger', async () => {
    const user = userEvent.setup();
    render(
      <Popover content={<span>Popup</span>}>
        <button>Open</button>
      </Popover>,
    );
    const trigger = screen.getByRole('button', { name: 'Open' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders dialog role for popover content', async () => {
    const user = userEvent.setup();
    render(
      <Popover content={<span>Popup</span>}>
        <button>Open</button>
      </Popover>,
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    render(
      <Popover content={<span>Popup</span>}>
        <button>Open</button>
      </Popover>,
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByText('Popup')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByText('Popup')).not.toBeInTheDocument();
  });

  it('calls onOpenChange in controlled mode', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Popover content={<span>Popup</span>} open={false} onOpenChange={onOpenChange}>
        <button>Open</button>
      </Popover>,
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
