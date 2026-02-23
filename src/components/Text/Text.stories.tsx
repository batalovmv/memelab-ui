import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './Text';

const meta = {
  title: 'Typography/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'dimmed', 'primary', 'success', 'warning', 'danger'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Body text for memes and dashboard descriptions.',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-2">
      <Text size="xs">Extra small text</Text>
      <Text size="sm">Small text</Text>
      <Text size="md">Medium text</Text>
      <Text size="lg">Large text</Text>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-2">
      <Text color="default">Default</Text>
      <Text color="muted">Muted</Text>
      <Text color="primary">Primary</Text>
      <Text color="success">Success</Text>
      <Text color="warning">Warning</Text>
      <Text color="danger">Danger</Text>
    </div>
  ),
};

export const Inline: Story = {
  render: () => (
    <p className="text-white/80">
      Status:
      {' '}
      <Text inline color="success" weight="semibold">
        Published
      </Text>
    </p>
  ),
};

export const Truncate: Story = {
  render: () => (
    <div className="w-56">
      <Text truncate>
        This is a very long sentence that should truncate with an ellipsis when space is limited.
      </Text>
    </div>
  ),
};
