import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type BadgeVariant = 'neutral' | 'primary' | 'success' | 'successSolid' | 'warning' | 'danger' | 'dangerSolid' | 'accent';
export type BadgeSize = 'sm' | 'md';

export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
};

const base = 'inline-flex items-center justify-center rounded-full font-semibold ring-1 ring-white/10';

const sizeClass: Record<BadgeSize, string> = {
  sm: 'text-xs px-2.5 py-1',
  md: 'text-sm px-3 py-1.5',
};

const variantClass: Record<BadgeVariant, string> = {
  neutral: 'bg-white/10 text-white/90',
  primary: 'bg-primary/15 text-primary ring-primary/20',
  success: 'bg-emerald-500/15 text-emerald-400 ring-emerald-500/20',
  successSolid: 'bg-emerald-600 text-white ring-0',
  warning: 'bg-amber-500/15 text-amber-400 ring-amber-500/20',
  danger: 'bg-rose-500/15 text-rose-400 ring-rose-500/20',
  dangerSolid: 'bg-rose-600 text-white ring-0',
  accent: 'bg-accent/15 text-accent-light ring-accent/20',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { children, variant = 'neutral', size = 'sm', className, ...props },
  ref,
) {
  return (
    <span ref={ref} {...props} className={cn(base, sizeClass[size], variantClass[variant], className)}>
      {children}
    </span>
  );
});

/** Backward-compatible alias */
export const Pill = Badge;
