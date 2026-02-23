import type { Meta, StoryObj } from '@storybook/react';

import { MutationOverlay } from './MutationOverlay';

function MutationOverlayDemo(props: React.ComponentProps<typeof MutationOverlay>) {
  return (
    <div className="relative h-40 w-full max-w-xl rounded-xl bg-white/5 ring-1 ring-white/10 p-4 overflow-hidden">
      <p className="text-sm text-white/80">Settings panel</p>
      <p className="text-xs text-white/40 mt-1">Changes are being applied in the background.</p>
      <MutationOverlay {...props} />
    </div>
  );
}

const meta = {
  title: 'Components/MutationOverlay',
  component: MutationOverlay,
  tags: ['autodocs'],
} satisfies Meta<typeof MutationOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  render: (args) => <MutationOverlayDemo {...args} />,
  args: {
    status: 'idle',
  },
};

export const Loading: Story = {
  render: (args) => <MutationOverlayDemo {...args} />,
  args: {
    status: 'saving',
  },
};

export const Success: Story = {
  render: (args) => <MutationOverlayDemo {...args} />,
  args: {
    status: 'saved',
  },
};

export const Error: Story = {
  render: (args) => <MutationOverlayDemo {...args} />,
  args: {
    status: 'error',
    errorText: 'Failed to save changes',
  },
};
