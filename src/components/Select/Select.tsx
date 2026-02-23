import { forwardRef, useId, type SelectHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  hasError?: boolean;
  label?: string;
  error?: string;
  helperText?: string;
};

const selectBase =
  'w-full rounded-xl px-3 py-2.5 text-sm bg-white/10 text-white shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-shadow';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { hasError, label, error, helperText, className, id: externalId, children, ...props },
  ref,
) {
  const generatedId = useId();
  const selectId = externalId || generatedId;
  const showError = hasError || !!error;
  const errorId = error ? `${selectId}-error` : undefined;
  const helperId = helperText && !error ? `${selectId}-helper` : undefined;

  const select = (
    <select
      {...props}
      ref={ref}
      id={selectId}
      aria-invalid={showError || undefined}
      aria-describedby={errorId || helperId || undefined}
      className={cn(selectBase, showError && 'ring-2 ring-rose-500/40 focus:ring-rose-500/40', className)}
    >
      {children}
    </select>
  );

  if (!label && !error && !helperText) return select;

  return (
    <div>
      {label && (
        <label htmlFor={selectId} className="block text-sm text-white/70 mb-1.5">
          {label}
        </label>
      )}
      {select}
      {error && <p id={errorId} className="text-rose-400 text-xs mt-1">{error}</p>}
      {helperText && !error && <p id={helperId} className="text-white/40 text-xs mt-1">{helperText}</p>}
    </div>
  );
});
