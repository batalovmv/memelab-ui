import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Transition } from './Transition';

function TransitionDemo(props: Omit<React.ComponentProps<typeof Transition>, 'show' | 'children'>) {
  const [show, setShow] = useState(true);

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setShow((value) => !value)}
        className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15"
      >
        {show ? 'Hide' : 'Show'} content
      </button>
      <div className="h-28 rounded-xl bg-white/5 ring-1 ring-white/10 p-4 overflow-hidden">
        <Transition {...props} show={show}>
          <div className="rounded-lg bg-primary/20 text-primary-light px-3 py-2 text-sm ring-1 ring-primary/30">
            Animated block
          </div>
        </Transition>
      </div>
    </div>
  );
}

const meta = {
  title: 'Feedback/Transition',
  component: Transition,
  tags: ['autodocs'],
} satisfies Meta<typeof Transition>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fade: Story = {
  render: (args) => <TransitionDemo {...args} />,
  args: {
    preset: 'fade',
    duration: 250,
  },
};

export const Scale: Story = {
  render: (args) => <TransitionDemo {...args} />,
  args: {
    preset: 'scale',
    duration: 250,
  },
};

export const SlideRight: Story = {
  render: (args) => <TransitionDemo {...args} />,
  args: {
    preset: 'slide-right',
    duration: 300,
  },
};
