import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Toggle {...args} checked={checked} onChange={setChecked} />;
  },
  args: {
    'aria-label': 'Toggle switch',
  },
};

export const WithLabel: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return <Toggle {...args} checked={checked} onChange={setChecked} />;
  },
  args: {
    label: 'Enable notifications',
  },
};

export const SmallSize: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Toggle {...args} checked={checked} onChange={setChecked} />;
  },
  args: {
    size: 'sm',
    label: 'Small toggle',
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return <Toggle {...args} checked={checked} onChange={setChecked} />;
  },
  args: {
    disabled: true,
    label: 'Disabled toggle',
  },
};
