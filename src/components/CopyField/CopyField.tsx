import { useId, useState } from 'react';

import { useClipboard } from '@/hooks';
import { cn } from '@/utils/cn';

export type CopyFieldProps = {
  value: string;
  label?: string;
  masked?: boolean;
  className?: string;
  id?: string;
};

function CopyIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 11H3a1.5 1.5 0 0 1-1.5-1.5V3A1.5 1.5 0 0 1 3 1.5h6.5A1.5 1.5 0 0 1 11 3v.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 8.5l3.5 3.5 6.5-7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 8S3.5 3.5 8 3.5 14.5 8 14.5 8 12.5 12.5 8 12.5 1.5 8 1.5 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 2l12 12M6.5 6.6A2 2 0 0 0 9.4 9.5M4.3 4.4C2.9 5.4 1.5 8 1.5 8S3.5 12.5 8 12.5c1.4 0 2.6-.4 3.7-1.1M6.7 3.6C7.1 3.5 7.5 3.5 8 3.5c4.5 0 6.5 4.5 6.5 4.5s-.5 1.2-1.5 2.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const iconButtonBase = cn(
  'flex items-center justify-center h-7 w-7 rounded-lg shrink-0',
  'text-white/40 transition-colors hover:bg-white/10 hover:text-white/80',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
);

export function CopyField({ value, label, masked = false, className, id: externalId }: CopyFieldProps) {
  const generatedId = useId();
  const fieldId = externalId || generatedId;
  const { copy, copied } = useClipboard();
  const [revealed, setRevealed] = useState(false);

  const displayValue = masked && !revealed ? '•'.repeat(Math.min(value.length, 24)) : value;

  const field = (
    <div
      className={cn(
        'flex items-center gap-1 w-full rounded-xl px-3 py-2.5',
        'bg-white/10 ring-1 ring-white/10',
        className,
      )}
    >
      {/* Text display */}
      <span
        id={fieldId}
        className="flex-1 min-w-0 truncate text-sm text-white select-all font-mono"
        aria-label={label}
      >
        {displayValue}
      </span>

      {/* Reveal toggle (only when masked) */}
      {masked && (
        <button
          type="button"
          aria-label={revealed ? 'Hide value' : 'Reveal value'}
          onClick={() => setRevealed((v) => !v)}
          className={iconButtonBase}
        >
          {revealed ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      )}

      {/* Copy button */}
      <button
        type="button"
        aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
        onClick={() => copy(value)}
        className={cn(iconButtonBase, copied && 'text-emerald-400 hover:text-emerald-400')}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  );

  if (!label) return field;

  return (
    <div>
      <label htmlFor={fieldId} className="block text-sm text-white/70 mb-1.5">
        {label}
      </label>
      {field}
    </div>
  );
}
