import { render, screen } from '@testing-library/react';
import { createRef } from 'react';

import { Select } from './Select';

describe('Select', () => {
  it('renders select with options', () => {
    render(
      <Select>
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </Select>,
    );
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });

  it('shows label', () => {
    render(
      <Select label="Country">
        <option>US</option>
      </Select>,
    );
    expect(screen.getByText('Country')).toBeInTheDocument();
  });

  it('connects label to select via htmlFor', () => {
    render(
      <Select label="Country" id="country-field">
        <option>US</option>
      </Select>,
    );
    const label = screen.getByText('Country');
    expect(label).toHaveAttribute('for', 'country-field');
    expect(screen.getByLabelText('Country')).toHaveAttribute('id', 'country-field');
  });

  it('shows error message', () => {
    render(
      <Select error="Required field">
        <option>US</option>
      </Select>,
    );
    expect(screen.getByText('Required field')).toBeInTheDocument();
    expect(screen.getByText('Required field')).toHaveClass('text-rose-400');
  });

  it('applies error ring when hasError', () => {
    render(
      <Select hasError>
        <option>US</option>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toHaveClass('ring-2', 'ring-rose-500/40');
  });

  it('applies error ring when error provided', () => {
    render(
      <Select error="Error">
        <option>US</option>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toHaveClass('ring-2', 'ring-rose-500/40');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLSelectElement>();
    render(
      <Select ref={ref}>
        <option>US</option>
      </Select>,
    );
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  it('generates unique id when not provided', () => {
    render(
      <Select label="Country">
        <option>US</option>
      </Select>,
    );
    const select = screen.getByLabelText('Country');
    expect(select).toHaveAttribute('id');
    expect(select.id).toBeTruthy();
  });

  it('renders no wrapper when no label or error', () => {
    const { container } = render(
      <Select>
        <option>US</option>
      </Select>,
    );
    const select = container.querySelector('select');
    expect(select?.parentElement).toBe(container);
  });

  it('applies className', () => {
    render(
      <Select className="custom-class">
        <option>US</option>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toHaveClass('custom-class');
  });
});
