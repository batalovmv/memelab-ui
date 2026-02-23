import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Breadcrumbs } from './Breadcrumbs';

const linkItems = [
  { label: 'Home', href: '#' },
  { label: 'Collections', href: '#' },
  { label: 'Classic Memes' },
];

const clickableItems = [
  { label: 'Dashboard', onClick: fn() },
  { label: 'Filters', onClick: fn() },
  { label: 'Active' },
];

const meta = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLinks: Story = {
  args: {
    items: linkItems,
  },
};

export const WithOnClick: Story = {
  args: {
    items: clickableItems,
  },
};

export const CustomSeparator: Story = {
  args: {
    items: linkItems,
    separator: <span className="px-1 text-white/30">/</span>,
  },
};
