import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useHotkeys } from './useHotkeys';

function fireKey(key: string, mods: Partial<KeyboardEventInit> = {}) {
  document.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, ...mods }));
}

describe('useHotkeys', () => {
  it('calls handler on matching key', () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys([{ key: 'Escape', handler }]));
    fireKey('Escape');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('ignores non-matching keys', () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys([{ key: 'Escape', handler }]));
    fireKey('Enter');
    expect(handler).not.toHaveBeenCalled();
  });

  it('matches modifier keys', () => {
    const handler = vi.fn();
    renderHook(() =>
      useHotkeys([{ key: 's', modifiers: { ctrl: true }, handler }]),
    );
    fireKey('s'); // no ctrl
    expect(handler).not.toHaveBeenCalled();

    fireKey('s', { ctrlKey: true });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does not fire when disabled', () => {
    const handler = vi.fn();
    renderHook(() =>
      useHotkeys([{ key: 'Escape', handler }], { enabled: false }),
    );
    fireKey('Escape');
    expect(handler).not.toHaveBeenCalled();
  });

  it('supports multiple bindings', () => {
    const h1 = vi.fn();
    const h2 = vi.fn();
    renderHook(() =>
      useHotkeys([
        { key: 'a', handler: h1 },
        { key: 'b', handler: h2 },
      ]),
    );
    fireKey('a');
    fireKey('b');
    expect(h1).toHaveBeenCalledTimes(1);
    expect(h2).toHaveBeenCalledTimes(1);
  });

  it('cleans up on unmount', () => {
    const handler = vi.fn();
    const { unmount } = renderHook(() =>
      useHotkeys([{ key: 'Escape', handler }]),
    );
    unmount();
    fireKey('Escape');
    expect(handler).not.toHaveBeenCalled();
  });
});
