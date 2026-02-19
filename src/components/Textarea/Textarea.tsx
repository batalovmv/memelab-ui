import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
  label?: string;
  error?: string;
};

const textareaBase =
  'w-full rounded-xl px-3 py-2.5 text-sm bg-white/10 text-white shadow-sm outline-none placeholder-white/30 focus:ring-2 focus:ring-primary/40 transition-shadow resize-y';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { hasError, label, error, className, id: externalId, ...props },
  ref,
) {
  const generatedId = useId();
  const textareaId = externalId || generatedId;
  const showError = hasError || !!error;

  const textarea = (
    <textarea
      ref={ref}
      id={textareaId}
      {...props}
      className={cn(textareaBase, showError && 'ring-2 ring-rose-500/40 focus:ring-rose-500/40', className)}
    />
  );

  if (!label && !error) return textarea;

  return (
    <div>
      {label && (
        <label htmlFor={textareaId} className="block text-sm text-white/50 mb-1.5">
          {label}
        </label>
      )}
      {textarea}
      {error && <p className="text-rose-400 text-xs mt-1">{error}</p>}
    </div>
  );
});
