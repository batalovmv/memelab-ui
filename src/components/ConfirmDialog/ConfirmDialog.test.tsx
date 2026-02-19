import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ConfirmDialog } from './ConfirmDialog';

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  onConfirm: vi.fn(),
  title: 'Delete item',
  message: 'Are you sure you want to delete this item?',
};

describe('ConfirmDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders title and message when open', () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByText('Delete item')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete this item?')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<ConfirmDialog {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Delete item')).not.toBeInTheDocument();
  });

  it('calls onConfirm when confirm button is clicked', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} />);

    await user.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ConfirmDialog {...defaultProps} onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('shows custom button texts', () => {
    render(<ConfirmDialog {...defaultProps} confirmText="Yes, delete" cancelText="No, keep" />);
    expect(screen.getByRole('button', { name: 'Yes, delete' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'No, keep' })).toBeInTheDocument();
  });

  it('shows loadingText when isLoading', () => {
    render(<ConfirmDialog {...defaultProps} isLoading loadingText="Deleting..." />);
    expect(screen.getByRole('button', { name: 'Deleting...' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Confirm' })).not.toBeInTheDocument();
  });

  it('disables buttons when isLoading', () => {
    render(<ConfirmDialog {...defaultProps} isLoading />);
    const buttons = screen.getAllByRole('button');
    for (const button of buttons) {
      expect(button).toBeDisabled();
    }
  });
});
