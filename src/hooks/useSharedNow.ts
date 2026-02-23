import { useEffect, useState } from 'react';

export type UseSharedNowOptions = {
  /** Tick interval in ms. Default: 1000 */
  interval?: number;
  /** Stop ticking after this timestamp (ms). Undefined = never stop. */
  untilMs?: number;
  /** Enable/disable. Default: true */
  enabled?: boolean;
};

/**
 * Reactive current-time hook that ticks on a shared interval.
 * Useful for countdowns, "X minutes ago" labels, and CooldownRing.
 *
 * @example
 * const now = useSharedNow({ interval: 1000 });
 * const remaining = Math.max(0, deadline - now);
 */
export function useSharedNow(options: UseSharedNowOptions = {}): number {
  const { interval = 1000, untilMs, enabled = true } = options;

  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    if (!enabled) return;

    // If we've already passed the deadline, don't start the timer
    if (untilMs !== undefined && Date.now() >= untilMs) return;

    const id = setInterval(() => {
      const current = Date.now();
      setNow(current);

      if (untilMs !== undefined && current >= untilMs) {
        clearInterval(id);
      }
    }, interval);

    return () => clearInterval(id);
  }, [interval, untilMs, enabled]);

  return now;
}
