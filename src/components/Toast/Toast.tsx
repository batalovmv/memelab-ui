import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/utils/cn';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';

export type ToastData = {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
};

export type ToastProviderProps = {
  children: ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
};

type ToastOptions = {
  variant: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
};

type ToastContextValue = {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
};

// ─── State / reducer ──────────────────────────────────────────────────────────

type Action =
  | { type: 'ADD'; toast: ToastData; maxToasts: number }
  | { type: 'REMOVE'; id: string }
  | { type: 'REMOVE_ALL' };

function reducer(state: ToastData[], action: Action): ToastData[] {
  switch (action.type) {
    case 'ADD': {
      const next = [...state, action.toast];
      return next.length > action.maxToasts ? next.slice(-action.maxToasts) : next;
    }
    case 'REMOVE':
      return state.filter((t) => t.id !== action.id);
    case 'REMOVE_ALL':
      return [];
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

// ─── Variant styling ──────────────────────────────────────────────────────────

const variantBarColor: Record<ToastVariant, string> = {
  success: 'bg-emerald-500',
  error: 'bg-rose-500',
  warning: 'bg-amber-500',
  info: 'bg-primary',
};

const variantProgressColor: Record<ToastVariant, string> = {
  success: 'bg-emerald-500',
  error: 'bg-rose-500',
  warning: 'bg-amber-500',
  info: 'bg-primary',
};

const variantIconLabel: Record<ToastVariant, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'i',
};

const variantIconColor: Record<ToastVariant, string> = {
  success: 'text-emerald-400',
  error: 'text-rose-400',
  warning: 'text-amber-400',
  info: 'text-primary',
};

// ─── Position ─────────────────────────────────────────────────────────────────

const positionClass: Record<ToastPosition, string> = {
  'top-right': 'top-4 right-4 items-end',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-right': 'bottom-4 right-4 items-end',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
};

// ─── Individual Toast Card ────────────────────────────────────────────────────

type ToastCardProps = {
  toast: ToastData;
  onDismiss: (id: string) => void;
};

function ToastCard({ toast, onDismiss }: ToastCardProps) {
  const duration = toast.duration ?? 5000;
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [started, setStarted] = useState(false);
  const dismissedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Trigger enter animation on mount, then start progress bar CSS transition
  useEffect(() => {
    let innerFrame: number;
    const frame = requestAnimationFrame(() => {
      setVisible(true);
      innerFrame = requestAnimationFrame(() => setStarted(true));
    });
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(innerFrame);
    };
  }, []);

  // Cleanup exit timer on unmount
  useEffect(() => {
    return () => {
      if (exitTimerRef.current !== null) clearTimeout(exitTimerRef.current);
    };
  }, []);

  const triggerDismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    setExiting(true);
    // Wait for exit animation before removing from state
    exitTimerRef.current = setTimeout(() => onDismiss(toast.id), 280);
  }, [onDismiss, toast.id]);

  // Auto-dismiss via setTimeout (progress bar is CSS-driven)
  useEffect(() => {
    if (duration <= 0) return;
    timerRef.current = setTimeout(triggerDismiss, duration);
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, [duration, triggerDismiss]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-variant={toast.variant}
      className={cn(
        // Base layout
        'relative flex w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl shadow-xl',
        // Glass background
        'bg-surface-100/95 backdrop-blur-md ring-1 ring-white/10',
        // Enter / exit transitions
        'transition-all duration-300',
        visible && !exiting ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8',
        exiting && 'scale-95',
      )}
    >
      {/* Left colour bar */}
      <span aria-hidden="true" className={cn('w-[3px] shrink-0 self-stretch', variantBarColor[toast.variant])} />

      {/* Content */}
      <div className="flex flex-1 items-start gap-3 px-4 py-3 pr-9">
        {/* Icon */}
        <span
          aria-hidden="true"
          className={cn(
            'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ring-1',
            variantIconColor[toast.variant],
            'ring-current/30',
          )}
        >
          {variantIconLabel[toast.variant]}
        </span>

        {/* Text */}
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-snug text-white">{toast.title}</p>
          {toast.description ? (
            <p className="mt-0.5 text-xs leading-relaxed text-white/60">{toast.description}</p>
          ) : null}
        </div>
      </div>

      {/* Close button */}
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={triggerDismiss}
        className={cn(
          'absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-lg',
          'text-white/40 transition-colors hover:bg-white/10 hover:text-white/80',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        )}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Progress bar (CSS transition-driven, no per-frame React state) */}
      {duration > 0 && (
        <span
          aria-hidden="true"
          className={cn(
            'absolute bottom-0 left-0 h-[2px] ease-linear',
            variantProgressColor[toast.variant],
            'opacity-60',
          )}
          style={{
            width: started ? '0%' : '100%',
            transitionProperty: 'width',
            transitionDuration: started ? `${duration}ms` : '0ms',
          }}
        />
      )}
    </div>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ToastProvider({ children, position = 'top-right', maxToasts = 5 }: ToastProviderProps) {
  const [toasts, dispatch] = useReducer(reducer, []);
  const counterRef = useRef(0);
  const maxToastsRef = useRef(maxToasts);
  maxToastsRef.current = maxToasts;

  const toast = useCallback(
    (options: ToastOptions): string => {
      const id = `toast-${++counterRef.current}`;
      const newToast: ToastData = {
        id,
        variant: options.variant,
        title: options.title,
        description: options.description,
        duration: options.duration ?? 5000,
      };

      dispatch({ type: 'ADD', toast: newToast, maxToasts: maxToastsRef.current });
      return id;
    },
    [],
  );

  const dismiss = useCallback((id: string) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  const dismissAll = useCallback(() => {
    dispatch({ type: 'REMOVE_ALL' });
  }, []);

  const value = useMemo(() => ({ toast, dismiss, dismissAll }), [toast, dismiss, dismissAll]);

  const container =
    typeof document !== 'undefined'
      ? createPortal(
          <div
            aria-label="Notifications"
            className={cn('fixed z-[9999] flex flex-col gap-3 pointer-events-none', positionClass[position])}
          >
            {toasts.map((t) => (
              <div key={t.id} className="pointer-events-auto">
                <ToastCard toast={t} onDismiss={dismiss} />
              </div>
            ))}
          </div>,
          document.body,
        )
      : null;

  return (
    <ToastContext.Provider value={value}>
      {children}
      {container}
    </ToastContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used inside <ToastProvider>');
  }
  return ctx;
}
