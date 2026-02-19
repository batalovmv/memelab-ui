import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type ButtonVariant = 'primary' | 'success' | 'warning' | 'danger' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold leading-none transition-[transform,background-color,box-shadow,opacity] select-none [-webkit-tap-highlight-color:transparent] active:translate-y-[0.5px] disabled:opacity-60 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent';

const sizeClass: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-3.5 py-2.5 text-sm',
  lg: 'px-4 py-3 text-base',
};

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-[0_0_25px_rgba(139,92,246,0.35)] hover:shadow-[0_0_35px_rgba(139,92,246,0.5)] hover:scale-[1.02]',
  success: 'bg-emerald-600 text-white shadow-[0_10px_18px_rgba(16,185,129,0.22)] hover:bg-emerald-700',
  warning: 'bg-amber-600 text-white shadow-[0_10px_18px_rgba(245,158,11,0.22)] hover:bg-amber-700',
  danger: 'bg-rose-600 text-white shadow-[0_10px_18px_rgba(244,63,94,0.22)] hover:bg-rose-700',
  secondary: 'text-white bg-white/5 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 backdrop-blur-sm',
  ghost: 'text-white/70 hover:text-white hover:bg-white/5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'secondary', size = 'md', leftIcon, rightIcon, loading, className, disabled, children, type, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type === 'submit' ? 'submit' : type === 'reset' ? 'reset' : 'button'}
      {...props}
      disabled={disabled || loading}
      className={cn(base, sizeClass[size], variantClass[variant], className)}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          {children}
        </span>
      ) : (
        <>
          {leftIcon ? <span aria-hidden="true">{leftIcon}</span> : null}
          {children}
          {rightIcon ? <span aria-hidden="true">{rightIcon}</span> : null}
        </>
      )}
    </button>
  );
});
