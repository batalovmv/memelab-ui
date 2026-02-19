import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type SidebarProps = {
  children: ReactNode;
  collapsed?: boolean;
  onToggle?: () => void;
  className?: string;
};

export function Sidebar({ children, collapsed = false, onToggle, className }: SidebarProps) {
  return (
    <aside
      className={cn(
        'glass h-full flex flex-col transition-[width] duration-200 overflow-hidden',
        collapsed ? 'w-16' : 'w-64',
        className,
      )}
    >
      {onToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center justify-center w-full h-12 text-white/40 hover:text-white hover:bg-white/5 transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            className={cn('h-5 w-5 transition-transform duration-200', collapsed && 'rotate-180')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      )}
      <nav className="flex-1 overflow-y-auto py-2">{children}</nav>
    </aside>
  );
}
