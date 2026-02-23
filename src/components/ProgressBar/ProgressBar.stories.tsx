import type { Meta, StoryObj } from '@storybook/react';

import { ProgressBar } from './ProgressBar';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger'],
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ZeroPercent: Story = {
  args: {
    value: 0,
    label: 'Upload progress',
    showValue: true,
  },
};

export const FiftyPercent: Story = {
  args: {
    value: 50,
    label: 'Upload progress',
    showValue: true,
  },
};

export const HundredPercent: Story = {
  args: {
    value: 100,
    label: 'Upload progress',
    showValue: true,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <ProgressBar value={65} label="Primary" variant="primary" showValue />
      <ProgressBar value={65} label="Success" variant="success" showValue />
      <ProgressBar value={65} label="Warning" variant="warning" showValue />
      <ProgressBar value={65} label="Danger" variant="danger" showValue />
    </div>
  ),
};
