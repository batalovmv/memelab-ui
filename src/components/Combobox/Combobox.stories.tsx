import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Combobox } from './Combobox';

const frameworkOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
  { value: 'angular', label: 'Angular', disabled: true },
];

function ComboboxDemo(props: React.ComponentProps<typeof Combobox>) {
  const [value, setValue] = useState(props.value ?? '');

  useEffect(() => {
    setValue(props.value ?? '');
  }, [props.value]);

  return (
    <Combobox
      {...props}
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue);
        props.onChange?.(nextValue);
      }}
    />
  );
}

const meta = {
  title: 'Overlay/Combobox',
  component: Combobox,
  tags: ['autodocs'],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <ComboboxDemo {...args} />,
  args: {
    options: frameworkOptions,
    placeholder: 'Pick a framework',
  },
};

export const WithLabel: Story = {
  render: (args) => <ComboboxDemo {...args} />,
  args: {
    options: frameworkOptions,
    label: 'Framework',
    placeholder: 'Select framework',
  },
};

export const WithError: Story = {
  render: (args) => <ComboboxDemo {...args} />,
  args: {
    options: frameworkOptions,
    label: 'Framework',
    placeholder: 'Select framework',
    error: 'Please select a supported option',
  },
};

export const Filtered: Story = {
  render: (args) => <ComboboxDemo {...args} />,
  args: {
    options: frameworkOptions,
    label: 'Type to filter',
    placeholder: 'Try "re" or "so"',
    filterFn: (option, query) =>
      option.label.toLowerCase().startsWith(query.toLowerCase()),
    emptyContent: 'No framework found',
  },
};

export const Disabled: Story = {
  render: (args) => <ComboboxDemo {...args} />,
  args: {
    options: frameworkOptions,
    label: 'Framework',
    value: 'react',
    disabled: true,
  },
};
