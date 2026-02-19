import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type DashboardLayoutProps = {
  children: ReactNode;
  navbar?: ReactNode;
  sidebar?: ReactNode;
  className?: string;
};

export function DashboardLayout({ children, navbar, sidebar, className }: DashboardLayoutProps) {
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
        <main className="flex-1 min-w-0 py-8 px-6">
          <div className="max-w-5xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
