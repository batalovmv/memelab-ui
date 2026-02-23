import { type ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type SectionCardProps = {
  title: string;
  description?: string;
  right?: ReactNode;
  overlay?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function SectionCard({
  title,
  description,
  right,
  overlay,
  children,
  className,
}: SectionCardProps) {
  return (
    <div
      className={cn(
        'relative bg-white/5 ring-1 ring-white/10 rounded-xl overflow-hidden',
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-white/[0.06]">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">{title}</p>
          {description && (
            <p className="text-xs text-white/40 mt-0.5">{description}</p>
          )}
        </div>
        {right && <div className="shrink-0">{right}</div>}
      </div>

      {/* Body */}
      <div className="px-5 py-4">{children}</div>

      {/* Overlay slot */}
      {overlay}
    </div>
  );
}
