import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '../Input/Input';
import { FormField } from './FormField';

const meta = {
  title: 'Components/FormField',
  component: FormField,
  tags: ['autodocs'],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLabel: Story = {
  args: {
    label: 'Display name',
    children: <Input placeholder="Enter your display name" />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    error: 'Please enter a valid email address',
    children: <Input placeholder="name@example.com" />,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Username',
    helperText: 'Use 3-20 characters. Letters, numbers and underscores only.',
    children: <Input placeholder="memelab_user" />,
  },
};
