import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { Button } from '../Button/Button';

const meta = {
  title: 'Layout/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithChildren: Story = {
  args: {
    children: (
      <>
        <span className="text-sm text-white/60">user@example.com</span>
        <Button variant="primary" size="sm">
          Sign Out
        </Button>
      </>
    ),
  },
};
