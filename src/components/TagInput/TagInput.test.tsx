import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { TagInput } from './TagInput';

function TagInputHarness({ maxTags }: { maxTags?: number }) {
  const [tags, setTags] = useState<string[]>([]);
  return (
    <TagInput
      value={tags}
      onChange={setTags}
      placeholder="Add tag"
      maxTags={maxTags}
    />
  );
}

describe('TagInput', () => {
  it('renders existing tags', () => {
    render(<TagInput value={['react', 'typescript']} onChange={vi.fn()} />);

    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('typescript')).toBeInTheDocument();
  });

  it('adds tag on Enter', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<TagInput value={[]} onChange={onChange} placeholder="Add tag" />);

    await user.type(screen.getByPlaceholderText('Add tag'), 'react{Enter}');
    expect(onChange).toHaveBeenCalledWith(['react']);
  });

  it('removes tag on remove button click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<TagInput value={['react']} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: 'Remove react' }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('blocks adding tags when maxTags is reached', async () => {
    const user = userEvent.setup();
    render(<TagInputHarness maxTags={2} />);

    const input = screen.getByPlaceholderText('Add tag');
    await user.type(input, 'first{Enter}');
    await user.type(screen.getByRole('textbox'), 'second{Enter}');

    expect(screen.getByText('first')).toBeInTheDocument();
    expect(screen.getByText('second')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('renders placeholder when no tags exist', () => {
    render(<TagInput value={[]} onChange={vi.fn()} placeholder="Add tag" />);
    expect(screen.getByPlaceholderText('Add tag')).toBeInTheDocument();
  });
});
