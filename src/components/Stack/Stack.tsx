import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type StackProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  /** Direction. Default: 'vertical' */
  direction?: 'vertical' | 'horizontal';
  /** Gap in Tailwind spacing units (1 = 0.25rem). Default: 4 */
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  /** Align items along cross axis. Default: 'stretch' */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** Justify content along main axis. Default: 'start' */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Allow wrapping. Default: false */
  wrap?: boolean;
};

const gapClass: Record<NonNullable<StackProps['gap']>, string> = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
};

const alignClass: Record<NonNullable<StackProps['align']>, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyClass: Record<NonNullable<StackProps['justify']>, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { children, direction = 'vertical', gap = 4, align = 'stretch', justify = 'start', wrap = false, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        'flex',
        direction === 'vertical' ? 'flex-col' : 'flex-row',
        gapClass[gap],
        alignClass[align],
        justifyClass[justify],
        wrap && 'flex-wrap',
        className,
      )}
    >
      {children}
    </div>
  );
});
