import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { SearchInput } from './SearchInput';

function SearchInputDemo(props: React.ComponentProps<typeof SearchInput>) {
  const [value, setValue] = useState((props.value as string) ?? '');
  return (
    <SearchInput
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue('')}
    />
  );
}

const meta = {
  title: 'Components/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithValue: Story = {
  render: (args) => <SearchInputDemo {...args} />,
  args: {
    value: 'memelab',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Search users',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Search disabled',
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Find a meme...',
  },
};
