import { useEffect, useRef, type ReactNode } from 'react';

import { cn } from '@/utils/cn';
import { focusSafely, getFocusableElements } from '@/utils/focus';

export type DrawerSide = 'left' | 'right' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'full';

export type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Side from which the drawer slides in. Default: 'right' */
  side?: DrawerSide;
  /** Width/height preset. Default: 'md' */
  size?: DrawerSize;
  /** ARIA label for the drawer. */
  ariaLabel?: string;
  /** Close on backdrop click. Default: true */
  closeOnBackdrop?: boolean;
  /** Close on Escape. Default: true */
  closeOnEsc?: boolean;
  /** Additional class for the drawer panel */
  className?: string;
};

// Reuse Modal's scroll-lock pattern
let scrollLockCount = 0;
let savedOverflow = '';

function lockScroll() {
  if (typeof document === 'undefined') return;
  if (scrollLockCount === 0) {
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  scrollLockCount++;
}

function unlockScroll() {
  if (typeof document === 'undefined') return;
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    document.body.style.overflow = savedOverflow;
  }
}

const sizeClass: Record<DrawerSide, Record<DrawerSize, string>> = {
  left: { sm: 'w-64', md: 'w-80', lg: 'w-96', full: 'w-screen' },
  right: { sm: 'w-64', md: 'w-80', lg: 'w-96', full: 'w-screen' },
  bottom: { sm: 'h-1/4', md: 'h-1/3', lg: 'h-1/2', full: 'h-screen' },
};

const positionClass: Record<DrawerSide, string> = {
  left: 'inset-y-0 left-0',
  right: 'inset-y-0 right-0',
  bottom: 'inset-x-0 bottom-0',
};

const slideIn: Record<DrawerSide, string> = {
  left: 'translate-x-0',
  right: 'translate-x-0',
  bottom: 'translate-y-0',
};

const slideOut: Record<DrawerSide, string> = {
  left: '-translate-x-full',
  right: 'translate-x-full',
  bottom: 'translate-y-full',
};

export function Drawer({
  isOpen,
  onClose,
  children,
  side = 'right',
  size = 'md',
  ariaLabel,
  closeOnBackdrop = true,
  closeOnEsc = true,
  className,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  // Focus management
  useEffect(() => {
    if (!isOpen) return;
    lastActiveRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const raf = requestAnimationFrame(() => {
      const el = panelRef.current;
      if (!el) return;
      const focusables = getFocusableElements(el);
      focusSafely(focusables[0] ?? el);
    });

    return () => {
      cancelAnimationFrame(raf);
      const lastActive = lastActiveRef.current;
      lastActiveRef.current = null;
      if (lastActive?.isConnected) focusSafely(lastActive);
    };
  }, [isOpen]);

  // Scroll lock
  useEffect(() => {
    if (!isOpen) return;
    lockScroll();
    return () => unlockScroll();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="presentation">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200"
        aria-hidden="true"
        onClick={closeOnBackdrop ? onClose : undefined}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className={cn(
          'fixed flex flex-col bg-surface-50 shadow-2xl ring-1 ring-white/10 transition-transform duration-300 ease-out focus:outline-none',
          positionClass[side],
          sizeClass[side][size],
          isOpen ? slideIn[side] : slideOut[side],
          className,
        )}
        onKeyDownCapture={(e) => {
          if (closeOnEsc && e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            onClose();
            return;
          }

          // Focus trap
          if (e.key !== 'Tab') return;
          const el = panelRef.current;
          if (!el) return;
          const focusables = getFocusableElements(el);
          if (focusables.length === 0) {
            e.preventDefault();
            focusSafely(el);
            return;
          }
          const active = document.activeElement;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey) {
            if (active === first) { e.preventDefault(); focusSafely(last); }
          } else {
            if (active === last) { e.preventDefault(); focusSafely(first); }
          }
        }}
      >
        {children}
      </div>
    </div>
  );
}
