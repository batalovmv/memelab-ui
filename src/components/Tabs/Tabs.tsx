import { createContext, useCallback, useContext, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

import { cn } from '@/utils/cn';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TabsVariant = 'underline' | 'pill';

export type TabsProps = {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
  children: ReactNode;
  className?: string;
};

export type TabListProps = {
  children: ReactNode;
  className?: string;
};

export type TabProps = {
  value: string;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
};

export type TabPanelProps = {
  value: string;
  children: ReactNode;
  className?: string;
};

// ─── Context ──────────────────────────────────────────────────────────────────

type TabsContextValue = {
  activeValue: string;
  setActiveValue: (value: string) => void;
  variant: TabsVariant;
  baseId: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs sub-components must be used inside <Tabs>');
  return ctx;
}

// ─── Tabs (root) ──────────────────────────────────────────────────────────────

export function Tabs({
  defaultValue = '',
  value,
  onValueChange,
  variant = 'underline',
  children,
  className,
}: TabsProps) {
  const baseId = useId();
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);

  const activeValue = isControlled ? (value ?? '') : internalValue;

  const setActiveValue = useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const ctxValue = useMemo(
    () => ({ activeValue, setActiveValue, variant, baseId }),
    [activeValue, setActiveValue, variant, baseId],
  );

  return (
    <TabsContext.Provider value={ctxValue}>
      <div className={cn('flex flex-col', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

// ─── TabList ──────────────────────────────────────────────────────────────────

export function TabList({ children, className }: TabListProps) {
  const { variant } = useTabsContext();
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const list = listRef.current;
    if (!list) return;

    const tabs = Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'));
    if (tabs.length === 0) return;

    const focused = document.activeElement as HTMLButtonElement | null;
    if (!focused || !list.contains(focused)) return;
    const currentIndex = tabs.indexOf(focused);

    let nextIndex = currentIndex;

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'ArrowLeft':
        e.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = tabs.length - 1;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        focused?.click();
        return;
      default:
        return;
    }

    tabs[nextIndex]?.focus();
    tabs[nextIndex]?.click();
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      onKeyDown={handleKeyDown}
      className={cn(
        'flex',
        variant === 'underline' && 'border-b border-white/10',
        variant === 'pill' && 'gap-1 p-1 rounded-xl bg-white/5 ring-1 ring-white/10 w-fit',
        className,
      )}
    >
      {children}
    </div>
  );
}

// ─── Tab ──────────────────────────────────────────────────────────────────────

export function Tab({ value, disabled = false, children, className }: TabProps) {
  const { activeValue, setActiveValue, variant, baseId } = useTabsContext();
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={isActive}
      aria-controls={`${baseId}-panel-${value}`}
      disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      onClick={() => {
        if (!disabled) setActiveValue(value);
      }}
      className={cn(
        'relative px-4 py-2.5 text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-transparent',
        // underline variant
        variant === 'underline' && [
          'border-b-2 -mb-px',
          isActive
            ? 'border-primary text-white'
            : 'border-transparent text-white/40 hover:text-white/70 hover:border-white/20',
          disabled && 'opacity-40 cursor-not-allowed hover:text-white/40 hover:border-transparent',
        ],
        // pill variant
        variant === 'pill' && [
          'rounded-lg',
          isActive ? 'bg-white/10 text-white shadow-sm' : 'text-white/50 hover:text-white/80 hover:bg-white/5',
          disabled && 'opacity-40 cursor-not-allowed hover:bg-transparent hover:text-white/50',
        ],
        className,
      )}
    >
      {children}
    </button>
  );
}

// ─── TabPanel ─────────────────────────────────────────────────────────────────

export function TabPanel({ value, children, className }: TabPanelProps) {
  const { activeValue, baseId } = useTabsContext();

  if (activeValue !== value) return null;

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      className={cn('mt-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary', className)}
    >
      {children}
    </div>
  );
}
