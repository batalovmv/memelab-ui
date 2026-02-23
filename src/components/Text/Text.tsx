import { forwardRef, type HTMLAttributes, type ElementType } from 'react';

import { cn } from '@/utils/cn';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg';
export type TextColor = 'default' | 'muted' | 'dimmed' | 'primary' | 'success' | 'warning' | 'danger';

export type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  /** Font size. Default: 'md' */
  size?: TextSize;
  /** Color variant. Default: 'default' */
  color?: TextColor;
  /** Font weight. Default: 'normal' */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /** Render as span instead of p. Default: false */
  inline?: boolean;
  /** Truncate with ellipsis. Default: false */
  truncate?: boolean;
};

const sizeMap: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const colorMap: Record<TextColor, string> = {
  default: 'text-white/90',
  muted: 'text-white/70',
  dimmed: 'text-white/50',
  primary: 'text-primary-light',
  success: 'text-emerald-400',
  warning: 'text-amber-400',
  danger: 'text-rose-400',
};

const weightMap = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

export const Text = forwardRef<HTMLParagraphElement, TextProps>(function Text(
  { size = 'md', color = 'default', weight = 'normal', inline = false, truncate = false, className, ...props },
  ref,
) {
  const Tag = (inline ? 'span' : 'p') as ElementType;

  return (
    <Tag
      ref={ref}
      {...props}
      className={cn(
        sizeMap[size],
        colorMap[color],
        weightMap[weight],
        truncate && 'truncate',
        className,
      )}
    />
  );
});
