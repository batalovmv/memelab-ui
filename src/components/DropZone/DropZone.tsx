import { useCallback, useRef, useState, type DragEvent, type KeyboardEvent, type ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type DropZoneProps = {
  onFilesDropped: (files: File[]) => void;
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  'aria-label'?: string;
};

/** Check if a file matches an accept string (e.g. "image/*,.pdf") */
function matchesAccept(file: File, accept: string): boolean {
  const types = accept.split(',').map((t) => t.trim().toLowerCase());
  const fileName = file.name.toLowerCase();
  const mimeType = file.type.toLowerCase();

  return types.some((t) => {
    if (t.startsWith('.')) return fileName.endsWith(t);
    if (t.endsWith('/*')) return mimeType.startsWith(t.slice(0, -1));
    return mimeType === t;
  });
}

export function DropZone({
  onFilesDropped,
  accept,
  maxFiles,
  maxSize,
  disabled = false,
  children,
  className,
  'aria-label': ariaLabel = 'File drop zone',
}: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);

  const processFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || disabled) return;

      let files = Array.from(fileList);

      if (accept) {
        files = files.filter((f) => matchesAccept(f, accept));
      }

      if (maxSize !== undefined) {
        files = files.filter((f) => f.size <= maxSize);
      }

      if (maxFiles !== undefined) {
        files = files.slice(0, maxFiles);
      }

      onFilesDropped(files);
    },
    [accept, disabled, maxFiles, maxSize, onFilesDropped],
  );

  const handleDragEnter = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      dragCounterRef.current++;
      if (!disabled) setIsDragging(true);
    },
    [disabled],
  );

  const handleDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    },
    [],
  );

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      dragCounterRef.current = 0;
      setIsDragging(false);
      if (disabled) return;
      processFiles(e.dataTransfer.files);
    },
    [disabled, processFiles],
  );

  const handleClick = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        inputRef.current?.click();
      }
    },
    [disabled],
  );

  const handleInputChange = useCallback(() => {
    processFiles(inputRef.current?.files ?? null);
    // Reset so the same file can be re-selected
    if (inputRef.current) inputRef.current.value = '';
  }, [processFiles]);

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors cursor-pointer select-none outline-none',
        'border-white/20 bg-white/5 backdrop-blur-sm',
        'hover:border-primary/50 hover:bg-white/[0.08]',
        'focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
        isDragging && 'border-primary bg-primary/10',
        disabled && 'pointer-events-none opacity-50',
        className,
      )}
    >
      <input
        ref={inputRef}
        type="file"
        tabIndex={-1}
        className="sr-only"
        accept={accept}
        multiple={maxFiles !== 1}
        onChange={handleInputChange}
        onClick={(e) => e.stopPropagation()}
        aria-hidden="true"
      />

      {children ?? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <p className="text-sm text-white/50">Drop files here or click to browse</p>
        </>
      )}
    </div>
  );
}
