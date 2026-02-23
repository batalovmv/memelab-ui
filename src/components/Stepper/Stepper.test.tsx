import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Stepper } from './Stepper';

describe('Stepper', () => {
  const steps = [
    { label: 'Step 1', description: 'First' },
    { label: 'Step 2', description: 'Second' },
    { label: 'Step 3', description: 'Third' },
  ];

  it('renders all steps', () => {
    render(<Stepper steps={steps} activeStep={1} />);

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('highlights current step', () => {
    render(<Stepper steps={steps} activeStep={1} />);

    const currentStep = screen.getByText('Step 2').parentElement as HTMLElement;
    expect(currentStep).toHaveAttribute('aria-current', 'step');

    const currentCircle = currentStep.querySelector('div');
    expect(currentCircle).toHaveClass('bg-primary');
  });

  it('shows checkmark for completed steps', () => {
    render(<Stepper steps={steps} activeStep={2} />);

    const completedStep = screen.getByText('Step 1').parentElement as HTMLElement;
    expect(completedStep.querySelector('svg')).toBeInTheDocument();
  });

  it('supports custom orientation classes via className', () => {
    const { container, rerender } = render(<Stepper steps={steps} activeStep={0} className="flex-row" />);
    expect(container.firstChild).toHaveClass('flex-row');

    rerender(<Stepper steps={steps} activeStep={0} className="flex-col" />);
    expect(container.firstChild).toHaveClass('flex-col');
  });
});
