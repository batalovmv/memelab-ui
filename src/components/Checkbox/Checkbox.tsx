import { forwardRef, useId, useEffect, useRef, type InputHTMLAttributes, type MutableRefObject } from 'react';

import { cn } from '@/utils/cn';

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string;
  error?: string;
  indeterminate?: boolean;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, error, indeterminate, className, id: externalId, disabled, checked, onChange, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = externalId || generatedId;
  const errorId = error ? `${inputId}-error` : undefined;

  // Handle indeterminate state via internal ref merged with forwarded ref
  const internalRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const el = internalRef.current;
    if (el) {
      el.indeterminate = indeterminate ?? false;
    }
  }, [indeterminate]);

  const setRefs = (el: HTMLInputElement | null) => {
    internalRef.current = el;
    if (typeof ref === 'function') {
      ref(el);
    } else if (ref) {
      (ref as MutableRefObject<HTMLInputElement | null>).current = el;
    }
  };

  return (
    <div className={cn('inline-flex flex-col gap-1', className)}>
      <label
        htmlFor={inputId}
        className={cn(
          'inline-flex items-center gap-2.5',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        )}
      >
        {/* Hidden native input for accessibility */}
        <input
          {...props}
          ref={setRefs}
          id={inputId}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={!!error || undefined}
          aria-describedby={errorId}
          className="sr-only peer"
        />

        {/* Custom checkbox visual */}
        <span
          className={cn(
            'relative flex items-center justify-center w-5 h-5 rounded-md',
            'bg-white/10 border border-white/20',
            'transition-colors duration-150',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-transparent',
            checked && !indeterminate && 'bg-primary border-primary',
            indeterminate && 'bg-primary border-primary',
          )}
          aria-hidden="true"
        >
          {/* Checkmark SVG */}
          {checked && !indeterminate && (
            <svg
              viewBox="0 0 12 10"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-2.5"
            >
              <polyline points="1,5 4.5,8.5 11,1" />
            </svg>
          )}

          {/* Indeterminate dash */}
          {indeterminate && (
            <svg
              viewBox="0 0 10 2"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              className="w-2.5 h-0.5"
            >
              <line x1="0" y1="1" x2="10" y2="1" />
            </svg>
          )}
        </span>

        {label && (
          <span className="text-sm text-white/80 select-none">{label}</span>
        )}
      </label>

      {error && (
        <p id={errorId} className="text-rose-400 text-xs ml-7">{error}</p>
      )}
    </div>
  );
});
