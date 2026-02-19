import { render, screen } from '@testing-library/react';
import { createRef } from 'react';

import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders textarea', () => {
    render(<Textarea placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('shows label', () => {
    render(<Textarea label="Description" />);
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('connects label to textarea via htmlFor', () => {
    render(<Textarea label="Description" id="desc-field" />);
    const label = screen.getByText('Description');
    expect(label).toHaveAttribute('for', 'desc-field');
    expect(screen.getByLabelText('Description')).toHaveAttribute('id', 'desc-field');
  });

  it('shows error message', () => {
    render(<Textarea error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByText('This field is required')).toHaveClass('text-rose-400');
  });

  it('applies error ring when hasError', () => {
    render(<Textarea hasError placeholder="Error textarea" />);
    const textarea = screen.getByPlaceholderText('Error textarea');
    expect(textarea).toHaveClass('ring-2', 'ring-rose-500/40');
  });

  it('applies error ring when error provided', () => {
    render(<Textarea error="Error" placeholder="Error textarea" />);
    const textarea = screen.getByPlaceholderText('Error textarea');
    expect(textarea).toHaveClass('ring-2', 'ring-rose-500/40');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} placeholder="Ref textarea" />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('generates unique id when not provided', () => {
    render(<Textarea label="Notes" />);
    const textarea = screen.getByLabelText('Notes');
    expect(textarea).toHaveAttribute('id');
    expect(textarea.id).toBeTruthy();
  });

  it('renders no wrapper when no label or error', () => {
    const { container } = render(<Textarea placeholder="test" />);
    const textarea = container.querySelector('textarea');
    expect(textarea?.parentElement).toBe(container);
  });

  it('applies className', () => {
    render(<Textarea className="custom-class" placeholder="test" />);
    expect(screen.getByPlaceholderText('test')).toHaveClass('custom-class');
  });

  it('passes through native props', () => {
    render(<Textarea disabled required placeholder="Native" />);
    const textarea = screen.getByPlaceholderText('Native');
    expect(textarea).toBeDisabled();
    expect(textarea).toBeRequired();
  });
});
