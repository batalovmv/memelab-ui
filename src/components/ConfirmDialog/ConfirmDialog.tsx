import { useId, type ReactNode } from 'react';

import { cn } from '@/utils/cn';
import { Button } from '@/components/Button/Button';
import { Modal } from '@/components/Modal/Modal';

export type ConfirmDialogVariant = 'danger' | 'warning' | 'primary';

export type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  loadingText?: string;
  variant?: ConfirmDialogVariant;
  isLoading?: boolean;
};

const confirmVariantClass: Record<ConfirmDialogVariant, string> = {
  danger: 'bg-rose-600 hover:bg-rose-700',
  warning: 'bg-amber-600 hover:bg-amber-700',
  primary: '',
};

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loadingText = 'Processing...',
  variant = 'danger',
  isLoading = false,
}: ConfirmDialogProps) {
  const titleId = useId();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabelledBy={titleId}
      closeOnEsc={!isLoading}
      closeOnBackdrop={!isLoading}
      contentClassName="max-w-md p-4 sm:p-6"
    >
      <h2 id={titleId} className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
        {title}
      </h2>
      <div className="text-white/70 mb-4 sm:mb-6">{message}</div>
      <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
          disabled={isLoading}
          className="w-full sm:w-auto px-4 py-3 sm:py-2.5 bg-white/10 hover:bg-white/15 text-white/90 transition-colors"
        >
          {cancelText}
        </Button>
        <Button
          type="button"
          variant={variant === 'primary' ? 'primary' : 'ghost'}
          onClick={onConfirm}
          disabled={isLoading}
          className={cn(
            'w-full sm:w-auto px-4 py-3 sm:py-2.5 text-white transition-colors',
            variant !== 'primary' && confirmVariantClass[variant],
          )}
        >
          {isLoading ? loadingText : confirmText}
        </Button>
      </div>
    </Modal>
  );
}
