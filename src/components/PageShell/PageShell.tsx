import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type PageShellVariant = 'plain' | 'glass' | 'minimal';

export type PageShellProps = {
  header?: ReactNode;
  background?: ReactNode;
  variant?: PageShellVariant;
  children: ReactNode;
  className?: string;
  mainClassName?: string;
  /** @deprecated Use `mainClassName` instead. Alias kept for backwards compatibility. */
  containerClassName?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
};

const maxWidthClass: Record<string, string> = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-7xl',
  '2xl': 'max-w-[92rem]',
  full: 'max-w-full',
};

function defaultBackground(): ReactNode {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-violet-600/20 blur-[140px]" />
      <div className="absolute top-20 -right-32 h-[500px] w-[500px] rounded-full bg-purple-500/[0.12] blur-[120px]" />
      <div className="absolute bottom-0 left-1/2 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-accent/[0.10] blur-[120px]" />
    </div>
  );
}

export function PageShell({
  header,
  background,
  variant = 'plain',
  className,
  mainClassName,
  containerClassName,
  maxWidth = 'xl',
  children,
}: PageShellProps) {
  const showDefaultBackground = variant !== 'minimal' && !background;

  return (
    <div className={cn('relative overflow-hidden flex-1 min-h-full flex flex-col', className)}>
      {background}
      {showDefaultBackground ? defaultBackground() : null}

      {header}

      <main
        className={cn(
          'relative py-8 flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8',
          maxWidthClass[maxWidth],
          containerClassName,
          mainClassName,
        )}
      >
        {children}
      </main>
    </div>
  );
}
