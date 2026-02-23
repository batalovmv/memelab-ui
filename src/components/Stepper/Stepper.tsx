import React from 'react';
import { cn } from '../../utils/cn';

export type Step = {
  label: string;
  description?: string;
};

export type StepperProps = {
  steps: Step[];
  activeStep: number; // 0-indexed
  className?: string;
};

export function Stepper({ steps, activeStep, className }: StepperProps) {
  return (
    <div className={cn('flex items-start w-full', className)}>
      {steps.map((step, index) => {
        const isCompleted = index < activeStep;
        const isActive = index === activeStep;

        return (
          <React.Fragment key={index}>
            {/* Step item */}
            <div
              className="flex flex-col items-center"
              aria-current={isActive ? 'step' : undefined}
            >
              {/* Circle */}
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold',
                  isCompleted && 'bg-emerald-600 text-white',
                  isActive && 'bg-primary text-white ring-2 ring-primary/40',
                  !isCompleted && !isActive && 'bg-white/10 text-white/40',
                )}
              >
                {isCompleted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  'text-xs mt-2 text-center max-w-[6rem]',
                  isActive ? 'text-white/80' : 'text-white/50',
                )}
              >
                {step.label}
              </span>

              {/* Description */}
              {step.description && (
                <span className="text-xs mt-0.5 text-center text-white/30 max-w-[6rem]">
                  {step.description}
                </span>
              )}
            </div>

            {/* Connecting line (not after last step) */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'h-0.5 flex-1 mx-2 mt-4 self-start',
                  isCompleted ? 'bg-emerald-600' : 'bg-white/10',
                )}
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
