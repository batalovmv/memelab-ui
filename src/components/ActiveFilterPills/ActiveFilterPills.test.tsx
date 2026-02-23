import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ActiveFilterPills } from './ActiveFilterPills';

describe('ActiveFilterPills', () => {
  const filters = [
    { key: 'status', label: 'Status: Active' },
    { key: 'type', label: 'Type: Meme' },
  ];

  it('renders pills from filters array', () => {
    render(<ActiveFilterPills filters={filters} onRemove={vi.fn()} />);
    expect(screen.getByText('Status: Active')).toBeInTheDocument();
    expect(screen.getByText('Type: Meme')).toBeInTheDocument();
  });

  it('calls onRemove with filter key on remove button click', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();

    render(<ActiveFilterPills filters={filters} onRemove={onRemove} />);

    await user.click(screen.getByRole('button', { name: 'Remove filter: Type: Meme' }));
    expect(onRemove).toHaveBeenCalledWith('type');
  });

  it('calls onClearAll when clear-all button is clicked', async () => {
    const user = userEvent.setup();
    const onClearAll = vi.fn();

    render(<ActiveFilterPills filters={filters} onRemove={vi.fn()} onClearAll={onClearAll} />);

    await user.click(screen.getByRole('button', { name: 'Clear all' }));
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });

  it('renders nothing for empty filters', () => {
    const { container } = render(<ActiveFilterPills filters={[]} onRemove={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });
});
