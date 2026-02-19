import { cn } from '@/utils/cn';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export type SpinnerProps = {
  className?: string;
  size?: SpinnerSize;
};

const sizeClass: Record<SpinnerSize, string> = {
  sm: 'h-3 w-3 border',
  md: 'h-4 w-4 border-2',
  lg: 'h-6 w-6 border-2',
};

export function Spinner({ className, size = 'md' }: SpinnerProps) {
  return (
    <span
      className={cn('inline-block rounded-full border-white/15 border-t-primary animate-spin', sizeClass[size], className)}
      aria-hidden="true"
    />
  );
}
