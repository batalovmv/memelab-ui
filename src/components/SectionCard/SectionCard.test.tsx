import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SectionCard } from './SectionCard';

describe('SectionCard', () => {
  it('renders title and children', () => {
    render(
      <SectionCard title="Section title">
        <p>Section body</p>
      </SectionCard>,
    );

    expect(screen.getByText('Section title')).toBeInTheDocument();
    expect(screen.getByText('Section body')).toBeInTheDocument();
  });

  it('passes className to root container', () => {
    const { container } = render(
      <SectionCard title="Settings" className="custom-section-card">
        Content
      </SectionCard>,
    );

    expect(container.firstChild).toHaveClass('custom-section-card');
  });
});
