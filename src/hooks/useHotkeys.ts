import { useEffect } from 'react';

export type HotkeyModifiers = {
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
};

export type HotkeyBinding = {
  key: string;
  modifiers?: HotkeyModifiers;
  handler: (e: KeyboardEvent) => void;
};

export type UseHotkeysOptions = {
  enabled?: boolean;
};

function matchModifiers(e: KeyboardEvent, mods?: HotkeyModifiers): boolean {
  const ctrl = mods?.ctrl ?? false;
  const shift = mods?.shift ?? false;
  const alt = mods?.alt ?? false;
  const meta = mods?.meta ?? false;

  return (
    e.ctrlKey === ctrl &&
    e.shiftKey === shift &&
    e.altKey === alt &&
    e.metaKey === meta
  );
}

/**
 * Global keyboard shortcut hook.
 *
 * @example
 * useHotkeys([
 *   { key: 'Escape', handler: () => close() },
 *   { key: 's', modifiers: { ctrl: true }, handler: (e) => { e.preventDefault(); save(); } },
 * ]);
 */
export function useHotkeys(
  bindings: HotkeyBinding[],
  options: UseHotkeysOptions = {},
): void {
  const { enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      for (const binding of bindings) {
        if (e.key === binding.key && matchModifiers(e, binding.modifiers)) {
          binding.handler(e);
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...bindings]);
}
