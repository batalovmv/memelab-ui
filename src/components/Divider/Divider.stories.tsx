import type { Meta, StoryObj } from '@storybook/react';

import { Divider } from './Divider';

const meta = {
  title: 'Utility/Divider',
  component: Divider,
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div className="w-full max-w-lg">
      <p className="text-sm text-white/70">Above content</p>
      <Divider {...args} />
      <p className="text-sm text-white/70">Below content</p>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="flex items-stretch h-20">
      <div className="text-sm text-white/70">Left</div>
      <Divider {...args} />
      <div className="text-sm text-white/70">Right</div>
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    orientation: 'horizontal',
    label: 'OR',
  },
};
