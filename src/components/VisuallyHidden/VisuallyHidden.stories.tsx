import type { Meta, StoryObj } from '@storybook/react';

import { VisuallyHidden } from './VisuallyHidden';

function BellIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 8a5 5 0 1110 0c0 3.5 1.8 4.6 1.8 4.6H3.2S5 11.5 5 8z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8.3 15.5a1.9 1.9 0 003.4 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

const meta = {
  title: 'Accessibility/VisuallyHidden',
  component: VisuallyHidden,
  tags: ['autodocs'],
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Open notifications',
  },
  render: (args) => (
    <button type="button" className="relative rounded-lg bg-white/10 p-3 text-white hover:bg-white/15">
      <BellIcon />
      <VisuallyHidden {...args} />
    </button>
  ),
};

export const AsDiv: Story = {
  args: {
    as: 'div',
    children: 'Screen-reader only status text',
  },
};
