import { forwardRef, type ReactNode } from 'react';

import { cn } from '@/utils/cn';
import { Button, type ButtonProps } from '@/components/Button/Button';
import { Spinner } from '@/components/Spinner/Spinner';

export type ProgressButtonProps = Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'loading'> & {
  isLoading?: boolean;
  loadingText?: ReactNode;
};

export const ProgressButton = forwardRef<HTMLButtonElement, ProgressButtonProps>(
  function ProgressButton({ isLoading, loadingText, children, disabled, className, ...props }, ref) {
    return (
      <Button
        ref={ref}
        {...props}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        className={cn('relative overflow-hidden', className)}
      >
        {isLoading ? (
          <>
            {/* Shimmer overlay */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-white/20 animate-[ml-shimmer_2s_ease-in-out_infinite] skew-x-[-20deg] pointer-events-none"
            />
            <Spinner size="sm" />
            {loadingText ?? children}
          </>
        ) : (
          children
        )}
      </Button>
    );
  },
);
