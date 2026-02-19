import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    rows: 4,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Write a description...',
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type your message...',
    error: 'Message is required',
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'This textarea is disabled',
    disabled: true,
    rows: 4,
  },
};
