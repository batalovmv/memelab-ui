import { type ReactNode } from 'react';

import { cn } from '@/utils/cn';
import { Button } from '@/components/Button/Button';

export type EmptyStateProps = {
  icon?: (props: { className?: string }) => JSX.Element;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  children?: ReactNode;
  className?: string;
};

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction, children, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
      {Icon ? (
        <div className="mb-4 rounded-full bg-white/10 p-4">
          <Icon className="h-8 w-8 text-white/50" />
        </div>
      ) : null}

      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>

      {description ? <p className="text-white/60 max-w-md mb-6">{description}</p> : null}

      {actionLabel && onAction ? (
        <Button type="button" variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}

      {children}
    </div>
  );
}
