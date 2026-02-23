import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Combobox } from './Combobox';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

describe('Combobox', () => {
  it('renders combobox role', () => {
    render(<Combobox options={options} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Combobox options={options} label="Fruit" />);
    expect(screen.getByText('Fruit')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Combobox options={options} error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('opens dropdown on focus', async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('filters options on typing', async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} />);
    await user.type(screen.getByRole('combobox'), 'ban');
    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Apple' })).not.toBeInTheDocument();
  });

  it('selects option on click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Combobox options={options} onChange={onChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: 'Banana' }));
    expect(onChange).toHaveBeenCalledWith('banana');
  });

  it('selects option with keyboard (ArrowDown + Enter)', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Combobox options={options} onChange={onChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.keyboard('{ArrowDown}{Enter}');
    expect(onChange).toHaveBeenCalledWith('apple');
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('shows empty state when nothing matches', async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} emptyContent="Nothing found" />);
    await user.type(screen.getByRole('combobox'), 'zzz');
    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('is disabled when disabled=true', () => {
    render(<Combobox options={options} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('fires onChange for custom input when allowCustom=true', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Combobox options={options} allowCustom onChange={onChange} />);
    await user.type(screen.getByRole('combobox'), 'kiwi');
    expect(onChange).toHaveBeenLastCalledWith('kiwi');
  });
});
