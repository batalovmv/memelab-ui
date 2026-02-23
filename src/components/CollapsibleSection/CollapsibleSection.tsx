import { type ReactNode, useId, useState } from 'react';

import { cn } from '@/utils/cn';

export type CollapsibleSectionProps = {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
  right?: ReactNode;
  className?: string;
};

export function CollapsibleSection({ title, defaultOpen = true, children, right, className }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();
  const titleId = `${contentId}-title`;

  return (
    <div className={cn('rounded-xl ring-1 ring-white/10 bg-white/5 overflow-hidden', className)}>
      <button
        type="button"
        id={titleId}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-white/[0.03] transition-colors"
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <div className="flex items-center gap-2">
          <svg
            className={cn('h-4 w-4 text-white/40 transition-transform duration-200', isOpen && 'rotate-90')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-sm font-semibold text-white">{title}</span>
        </div>
        {right}
      </button>
      <div
        id={contentId}
        role="region"
        aria-labelledby={titleId}
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
