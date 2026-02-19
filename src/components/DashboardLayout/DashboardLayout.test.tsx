import { render, screen } from '@testing-library/react';

import { DashboardLayout } from './DashboardLayout';

describe('DashboardLayout', () => {
  it('renders children', () => {
    render(
      <DashboardLayout>
        <p>Dashboard content</p>
      </DashboardLayout>,
    );
    expect(screen.getByText('Dashboard content')).toBeInTheDocument();
  });

  it('renders navbar when provided', () => {
    render(
      <DashboardLayout navbar={<nav data-testid="navbar">Navbar</nav>}>
        <p>Content</p>
      </DashboardLayout>,
    );
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('renders sidebar when provided', () => {
    render(
      <DashboardLayout sidebar={<aside data-testid="sidebar">Sidebar</aside>}>
        <p>Content</p>
      </DashboardLayout>,
    );
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(
      <DashboardLayout className="custom-class">
        <p>Content</p>
      </DashboardLayout>,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('adds pt-16 when navbar is present', () => {
    const { container } = render(
      <DashboardLayout navbar={<nav>Navbar</nav>}>
        <p>Content</p>
      </DashboardLayout>,
    );
    const flexContainer = container.querySelector('.flex.pt-16');
    expect(flexContainer).toBeInTheDocument();
  });

  it('does not add pt-16 when navbar is absent', () => {
    const { container } = render(
      <DashboardLayout>
        <p>Content</p>
      </DashboardLayout>,
    );
    const flexContainer = container.querySelector('.flex');
    expect(flexContainer).not.toHaveClass('pt-16');
  });
});
