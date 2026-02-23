import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label'> & {
  icon: ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  'aria-label': string;
};

const base =
  'inline-flex items-center justify-center rounded-xl font-semibold leading-none transition-[transform,background-color,box-shadow,opacity] select-none [-webkit-tap-highlight-color:transparent] active:translate-y-[0.5px] disabled:opacity-60 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent';

const sizeClass = {
  sm: 'p-1.5 w-7 h-7',
  md: 'p-2 w-9 h-9',
  lg: 'p-2.5 w-11 h-11',
};

const variantClass: Record<NonNullable<IconButtonProps['variant']>, string> = {
  primary: 'bg-primary text-white shadow-glow hover:brightness-[0.98]',
  success: 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700',
  warning: 'bg-amber-600 text-white shadow-lg shadow-amber-600/20 hover:bg-amber-700',
  danger: 'bg-rose-600 text-white shadow-lg shadow-rose-600/20 hover:bg-rose-700',
  secondary: 'text-white bg-white/10 shadow-sm ring-1 ring-white/10',
  ghost: 'text-white hover:bg-white/10',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, variant = 'ghost', size = 'md', className, disabled, type, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type === 'submit' ? 'submit' : type === 'reset' ? 'reset' : 'button'}
      {...props}
      disabled={disabled}
      className={cn(base, sizeClass[size], variantClass[variant], className)}
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  );
});
