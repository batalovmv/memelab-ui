import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/utils/cn';

export type TooltipPlacement = 'top' | 'bottom';

export type TooltipProps = {
  content: ReactNode;
  delayMs?: number;
  placement?: TooltipPlacement;
  className?: string;
  children: ReactElement;
};

type Pos = { left: number; top: number; placement: TooltipPlacement } | null;

export function Tooltip({ content, delayMs = 500, placement = 'top', className, children }: TooltipProps) {
  const tooltipId = useId();
  const openTimerRef = useRef<number | null>(null);
  const anchorRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<Pos>(null);

  const clearTimer = useCallback(() => {
    if (openTimerRef.current !== null) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
  }, []);

  const updatePosition = useCallback(() => {
    const el = anchorRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();

    const centerX = r.left + r.width / 2;
    const preferTop = placement === 'top';
    const topY = r.top - 10;
    const bottomY = r.bottom + 10;

    const canTop = topY > 8;
    const effPlacement: TooltipPlacement = preferTop ? (canTop ? 'top' : 'bottom') : 'bottom';

    setPos({
      left: Math.round(centerX),
      top: Math.round(effPlacement === 'top' ? topY : bottomY),
      placement: effPlacement,
    });
  }, [placement]);

  const scheduleOpen = useCallback(() => {
    clearTimer();
    openTimerRef.current = window.setTimeout(() => {
      setOpen(true);
    }, Math.max(0, delayMs));
  }, [clearTimer, delayMs]);

  const close = useCallback(() => {
    clearTimer();
    setOpen(false);
  }, [clearTimer]);

  useEffect(() => {
    if (!open) return;
    updatePosition();

    const onScroll = () => updatePosition();
    const onResize = () => updatePosition();

    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  if (!isValidElement(children)) return children;

  const child = cloneElement(children, {
    ref: (node: HTMLElement | null) => {
      anchorRef.current = node;

      // Forward ref to the original child
      const childProps = children.props as Record<string, unknown>;
      const prevRef = childProps.ref;
      if (typeof prevRef === 'function') prevRef(node);
      else if (prevRef && typeof prevRef === 'object') (prevRef as { current: unknown }).current = node;
    },
    onMouseEnter: (e: React.MouseEvent) => {
      const childProps = children.props as Record<string, unknown>;
      if (typeof childProps.onMouseEnter === 'function') childProps.onMouseEnter(e);
      scheduleOpen();
    },
    onMouseLeave: (e: React.MouseEvent) => {
      const childProps = children.props as Record<string, unknown>;
      if (typeof childProps.onMouseLeave === 'function') childProps.onMouseLeave(e);
      close();
    },
    onFocus: (e: React.FocusEvent) => {
      const childProps = children.props as Record<string, unknown>;
      if (typeof childProps.onFocus === 'function') childProps.onFocus(e);
      scheduleOpen();
    },
    onBlur: (e: React.FocusEvent) => {
      const childProps = children.props as Record<string, unknown>;
      if (typeof childProps.onBlur === 'function') childProps.onBlur(e);
      close();
    },
    ...(open ? { 'aria-describedby': tooltipId } : {}),
  } as Record<string, unknown>);

  return (
    <>
      {child}
      {open && content && typeof document !== 'undefined'
        ? createPortal(
            <div
              id={tooltipId}
              role="tooltip"
              className={cn(
                'fixed z-[9999] max-w-[320px] rounded-lg px-3 py-2 text-xs leading-snug shadow-xl pointer-events-none',
                'bg-surface-100 text-white ring-1 ring-white/10',
                className,
              )}
              style={
                pos
                  ? {
                      left: pos.left,
                      top: pos.top,
                      transform: pos.placement === 'top' ? 'translate(-50%, -100%)' : 'translate(-50%, 0%)',
                    }
                  : { left: 0, top: 0, transform: 'translate(-9999px, -9999px)' }
              }
            >
              {content}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
