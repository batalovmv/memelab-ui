import type { HTMLAttributes, ReactNode } from 'react';

export type VisuallyHiddenProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  /** Render as a different element. Default: 'span' */
  as?: 'span' | 'div';
};

/**
 * Visually hides content while keeping it accessible to screen readers.
 */
export function VisuallyHidden({ children, as: Tag = 'span', style, ...props }: VisuallyHiddenProps) {
  return (
    <Tag
      {...props}
      style={{
        position: 'absolute',
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)',
        whiteSpace: 'nowrap',
        borderWidth: 0,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
