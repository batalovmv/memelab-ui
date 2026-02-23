import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type NotificationBellProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  /** Icon to display (bell SVG, etc.). If omitted, renders a default bell. */
  icon?: ReactNode;
  /** Unread count. 0 or undefined hides the badge. */
  count?: number;
  /** Max count to display before showing "N+". Default: 99 */
  maxCount?: number;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show a ping animation on the badge */
  ping?: boolean;
};

const sizeClass = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const iconSizeClass = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const badgeSizeClass = {
  sm: 'min-w-[16px] h-4 text-[10px] px-1',
  md: 'min-w-[18px] h-[18px] text-[11px] px-1',
  lg: 'min-w-[20px] h-5 text-xs px-1.5',
};

const DefaultBellIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

export const NotificationBell = forwardRef<HTMLButtonElement, NotificationBellProps>(
  function NotificationBell(
    { icon, count, maxCount = 99, size = 'md', ping, className, disabled, ...props },
    ref,
  ) {
    const displayCount = count && count > maxCount ? `${maxCount}+` : count;
    const hasCount = count !== undefined && count > 0;

    return (
      <button
        ref={ref}
        type="button"
        {...props}
        disabled={disabled}
        aria-label={props['aria-label'] || `Notifications${hasCount ? ` (${count})` : ''}`}
        className={cn(
          'relative inline-flex items-center justify-center rounded-xl text-white/70 transition-colors hover:text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-60 disabled:pointer-events-none',
          sizeClass[size],
          className,
        )}
      >
        {icon ? (
          <span aria-hidden="true">{icon}</span>
        ) : (
          <DefaultBellIcon className={iconSizeClass[size]} />
        )}

        {hasCount && (
          <span
            className={cn(
              'absolute top-0 right-0 flex items-center justify-center rounded-full bg-rose-500 text-white font-semibold leading-none',
              badgeSizeClass[size],
            )}
          >
            {ping && (
              <span className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-75" />
            )}
            <span className="relative">{displayCount}</span>
          </span>
        )}
      </button>
    );
  },
);
