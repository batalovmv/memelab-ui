import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { EmptyState } from './EmptyState';

function MockIcon({ className }: { className?: string }) {
  return <svg data-testid="mock-icon" className={className} />;
}

describe('EmptyState', () => {
  it('renders title', () => {
    render(<EmptyState title="No items found" />);
    expect(screen.getByText('No items found')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<EmptyState title="Empty" description="Try adding some items" />);
    expect(screen.getByText('Try adding some items')).toBeInTheDocument();
  });

  it('renders action button when actionLabel and onAction provided', () => {
    const onAction = vi.fn();
    render(<EmptyState title="Empty" actionLabel="Add item" onAction={onAction} />);
    expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument();
  });

  it('calls onAction on click', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    render(<EmptyState title="Empty" actionLabel="Add item" onAction={onAction} />);

    await user.click(screen.getByRole('button', { name: 'Add item' }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('does not render button without actionLabel', () => {
    render(<EmptyState title="Empty" onAction={() => {}} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders icon', () => {
    render(<EmptyState title="Empty" icon={MockIcon} />);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <EmptyState title="Empty">
        <p data-testid="child">Custom child</p>
      </EmptyState>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(<EmptyState title="Empty" className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
