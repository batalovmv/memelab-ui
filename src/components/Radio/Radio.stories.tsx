import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { RadioGroup, RadioItem } from './Radio';

const meta = {
  title: 'Components/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark' },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <RadioItem value="option1">Option 1</RadioItem>
      <RadioItem value="option2">Option 2</RadioItem>
      <RadioItem value="option3">Option 3</RadioItem>
    </RadioGroup>
  ),
  args: {
    label: 'Select an option',
    defaultValue: 'option1',
  },
};

export const Horizontal: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <RadioItem value="xs">XS</RadioItem>
      <RadioItem value="sm">SM</RadioItem>
      <RadioItem value="md">MD</RadioItem>
      <RadioItem value="lg">LG</RadioItem>
      <RadioItem value="xl">XL</RadioItem>
    </RadioGroup>
  ),
  args: {
    label: 'Select size',
    defaultValue: 'md',
    orientation: 'horizontal',
  },
};

function ControlledRadioDemo(args: React.ComponentProps<typeof RadioGroup>) {
  const [value, setValue] = useState('monthly');
  return (
    <div className="space-y-4">
      <RadioGroup {...args} value={value} onValueChange={setValue}>
        <RadioItem value="monthly">Monthly billing</RadioItem>
        <RadioItem value="yearly">Yearly billing (save 20%)</RadioItem>
      </RadioGroup>
      <p className="text-white/40 text-sm">Selected: {value}</p>
    </div>
  );
}

export const Controlled: Story = {
  render: (args) => <ControlledRadioDemo {...args} />,
  args: {
    label: 'Billing cycle',
  },
};

export const WithError: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <RadioItem value="agree">I agree to the terms</RadioItem>
      <RadioItem value="disagree">I do not agree</RadioItem>
    </RadioGroup>
  ),
  args: {
    label: 'Terms of service',
    error: 'You must select an option to continue',
  },
};

export const Disabled: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <RadioItem value="a">Option A</RadioItem>
      <RadioItem value="b">Option B</RadioItem>
      <RadioItem value="c">Option C</RadioItem>
    </RadioGroup>
  ),
  args: {
    label: 'Disabled group',
    defaultValue: 'a',
    disabled: true,
  },
};

export const ManyOptions: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <RadioItem value="us">United States</RadioItem>
      <RadioItem value="ca">Canada</RadioItem>
      <RadioItem value="gb">United Kingdom</RadioItem>
      <RadioItem value="au">Australia</RadioItem>
      <RadioItem value="de">Germany</RadioItem>
      <RadioItem value="fr">France</RadioItem>
      <RadioItem value="jp">Japan</RadioItem>
      <RadioItem value="other" disabled>
        Other (unavailable)
      </RadioItem>
    </RadioGroup>
  ),
  args: {
    label: 'Country',
    defaultValue: 'us',
  },
};
