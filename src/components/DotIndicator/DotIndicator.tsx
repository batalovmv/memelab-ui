import React from 'react';
import { cn } from '../../utils/cn';

export type DotIndicatorProps = {
  remaining: number;
  max: number;
  showLabel?: boolean;
  labelFormat?: (remaining: number, max: number) => string;
  className?: string;
};

function getUrgencyClasses(remaining: number, max: number): {
  filled: string;
  empty: string;
  label: string;
} {
  const ratio = max > 0 ? remaining / max : 0;

  if (ratio > 0.5) {
    return {
      filled: 'bg-emerald-400',
      empty: 'bg-emerald-400/30',
      label: 'text-emerald-400',
    };
  }

  if (ratio > 0.25) {
    return {
      filled: 'bg-amber-400',
      empty: 'bg-amber-400/30',
      label: 'text-amber-400',
    };
  }

  return {
    filled: 'bg-rose-400',
    empty: 'bg-rose-400/30',
    label: 'text-rose-400',
  };
}

export function DotIndicator({
  remaining,
  max,
  showLabel = false,
  labelFormat,
  className,
}: DotIndicatorProps) {
  const clampedRemaining = Math.max(0, Math.min(remaining, max));
  const used = max - clampedRemaining;
  const urgency = getUrgencyClasses(clampedRemaining, max);

  const defaultLabel = `${clampedRemaining}/${max}`;
  const label = labelFormat ? labelFormat(clampedRemaining, max) : defaultLabel;

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <div
        className="flex items-center gap-1"
        role="meter"
        aria-valuenow={clampedRemaining}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        {Array.from({ length: max }, (_, index) => {
          const isFilled = index < used;
          return (
            <span
              key={index}
              className={cn(
                'h-2 w-2 rounded-full transition-colors duration-300',
                isFilled ? urgency.filled : urgency.empty,
              )}
              aria-hidden="true"
            />
          );
        })}
      </div>

      {showLabel && (
        <span className={cn('text-xs font-medium tabular-nums', urgency.label)}>
          {label}
        </span>
      )}
    </div>
  );
}
