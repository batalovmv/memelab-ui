import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CollapsibleSection } from './CollapsibleSection';

describe('CollapsibleSection', () => {
  it('renders title', () => {
    render(<CollapsibleSection title="Settings">Content</CollapsibleSection>);
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders children when defaultOpen=true', () => {
    render(
      <CollapsibleSection title="Section" defaultOpen={true}>
        <p>Visible content</p>
      </CollapsibleSection>,
    );
    expect(screen.getByText('Visible content')).toBeInTheDocument();
  });

  it('hides content when defaultOpen=false', () => {
    render(
      <CollapsibleSection title="Section" defaultOpen={false}>
        <p>Hidden content</p>
      </CollapsibleSection>,
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles content on click', async () => {
    const user = userEvent.setup();
    render(
      <CollapsibleSection title="Section" defaultOpen={false}>
        <p>Content</p>
      </CollapsibleSection>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('updates aria-expanded on toggle', async () => {
    const user = userEvent.setup();
    render(
      <CollapsibleSection title="Section" defaultOpen={true}>
        <p>Content</p>
      </CollapsibleSection>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'true');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders right slot', () => {
    render(
      <CollapsibleSection title="Section" right={<span data-testid="right-slot">Extra</span>}>
        Content
      </CollapsibleSection>,
    );
    expect(screen.getByTestId('right-slot')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(
      <CollapsibleSection title="Section" className="custom-class">
        Content
      </CollapsibleSection>,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
