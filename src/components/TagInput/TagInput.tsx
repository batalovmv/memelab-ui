import { useId, useRef, type KeyboardEvent, type ClipboardEvent } from 'react';

import { cn } from '@/utils/cn';

export type TagInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
  maxTags?: number;
  className?: string;
  id?: string;
};

export function TagInput({
  value,
  onChange,
  placeholder,
  disabled = false,
  label,
  error,
  maxTags,
  className,
  id: externalId,
}: TagInputProps) {
  const generatedId = useId();
  const inputId = externalId ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;
  const inputRef = useRef<HTMLInputElement>(null);

  const atMax = maxTags !== undefined && value.length >= maxTags;

  function addTag(raw: string) {
    const tag = raw.trim();
    if (!tag || value.includes(tag) || atMax) return;
    onChange([...value, tag]);
  }

  function removeTag(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    const input = inputRef.current;
    if (!input) return;

    if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
      if (input.value) {
        e.preventDefault();
        addTag(input.value);
        input.value = '';
      }
      return;
    }

    if (e.key === 'Backspace' && !input.value && value.length > 0) {
      removeTag(value.length - 1);
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData.getData('text');
    if (!pasted.includes(',')) return;
    e.preventDefault();
    const parts = pasted.split(',');
    const next = [...value];
    for (const part of parts) {
      const tag = part.trim();
      if (tag && !next.includes(tag)) {
        if (maxTags !== undefined && next.length >= maxTags) break;
        next.push(tag);
      }
    }
    onChange(next);
    if (inputRef.current) inputRef.current.value = '';
  }

  const wrapper = (
    <div
      className={cn(
        'flex flex-wrap items-center gap-1.5 min-h-[42px] w-full rounded-xl px-3 py-2 bg-white/10 ring-1 ring-white/10 transition-shadow focus-within:ring-2 focus-within:ring-primary/40',
        error && 'ring-2 ring-rose-500/40 focus-within:ring-rose-500/40',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((tag, i) => (
        <span
          key={`${tag}-${i}`}
          className="inline-flex items-center gap-1 bg-white/10 text-white/90 rounded-full text-xs px-2.5 py-1 ring-1 ring-white/10"
        >
          {tag}
          {!disabled && (
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              onClick={(e) => {
                e.stopPropagation();
                removeTag(i);
              }}
              className="text-white/50 hover:text-white/90 transition-colors leading-none"
            >
              &#x2715;
            </button>
          )}
        </span>
      ))}
      <input
        ref={inputRef}
        id={inputId}
        type="text"
        disabled={disabled || atMax}
        placeholder={value.length === 0 ? placeholder : undefined}
        aria-invalid={!!error || undefined}
        aria-describedby={errorId}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onBlur={(e) => {
          if (e.target.value) {
            addTag(e.target.value);
            e.target.value = '';
          }
        }}
        className="flex-1 min-w-[120px] bg-transparent text-sm text-white outline-none placeholder-white/30 disabled:cursor-not-allowed"
      />
    </div>
  );

  if (!label && !error) return wrapper;

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="block text-sm text-white/70 mb-1.5">
          {label}
        </label>
      )}
      {wrapper}
      {error && (
        <p id={errorId} className="text-rose-400 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
