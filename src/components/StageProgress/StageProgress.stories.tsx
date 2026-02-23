import type { Meta, StoryObj } from '@storybook/react';

import { StageProgress } from './StageProgress';

const stages = ['Draft', 'Review', 'Published'];

const meta = {
  title: 'Feedback/StageProgress',
  component: StageProgress,
  tags: ['autodocs'],
} satisfies Meta<typeof StageProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CurrentSecondStage: Story = {
  args: {
    stages,
    activeStage: 1,
  },
};

export const FirstStage: Story = {
  args: {
    stages,
    activeStage: 0,
  },
};

export const Completed: Story = {
  args: {
    stages,
    activeStage: 2,
  },
};
