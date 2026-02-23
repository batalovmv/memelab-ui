import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { useIntersectionObserver } from './useIntersectionObserver';

let observeCallback: (entries: Partial<IntersectionObserverEntry>[]) => void;
const observe = vi.fn();
const unobserve = vi.fn();
const disconnect = vi.fn();

beforeEach(() => {
  observe.mockClear();
  unobserve.mockClear();
  disconnect.mockClear();

  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(cb: (entries: Partial<IntersectionObserverEntry>[]) => void) {
        observeCallback = cb;
      }
      observe = observe;
      unobserve = unobserve;
      disconnect = disconnect;
    },
  );
});

describe('useIntersectionObserver', () => {
  it('returns isIntersecting false initially', () => {
    const { result } = renderHook(() => useIntersectionObserver());
    expect(result.current.isIntersecting).toBe(false);
    expect(result.current.entry).toBeNull();
  });

  it('observes element when ref is called', () => {
    const { result } = renderHook(() => useIntersectionObserver());
    const div = document.createElement('div');
    act(() => result.current.ref(div));
    expect(observe).toHaveBeenCalledWith(div);
  });

  it('updates isIntersecting when intersection changes', () => {
    const { result } = renderHook(() => useIntersectionObserver());
    const div = document.createElement('div');
    act(() => result.current.ref(div));
    act(() => observeCallback([{ isIntersecting: true } as Partial<IntersectionObserverEntry>]));
    expect(result.current.isIntersecting).toBe(true);
  });

  it('does not observe when disabled', () => {
    const { result } = renderHook(() =>
      useIntersectionObserver({ enabled: false }),
    );
    const div = document.createElement('div');
    act(() => result.current.ref(div));
    expect(observe).not.toHaveBeenCalled();
  });

  it('disconnects on unmount', () => {
    const { unmount } = renderHook(() => useIntersectionObserver());
    unmount();
    expect(disconnect).toHaveBeenCalled();
  });
});
