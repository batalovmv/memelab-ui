import { render, screen } from '@testing-library/react';

import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('renders header element', () => {
    render(<Navbar />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('applies glass class by default', () => {
    render(<Navbar />);
    expect(screen.getByRole('banner')).toHaveClass('glass');
  });

  it('renders custom logo', () => {
    render(<Navbar logo={<div data-testid="custom-logo">Logo</div>} />);
    expect(screen.getByTestId('custom-logo')).toBeInTheDocument();
  });

  it('renders default logo text when none provided', () => {
    render(<Navbar />);
    expect(screen.getByText('MemeLab')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <Navbar>
        <button>Login</button>
      </Navbar>,
    );
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('applies className', () => {
    render(<Navbar className="custom-class" />);
    expect(screen.getByRole('banner')).toHaveClass('custom-class');
  });

  it('removes glass class when glass=false', () => {
    render(<Navbar glass={false} />);
    expect(screen.getByRole('banner')).not.toHaveClass('glass');
  });
});
