import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Slider } from './Slider';

describe('Slider', () => {
  it('renders input with type="range"', () => {
    render(<Slider value={40} onChange={vi.fn()} />);
    expect(screen.getByRole('slider')).toHaveAttribute('type', 'range');
  });

  it('applies min, max and step attributes', () => {
    render(<Slider value={25} min={10} max={90} step={5} onChange={vi.fn()} />);
    const slider = screen.getByRole('slider');

    expect(slider).toHaveAttribute('min', '10');
    expect(slider).toHaveAttribute('max', '90');
    expect(slider).toHaveAttribute('step', '5');
  });

  it('calls onChange with numeric value', () => {
    const onChange = vi.fn();
    render(<Slider value={20} onChange={onChange} />);

    fireEvent.change(screen.getByRole('slider'), { target: { value: '35' } });
    expect(onChange).toHaveBeenCalledWith(35);
  });

  it('renders label when provided', () => {
    render(<Slider value={40} onChange={vi.fn()} label="Volume" />);
    expect(screen.getByText('Volume')).toBeInTheDocument();
    expect(screen.getByLabelText('Volume')).toBeInTheDocument();
  });

  it('supports disabled state', () => {
    render(<Slider value={50} onChange={vi.fn()} disabled />);
    expect(screen.getByRole('slider')).toBeDisabled();
  });
});
