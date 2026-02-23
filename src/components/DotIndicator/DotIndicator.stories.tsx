import type { Meta, StoryObj } from '@storybook/react';

import { DotIndicator } from './DotIndicator';

const meta = {
  title: 'Components/DotIndicator',
  component: DotIndicator,
  tags: ['autodocs'],
} satisfies Meta<typeof DotIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    remaining: 3,
    max: 5,
    showLabel: true,
  },
};

export const ManyDots: Story = {
  args: {
    remaining: 7,
    max: 12,
    showLabel: true,
  },
};

export const LowRemaining: Story = {
  args: {
    remaining: 1,
    max: 8,
    showLabel: true,
    labelFormat: (remaining, max) => `${remaining} left out of ${max}`,
  },
};
