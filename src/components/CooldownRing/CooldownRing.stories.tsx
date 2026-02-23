import type { Meta, StoryObj } from '@storybook/react';

import { CooldownRing } from './CooldownRing';

const meta = {
  title: 'Feedback/CooldownRing',
  component: CooldownRing,
  tags: ['autodocs'],
} satisfies Meta<typeof CooldownRing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
  args: {
    duration: 100,
    remaining: 100,
    size: 'md',
  },
};

export const Half: Story = {
  args: {
    duration: 100,
    remaining: 45,
    size: 'md',
  },
};

export const Critical: Story = {
  args: {
    duration: 100,
    remaining: 8,
    size: 'md',
  },
};
