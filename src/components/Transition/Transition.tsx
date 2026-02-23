import { useEffect, useRef, useState, type ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type TransitionPreset = 'fade' | 'fade-up' | 'fade-down' | 'scale' | 'slide-right' | 'slide-left';

export type TransitionProps = {
  show: boolean;
  children: ReactNode;
  /** Animation preset. Default: 'fade' */
  preset?: TransitionPreset;
  /** Duration in ms. Default: 200 */
  duration?: number;
  /** Unmount when hidden. Default: true */
  unmountOnHide?: boolean;
  className?: string;
};

const presetStyles: Record<TransitionPreset, { enter: string; exit: string }> = {
  fade: {
    enter: 'opacity-100',
    exit: 'opacity-0',
  },
  'fade-up': {
    enter: 'opacity-100 translate-y-0',
    exit: 'opacity-0 translate-y-2',
  },
  'fade-down': {
    enter: 'opacity-100 translate-y-0',
    exit: 'opacity-0 -translate-y-2',
  },
  scale: {
    enter: 'opacity-100 scale-100',
    exit: 'opacity-0 scale-95',
  },
  'slide-right': {
    enter: 'translate-x-0',
    exit: 'translate-x-full',
  },
  'slide-left': {
    enter: 'translate-x-0',
    exit: '-translate-x-full',
  },
};

export function Transition({
  show,
  children,
  preset = 'fade',
  duration = 200,
  unmountOnHide = true,
  className,
}: TransitionProps) {
  const [mounted, setMounted] = useState(show);
  const [entering, setEntering] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);

    if (show) {
      setMounted(true);
      // Next frame: apply enter styles
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setEntering(true));
      });
    } else {
      setEntering(false);
      if (unmountOnHide) {
        timerRef.current = setTimeout(() => {
          setMounted(false);
          timerRef.current = null;
        }, duration);
      }
    }

    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, [show, duration, unmountOnHide]);

  if (!mounted) return null;

  const styles = presetStyles[preset];

  return (
    <div
      className={cn(
        'transition-all',
        entering ? styles.enter : styles.exit,
        className,
      )}
      style={{ transitionDuration: `${duration}ms` }}
      aria-hidden={!show}
    >
      {children}
    </div>
  );
}
