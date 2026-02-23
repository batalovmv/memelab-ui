import { cn } from '@/utils/cn';

export type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
};

type PageItem = number | '...';

function getPageRange(page: number, totalPages: number, siblingCount: number): PageItem[] {
  if (totalPages <= 1) return [1];

  const siblingStart = Math.max(2, page - siblingCount);
  const siblingEnd = Math.min(totalPages - 1, page + siblingCount);

  const showLeftEllipsis = siblingStart > 2;
  const showRightEllipsis = siblingEnd < totalPages - 1;

  const items: PageItem[] = [1];

  if (showLeftEllipsis) {
    items.push('...');
  } else {
    for (let i = 2; i < siblingStart; i++) {
      items.push(i);
    }
  }

  for (let i = siblingStart; i <= siblingEnd; i++) {
    items.push(i);
  }

  if (showRightEllipsis) {
    items.push('...');
  } else {
    for (let i = siblingEnd + 1; i < totalPages; i++) {
      items.push(i);
    }
  }

  if (totalPages > 1) {
    items.push(totalPages);
  }

  return items;
}

const buttonBase =
  'inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition-[background-color,opacity] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40';

const pageButton = cn(buttonBase, 'bg-white/5 ring-1 ring-white/10 text-white/80 hover:bg-white/10 hover:text-white');

const activeButton = cn(buttonBase, 'bg-primary text-white ring-1 ring-primary/20');

const navButton = cn(buttonBase, 'bg-white/5 ring-1 ring-white/10 text-white/80 hover:bg-white/10 hover:text-white');

const ChevronLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const items = getPageRange(page, totalPages, siblingCount);
  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn('flex items-center gap-1', className)}
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={isPrevDisabled}
        aria-label="Previous page"
        className={cn(navButton, isPrevDisabled && 'opacity-40 cursor-not-allowed pointer-events-none')}
      >
        <ChevronLeft />
      </button>

      {items.map((item, index) =>
        item === '...' ? (
          <span
            key={`ellipsis-${index}`}
            className="inline-flex items-center justify-center px-3 py-2 text-sm text-white/40 select-none"
            aria-hidden="true"
          >
            &hellip;
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            aria-label={`Page ${item}`}
            aria-current={item === page ? 'page' : undefined}
            className={item === page ? activeButton : pageButton}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={isNextDisabled}
        aria-label="Next page"
        className={cn(navButton, isNextDisabled && 'opacity-40 cursor-not-allowed pointer-events-none')}
      >
        <ChevronRight />
      </button>
    </nav>
  );
}
