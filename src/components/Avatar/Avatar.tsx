import { forwardRef, useState } from 'react';

import { cn } from '@/utils/cn';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export type AvatarProps = {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
};

const sizeClass: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

function getInitials(name?: string): string {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const second = parts[1]?.[0] ?? '';
  return (first + second).toUpperCase();
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  { src, alt, name, size = 'md', className },
  ref,
) {
  const [imgError, setImgError] = useState(false);
  const showFallback = !src || imgError;
  const initials = getInitials(name);

  return (
    <div
      ref={ref}
      className={cn(
        'relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden ring-1 ring-white/10',
        sizeClass[size],
        className,
      )}
    >
      {!showFallback && (
        <img
          src={src}
          alt={alt ?? name ?? ''}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      )}
      {showFallback && (
        <span
          aria-label={name}
          className="w-full h-full inline-flex items-center justify-center bg-gradient-to-br from-primary to-accent font-semibold text-white leading-none select-none"
        >
          {initials}
        </span>
      )}
    </div>
  );
});
