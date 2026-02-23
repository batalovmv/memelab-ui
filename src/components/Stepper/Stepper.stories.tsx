import type { Meta, StoryObj } from '@storybook/react';

import { Stepper } from './Stepper';

const steps = [
  { label: 'Choose template', description: 'Select layout' },
  { label: 'Edit content', description: 'Customize text' },
  { label: 'Publish', description: 'Share publicly' },
];

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CurrentSecondStep: Story = {
  args: {
    steps,
    activeStep: 1,
  },
};

export const FirstStep: Story = {
  args: {
    steps,
    activeStep: 0,
  },
};

export const Completed: Story = {
  args: {
    steps,
    activeStep: 2,
  },
};
