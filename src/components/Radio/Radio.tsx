import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type KeyboardEvent,
} from 'react';

import { cn } from '@/utils/cn';

// ─── Context ────────────────────────────────────────────────────────────────

type RadioGroupContextValue = {
  value: string | undefined;
  onChange: (value: string) => void;
  name: string;
  disabled: boolean;
  groupId: string;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroup(): RadioGroupContextValue {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) {
    throw new Error('RadioItem must be used inside a RadioGroup');
  }
  return ctx;
}

// ─── Types ───────────────────────────────────────────────────────────────────

export type RadioGroupProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

export type RadioItemProps = {
  value: string;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
};

// ─── RadioGroup ───────────────────────────────────────────────────────────────

export function RadioGroup({
  value: controlledValue,
  defaultValue,
  onValueChange,
  name: externalName,
  disabled = false,
  orientation = 'vertical',
  label,
  error,
  children,
  className,
}: RadioGroupProps) {
  const groupId = useId();
  const generatedName = useId();
  const name = externalName ?? generatedName;

  const [uncontrolledValue, setUncontrolledValue] = useState<string | undefined>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = useCallback(
    (val: string) => {
      if (!isControlled) setUncontrolledValue(val);
      onValueChange?.(val);
    },
    [isControlled, onValueChange],
  );

  const labelId = label ? `${groupId}-label` : undefined;
  const errorId = error ? `${groupId}-error` : undefined;

  const ctxValue = useMemo(
    () => ({ value: currentValue, onChange: handleChange, name, disabled, groupId }),
    [currentValue, handleChange, name, disabled, groupId],
  );

  return (
    <RadioGroupContext.Provider value={ctxValue}>
      <fieldset
        role="radiogroup"
        aria-labelledby={labelId}
        aria-describedby={errorId}
        aria-disabled={disabled || undefined}
        className={cn('border-none p-0 m-0', className)}
      >
        {label && (
          <legend id={labelId} className="text-sm text-white/50 mb-2 float-none p-0">
            {label}
          </legend>
        )}

        <div
          className={cn(
            'flex gap-3',
            orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
          )}
        >
          {children}
        </div>

        {error && (
          <p id={errorId} className="text-rose-400 text-xs mt-1.5">
            {error}
          </p>
        )}
      </fieldset>
    </RadioGroupContext.Provider>
  );
}

// ─── RadioItem ────────────────────────────────────────────────────────────────

export function RadioItem({ value, disabled: itemDisabled, children, className }: RadioItemProps) {
  const { value: groupValue, onChange, name, disabled: groupDisabled } = useRadioGroup();
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const isDisabled = groupDisabled || itemDisabled;
  const isSelected = groupValue === value;

  // Collect sibling radio inputs for arrow-key navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') {
      return;
    }
    e.preventDefault();

    const fieldset = inputRef.current?.closest('fieldset');
    if (!fieldset) return;

    const inputs = Array.from(
      fieldset.querySelectorAll<HTMLInputElement>(`input[type="radio"][name="${name}"]:not(:disabled)`),
    );
    const currentIndex = inputs.indexOf(inputRef.current!);
    if (currentIndex === -1) return;

    const forward = e.key === 'ArrowDown' || e.key === 'ArrowRight';
    const nextIndex = forward
      ? (currentIndex + 1) % inputs.length
      : (currentIndex - 1 + inputs.length) % inputs.length;

    const nextInput = inputs[nextIndex];
    nextInput.focus();
    onChange(nextInput.value);
  };

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'inline-flex items-center gap-2.5',
        isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
    >
      {/* Hidden native radio for accessibility and form submission */}
      <input
        ref={inputRef}
        id={inputId}
        type="radio"
        name={name}
        value={value}
        checked={isSelected}
        disabled={isDisabled}
        onChange={() => onChange(value)}
        onKeyDown={handleKeyDown}
        className="sr-only peer"
        aria-describedby={undefined}
      />

      {/* Custom radio visual */}
      <span
        className={cn(
          'relative flex items-center justify-center w-5 h-5 rounded-full',
          'bg-white/10 border border-white/20',
          'transition-colors duration-150',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-transparent',
          isSelected && 'border-primary',
        )}
        aria-hidden="true"
      >
        {isSelected && (
          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
        )}
      </span>

      <span className="text-sm text-white/80 select-none">{children}</span>
    </label>
  );
}
