import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type NavbarProps = {
  logo?: ReactNode;
  children?: ReactNode;
  className?: string;
  glass?: boolean;
};

export function Navbar({ logo, children, className, glass = true }: NavbarProps) {
  return (
    <header className={cn('fixed top-0 w-full z-50', glass && 'glass', className)}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {logo || (
            <>
              <div className="w-9 h-9 rounded-xl animated-gradient" />
              <span className="text-lg font-bold tracking-tight">MemeLab</span>
            </>
          )}
        </div>
        {children && <div className="flex items-center gap-4">{children}</div>}
      </div>
    </header>
  );
}
