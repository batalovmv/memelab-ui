import React from 'react';
import { cn } from '../../utils/cn';

export type StageProgressProps = {
  stages: string[];
  activeStage: number; // 0-indexed
  className?: string;
};

export function StageProgress({ stages, activeStage, className }: StageProgressProps) {
  const clampedActive = Math.max(0, Math.min(activeStage, stages.length - 1));
  const fillPercent =
    stages.length <= 1 ? 100 : (clampedActive / (stages.length - 1)) * 100;
  const isComplete = clampedActive >= stages.length - 1;
  const isAnimating = !isComplete;

  return (
    <div className={cn('w-full', className)}>
      {/* Stage labels */}
      <div className="flex justify-between">
        {stages.map((stage, index) => {
          const isCompleted = index < clampedActive;
          const isActive = index === clampedActive;

          return (
            <div
              key={stage}
              className={cn(
                'flex items-center gap-1.5 text-xs font-medium transition-colors duration-300',
                isCompleted && 'text-emerald-400',
                isActive && 'text-white',
                !isCompleted && !isActive && 'text-white/40',
              )}
            >
              {/* Dot / icon */}
              {isCompleted ? (
                // Completed: emerald check circle
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-400/20">
                  <svg
                    className="h-2.5 w-2.5 text-emerald-400"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 5.5L4 7.5L8 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              ) : isActive ? (
                // Active: primary dot with ring
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full ring-2 ring-[rgb(var(--ml-primary))] ring-offset-1 ring-offset-black/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--ml-primary))]" />
                </span>
              ) : (
                // Upcoming: hollow dim dot
                <span className="h-3.5 w-3.5 rounded-full border border-white/20 bg-transparent" />
              )}

              {stage}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div
        className="relative mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-valuenow={clampedActive}
        aria-valuemin={0}
        aria-valuemax={stages.length - 1}
        aria-label={`Stage ${clampedActive + 1} of ${stages.length}: ${stages[clampedActive]}`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-[rgb(var(--ml-accent))] to-[rgb(var(--ml-primary))] transition-[width] duration-500 ease-in-out"
          style={{ width: `${fillPercent}%` }}
        >
          {/* Shimmer overlay while processing */}
          {isAnimating && (
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full animate-[ml-shimmer_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </div>
  );
}
