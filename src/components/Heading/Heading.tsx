import { forwardRef, type HTMLAttributes, type ElementType } from 'react';

import { cn } from '@/utils/cn';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  /** Heading level (1-6). Default: 2 */
  level?: HeadingLevel;
  /** Visual size override. Defaults to matching the level. */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Color variant. Default: 'default' */
  color?: 'default' | 'muted' | 'gradient';
};

const sizeClass = {
  xs: 'text-sm font-semibold',
  sm: 'text-base font-semibold',
  md: 'text-lg font-bold',
  lg: 'text-xl font-bold',
  xl: 'text-2xl font-bold tracking-tight',
  '2xl': 'text-3xl font-bold tracking-tight sm:text-4xl',
};

const levelToSize: Record<HeadingLevel, keyof typeof sizeClass> = {
  1: '2xl',
  2: 'xl',
  3: 'lg',
  4: 'md',
  5: 'sm',
  6: 'xs',
};

const colorClass = {
  default: 'text-white',
  muted: 'text-white/70',
  gradient: 'text-gradient',
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { level = 2, size, color = 'default', className, ...props },
  ref,
) {
  const Tag = `h${level}` as ElementType;
  const effectiveSize = size ?? levelToSize[level];

  return (
    <Tag
      ref={ref}
      {...props}
      className={cn(sizeClass[effectiveSize], colorClass[color], className)}
    />
  );
});
