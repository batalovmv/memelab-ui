import { act, render, screen } from '@testing-library/react';
import { type ReactNode } from 'react';

import { ToastProvider, useToast } from './Toast';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Renders children wrapped in ToastProvider */
function renderWithProvider(ui: ReactNode, providerProps?: Partial<React.ComponentProps<typeof ToastProvider>>) {
  return render(<ToastProvider {...providerProps}>{ui}</ToastProvider>);
}

/** A minimal test harness component */
function TestHarness({
  onReady,
}: {
  onReady: (ctx: ReturnType<typeof useToast>) => void;
}) {
  const ctx = useToast();
  // Call onReady on every render so the test always has the latest reference
  onReady(ctx);
  return <div data-testid="harness" />;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('ToastProvider / useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  // ── Basic rendering ────────────────────────────────────────────────────────

  it('renders toast on trigger', () => {
    let ctx!: ReturnType<typeof useToast>;
    renderWithProvider(<TestHarness onReady={(c) => (ctx = c)} />);

    act(() => {
      ctx.toast({ variant: 'info', title: 'Hello world' });
    });

    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders title and description', () => {
    let ctx!: ReturnType<typeof useToast>;
    renderWithProvider(<TestHarness onReady={(c) => (ctx = c)} />);

    act(() => {
      ctx.toast({ variant: 'success', title: 'Upload complete', description: 'Your file has been uploaded.' });
    });

    expect(screen.getByText('Upload complete')).toBeInTheDocument();
    expect(screen.getByText('Your file has been uploaded.')).toBeInTheDocument();
  });

  // ── Auto-dismiss ───────────────────────────────────────────────────────────

  it('auto-dismisses after duration', () => {
    let ctx!: ReturnType<typeof useToast>;
    renderWithProvider(<TestHarness onReady={(c) => (ctx = c)} />);

    act(() => {
      ctx.toast({ variant: 'info', title: 'Auto gone', duration: 1000 });
    });

    expect(screen.getByText('Auto gone')).toBeInTheDocument();

    // Advance past duration + exit animation buffer (280ms setTimeout in triggerDismiss)
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.queryByText('Auto gone')).not.toBeInTheDocument();
  });

  // ── Manual dismiss ─────────────────────────────────────────────────────────

  it('dismisses manually via close button', () => {
    let ctx!: ReturnType<typeof useToast>;
    renderWithProvider(<TestHarness onReady={(c) => (ctx = c)} />);

    act(() => {
      ctx.toast({ variant: 'warning', title: 'Close me', duration: 60_000 });
    });

    expect(screen.getByText('Close me')).toBeInTheDocument();

    // Click the close button — triggerDismiss schedules a 280ms setTimeout
    act(() => {
      screen.getByRole('button', { name: 'Dismiss notification' }).click();
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.queryByText('Close me')).not.toBeInTheDocument();
  });

  it('dismisses programmatically via dismiss(id)', () => {
    let ctx!: ReturnType<typeof useToast>;
    renderWithProvider(<TestHarness onReady={(c) => (ctx = c)} />);

    let id!: string;
    act(() => {
      id = ctx.toast({ variant: 'error', title: 'Programmatic dismiss', duration: 60_000 });
    });

    expect(screen.getByText('Programmatic dismiss')).toBeInTheDocument();

    // dismiss() directly removes from state — no animation delay
    act(() => {
      ctx.dismiss(id);
    });

    expect(screen.queryByText('Programmatic dismiss')).not.toBeInTheDocument();
  });

  // ── dismissAll ─────────────────────────────────────────────────────────────

  it('dismissAll clears all toasts', () => {
    let ctx!: ReturnType<typeof useToast>;
    renderWithProvider(<TestHarness onReady={(c) => (ctx = c)} />);

    act(() => {
      ctx.toast({ variant: 'info', title: 'Toast one', duration: 60_000 });
      ctx.toast({ variant: 'success', title: 'Toast two', duration: 60_000 });
      ctx.toast({ variant: 'error', title: 'Toast three', duration: 60_000 });
    });

    expect(screen.getByText('Toast one')).toBeInTheDocument();
    expect(screen.getByText('Toast two')).toBeInTheDocument();
    expect(screen.getByText('Toast three')).toBeInTheDocument();

    act(() => {
      ctx.dismissAll();
    });

    expect(screen.queryByText('Toast one')).not.toBeInTheDocument();
    expect(screen.queryByText('Toast two')).not.toBeInTheDocument();
    expect(screen.queryByText('Toast three')).not.toBeInTheDocument();
  });

  // ── Variant styling ────────────────────────────────────────────────────────

  it('applies correct variant data attribute', () => {
    let ctx!: ReturnType<typeof useToast>;
    renderWithProvider(<TestHarness onReady={(c) => (ctx = c)} />);

    act(() => {
      ctx.toast({ variant: 'success', title: 'Success toast' });
    });

    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('data-variant', 'success');
  });

  it('shows correct variant colour bar class for error', () => {
    let ctx!: ReturnType<typeof useToast>;
    renderWithProvider(<TestHarness onReady={(c) => (ctx = c)} />);

    act(() => {
      ctx.toast({ variant: 'error', title: 'Error toast' });
    });

    const alert = screen.getByRole('alert');
    // The first child span is the colour bar
    const bar = alert.querySelector('span:first-child');
    expect(bar).toHaveClass('bg-rose-500');
  });

  it('shows correct variant colour bar class for warning', () => {
    let ctx!: ReturnType<typeof useToast>;
    renderWithProvider(<TestHarness onReady={(c) => (ctx = c)} />);

    act(() => {
      ctx.toast({ variant: 'warning', title: 'Warning toast' });
    });

    const alert = screen.getByRole('alert');
    const bar = alert.querySelector('span:first-child');
    expect(bar).toHaveClass('bg-amber-500');
  });

  it('shows correct variant colour bar class for info', () => {
    let ctx!: ReturnType<typeof useToast>;
    renderWithProvider(<TestHarness onReady={(c) => (ctx = c)} />);

    act(() => {
      ctx.toast({ variant: 'info', title: 'Info toast' });
    });

    const alert = screen.getByRole('alert');
    const bar = alert.querySelector('span:first-child');
    expect(bar).toHaveClass('bg-primary');
  });

  // ── maxToasts ──────────────────────────────────────────────────────────────

  it('respects maxToasts by removing oldest', () => {
    let ctx!: ReturnType<typeof useToast>;
    renderWithProvider(<TestHarness onReady={(c) => (ctx = c)} />, { maxToasts: 3 });

    act(() => {
      ctx.toast({ variant: 'info', title: 'Toast A', duration: 60_000 });
      ctx.toast({ variant: 'info', title: 'Toast B', duration: 60_000 });
      ctx.toast({ variant: 'info', title: 'Toast C', duration: 60_000 });
    });

    expect(screen.getByText('Toast A')).toBeInTheDocument();
    expect(screen.getByText('Toast B')).toBeInTheDocument();
    expect(screen.getByText('Toast C')).toBeInTheDocument();

    act(() => {
      ctx.toast({ variant: 'info', title: 'Toast D', duration: 60_000 });
    });

    // Oldest toast should be removed by maxToasts enforcement
    expect(screen.queryByText('Toast A')).not.toBeInTheDocument();
    expect(screen.getByText('Toast D')).toBeInTheDocument();
  });

  // ── useToast outside provider ──────────────────────────────────────────────

  it('throws when useToast is called outside ToastProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    function Bad() {
      useToast();
      return null;
    }

    expect(() => render(<Bad />)).toThrow('useToast must be used inside <ToastProvider>');
    spy.mockRestore();
  });
});
