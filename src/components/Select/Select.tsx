import { forwardRef, useId, type SelectHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  hasError?: boolean;
  label?: string;
  error?: string;
};

const selectBase =
  'w-full rounded-xl px-3 py-2.5 text-sm bg-white/10 text-white shadow-sm outline-none focus:ring-2 focus:ring-primary/40 transition-shadow';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { hasError, label, error, className, id: externalId, children, ...props },
  ref,
) {
  const generatedId = useId();
  const selectId = externalId || generatedId;
  const showError = hasError || !!error;

  const select = (
    <select
      ref={ref}
      id={selectId}
      {...props}
      className={cn(selectBase, showError && 'ring-2 ring-rose-500/40 focus:ring-rose-500/40', className)}
    >
      {children}
    </select>
  );

  if (!label && !error) return select;

  return (
    <div>
      {label && (
        <label htmlFor={selectId} className="block text-sm text-white/50 mb-1.5">
          {label}
        </label>
      )}
      {select}
      {error && <p className="text-rose-400 text-xs mt-1">{error}</p>}
    </div>
  );
});
