import type { Meta, StoryObj } from '@storybook/react';

import { Popover } from './Popover';

const meta = {
  title: 'Overlay/Popover',
  component: Popover,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minHeight: '220px', padding: '3rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bottom: Story = {
  args: {
    placement: 'bottom',
    content: <p className="text-sm text-white/80">Popover opened from the bottom.</p>,
    children: <button className="rounded-lg bg-white/10 px-4 py-2 text-sm text-white">Open popover</button>,
  },
};

export const Top: Story = {
  args: {
    placement: 'top',
    content: <p className="text-sm text-white/80">Popover opened from the top.</p>,
    children: <button className="rounded-lg bg-white/10 px-4 py-2 text-sm text-white">Open popover</button>,
  },
};

export const CustomContent: Story = {
  args: {
    placement: 'bottom',
    content: (
      <div className="space-y-2 min-w-52">
        <p className="text-sm font-semibold text-white">Quick actions</p>
        <button type="button" className="block w-full rounded-md bg-white/10 px-3 py-2 text-left text-sm text-white hover:bg-white/15">
          Duplicate
        </button>
        <button type="button" className="block w-full rounded-md bg-white/10 px-3 py-2 text-left text-sm text-white hover:bg-white/15">
          Archive
        </button>
      </div>
    ),
    children: <button className="rounded-lg bg-white/10 px-4 py-2 text-sm text-white">Actions</button>,
  },
};
