import {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
  type MutableRefObject,
} from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/utils/cn';
import { focusSafely, getFocusableElements } from '@/utils/focus';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

type DropdownContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
  triggerId: string;
  menuId: string;
  triggerRef: MutableRefObject<HTMLElement | null>;
};

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext(component: string): DropdownContextValue {
  const ctx = useContext(DropdownContext);
  if (!ctx) {
    throw new Error(`<${component}> must be rendered inside <Dropdown>`);
  }
  return ctx;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type DropdownProps = { children: ReactNode; className?: string };
export type DropdownTriggerProps = { children: ReactElement; className?: string };
export type DropdownMenuProps = { children: ReactNode; className?: string; align?: 'left' | 'right' };
export type DropdownItemProps = { onSelect?: () => void; disabled?: boolean; children: ReactNode; className?: string };
export type DropdownSeparatorProps = { className?: string };

// ---------------------------------------------------------------------------
// Dropdown (root)
// ---------------------------------------------------------------------------

export function Dropdown({ children, className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const triggerId = useId();
  const menuId = useId();
  const triggerRef = useRef<HTMLElement | null>(null);

  const toggleOpen = useCallback(() => setOpen((prev) => !prev), []);

  const ctxValue = useMemo(
    () => ({ open, setOpen, toggleOpen, triggerId, menuId, triggerRef }),
    [open, setOpen, toggleOpen, triggerId, menuId, triggerRef],
  );

  return (
    <DropdownContext.Provider value={ctxValue}>
      <div className={cn('relative inline-block', className)}>{children}</div>
    </DropdownContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// DropdownTrigger
// ---------------------------------------------------------------------------

export function DropdownTrigger({ children, className }: DropdownTriggerProps) {
  const { open, toggleOpen, triggerId, menuId, triggerRef } = useDropdownContext('DropdownTrigger');

  if (!isValidElement(children)) return children;

  return cloneElement(children as ReactElement<Record<string, unknown>>, {
    id: triggerId,
    'aria-haspopup': 'menu',
    'aria-expanded': open,
    'aria-controls': open ? menuId : undefined,
    className: cn((children.props as Record<string, unknown>).className as string | undefined, className),
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
      // Forward ref if the original child had one
      const childRef = (children as ReactElement<Record<string, unknown>> & { ref?: unknown }).ref;
      if (typeof childRef === 'function') childRef(node);
      else if (childRef && typeof childRef === 'object') (childRef as { current: unknown }).current = node;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick: (e: any) => {
      const childProps = children.props as Record<string, unknown>;
      if (typeof childProps.onClick === 'function') childProps.onClick(e);
      toggleOpen();
    },
  });
}

// ---------------------------------------------------------------------------
// DropdownMenu
// ---------------------------------------------------------------------------

type Pos = { top: number; left: number } | null;

export function DropdownMenu({ children, className, align = 'left' }: DropdownMenuProps) {
  const { open, setOpen, menuId, triggerId, triggerRef } = useDropdownContext('DropdownMenu');
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<Pos>(null);
  const [visible, setVisible] = useState(false);

  // Compute position from trigger bounding rect
  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const left = align === 'right' ? rect.right : rect.left;
    setPos({
      top: Math.round(rect.bottom + 6),
      left: Math.round(left),
    });
  }, [align, triggerRef]);

  // Focus first item when opening
  useEffect(() => {
    if (!open) {
      setVisible(false);
      return;
    }

    updatePosition();

    // Defer so the portal is painted before we try to focus
    const raf = window.requestAnimationFrame(() => {
      setVisible(true);
      const menuEl = menuRef.current;
      if (!menuEl) return;
      const items = getFocusableElements(menuEl);
      focusSafely(items[0] ?? menuEl);
    });

    return () => window.cancelAnimationFrame(raf);
  }, [open, updatePosition]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: PointerEvent) {
      const target = e.target as Node | null;
      if (menuRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      setOpen(false);
    }

    document.addEventListener('pointerdown', handlePointerDown, true);
    return () => document.removeEventListener('pointerdown', handlePointerDown, true);
  }, [open, setOpen, triggerRef]);

  // Reposition on scroll / resize
  useEffect(() => {
    if (!open) return;
    const onScroll = () => updatePosition();
    const onResize = () => updatePosition();
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
    };
  }, [open, updatePosition]);

  if (!open) return null;

  const panel = (
    <div
      ref={menuRef}
      id={menuId}
      role="menu"
      aria-labelledby={triggerId}
      tabIndex={-1}
      className={cn(
        // Base glass panel
        'fixed z-[9999] min-w-[10rem] py-1',
        'rounded-xl shadow-xl ring-1 ring-white/10',
        'bg-surface-50/90 backdrop-blur-md',
        // Animation
        'transition-[opacity,transform] duration-150 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1',
        className,
      )}
      style={
        pos
          ? {
              top: pos.top,
              ...(align === 'right' ? { right: `calc(100vw - ${pos.left}px)` } : { left: pos.left }),
            }
          : { top: 0, left: 0, visibility: 'hidden' }
      }
      onKeyDown={(e) => {
        const menuEl = menuRef.current;
        if (!menuEl) return;

        if (e.key === 'Escape' || e.key === 'Tab') {
          if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            focusSafely(triggerRef.current);
          }
          setOpen(false);
          return;
        }

        const items = getFocusableElements(menuEl).filter(
          (el) => el.getAttribute('role') === 'menuitem' && el.getAttribute('aria-disabled') !== 'true',
        );
        if (items.length === 0) return;

        const active = document.activeElement;
        const currentIndex = items.findIndex((el) => el === active);

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const next = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
          focusSafely(items[next]);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
          focusSafely(items[prev]);
        } else if (e.key === 'Home') {
          e.preventDefault();
          focusSafely(items[0]);
        } else if (e.key === 'End') {
          e.preventDefault();
          focusSafely(items[items.length - 1]);
        }
      }}
    >
      {children}
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(panel, document.body);
}

// ---------------------------------------------------------------------------
// DropdownItem
// ---------------------------------------------------------------------------

export function DropdownItem({ onSelect, disabled = false, children, className }: DropdownItemProps) {
  const { setOpen, triggerRef } = useDropdownContext('DropdownItem');

  const handleSelect = useCallback(() => {
    if (disabled) return;
    setOpen(false);
    focusSafely(triggerRef.current);
    onSelect?.();
  }, [disabled, onSelect, setOpen, triggerRef]);

  return (
    <div
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled ? 'true' : undefined}
      className={cn(
        'flex items-center gap-2 w-full px-3 py-2 text-sm text-left cursor-pointer select-none',
        'text-white/80 transition-colors duration-100',
        'focus:outline-none focus-visible:bg-white/10',
        disabled
          ? 'opacity-40 pointer-events-none cursor-not-allowed'
          : 'hover:bg-white/10 hover:text-white focus-visible:text-white',
        className,
      )}
      onClick={handleSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect();
        }
      }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// DropdownSeparator
// ---------------------------------------------------------------------------

export function DropdownSeparator({ className }: DropdownSeparatorProps) {
  return <div role="separator" className={cn('border-t border-white/10 my-1', className)} />;
}
