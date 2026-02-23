import { cn } from '@/utils/cn';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export type SpinnerProps = {
  className?: string;
  size?: SpinnerSize;
  /** Accessible label for screen readers. When provided, the spinner gets role="status". */
  label?: string;
};

const sizeClass: Record<SpinnerSize, string> = {
  sm: 'h-3 w-3 border',
  md: 'h-4 w-4 border-2',
  lg: 'h-6 w-6 border-2',
};

export function Spinner({ className, size = 'md', label }: SpinnerProps) {
  return (
    <span
      className={cn('inline-block rounded-full border-white/15 border-t-primary animate-spin', sizeClass[size], className)}
      role={label ? 'status' : undefined}
      aria-hidden={label ? undefined : 'true'}
      aria-label={label || undefined}
    />
  );
}
