import type { Meta, StoryObj } from '@storybook/react';

import { CopyField } from './CopyField';

const meta = {
  title: 'Components/CopyField',
  component: CopyField,
  tags: ['autodocs'],
} satisfies Meta<typeof CopyField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'sk_live_5d2f6c2f9b2a41db9c',
  },
};

export const Masked: Story = {
  args: {
    value: 'mlb_prod_30fbd76ce0ef4dbd81f4',
    masked: true,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Webhook secret',
    value: 'whsec_9b5a044baf924dd1a6c3',
  },
};
