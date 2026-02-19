import { render, screen } from '@testing-library/react';
import { createRef } from 'react';

import { Input } from './Input';

describe('Input', () => {
  it('renders basic input', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('shows label when provided', () => {
    render(<Input label="Email" placeholder="email@example.com" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByText('This field is required')).toHaveClass('text-rose-400');
  });

  it('shows helper text', () => {
    render(<Input helperText="Must be at least 8 characters" />);
    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
    expect(screen.getByText('Must be at least 8 characters')).toHaveClass('text-white/40');
  });

  it('does not show helper text when error is present', () => {
    render(<Input error="Invalid input" helperText="This is helper text" />);
    expect(screen.getByText('Invalid input')).toBeInTheDocument();
    expect(screen.queryByText('This is helper text')).not.toBeInTheDocument();
  });

  it('applies error ring when hasError is true', () => {
    render(<Input hasError placeholder="Error input" />);
    const input = screen.getByPlaceholderText('Error input');
    expect(input).toHaveClass('ring-2', 'ring-rose-500/40');
  });

  it('applies error ring when error message is provided', () => {
    render(<Input error="Error message" placeholder="Error input" />);
    const input = screen.getByPlaceholderText('Error input');
    expect(input).toHaveClass('ring-2', 'ring-rose-500/40');
  });

  it('connects label to input via htmlFor/id', () => {
    render(<Input label="Username" id="username-field" />);
    const label = screen.getByText('Username');
    const input = screen.getByLabelText('Username');
    expect(label).toHaveAttribute('for', 'username-field');
    expect(input).toHaveAttribute('id', 'username-field');
  });

  it('generates unique id when not provided', () => {
    render(<Input label="Email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('id');
    expect(input.id).toBeTruthy();
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="Ref input" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('passes through native input props', () => {
    render(<Input type="email" disabled required placeholder="Email" />);
    const input = screen.getByPlaceholderText('Email');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toBeDisabled();
    expect(input).toBeRequired();
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" placeholder="Custom" />);
    expect(screen.getByPlaceholderText('Custom')).toHaveClass('custom-class');
  });

  it('wraps input in div when label is provided', () => {
    const { container } = render(<Input label="Test" placeholder="test" />);
    const wrapper = container.querySelector('div');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper?.querySelector('label')).toBeInTheDocument();
    expect(wrapper?.querySelector('input')).toBeInTheDocument();
  });

  it('does not wrap input in div when no label, error, or helper text', () => {
    const { container } = render(<Input placeholder="test" />);
    const input = container.querySelector('input');
    expect(input?.parentElement).toBe(container);
  });
});
