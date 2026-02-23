import { useCallback, useEffect, useRef, useState } from 'react';

export type UseClipboardReturn = {
  copy: (text: string) => Promise<void>;
  copied: boolean;
};

export function useClipboard(timeout = 2000): UseClipboardReturn {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const copy = useCallback(
    async (text: string): Promise<void> => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        return;
      }

      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }

      setCopied(true);

      timerRef.current = setTimeout(() => {
        setCopied(false);
        timerRef.current = null;
      }, timeout);
    },
    [timeout],
  );

  return { copy, copied };
}
