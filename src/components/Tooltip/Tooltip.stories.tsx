import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <button className="rounded-lg bg-white/10 px-4 py-2 text-white">Hover me</button>,
  },
};

export const Bottom: Story = {
  args: {
    content: 'Tooltip on bottom',
    placement: 'bottom',
    children: <button className="rounded-lg bg-white/10 px-4 py-2 text-white">Hover me</button>,
  },
};

export const CustomDelay: Story = {
  args: {
    content: 'Instant tooltip',
    delayMs: 0,
    children: <button className="rounded-lg bg-white/10 px-4 py-2 text-white">No delay</button>,
  },
};

export const RichContent: Story = {
  args: {
    content: (
      <div className="space-y-1">
        <p className="font-semibold">Rich tooltip</p>
        <p className="text-white/60">With multiple lines and formatting.</p>
      </div>
    ),
    children: <button className="rounded-lg bg-white/10 px-4 py-2 text-white">Rich content</button>,
  },
};
