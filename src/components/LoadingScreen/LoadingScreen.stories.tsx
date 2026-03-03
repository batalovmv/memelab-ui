import type { Meta, StoryObj } from '@storybook/react';

import { LoadingScreen } from './LoadingScreen';

const meta = {
  title: 'Components/LoadingScreen',
  component: LoadingScreen,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof LoadingScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithMessage: Story = {
  args: {
    message: 'Loading your data…',
  },
};

export const Small: Story = {
  args: {
    message: 'Please wait…',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    message: 'Preparing dashboard…',
    size: 'lg',
  },
};
