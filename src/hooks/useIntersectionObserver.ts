import { useEffect, useRef, useState } from 'react';

export type UseIntersectionObserverOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  enabled?: boolean;
};

export type UseIntersectionObserverReturn = {
  ref: (node: Element | null) => void;
  entry: IntersectionObserverEntry | null;
  isIntersecting: boolean;
};

/**
 * IntersectionObserver hook for infinite scroll, lazy loading, etc.
 *
 * @example
 * const { ref, isIntersecting } = useIntersectionObserver({ rootMargin: '200px' });
 * useEffect(() => { if (isIntersecting) loadMore(); }, [isIntersecting]);
 * return <div ref={ref} />;
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {},
): UseIntersectionObserverReturn {
  const { root = null, rootMargin = '0px', threshold = 0, enabled = true } = options;

  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const nodeRef = useRef<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!enabled) {
      setEntry(null);
      return;
    }

    observerRef.current = new IntersectionObserver(
      ([e]) => setEntry(e),
      { root, rootMargin, threshold },
    );

    if (nodeRef.current) {
      observerRef.current.observe(nodeRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, root, rootMargin, JSON.stringify(threshold)]);

  const ref = (node: Element | null) => {
    if (nodeRef.current) {
      observerRef.current?.unobserve(nodeRef.current);
    }
    nodeRef.current = node;
    if (node) {
      observerRef.current?.observe(node);
    }
  };

  return {
    ref,
    entry,
    isIntersecting: entry?.isIntersecting ?? false,
  };
}
