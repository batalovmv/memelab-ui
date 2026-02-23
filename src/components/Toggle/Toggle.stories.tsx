import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';

function ToggleDemo(props: React.ComponentProps<typeof Toggle>) {
  const [checked, setChecked] = useState(props.checked ?? false);
  return <Toggle {...props} checked={checked} onChange={setChecked} />;
}

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <ToggleDemo {...args} />,
  args: {
    'aria-label': 'Toggle switch',
  },
};

export const WithLabel: Story = {
  render: (args) => <ToggleDemo {...args} />,
  args: {
    label: 'Enable notifications',
    checked: true,
  },
};

export const SmallSize: Story = {
  render: (args) => <ToggleDemo {...args} />,
  args: {
    size: 'sm',
    label: 'Small toggle',
  },
};

export const Disabled: Story = {
  render: (args) => <ToggleDemo {...args} />,
  args: {
    disabled: true,
    label: 'Disabled toggle',
    checked: true,
  },
};
