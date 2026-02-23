import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Drawer } from './Drawer';

function DrawerDemo(props: React.ComponentProps<typeof Drawer>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-[320px]">
      <button
        type="button"
        className="rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
        onClick={() => setIsOpen(true)}
      >
        Open drawer
      </button>

      <Drawer
        {...props}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          props.onClose();
        }}
      >
        <div className="p-5 space-y-4">
          <h3 className="text-lg font-semibold text-white">Drawer Content</h3>
          <p className="text-sm text-white/60">
            This is a demo panel. Use Esc, backdrop click, or the button below to close it.
          </p>
          <button
            type="button"
            className="rounded-lg bg-primary px-3 py-2 text-sm text-white"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      </Drawer>
    </div>
  );
}

const meta = {
  title: 'Overlay/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  args: {
    onClose: fn(),
    ariaLabel: 'Demo drawer',
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    side: 'right',
    size: 'md',
  },
};

export const Left: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    side: 'left',
    size: 'lg',
  },
};

export const Bottom: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    side: 'bottom',
    size: 'sm',
  },
};
