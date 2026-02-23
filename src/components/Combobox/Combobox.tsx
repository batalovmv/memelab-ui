import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/utils/cn';

export type ComboboxOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type ComboboxProps = {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Label above the input */
  label?: string;
  /** Error message */
  error?: string;
  /** Allow free-form input (not just predefined options). Default: false */
  allowCustom?: boolean;
  /** Filter function. Default: case-insensitive label match */
  filterFn?: (option: ComboboxOption, query: string) => boolean;
  /** Empty state content when no options match */
  emptyContent?: ReactNode;
  disabled?: boolean;
  className?: string;
  id?: string;
};

const defaultFilter = (opt: ComboboxOption, q: string) =>
  opt.label.toLowerCase().includes(q.toLowerCase());

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(function Combobox(
  {
    options,
    value,
    onChange,
    placeholder,
    label,
    error,
    allowCustom = false,
    filterFn = defaultFilter,
    emptyContent,
    disabled,
    className,
    id: externalId,
  },
  ref,
) {
  const generatedId = useId();
  const inputId = externalId || generatedId;
  const listboxId = `${inputId}-listbox`;

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [listPos, setListPos] = useState<{ left: number; top: number; width: number } | null>(null);

  // Sync query with value
  useEffect(() => {
    if (value !== undefined) {
      const opt = options.find((o) => o.value === value);
      setQuery(opt ? opt.label : value);
    }
  }, [value, options]);

  const filtered = useMemo(() => {
    if (!query) return options;
    return options.filter((opt) => filterFn(opt, query));
  }, [options, query, filterFn]);

  const enabledFiltered = useMemo(
    () => filtered.filter((o) => !o.disabled),
    [filtered],
  );

  const updatePosition = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setListPos({
      left: r.left,
      top: r.bottom + 4,
      width: r.width,
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, updatePosition]);

  // Click outside
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current?.contains(target) || listRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const selectOption = useCallback(
    (opt: ComboboxOption) => {
      setQuery(opt.label);
      onChange?.(opt.value);
      setOpen(false);
      setActiveIndex(-1);
      inputRef.current?.focus();
    },
    [onChange],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);
    setOpen(true);
    setActiveIndex(-1);
    if (allowCustom) onChange?.(v);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      setActiveIndex((i) => {
        const next = i + 1;
        return next >= enabledFiltered.length ? 0 : next;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      setActiveIndex((i) => {
        const prev = i - 1;
        return prev < 0 ? enabledFiltered.length - 1 : prev;
      });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (open && activeIndex >= 0 && enabledFiltered[activeIndex]) {
        selectOption(enabledFiltered[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      if (open) {
        e.preventDefault();
        setOpen(false);
        setActiveIndex(-1);
      }
    }
  };

  // Scroll active into view
  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return;
    const items = listRef.current.querySelectorAll('[role="option"]:not([aria-disabled="true"])');
    const item = items[activeIndex];
    if (item && typeof item.scrollIntoView === 'function') {
      item.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  const activeOptionId = activeIndex >= 0 ? `${inputId}-opt-${activeIndex}` : undefined;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label htmlFor={inputId} className="block text-sm text-white/70 mb-1.5">
          {label}
        </label>
      )}

      <div ref={containerRef} className="relative">
        <input
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={activeOptionId}
          aria-autocomplete="list"
          autoComplete="off"
          disabled={disabled}
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          className={cn(
            'w-full rounded-xl px-3 py-2.5 text-sm bg-white/10 text-white shadow-sm outline-none placeholder-white/30 focus-visible:ring-2 focus-visible:ring-primary/40 transition-shadow',
            error && 'ring-1 ring-rose-500/50',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
        />

        {/* Chevron */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => { if (!disabled) { setOpen(!open); inputRef.current?.focus(); } }}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 p-1"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>
      </div>

      {error && <p className="mt-1 text-xs text-rose-400">{error}</p>}

      {/* Dropdown portal */}
      {open && typeof document !== 'undefined'
        ? createPortal(
            <ul
              ref={listRef}
              id={listboxId}
              role="listbox"
              className="fixed z-[9999] max-h-60 overflow-auto rounded-xl bg-surface-50 shadow-xl ring-1 ring-white/10 py-1 backdrop-blur-md"
              style={{
                left: listPos?.left ?? 0,
                top: listPos?.top ?? 0,
                width: listPos?.width ?? 0,
              }}
            >
              {filtered.length === 0 ? (
                <li className="px-3 py-2 text-sm text-white/40">
                  {emptyContent ?? 'No results'}
                </li>
              ) : (
                filtered.map((opt) => {
                  const enabledIndex = enabledFiltered.indexOf(opt);
                  const isActive = enabledIndex === activeIndex;
                  return (
                    <li
                      key={opt.value}
                      id={isActive ? activeOptionId : undefined}
                      role="option"
                      aria-selected={opt.value === value}
                      aria-disabled={opt.disabled || undefined}
                      className={cn(
                        'px-3 py-2 text-sm cursor-pointer transition-colors',
                        isActive && 'bg-white/10',
                        opt.value === value && 'text-primary-light',
                        opt.disabled && 'opacity-40 cursor-not-allowed',
                        !opt.disabled && !isActive && 'text-white hover:bg-white/5',
                      )}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        if (!opt.disabled) selectOption(opt);
                      }}
                      onMouseEnter={() => {
                        if (!opt.disabled) setActiveIndex(enabledIndex);
                      }}
                    >
                      {opt.label}
                    </li>
                  );
                })
              )}
            </ul>,
            document.body,
          )
        : null}
    </div>
  );
});
