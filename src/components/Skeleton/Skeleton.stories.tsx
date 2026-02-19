import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'w-48 h-4',
  },
};

export const Circle: Story = {
  args: {
    circle: true,
    className: 'w-12 h-12',
  },
};

export const TextLines: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-5/6 h-4" />
      <Skeleton className="w-4/6 h-4" />
    </div>
  ),
};

export const CardPlaceholder: Story = {
  render: () => (
    <div className="w-72 rounded-xl ring-1 ring-white/10 bg-white/5 p-4 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton circle className="w-10 h-10" />
        <div className="flex-1 space-y-2">
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-1/2 h-3" />
        </div>
      </div>
      <Skeleton className="w-full h-32" />
      <div className="space-y-2">
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-5/6 h-3" />
      </div>
    </div>
  ),
};
