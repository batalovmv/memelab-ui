import { act, renderHook } from '@testing-library/react';

import { useMediaQuery } from './useMediaQuery';

type MediaQueryListListener = (event: MediaQueryListEvent) => void;

function createMockMediaQueryList(matches: boolean) {
  const listeners: MediaQueryListListener[] = [];

  const mql = {
    matches,
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn((event: string, listener: MediaQueryListListener) => {
      if (event === 'change') listeners.push(listener);
    }),
    removeEventListener: vi.fn((event: string, listener: MediaQueryListListener) => {
      if (event === 'change') {
        const idx = listeners.indexOf(listener);
        if (idx !== -1) listeners.splice(idx, 1);
      }
    }),
    dispatchEvent: vi.fn(),
    _trigger: (newMatches: boolean) => {
      mql.matches = newMatches;
      listeners.forEach((l) =>
        l({ matches: newMatches } as MediaQueryListEvent),
      );
    },
  };

  return mql;
}

describe('useMediaQuery', () => {
  let mockMql: ReturnType<typeof createMockMediaQueryList>;

  beforeEach(() => {
    mockMql = createMockMediaQueryList(false);
    vi.spyOn(window, 'matchMedia').mockReturnValue(
      mockMql as unknown as MediaQueryList,
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns initial match state (false)', () => {
    const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));
    expect(result.current).toBe(false);
  });

  it('returns initial match state (true)', () => {
    mockMql = createMockMediaQueryList(true);
    vi.spyOn(window, 'matchMedia').mockReturnValue(
      mockMql as unknown as MediaQueryList,
    );

    const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));
    expect(result.current).toBe(true);
  });

  it('updates when media query changes to true', () => {
    const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));
    expect(result.current).toBe(false);

    act(() => {
      mockMql._trigger(true);
    });

    expect(result.current).toBe(true);
  });

  it('updates when media query changes back to false', () => {
    mockMql = createMockMediaQueryList(true);
    vi.spyOn(window, 'matchMedia').mockReturnValue(
      mockMql as unknown as MediaQueryList,
    );

    const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));
    expect(result.current).toBe(true);

    act(() => {
      mockMql._trigger(false);
    });

    expect(result.current).toBe(false);
  });

  it('removes event listener on unmount', () => {
    const { unmount } = renderHook(() => useMediaQuery('(max-width: 768px)'));
    unmount();
    expect(mockMql.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );
  });
});
