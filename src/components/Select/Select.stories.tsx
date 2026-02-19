import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <option value="">Select an option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </>
    ),
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Country',
    children: (
      <>
        <option value="">Choose a country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="de">Germany</option>
      </>
    ),
  },
};

export const WithError: Story = {
  args: {
    label: 'Platform',
    error: 'Please select a platform',
    children: (
      <>
        <option value="">Select a platform</option>
        <option value="twitch">Twitch</option>
        <option value="youtube">YouTube</option>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <option value="">Disabled select</option>
        <option value="1">Option 1</option>
      </>
    ),
  },
};
