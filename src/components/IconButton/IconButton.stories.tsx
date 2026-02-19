import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
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
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <CloseIcon />,
    'aria-label': 'Close',
  },
};

export const Primary: Story = {
  args: {
    icon: <CloseIcon />,
    variant: 'primary',
    'aria-label': 'Close',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(['primary', 'success', 'warning', 'danger', 'secondary', 'ghost'] as const).map((variant) => (
        <IconButton key={variant} icon={<CloseIcon />} variant={variant} aria-label={variant} />
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <IconButton key={size} icon={<CloseIcon />} variant="primary" size={size} aria-label={size} />
      ))}
    </div>
  ),
};
