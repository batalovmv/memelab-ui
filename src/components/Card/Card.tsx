import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type CardVariant = 'surface' | 'glass';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  hoverable?: boolean;
  variant?: CardVariant;
  children: ReactNode;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { hoverable, variant = 'surface', className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      {...props}
      className={cn(variant === 'glass' ? 'glass' : 'surface', hoverable && 'surface-hover', className)}
    />
  );
});
