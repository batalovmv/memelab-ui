import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/utils/cn';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export type PopoverProps = {
  content: ReactNode;
  children: ReactElement;
  /** Preferred placement. Default: 'bottom' */
  placement?: PopoverPlacement;
  /** Close on click outside. Default: true */
  closeOnClickOutside?: boolean;
  /** Close on Escape. Default: true */
  closeOnEsc?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Offset from anchor in px. Default: 8 */
  offset?: number;
  className?: string;
};

type Pos = { left: number; top: number; placement: PopoverPlacement } | null;

export function Popover({
  content,
  children,
  placement = 'bottom',
  closeOnClickOutside = true,
  closeOnEsc = true,
  open: controlledOpen,
  onOpenChange,
  offset = 8,
  className,
}: PopoverProps) {
  const popoverId = useId();
  const anchorRef = useRef<HTMLElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [internalOpen, setInternalOpen] = useState(false);
  const [pos, setPos] = useState<Pos>(null);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) setInternalOpen(value);
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange],
  );

  const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);

  const updatePosition = useCallback(() => {
    const el = anchorRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();

    let left: number;
    let top: number;
    let effPlacement = placement;

    if (placement === 'bottom' || placement === 'top') {
      left = r.left + r.width / 2;
      if (placement === 'bottom') {
        top = r.bottom + offset;
        if (top + 200 > window.innerHeight && r.top - offset > 200) {
          effPlacement = 'top';
          top = r.top - offset;
        }
      } else {
        top = r.top - offset;
        if (top < 8) {
          effPlacement = 'bottom';
          top = r.bottom + offset;
        }
      }
    } else {
      top = r.top + r.height / 2;
      if (placement === 'right') {
        left = r.right + offset;
      } else {
        left = r.left - offset;
      }
    }

    setPos({ left: Math.round(left), top: Math.round(top), placement: effPlacement });
  }, [placement, offset]);

  // Position updates
  useEffect(() => {
    if (!isOpen) return;
    updatePosition();

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, updatePosition]);

  // Click outside
  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        anchorRef.current?.contains(target) ||
        popoverRef.current?.contains(target)
      ) {
        return;
      }
      close();
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, closeOnClickOutside, close]);

  // Escape
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        anchorRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, closeOnEsc, close]);

  if (!isValidElement(children)) return children;

  const child = cloneElement(children, {
    ref: (node: HTMLElement | null) => {
      anchorRef.current = node;
      const childProps = children.props as Record<string, unknown>;
      const prevRef = childProps.ref;
      if (typeof prevRef === 'function') prevRef(node);
      else if (prevRef && typeof prevRef === 'object') (prevRef as { current: unknown }).current = node;
    },
    onClick: (e: React.MouseEvent) => {
      const childProps = children.props as Record<string, unknown>;
      if (typeof childProps.onClick === 'function') childProps.onClick(e);
      toggle();
    },
    'aria-expanded': isOpen,
    'aria-haspopup': 'dialog',
    'aria-controls': isOpen ? popoverId : undefined,
  } as Record<string, unknown>);

  const getTransform = () => {
    if (!pos) return 'translate(-9999px, -9999px)';
    switch (pos.placement) {
      case 'top':
        return 'translate(-50%, -100%)';
      case 'bottom':
        return 'translate(-50%, 0%)';
      case 'left':
        return 'translate(-100%, -50%)';
      case 'right':
        return 'translate(0%, -50%)';
    }
  };

  return (
    <>
      {child}
      {isOpen && typeof document !== 'undefined'
        ? createPortal(
            <div
              ref={popoverRef}
              id={popoverId}
              role="dialog"
              className={cn(
                'fixed z-[9999] rounded-xl shadow-xl ring-1 ring-white/10 bg-surface-50 backdrop-blur-md p-4',
                className,
              )}
              style={{
                left: pos?.left ?? 0,
                top: pos?.top ?? 0,
                transform: getTransform(),
              }}
            >
              {content}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
