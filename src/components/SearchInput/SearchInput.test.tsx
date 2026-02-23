import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';

import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  it('renders with search icon', () => {
    render(<SearchInput />);
    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    // The search icon SVG is present in the wrapper
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('uses default placeholder "Search..."', () => {
    render(<SearchInput />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('uses custom placeholder when provided', () => {
    render(<SearchInput placeholder="Find something..." />);
    expect(screen.getByPlaceholderText('Find something...')).toBeInTheDocument();
  });

  it('shows clear button when value is non-empty', () => {
    render(<SearchInput value="hello" onClear={() => {}} onChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument();
  });

  it('does not show clear button when value is empty', () => {
    render(<SearchInput value="" onClear={() => {}} onChange={() => {}} />);
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();
  });

  it('does not show clear button when value is undefined', () => {
    render(<SearchInput onClear={() => {}} />);
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();
  });

  it('does not show clear button when onClear is not provided even if value is set', () => {
    render(<SearchInput value="hello" onChange={() => {}} />);
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();
  });

  it('calls onClear when clear button is clicked', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    render(<SearchInput value="hello" onClear={onClear} onChange={() => {}} />);
    await user.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('forwards ref to input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<SearchInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('renders label when provided', () => {
    render(<SearchInput label="Search users" />);
    expect(screen.getByText('Search users')).toBeInTheDocument();
    expect(screen.getByLabelText('Search users')).toBeInTheDocument();
  });

  it('does not render label element when label prop is omitted', () => {
    render(<SearchInput placeholder="Search..." />);
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('sets type="search" on the input', () => {
    render(<SearchInput />);
    const input = screen.getByRole('searchbox');
    expect(input).toHaveAttribute('type', 'search');
  });

  it('passes through native input props', () => {
    render(<SearchInput disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
  });

  it('applies custom className to the input', () => {
    render(<SearchInput className="custom-class" placeholder="Custom" />);
    expect(screen.getByPlaceholderText('Custom')).toHaveClass('custom-class');
  });
});
