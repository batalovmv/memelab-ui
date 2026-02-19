import { forwardRef, useId, type InputHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
  label?: string;
  error?: string;
  helperText?: string;
};

const inputBase =
  'w-full rounded-xl px-3 py-2.5 text-sm bg-white/10 text-white shadow-sm outline-none placeholder-white/30 focus:ring-2 focus:ring-primary/40 transition-shadow';

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { hasError, label, error, helperText, className, id: externalId, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = externalId || generatedId;
  const showError = hasError || !!error;

  const input = (
    <input
      ref={ref}
      id={inputId}
      {...props}
      className={cn(inputBase, showError && 'ring-2 ring-rose-500/40 focus:ring-rose-500/40', className)}
    />
  );

  if (!label && !error && !helperText) return input;

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="block text-sm text-white/50 mb-1.5">
          {label}
        </label>
      )}
      {input}
      {error && <p className="text-rose-400 text-xs mt-1">{error}</p>}
      {helperText && !error && <p className="text-white/40 text-xs mt-1">{helperText}</p>}
    </div>
  );
});
