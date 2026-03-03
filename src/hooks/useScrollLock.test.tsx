import { render, act } from '@testing-library/react';
import { useState } from 'react';
import { describe, it, expect, beforeEach } from 'vitest';

import { useScrollLock } from './useScrollLock';

function LockToggle({ id }: { id: string }) {
  const [active, setActive] = useState(false);
  useScrollLock(active);
  return (
    <button data-testid={id} onClick={() => setActive((v) => !v)}>
      toggle
    </button>
  );
}

describe('useScrollLock', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  it('locks body overflow when active', () => {
    const { getByTestId } = render(<LockToggle id="a" />);
    expect(document.body.style.overflow).toBe('');

    act(() => getByTestId('a').click());
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('unlocks body overflow when deactivated', () => {
    const { getByTestId } = render(<LockToggle id="a" />);

    act(() => getByTestId('a').click()); // lock
    expect(document.body.style.overflow).toBe('hidden');

    act(() => getByTestId('a').click()); // unlock
    expect(document.body.style.overflow).toBe('');
  });

  it('ref-counts nested locks (Modal + Drawer scenario)', () => {
    const { getByTestId } = render(
      <>
        <LockToggle id="modal" />
        <LockToggle id="drawer" />
      </>,
    );

    act(() => getByTestId('modal').click()); // lock 1
    expect(document.body.style.overflow).toBe('hidden');

    act(() => getByTestId('drawer').click()); // lock 2
    expect(document.body.style.overflow).toBe('hidden');

    act(() => getByTestId('modal').click()); // unlock 1 → still locked
    expect(document.body.style.overflow).toBe('hidden');

    act(() => getByTestId('drawer').click()); // unlock 2 → fully unlocked
    expect(document.body.style.overflow).toBe('');
  });

  it('restores on unmount', () => {
    function Wrapper() {
      const [show, setShow] = useState(true);
      return (
        <>
          {show && <LockToggle id="a" />}
          <button data-testid="unmount" onClick={() => setShow(false)}>unmount</button>
        </>
      );
    }

    const { getByTestId } = render(<Wrapper />);
    act(() => getByTestId('a').click()); // lock
    expect(document.body.style.overflow).toBe('hidden');

    act(() => getByTestId('unmount').click()); // unmount → cleanup
    expect(document.body.style.overflow).toBe('');
  });
});
