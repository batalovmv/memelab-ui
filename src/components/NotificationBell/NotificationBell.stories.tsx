import type { Meta, StoryObj } from '@storybook/react';

import { NotificationBell } from './NotificationBell';

const meta = {
  title: 'Components/NotificationBell',
  component: NotificationBell,
  tags: ['autodocs'],
} satisfies Meta<typeof NotificationBell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutCount: Story = {
  args: {
    'aria-label': 'Notifications',
  },
};

export const WithCount: Story = {
  args: {
    count: 7,
    'aria-label': 'Notifications',
  },
};

export const WithMaxCount: Story = {
  args: {
    count: 120,
    maxCount: 99,
    'aria-label': 'Notifications',
  },
};

export const WithPing: Story = {
  args: {
    count: 3,
    ping: true,
    size: 'lg',
    'aria-label': 'Notifications',
  },
};
