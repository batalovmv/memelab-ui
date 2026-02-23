import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type DashboardLayoutProps = {
  children: ReactNode;
  navbar?: ReactNode;
  sidebar?: ReactNode;
  className?: string;
  mainClassName?: string;
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

export function DashboardLayout({ children, navbar, sidebar, className, mainClassName, maxWidth = 'lg' }: DashboardLayoutProps) {
  return (
    <div className={cn('min-h-screen bg-surface relative overflow-hidden', className)}>
      {/* Background orbs */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div className="orb orb-purple w-[400px] h-[400px] -top-[150px] -left-[150px] opacity-15" />
        <div className="orb orb-blue w-[300px] h-[300px] top-[60%] -right-[100px] opacity-10" />
      </div>

      {navbar}

      <div className={cn('flex', navbar && 'pt-16')}>
        {sidebar}
        <main className={cn('flex-1 min-w-0 py-8 px-6', mainClassName)}>
          <div className={cn('mx-auto', maxWidthClass[maxWidth])}>{children}</div>
        </main>
      </div>
    </div>
  );
}
