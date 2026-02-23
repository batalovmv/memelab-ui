import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Slider } from './Slider';

function SliderDemo(props: React.ComponentProps<typeof Slider>) {
  const initialValue = Number(props.value ?? props.defaultValue ?? props.min ?? 0);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(Number(props.value ?? props.defaultValue ?? props.min ?? 0));
  }, [props.value, props.defaultValue, props.min]);

  return <Slider {...props} value={value} onChange={setValue} />;
}

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <SliderDemo {...args} />,
  args: {
    value: 35,
    showValue: true,
  },
};

export const WithMinMax: Story = {
  render: (args) => <SliderDemo {...args} />,
  args: {
    min: 10,
    max: 250,
    step: 10,
    value: 120,
    showValue: true,
    formatValue: (value) => `${value} px`,
  },
};

export const WithLabel: Story = {
  render: (args) => <SliderDemo {...args} />,
  args: {
    label: 'Volume',
    value: 60,
    min: 0,
    max: 100,
    showValue: true,
    formatValue: (value) => `${value}%`,
  },
};

export const Disabled: Story = {
  render: (args) => <SliderDemo {...args} />,
  args: {
    label: 'Disabled slider',
    value: 40,
    showValue: true,
    disabled: true,
  },
};
