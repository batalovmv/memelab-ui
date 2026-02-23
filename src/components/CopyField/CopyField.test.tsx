import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CopyField } from './CopyField';

describe('CopyField', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders value and copy button', () => {
    render(<CopyField value="token-123" />);

    expect(screen.getByText('token-123')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Copy to clipboard' })).toBeInTheDocument();
  });

  it('changes copy button state after click', async () => {
    const user = userEvent.setup();
    render(<CopyField value="copy-me" />);

    await user.click(screen.getByRole('button', { name: 'Copy to clipboard' }));
    expect(screen.getByRole('button', { name: 'Copied!' })).toBeInTheDocument();
  });

  it('masks value when masked mode is enabled', () => {
    render(<CopyField value="secret123" masked />);

    expect(screen.queryByText('secret123')).not.toBeInTheDocument();
    expect(screen.getByText('•••••••••')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<CopyField value="abc" label="API key" />);
    expect(screen.getByText('API key')).toBeInTheDocument();
  });
});
