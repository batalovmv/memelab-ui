import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from './Stack';

function StackItem({ label }: { label: string }) {
  return (
    <div className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white ring-1 ring-white/10">
      {label}
    </div>
  );
}

const meta = {
  title: 'Components/Stack',
  component: Stack,
  tags: ['autodocs'],
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    gap: 3,
    children: (
      <>
        <StackItem label="Item 1" />
        <StackItem label="Item 2" />
        <StackItem label="Item 3" />
      </>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    gap: 3,
    children: (
      <>
        <StackItem label="Alpha" />
        <StackItem label="Beta" />
        <StackItem label="Gamma" />
      </>
    ),
  },
};

export const GapAndAlign: Story = {
  args: {
    direction: 'horizontal',
    gap: 6,
    align: 'center',
    children: (
      <>
        <StackItem label="Small" />
        <div className="rounded-lg bg-white/10 px-3 py-4 text-sm text-white ring-1 ring-white/10">Tall</div>
        <StackItem label="Small" />
      </>
    ),
  },
};
