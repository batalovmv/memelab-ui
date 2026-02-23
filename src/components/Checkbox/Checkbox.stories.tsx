import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';

function CheckboxDemo(props: React.ComponentProps<typeof Checkbox>) {
  const [checked, setChecked] = useState(props.checked ?? false);
  return (
    <Checkbox
      {...props}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <CheckboxDemo {...args} />,
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  render: (args) => <CheckboxDemo {...args} />,
  args: {
    label: 'Already checked',
    checked: true,
  },
};

export const WithLabel: Story = {
  render: (args) => <CheckboxDemo {...args} />,
  args: {
    label: 'Subscribe to newsletter',
  },
};

export const WithError: Story = {
  render: (args) => <CheckboxDemo {...args} />,
  args: {
    label: 'I agree to the terms',
    error: 'You must accept the terms to continue',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
    checked: false,
    onChange: () => {},
  },
};

export const Indeterminate: Story = {
  render: (args) => <CheckboxDemo {...args} />,
  args: {
    label: 'Select all (some selected)',
    indeterminate: true,
  },
};
