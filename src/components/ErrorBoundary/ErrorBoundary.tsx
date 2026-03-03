import { Component, type ErrorInfo, type ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
};

type State = { error: Error | null };

export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  private reset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    const { fallback } = this.props;

    if (typeof fallback === 'function') {
      return fallback(error, this.reset);
    }

    if (fallback !== undefined) {
      return fallback;
    }

    // Default fallback
    return (
      <div role="alert" className={cn('glass rounded-xl p-6 text-center')}>
        <h2 className="text-lg font-semibold text-white mb-2">Something went wrong</h2>
        <p className="text-sm text-white/60 mb-4">{error.message}</p>
        <button
          type="button"
          onClick={this.reset}
          className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold leading-none px-3.5 py-2.5 text-sm bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-glow hover:shadow-glow-lg hover:scale-[1.02] transition-[transform,background-color,box-shadow,opacity] active:translate-y-[0.5px]"
        >
          Try again
        </button>
      </div>
    );
  }
}
