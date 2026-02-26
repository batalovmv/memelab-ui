import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type CardVariant = 'surface' | 'glass';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

const padClass: Record<CardPadding, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6',
};

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  hoverable?: boolean;
  variant?: CardVariant;
  /** Card inner padding. Defaults to `'md'` (20 px). */
  padding?: CardPadding;
  children: ReactNode;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { hoverable, variant = 'surface', padding = 'md', className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        variant === 'glass' ? 'glass' : 'surface',
        hoverable && 'surface-hover',
        padClass[padding],
        className,
      )}
    />
  );
});
