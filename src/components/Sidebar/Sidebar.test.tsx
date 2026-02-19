import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  it('renders aside element', () => {
    render(
      <Sidebar>
        <a href="/">Home</a>
      </Sidebar>,
    );
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('renders children in nav', () => {
    render(
      <Sidebar>
        <a href="/">Home</a>
      </Sidebar>,
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });

  it('applies w-64 when not collapsed', () => {
    render(
      <Sidebar>
        <a href="/">Home</a>
      </Sidebar>,
    );
    expect(screen.getByRole('complementary')).toHaveClass('w-64');
  });

  it('applies w-16 when collapsed', () => {
    render(
      <Sidebar collapsed>
        <a href="/">Home</a>
      </Sidebar>,
    );
    expect(screen.getByRole('complementary')).toHaveClass('w-16');
  });

  it('renders toggle button when onToggle provided', () => {
    render(
      <Sidebar onToggle={() => {}}>
        <a href="/">Home</a>
      </Sidebar>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('toggle button has correct aria-label when expanded', () => {
    render(
      <Sidebar onToggle={() => {}}>
        <a href="/">Home</a>
      </Sidebar>,
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Collapse sidebar');
  });

  it('toggle button has correct aria-label when collapsed', () => {
    render(
      <Sidebar collapsed onToggle={() => {}}>
        <a href="/">Home</a>
      </Sidebar>,
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Expand sidebar');
  });

  it('calls onToggle on click', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(
      <Sidebar onToggle={onToggle}>
        <a href="/">Home</a>
      </Sidebar>,
    );

    await user.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('does not render toggle button without onToggle', () => {
    render(
      <Sidebar>
        <a href="/">Home</a>
      </Sidebar>,
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('applies className', () => {
    render(
      <Sidebar className="custom-class">
        <a href="/">Home</a>
      </Sidebar>,
    );
    expect(screen.getByRole('complementary')).toHaveClass('custom-class');
  });
});
