import { forwardRef, useId, useMemo, type InputHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

export type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
  label?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
  onChange?: (value: number) => void;
};

export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  {
    label,
    showValue = false,
    formatValue,
    onChange,
    disabled,
    min = 0,
    max = 100,
    step = 1,
    value,
    defaultValue,
    className,
    id: externalId,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const sliderId = externalId || generatedId;

  const numericValue = useMemo(() => {
    const raw = value !== undefined ? value : defaultValue;
    return raw !== undefined ? Number(raw) : Number(min);
  }, [value, defaultValue, min]);

  const percentage = useMemo(() => {
    const numMin = Number(min);
    const numMax = Number(max);
    if (numMax === numMin) return 0;
    return Math.max(0, Math.min(100, ((numericValue - numMin) / (numMax - numMin)) * 100));
  }, [numericValue, min, max]);

  // The linear-gradient fakes the filled vs unfilled track portions.
  // webkit paints the background directly on the input element; moz uses
  // ::-moz-range-progress / ::-moz-range-track which we override via bg-transparent
  // on the track and rely on the same gradient on the container.
  const trackGradient = `linear-gradient(to right, rgb(var(--ml-primary, 139 92 246)) ${percentage}%, rgba(255,255,255,0.1) ${percentage}%)`;

  const displayValue = formatValue ? formatValue(numericValue) : String(numericValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(Number(e.target.value));
  };

  const inputEl = (
    <input
      {...props}
      ref={ref}
      id={sliderId}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      defaultValue={value === undefined ? (defaultValue ?? Number(min)) : undefined}
      disabled={disabled}
      onChange={handleChange}
      style={{ background: trackGradient }}
      className={cn(
        // Layout + reset
        'w-full h-2 appearance-none rounded-full outline-none cursor-pointer',
        // bg is set via inline style (trackGradient); keep transparent fallback for SSR
        'bg-white/10',
        // Webkit thumb
        '[&::-webkit-slider-thumb]:appearance-none',
        '[&::-webkit-slider-thumb]:w-4',
        '[&::-webkit-slider-thumb]:h-4',
        '[&::-webkit-slider-thumb]:rounded-full',
        '[&::-webkit-slider-thumb]:bg-white',
        '[&::-webkit-slider-thumb]:border-2',
        '[&::-webkit-slider-thumb]:border-[rgb(var(--ml-primary,139_92_246))]',
        '[&::-webkit-slider-thumb]:transition-shadow',
        '[&::-webkit-slider-thumb]:duration-150',
        // Moz thumb
        '[&::-moz-range-thumb]:w-4',
        '[&::-moz-range-thumb]:h-4',
        '[&::-moz-range-thumb]:rounded-full',
        '[&::-moz-range-thumb]:bg-white',
        '[&::-moz-range-thumb]:border-2',
        '[&::-moz-range-thumb]:border-[rgb(var(--ml-primary,139_92_246))]',
        '[&::-moz-range-thumb]:transition-shadow',
        '[&::-moz-range-thumb]:duration-150',
        // Moz track — transparent so the gradient on the element shows through
        '[&::-moz-range-track]:bg-transparent',
        '[&::-moz-range-track]:rounded-full',
        // Focus ring on thumb
        'focus-visible:outline-none',
        'focus-visible:[&::-webkit-slider-thumb]:ring-2',
        'focus-visible:[&::-webkit-slider-thumb]:ring-primary/40',
        'focus-visible:[&::-webkit-slider-thumb]:ring-offset-2',
        'focus-visible:[&::-webkit-slider-thumb]:ring-offset-surface',
        'focus-visible:[&::-moz-range-thumb]:ring-2',
        'focus-visible:[&::-moz-range-thumb]:ring-primary/40',
        // Disabled
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    />
  );

  if (!label && !showValue) return inputEl;

  return (
    <div className="w-full space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        {label && (
          <label htmlFor={sliderId} className="text-sm text-white/70">
            {label}
          </label>
        )}
        {showValue && (
          <span className="text-sm font-medium text-white/90 tabular-nums ml-auto">
            {displayValue}
          </span>
        )}
      </div>
      {inputEl}
    </div>
  );
});
