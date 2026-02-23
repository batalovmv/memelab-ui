import { cn } from '@/utils/cn';

export type MutationOverlayStatus = 'idle' | 'saving' | 'saved' | 'error';

export type MutationOverlayProps = {
  status: MutationOverlayStatus;
  savingText?: string;
  savedText?: string;
  errorText?: string;
  className?: string;
};

function SavingIcon() {
  return (
    <svg
      className="h-5 w-5 animate-spin text-white/70"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

function SavedIcon() {
  return (
    <svg
      className="h-5 w-5 text-green-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" strokeOpacity={0.4} />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg
      className="h-5 w-5 text-red-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" strokeOpacity={0.4} />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6M9 9l6 6" />
    </svg>
  );
}

const statusConfig = {
  saving: {
    icon: SavingIcon,
    defaultText: 'Saving...',
    textClass: 'text-white/70',
  },
  saved: {
    icon: SavedIcon,
    defaultText: 'Saved',
    textClass: 'text-green-400',
  },
  error: {
    icon: ErrorIcon,
    defaultText: 'Error',
    textClass: 'text-red-400',
  },
} as const;

export function MutationOverlay({
  status,
  savingText,
  savedText,
  errorText,
  className,
}: MutationOverlayProps) {
  if (status === 'idle') return null;

  const config = statusConfig[status];
  const Icon = config.icon;

  const text =
    status === 'saving'
      ? (savingText ?? config.defaultText)
      : status === 'saved'
        ? (savedText ?? config.defaultText)
        : (errorText ?? config.defaultText);

  return (
    <div
      className={cn(
        'absolute inset-0 z-10 flex items-center justify-center',
        'bg-surface-50/80 backdrop-blur-sm',
        'transition-opacity duration-200',
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2">
        <Icon />
        <span className={cn('text-sm font-medium', config.textClass)}>{text}</span>
      </div>
    </div>
  );
}
