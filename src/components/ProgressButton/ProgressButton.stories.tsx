import type { Meta, StoryObj } from '@storybook/react';

import { ProgressButton } from './ProgressButton';

const meta = {
  title: 'Components/ProgressButton',
  component: ProgressButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'secondary', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isLoading: { control: 'boolean' },
    loadingText: { control: 'text' },
  },
} satisfies Meta<typeof ProgressButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'primary',
    children: 'Submit',
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    isLoading: true,
    children: 'Submit',
  },
};

export const LoadingWithText: Story = {
  args: {
    variant: 'primary',
    isLoading: true,
    loadingText: 'Saving…',
    children: 'Submit',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <ProgressButton variant="primary" isLoading>
        Primary
      </ProgressButton>
      <ProgressButton variant="success" isLoading>
        Success
      </ProgressButton>
      <ProgressButton variant="warning" isLoading>
        Warning
      </ProgressButton>
      <ProgressButton variant="danger" isLoading>
        Danger
      </ProgressButton>
      <ProgressButton variant="secondary" isLoading>
        Secondary
      </ProgressButton>
      <ProgressButton variant="ghost" isLoading>
        Ghost
      </ProgressButton>
    </div>
  ),
};
