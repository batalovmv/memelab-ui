import { forwardRef, useId } from 'react';

import { cn } from '@/utils/cn';

export type ToggleSize = 'sm' | 'md';

export type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  busy?: boolean;
  label?: string;
  size?: ToggleSize;
  id?: string;
  'aria-label'?: string;
};

const trackSize: Record<ToggleSize, string> = {
  sm: 'w-9 h-5',
  md: 'w-11 h-6',
};

const thumbSize: Record<ToggleSize, { base: string; translate: string }> = {
  sm: { base: 'w-4 h-4', translate: 'translate-x-4' },
  md: { base: 'w-5 h-5', translate: 'translate-x-5' },
};

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  { checked, onChange, disabled, busy, label, size = 'md', id: externalId, 'aria-label': ariaLabel },
  ref,
) {
  const generatedId = useId();
  const toggleId = externalId || generatedId;

  return (
    <div className="flex items-center gap-3">
      <button
        ref={ref}
        id={toggleId}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel || label}
        disabled={disabled || busy}
        aria-busy={busy || undefined}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
          trackSize[size],
          checked ? 'bg-primary' : 'bg-surface-300',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 rounded-full bg-white transition-transform duration-200 flex items-center justify-center',
            thumbSize[size].base,
            checked ? thumbSize[size].translate : 'translate-x-0',
          )}
        >
          {busy && (
            <span
              className={cn(
                'border-2 border-primary/30 border-t-primary rounded-full animate-spin',
                size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3',
              )}
            />
          )}
        </span>
      </button>
      {label && (
        <label htmlFor={toggleId} className="text-sm text-white/60 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
});
