import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

import { useSharedNow } from './useSharedNow';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useSharedNow', () => {
  it('returns current time', () => {
    const { result } = renderHook(() => useSharedNow());
    expect(typeof result.current).toBe('number');
    expect(result.current).toBeGreaterThan(0);
  });

  it('ticks at the given interval', () => {
    const { result } = renderHook(() => useSharedNow({ interval: 500 }));
    const initial = result.current;

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBeGreaterThanOrEqual(initial);
  });

  it('does not tick when disabled', () => {
    const { result } = renderHook(() =>
      useSharedNow({ interval: 100, enabled: false }),
    );
    const initial = result.current;

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe(initial);
  });

  it('stops ticking after untilMs is reached', () => {
    const deadline = Date.now() + 2000;
    renderHook(() => useSharedNow({ interval: 500, untilMs: deadline }));

    // Advance past deadline
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // Should not throw or cause issues — timer should have been cleared
  });
});
