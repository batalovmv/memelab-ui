import { type ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export type AlertProps = {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  onDismiss?: () => void;
  className?: string;
};

// ─── Variant maps ─────────────────────────────────────────────────────────────

const variantBorderColor: Record<AlertVariant, string> = {
  info: 'border-blue-500',
  success: 'border-emerald-500',
  warning: 'border-amber-500',
  error: 'border-rose-500',
};

const variantIconColor: Record<AlertVariant, string> = {
  info: 'text-blue-400',
  success: 'text-emerald-400',
  warning: 'text-amber-400',
  error: 'text-rose-400',
};

// ─── Icons ────────────────────────────────────────────────────────────────────

function InfoIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 8v5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="9" cy="5.5" r="0.875" fill="currentColor" />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5.5 9.5l2.5 2.5 4.5-5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.634 2.896a1.6 1.6 0 0 1 2.732 0l5.866 10.167A1.6 1.6 0 0 1 14.866 15.5H3.134a1.6 1.6 0 0 1-1.366-2.437L7.634 2.896Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 7v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="9" cy="12.5" r="0.875" fill="currentColor" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.5 6.5l5 5M11.5 6.5l-5 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

const variantIcon: Record<AlertVariant, () => JSX.Element> = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Alert({ variant = 'info', title, children, onDismiss, className }: AlertProps) {
  const Icon = variantIcon[variant];

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 rounded-xl bg-white/5 ring-1 ring-white/10',
        'border-l-4 pl-4 pr-3 py-3',
        variantBorderColor[variant],
        className,
      )}
    >
      {/* Variant icon */}
      <span className={cn('mt-0.5 shrink-0', variantIconColor[variant])}>
        <Icon />
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <p className="text-sm font-semibold text-white leading-snug mb-0.5">{title}</p>
        )}
        <div className="text-sm text-white/70 leading-relaxed">{children}</div>
      </div>

      {/* Dismiss button */}
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className={cn(
            'shrink-0 flex items-center justify-center h-6 w-6 rounded-lg mt-0.5',
            'text-white/40 transition-colors hover:bg-white/10 hover:text-white/80',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
          )}
        >
          <svg
            aria-hidden="true"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
          >
            <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
