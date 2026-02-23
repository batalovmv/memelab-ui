import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Alert } from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'Your draft was autosaved a few seconds ago.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Saved',
    children: 'All changes have been published successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Heads up',
    children: 'Your session will expire in 2 minutes.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Action failed',
    children: 'We could not process your request. Please try again.',
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'Dismissible alert',
    children: 'This alert can be closed.',
    onDismiss: fn(),
  },
};
