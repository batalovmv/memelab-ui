import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { ColorInput } from './ColorInput';

function ColorInputDemo(props: React.ComponentProps<typeof ColorInput>) {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return <ColorInput {...props} value={value} onChange={setValue} />;
}

const meta = {
  title: 'Components/ColorInput',
  component: ColorInput,
  tags: ['autodocs'],
} satisfies Meta<typeof ColorInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <ColorInputDemo {...args} />,
  args: {
    value: '#8b5cf6',
  },
};

export const WithLabel: Story = {
  render: (args) => <ColorInputDemo {...args} />,
  args: {
    value: '#14b8a6',
    label: 'Accent color',
  },
};

export const Disabled: Story = {
  render: (args) => <ColorInputDemo {...args} />,
  args: {
    value: '#f97316',
    label: 'Locked color',
    disabled: true,
  },
};
