import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Modal } from './Modal';

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} ariaLabel="Test modal">
        <div>Modal content</div>
      </Modal>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  it('renders dialog when open', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} ariaLabel="Test modal">
        <div>Modal content</div>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('has aria-modal="true"', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} ariaLabel="Test modal">
        <div>Content</div>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('applies ariaLabel', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} ariaLabel="Confirm deletion">
        <div>Content</div>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Confirm deletion');
  });

  it('applies ariaLabelledBy', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} ariaLabelledBy="modal-title">
        <div id="modal-title">Title</div>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'modal-title');
    expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-label');
  });

  it('calls onClose on Escape', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} ariaLabel="Test modal">
        <div>Content</div>
      </Modal>,
    );

    const dialog = screen.getByRole('dialog');
    dialog.focus();
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on Escape when closeOnEsc is false', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} closeOnEsc={false} ariaLabel="Test modal">
        <div>Content</div>
      </Modal>,
    );

    await user.keyboard('{Escape}');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose on backdrop click', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} ariaLabel="Test modal">
        <div>Content</div>
      </Modal>,
    );

    const backdrop = screen.getByRole('presentation');
    await user.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking dialog content', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} ariaLabel="Test modal">
        <div>Content</div>
      </Modal>,
    );

    const dialog = screen.getByRole('dialog');
    await user.click(dialog);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not call onClose on backdrop click when closeOnBackdrop is false', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} closeOnBackdrop={false} ariaLabel="Test modal">
        <div>Content</div>
      </Modal>,
    );

    const backdrop = screen.getByRole('presentation');
    await user.click(backdrop);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('applies glass class by default', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} ariaLabel="Test modal">
        <div>Content</div>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveClass('glass');
  });

  it('does not apply glass class when useGlass is false', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} useGlass={false} ariaLabel="Test modal">
        <div>Content</div>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).not.toHaveClass('glass');
  });

  it('applies custom zIndexClassName', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} zIndexClassName="z-[9999]" ariaLabel="Test modal">
        <div>Content</div>
      </Modal>,
    );
    expect(screen.getByRole('presentation')).toHaveClass('z-[9999]');
  });

  it('applies default z-50', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} ariaLabel="Test modal">
        <div>Content</div>
      </Modal>,
    );
    expect(screen.getByRole('presentation')).toHaveClass('z-50');
  });

  it('applies custom overlayClassName', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} overlayClassName="custom-overlay" ariaLabel="Test modal">
        <div>Content</div>
      </Modal>,
    );
    expect(screen.getByRole('presentation')).toHaveClass('custom-overlay');
  });

  it('applies custom contentClassName', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} contentClassName="custom-content" ariaLabel="Test modal">
        <div>Content</div>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveClass('custom-content');
  });
});
