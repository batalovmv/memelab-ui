import { cn } from '@/utils/cn';
import { Spinner, type SpinnerSize } from '@/components/Spinner';

export type LoadingScreenProps = {
  message?: string;
  size?: SpinnerSize;
  className?: string;
};

export function LoadingScreen({ message, size = 'lg', className }: LoadingScreenProps) {
  return (
    <div
      role="status"
      className={cn(
        'flex flex-col items-center justify-center min-h-screen bg-ml-bg gap-4',
        className,
      )}
    >
      <Spinner size={size} />
      {message && <p className="text-sm text-white/60">{message}</p>}
    </div>
  );
}
