import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/120?img=32',
    alt: 'Profile photo',
    name: 'Alicia Stone',
    size: 'md',
  },
};

export const WithInitials: Story = {
  args: {
    name: 'Meme Lab',
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm" name="Sam Reed" />
      <Avatar size="md" name="Maya Ross" />
      <Avatar size="lg" name="Noah Cruz" />
    </div>
  ),
};
