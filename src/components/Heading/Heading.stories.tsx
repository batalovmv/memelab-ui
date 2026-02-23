import type { Meta, StoryObj } from '@storybook/react';

import { Heading } from './Heading';

const meta = {
  title: 'Components/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'gradient'],
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Section heading',
    level: 2,
  },
};

export const LevelsH1ToH4: Story = {
  render: () => (
    <div className="space-y-3">
      <Heading level={1}>Heading level 1</Heading>
      <Heading level={2}>Heading level 2</Heading>
      <Heading level={3}>Heading level 3</Heading>
      <Heading level={4}>Heading level 4</Heading>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-2">
      <Heading size="sm">Small</Heading>
      <Heading size="md">Medium</Heading>
      <Heading size="lg">Large</Heading>
      <Heading size="xl">Extra Large</Heading>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-2">
      <Heading color="default">Default color</Heading>
      <Heading color="muted">Muted color</Heading>
      <Heading color="gradient">Gradient color</Heading>
    </div>
  ),
};
