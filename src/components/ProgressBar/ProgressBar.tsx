import { cn } from '../../utils/cn';

export type ProgressBarVariant = 'primary' | 'success' | 'warning' | 'danger';

export type ProgressBarProps = {
  value: number; // 0–100
  max?: number; // default 100
  variant?: ProgressBarVariant;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeClasses: Record<NonNullable<ProgressBarProps['size']>, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

const variantClasses: Record<ProgressBarVariant, string> = {
  primary: 'bg-primary',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-rose-500',
};

export function ProgressBar({
  value,
  max = 100,
  variant = 'primary',
  label,
  showValue = false,
  size = 'md',
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1">
          {label && (
            <span className="text-xs text-white/60">{label}</span>
          )}
          {showValue && (
            <span className="text-xs text-white/60 ml-auto">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div
        className={cn('w-full rounded-full bg-white/10', sizeClasses[size])}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className={cn(
            'rounded-full transition-[width] duration-300 ease-out',
            sizeClasses[size],
            variantClasses[variant],
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
