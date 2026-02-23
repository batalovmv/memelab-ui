import { act, render, screen, within } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';

import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders children', () => {
    render(
      <Tooltip content="Help text">
        <button>Hover me</button>
      </Tooltip>,
    );
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('does not show tooltip initially', () => {
    render(
      <Tooltip content="Help text">
        <button>Hover me</button>
      </Tooltip>,
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on hover after delay', () => {
    render(
      <Tooltip content="Help text" delayMs={300}>
        <button>Hover me</button>
      </Tooltip>,
    );

    const button = screen.getByRole('button');

    fireEvent.mouseEnter(button);

    // Not yet visible — delay not elapsed
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Tooltip renders in a portal on document.body
    const tooltip = within(document.body).getByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent('Help text');
  });

  it('hides tooltip on mouse leave', () => {
    render(
      <Tooltip content="Help text" delayMs={0}>
        <button>Hover me</button>
      </Tooltip>,
    );

    const button = screen.getByRole('button');

    fireEvent.mouseEnter(button);

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(within(document.body).getByRole('tooltip')).toBeInTheDocument();

    fireEvent.mouseLeave(button);

    expect(within(document.body).queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('sets aria-describedby on child when tooltip is open', () => {
    render(
      <Tooltip content="Help text" delayMs={0}>
        <button>Hover me</button>
      </Tooltip>,
    );
    const button = screen.getByRole('button');

    // Not set when closed
    expect(button).not.toHaveAttribute('aria-describedby');

    fireEvent.mouseEnter(button);
    act(() => { vi.advanceTimersByTime(0); });

    // Set when open
    expect(button).toHaveAttribute('aria-describedby');
  });

  it('sets aria-describedby for ReactNode content when open', () => {
    render(
      <Tooltip content={<span>Help</span>} delayMs={0}>
        <button>Hover me</button>
      </Tooltip>,
    );
    const button = screen.getByRole('button');

    fireEvent.mouseEnter(button);
    act(() => { vi.advanceTimersByTime(0); });

    // Now set for ReactNode content too
    expect(button).toHaveAttribute('aria-describedby');
  });
});
