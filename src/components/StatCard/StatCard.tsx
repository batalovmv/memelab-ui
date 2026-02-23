import { type ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type StatCardTrend = {
  value: number;
  label?: string;
};

export type StatCardProps = {
  value: string | number;
  label: string;
  icon?: ReactNode;
  trend?: StatCardTrend;
  className?: string;
};

function TrendIndicator({ trend }: { trend: StatCardTrend }) {
  if (trend.value > 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
        <svg aria-hidden="true" className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9V3M3 6l3-3 3 3" />
        </svg>
        <span>+{trend.value}{trend.label ? ` ${trend.label}` : ''}</span>
      </span>
    );
  }

  if (trend.value < 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-rose-400">
        <svg aria-hidden="true" className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 3v6M3 6l3 3 3-3" />
        </svg>
        <span>{trend.value}{trend.label ? ` ${trend.label}` : ''}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-xs text-white/40">
      <svg aria-hidden="true" className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 6h8" />
      </svg>
      <span>{trend.value}{trend.label ? ` ${trend.label}` : ''}</span>
    </span>
  );
}

export function StatCard({ value, label, icon, trend, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'bg-white/5 ring-1 ring-white/10 rounded-xl p-4 flex items-start gap-3',
        className,
      )}
    >
      {icon != null && (
        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-primary shrink-0">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-2xl font-bold text-white tabular-nums leading-none">
          {value}
        </span>
        <span className="text-sm text-white/50 truncate">{label}</span>
        {trend != null && (
          <div className="mt-1">
            <TrendIndicator trend={trend} />
          </div>
        )}
      </div>
    </div>
  );
}
