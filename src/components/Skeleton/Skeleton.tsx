import { cn } from '@/utils/cn';

export type SkeletonProps = {
  className?: string;
  circle?: boolean;
};

export function Skeleton({ className, circle }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('bg-white/10 animate-pulse', circle ? 'rounded-full' : 'rounded-lg', className)}
    />
  );
}
