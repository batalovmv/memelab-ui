import type { Meta, StoryObj } from '@storybook/react';

import { StatCard } from './StatCard';

function RevenueIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 14l4-4 3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 6h4v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const meta = {
  title: 'Components/StatCard',
  component: StatCard,
  tags: ['autodocs'],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '12,480',
    label: 'Total views',
  },
};

export const WithTrend: Story = {
  args: {
    value: '8,932',
    label: 'Weekly subscribers',
    trend: { value: 14, label: 'vs last week' },
  },
};

export const WithIcon: Story = {
  args: {
    value: '$24,190',
    label: 'Revenue',
    icon: <RevenueIcon />,
    trend: { value: 6, label: 'this month' },
  },
};

export const NegativeTrend: Story = {
  args: {
    value: '1.9%',
    label: 'Bounce rate',
    trend: { value: -2.3, label: 'vs yesterday' },
  },
};
