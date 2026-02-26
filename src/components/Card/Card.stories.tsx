import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <h3 className="text-lg font-semibold text-white mb-2">Card Title</h3>
        <p className="text-white/60">
          This is a surface card variant with default styling. It provides a subtle elevation and background.
        </p>
      </>
    ),
  },
};

export const GlassVariant: Story = {
  args: {
    variant: 'glass',
    children: (
      <>
        <h3 className="text-lg font-semibold text-white mb-2">Glass Card</h3>
        <p className="text-white/60">This card uses the glass variant with a frosted glass effect and backdrop blur.</p>
      </>
    ),
  },
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
    children: (
      <>
        <h3 className="text-lg font-semibold text-white mb-2">Hoverable Card</h3>
        <p className="text-white/60">Hover over this card to see the interactive effect with scale and shadow transition.</p>
      </>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: (
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-2">Custom Padding</h3>
        <p className="text-white/60">This card uses padding=&quot;none&quot; with custom inner padding.</p>
      </div>
    ),
  },
};

export const SmallPadding: Story = {
  args: {
    padding: 'sm',
    variant: 'glass',
    hoverable: true,
    children: (
      <>
        <h3 className="text-lg font-semibold text-white mb-2">Compact Card</h3>
        <p className="text-white/60">Glass card with small padding.</p>
      </>
    ),
  },
};
