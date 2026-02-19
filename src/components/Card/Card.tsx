import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type CardVariant = 'surface' | 'glass';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  hoverable?: boolean;
  variant?: CardVariant;
  children: ReactNode;
};

export function Card({ hoverable, variant = 'surface', className, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={cn(variant === 'glass' ? 'glass' : 'surface', hoverable && 'surface-hover', className)}
    />
  );
}
