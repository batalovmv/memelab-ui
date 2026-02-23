import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type ScrollAreaProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  /** Max height. When content exceeds, scrollbar appears. */
  maxHeight?: string | number;
  /** Hide scrollbar visually while keeping scroll functionality. Default: false */
  hideScrollbar?: boolean;
  /** Orientation. Default: 'vertical' */
  orientation?: 'vertical' | 'horizontal' | 'both';
};

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(function ScrollArea(
  { children, maxHeight, hideScrollbar = false, orientation = 'vertical', className, style, ...props },
  ref,
) {
  const overflowClass = {
    vertical: 'overflow-y-auto overflow-x-hidden',
    horizontal: 'overflow-x-auto overflow-y-hidden',
    both: 'overflow-auto',
  }[orientation];

  return (
    <div
      ref={ref}
      {...props}
      tabIndex={0}
      className={cn(
        overflowClass,
        // Custom dark scrollbar styling
        '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:h-1.5',
        '[&::-webkit-scrollbar-track]:bg-transparent',
        '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15 hover:[&::-webkit-scrollbar-thumb]:bg-white/25',
        hideScrollbar && 'no-scrollbar',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:ring-inset',
        className,
      )}
      style={{
        maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
        ...style,
      }}
    >
      {children}
    </div>
  );
});
