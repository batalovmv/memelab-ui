import { forwardRef, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type TableProps = { children: ReactNode; className?: string };
export type TableHeaderProps = { children: ReactNode; className?: string };
export type TableBodyProps = { children: ReactNode; className?: string };
export type TableRowProps = { children: ReactNode; className?: string; hoverable?: boolean };
export type TableHeadProps = { children: ReactNode; className?: string };
export type TableCellProps = {
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
};

export const Table = forwardRef<HTMLTableElement, TableProps>(({ children, className }, ref) => (
  <div className="rounded-xl ring-1 ring-white/10 overflow-hidden bg-white/5">
    <table ref={ref} className={cn('w-full text-sm text-white', className)}>
      {children}
    </table>
  </div>
));
Table.displayName = 'Table';

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ children, className }, ref) => (
    <thead ref={ref} className={cn('bg-white/5 border-b border-white/10', className)}>
      {children}
    </thead>
  ),
);
TableHeader.displayName = 'TableHeader';

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className }, ref) => (
    <tbody ref={ref} className={cn('divide-y divide-white/[0.06]', className)}>
      {children}
    </tbody>
  ),
);
TableBody.displayName = 'TableBody';

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, className, hoverable }, ref) => (
    <tr
      ref={ref}
      className={cn(hoverable && 'hover:bg-white/[0.03] transition-colors', className)}
    >
      {children}
    </tr>
  ),
);
TableRow.displayName = 'TableRow';

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ children, className }, ref) => (
    <th
      ref={ref}
      className={cn(
        'px-4 py-3 text-left text-xs font-semibold text-white/50 uppercase tracking-wider',
        className,
      )}
    >
      {children}
    </th>
  ),
);
TableHead.displayName = 'TableHead';

const alignClass = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, className, align = 'left' }, ref) => (
    <td ref={ref} className={cn('px-4 py-3 text-white/80', alignClass[align], className)}>
      {children}
    </td>
  ),
);
TableCell.displayName = 'TableCell';
