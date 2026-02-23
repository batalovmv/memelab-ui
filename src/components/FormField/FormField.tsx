import { cloneElement, useId, type ReactElement } from 'react';

import { cn } from '@/utils/cn';

export type FormFieldProps = {
  label?: string;
  error?: string;
  helperText?: string;
  children: ReactElement;
  className?: string;
  id?: string;
};

export function FormField({ label, error, helperText, children, className, id: idProp }: FormFieldProps) {
  const autoId = useId();
  const id = idProp ?? autoId;

  const descIds: string[] = [];
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;

  if (errorId) descIds.push(errorId);
  if (helperId) descIds.push(helperId);

  const describedBy = descIds.length > 0 ? descIds.join(' ') : undefined;

  const child = cloneElement(children, {
    id,
    ...(describedBy ? { 'aria-describedby': describedBy } : {}),
    ...(error ? { 'aria-invalid': true } : {}),
  } as Record<string, unknown>);

  return (
    <div className={cn('flex flex-col', className)}>
      {label ? (
        <label htmlFor={id} className="block text-sm text-white/70 mb-1.5">
          {label}
        </label>
      ) : null}
      {child}
      {error ? (
        <p id={errorId} className="text-rose-400 text-xs mt-1" role="alert">
          {error}
        </p>
      ) : null}
      {helperText && !error ? (
        <p id={helperId} className="text-white/40 text-xs mt-1">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
