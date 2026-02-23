import { render, screen } from '@testing-library/react';
import { createRef } from 'react';

import { ProgressButton } from './ProgressButton';

describe('ProgressButton', () => {
  it('renders children when not loading', () => {
    render(<ProgressButton>Save</ProgressButton>);
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('shows spinner when loading', () => {
    render(<ProgressButton isLoading>Save</ProgressButton>);
    const button = screen.getByRole('button');
    // Spinner renders as a <span> with animate-spin class
    expect(button.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('shows loadingText when loading', () => {
    render(
      <ProgressButton isLoading loadingText="Saving…">
        Save
      </ProgressButton>,
    );
    expect(screen.getByText('Saving…')).toBeInTheDocument();
    expect(screen.queryByText('Save')).not.toBeInTheDocument();
  });

  it('shows children as label when loading without loadingText', () => {
    render(<ProgressButton isLoading>Save</ProgressButton>);
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('is disabled when loading', () => {
    render(<ProgressButton isLoading>Save</ProgressButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<ProgressButton disabled>Save</ProgressButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('sets aria-busy when loading', () => {
    render(<ProgressButton isLoading>Save</ProgressButton>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('does not set aria-busy when not loading', () => {
    render(<ProgressButton>Save</ProgressButton>);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<ProgressButton ref={ref}>Save</ProgressButton>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
