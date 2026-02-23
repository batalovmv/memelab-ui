import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
  label?: string;
  error?: string;
  helperText?: string;
};

const textareaBase =
  'w-full rounded-xl px-3 py-2.5 text-sm bg-white/10 text-white shadow-sm outline-none placeholder-white/30 focus-visible:ring-2 focus-visible:ring-primary/40 transition-shadow resize-y';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { hasError, label, error, helperText, className, id: externalId, ...props },
  ref,
) {
  const generatedId = useId();
  const textareaId = externalId || generatedId;
  const showError = hasError || !!error;
  const errorId = error ? `${textareaId}-error` : undefined;
  const helperId = helperText && !error ? `${textareaId}-helper` : undefined;

  const textarea = (
    <textarea
      {...props}
      ref={ref}
      id={textareaId}
      aria-invalid={showError || undefined}
      aria-describedby={errorId || helperId || undefined}
      className={cn(textareaBase, showError && 'ring-2 ring-rose-500/40 focus:ring-rose-500/40', className)}
    />
  );

  if (!label && !error && !helperText) return textarea;

  return (
    <div>
      {label && (
        <label htmlFor={textareaId} className="block text-sm text-white/70 mb-1.5">
          {label}
        </label>
      )}
      {textarea}
      {error && <p id={errorId} className="text-rose-400 text-xs mt-1">{error}</p>}
      {helperText && !error && <p id={helperId} className="text-white/40 text-xs mt-1">{helperText}</p>}
    </div>
  );
});
