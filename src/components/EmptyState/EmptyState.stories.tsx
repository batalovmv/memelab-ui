import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { EmptyState } from './EmptyState';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  args: {
    onAction: fn(),
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

const InboxIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5 0c.094-1.884.255-3.69.495-5.402M21.75 13.5c-.094-1.884-.255-3.69-.495-5.402M21.75 13.5V19.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V13.5m19.5 0A2.25 2.25 0 0019.5 11.25h-3.86a2.25 2.25 0 00-2.012 1.244l-.256.512a2.25 2.25 0 01-2.013 1.244h-3.218a2.25 2.25 0 01-2.013-1.244l-.256-.512a2.25 2.25 0 00-2.013-1.244H4.5A2.25 2.25 0 002.25 13.5"
    />
  </svg>
);

export const Default: Story = {
  args: {
    title: 'No items found',
    description: 'Get started by creating a new item.',
  },
};

export const WithIcon: Story = {
  args: {
    icon: InboxIcon,
    title: 'Your inbox is empty',
    description: 'When you receive messages, they will appear here.',
  },
};

export const WithAction: Story = {
  args: {
    icon: InboxIcon,
    title: 'No streams configured',
    description: 'Connect your Twitch account to start receiving stream notifications.',
    actionLabel: 'Connect Twitch',
  },
};
