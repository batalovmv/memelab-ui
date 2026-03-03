import { useEffect } from 'react';

// ─── Shared ref-counting scroll lock ────────────────────────────────────────
// A single counter is shared across all components (Modal, Drawer, etc.)
// so that opening a Modal + Drawer simultaneously doesn't break the lock.

let lockCount = 0;
let savedOverflow = '';

function lockScroll() {
  if (typeof document === 'undefined') return;
  if (lockCount === 0) {
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  lockCount++;
}

function unlockScroll() {
  if (typeof document === 'undefined') return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = savedOverflow;
  }
}

/** Ref-counted body scroll lock. Safe for nested overlays (Modal + Drawer). */
export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    lockScroll();
    return () => unlockScroll();
  }, [active]);
}
