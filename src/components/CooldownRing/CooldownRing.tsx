import { cn } from '@/utils/cn';

export type CooldownRingSize = 'sm' | 'md' | 'lg';

export type CooldownRingProps = {
  duration: number;
  remaining: number;
  onTick?: () => void;
  onComplete?: () => void;
  size?: CooldownRingSize;
  className?: string;
};

const sizeMap: Record<CooldownRingSize, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-base',
};

const strokeWidthMap: Record<CooldownRingSize, number> = {
  sm: 3,
  md: 3.5,
  lg: 4,
};

const RADIUS = 15.9155;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ~100.0

export function CooldownRing({
  duration,
  remaining,
  size = 'md',
  className,
}: CooldownRingProps) {
  const fraction = duration > 0 ? Math.max(0, Math.min(1, remaining / duration)) : 0;
  const offset = CIRCUMFERENCE * (1 - fraction);

  const color =
    fraction > 0.5
      ? 'text-primary'
      : fraction > 0.25
        ? 'text-amber-500'
        : 'text-rose-500';

  const pulse = remaining <= 10 && remaining > 0;

  const strokeWidth = strokeWidthMap[size];

  return (
    <div className={cn('relative inline-flex items-center justify-center', sizeMap[size], className)}>
      <svg
        viewBox="0 0 36 36"
        className={cn('w-full h-full -rotate-90', color, pulse && 'animate-pulse')}
        aria-label={`Cooldown: ${remaining} seconds remaining`}
        role="img"
      >
        {/* Background track */}
        <circle
          cx="18"
          cy="18"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-white/10"
        />
        {/* Progress ring */}
        <circle
          cx="18"
          cy="18"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      {/* Center label */}
      <span
        className="absolute font-semibold tabular-nums text-white select-none"
        style={{ lineHeight: 1 }}
      >
        {Math.max(0, Math.ceil(remaining))}
      </span>
    </div>
  );
}
