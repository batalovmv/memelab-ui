import React from 'react';
import { cn } from '../../utils/cn';

export type FilterPill = {
  key: string;
  label: string;
};

export type ActiveFilterPillsProps = {
  filters: FilterPill[];
  onRemove: (key: string) => void;
  onClearAll?: () => void;
  clearAllLabel?: string;
  className?: string;
};

export function ActiveFilterPills({
  filters,
  onRemove,
  onClearAll,
  clearAllLabel = 'Clear all',
  className,
}: ActiveFilterPillsProps) {
  if (filters.length === 0) return null;

  return (
    <div className={cn('flex flex-wrap items-center gap-1.5', className)}>
      {filters.map((filter) => (
        <span
          key={filter.key}
          className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/80 ring-1 ring-white/10"
        >
          {filter.label}
          <button
            type="button"
            onClick={() => onRemove(filter.key)}
            className="ml-0.5 text-white/50 transition-colors duration-150 hover:text-white focus:outline-none focus-visible:text-white"
            aria-label={`Remove filter: ${filter.label}`}
          >
            <svg
              className="h-3 w-3"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M9 3L3 9M3 3L9 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </span>
      ))}

      {filters.length > 1 && onClearAll && (
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs text-white/40 underline-offset-2 transition-colors duration-150 hover:text-white/70 focus:outline-none focus-visible:text-white/70"
        >
          {clearAllLabel}
        </button>
      )}
    </div>
  );
}
