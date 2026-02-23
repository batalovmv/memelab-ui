import { cn } from '@/utils/cn';

export type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  className?: string;
};

export function Divider({ orientation = 'horizontal', label, className }: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn('border-l border-white/10 h-full mx-3 self-stretch', className)}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cn('flex items-center gap-3 my-3 w-full', className)}
      >
        <span className="flex-1 border-t border-white/10" />
        <span className="text-xs text-white/40 leading-none select-none">{label}</span>
        <span className="flex-1 border-t border-white/10" />
      </div>
    );
  }

  return (
    <hr
      role="separator"
      aria-orientation="horizontal"
      className={cn('border-t border-white/10 w-full my-3', className)}
    />
  );
}
