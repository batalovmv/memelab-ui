import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ColorInput } from './ColorInput';

describe('ColorInput', () => {
  it('renders native color input with current value', () => {
    const { container } = render(<ColorInput value="#112233" onChange={vi.fn()} />);
    const colorInput = container.querySelector('input[type="color"]');

    expect(colorInput).toBeInTheDocument();
    expect(colorInput).toHaveValue('#112233');
  });

  it('renders label when provided', () => {
    render(<ColorInput value="#abcdef" onChange={vi.fn()} label="Accent color" />);

    expect(screen.getByText('Accent color')).toBeInTheDocument();
    expect(screen.getByLabelText('Accent color')).toHaveAttribute('type', 'text');
  });

  it('calls onChange from text input', () => {
    const onChange = vi.fn();
    render(<ColorInput value="#000000" onChange={onChange} label="Color" />);

    fireEvent.change(screen.getByLabelText('Color'), { target: { value: '#123456' } });
    expect(onChange).toHaveBeenCalledWith('#123456');
  });

  it('calls onChange from native color input', () => {
    const onChange = vi.fn();
    const { container } = render(<ColorInput value="#000000" onChange={onChange} />);
    const colorInput = container.querySelector('input[type="color"]') as HTMLInputElement;

    fireEvent.change(colorInput, { target: { value: '#654321' } });
    expect(onChange).toHaveBeenCalledWith('#654321');
  });

  it('respects disabled state', async () => {
    const user = userEvent.setup();
    render(<ColorInput value="#ff0000" onChange={vi.fn()} label="Color" disabled />);

    const textInput = screen.getByLabelText('Color');
    const swatchButton = screen.getByRole('button', { name: 'Open color picker' });

    expect(textInput).toBeDisabled();
    expect(swatchButton).toBeDisabled();

    await user.click(swatchButton);
    expect(swatchButton).toBeDisabled();
  });
});
