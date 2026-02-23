import type { Meta, StoryObj } from '@storybook/react';

import { ScrollArea } from './ScrollArea';

const meta = {
  title: 'Layout/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  args: {
    maxHeight: 180,
    orientation: 'vertical',
    children: (
      <div className="space-y-2 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index} className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white/80">
            Feed item {index + 1}
          </div>
        ))}
      </div>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    children: (
      <div className="flex w-[900px] gap-3 p-2">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="min-w-[180px] rounded-xl bg-white/10 p-4 text-sm text-white ring-1 ring-white/10">
            Card {index + 1}
          </div>
        ))}
      </div>
    ),
  },
  render: (args) => (
    <div className="w-[360px] rounded-xl bg-white/5 ring-1 ring-white/10 p-2">
      <ScrollArea {...args} />
    </div>
  ),
};

export const HideScrollbar: Story = {
  args: {
    maxHeight: 160,
    hideScrollbar: true,
    orientation: 'vertical',
    children: (
      <div className="space-y-2 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
        {Array.from({ length: 10 }, (_, index) => (
          <div key={index} className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white/80">
            Hidden scrollbar row {index + 1}
          </div>
        ))}
      </div>
    ),
  },
};
