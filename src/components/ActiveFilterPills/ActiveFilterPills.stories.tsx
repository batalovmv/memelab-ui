import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { ActiveFilterPills } from './ActiveFilterPills';

const baseFilters = [
  { key: 'status', label: 'Status: Published' },
  { key: 'channel', label: 'Channel: TikTok' },
  { key: 'date', label: 'Date: Last 7 days' },
];

function ActiveFilterPillsDemo(props: React.ComponentProps<typeof ActiveFilterPills>) {
  const [filters, setFilters] = useState(props.filters);

  useEffect(() => {
    setFilters(props.filters);
  }, [props.filters]);

  return (
    <ActiveFilterPills
      {...props}
      filters={filters}
      onRemove={(key) => {
        setFilters((current) => current.filter((filter) => filter.key !== key));
        props.onRemove(key);
      }}
      onClearAll={
        props.onClearAll
          ? () => {
              setFilters([]);
              props.onClearAll?.();
            }
          : undefined
      }
    />
  );
}

const meta = {
  title: 'Form/ActiveFilterPills',
  component: ActiveFilterPills,
  tags: ['autodocs'],
  args: {
    onRemove: fn(),
  },
} satisfies Meta<typeof ActiveFilterPills>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithPills: Story = {
  render: (args) => <ActiveFilterPillsDemo {...args} />,
  args: {
    filters: baseFilters,
  },
};

export const WithOnRemove: Story = {
  render: (args) => <ActiveFilterPillsDemo {...args} />,
  args: {
    filters: [
      { key: 'sort', label: 'Sort: Trending' },
      { key: 'type', label: 'Type: Video' },
    ],
  },
};

export const WithOnClearAll: Story = {
  render: (args) => <ActiveFilterPillsDemo {...args} />,
  args: {
    filters: baseFilters,
    onClearAll: fn(),
  },
};
