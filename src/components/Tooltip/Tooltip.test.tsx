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

  it('sets aria-describedby on child when content is string', () => {
    render(
      <Tooltip content="Help text">
        <button>Hover me</button>
      </Tooltip>,
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-describedby');
  });

  it('does not set aria-describedby when content is not a string', () => {
    render(
      <Tooltip content={<span>Help</span>}>
        <button>Hover me</button>
      </Tooltip>,
    );
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-describedby');
  });
});
