import { forwardRef, useId, useRef } from 'react';

import { cn } from '@/utils/cn';

export type ColorInputProps = {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
};

export const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>(function ColorInput(
  { value, onChange, label, disabled, className, id: idProp },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const nativePickerRef = useRef<HTMLInputElement>(null);

  function handleSwatchClick() {
    if (!disabled) {
      nativePickerRef.current?.click();
    }
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  function handleNativeChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label ? (
        <label htmlFor={id} className="block text-sm text-white/70">
          {label}
        </label>
      ) : null}
      <div
        className={cn(
          'flex items-center gap-2 bg-white/10 rounded-xl ring-1 ring-white/10 px-3 py-2 transition-shadow',
          'focus-within:ring-2 focus-within:ring-primary/40',
          disabled && 'opacity-60 pointer-events-none',
        )}
      >
        {/* Hidden native color picker */}
        <input
          type="color"
          ref={nativePickerRef}
          value={value}
          onChange={handleNativeChange}
          disabled={disabled}
          aria-hidden="true"
          tabIndex={-1}
          className="sr-only"
        />
        {/* Styled swatch button */}
        <button
          type="button"
          onClick={handleSwatchClick}
          disabled={disabled}
          aria-label="Open color picker"
          className={cn(
            'w-8 h-8 rounded-lg border border-white/20 flex-shrink-0 transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60',
          )}
          style={{ backgroundColor: value }}
        />
        {/* Hex text input */}
        <input
          ref={ref}
          id={id}
          type="text"
          value={value}
          onChange={handleTextChange}
          disabled={disabled}
          spellCheck={false}
          className="flex-1 min-w-0 bg-transparent text-sm text-white placeholder:text-white/30 outline-none font-mono"
          placeholder="#000000"
        />
      </div>
    </div>
  );
});
