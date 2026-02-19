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
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-2">Card Title</h3>
        <p className="text-white/60">
          This is a surface card variant with default styling. It provides a subtle elevation and background.
        </p>
      </div>
    ),
  },
};

export const GlassVariant: Story = {
  args: {
    variant: 'glass',
    children: (
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-2">Glass Card</h3>
        <p className="text-white/60">This card uses the glass variant with a frosted glass effect and backdrop blur.</p>
      </div>
    ),
  },
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
    children: (
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-2">Hoverable Card</h3>
        <p className="text-white/60">Hover over this card to see the interactive effect with scale and shadow transition.</p>
      </div>
    ),
  },
};
