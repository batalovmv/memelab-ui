import type { Meta, StoryObj } from '@storybook/react';

import { SectionCard } from './SectionCard';

const meta = {
  title: 'Components/SectionCard',
  component: SectionCard,
  tags: ['autodocs'],
} satisfies Meta<typeof SectionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Audience growth',
    description: 'Last 30 days',
    children: (
      <div className="space-y-2 text-sm">
        <p className="text-white/90">+14.8% followers</p>
        <p className="text-white/50">Reach increased across all channels.</p>
      </div>
    ),
  },
};

export const WithRightAction: Story = {
  args: {
    title: 'Campaign metrics',
    description: 'Updated 5 minutes ago',
    right: (
      <button type="button" className="rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/15">
        Export
      </button>
    ),
    children: (
      <div className="space-y-2 text-sm">
        <p className="text-white/90">CTR: 3.9%</p>
        <p className="text-white/50">Cost per click dropped by 8%.</p>
      </div>
    ),
  },
};
