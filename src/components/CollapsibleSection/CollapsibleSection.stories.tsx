import type { Meta, StoryObj } from '@storybook/react';
import { CollapsibleSection } from './CollapsibleSection';

const meta = {
  title: 'Components/CollapsibleSection',
  component: CollapsibleSection,
  tags: ['autodocs'],
} satisfies Meta<typeof CollapsibleSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Section Title',
    children: 'This section is open by default. Click the header to collapse it.',
  },
};

export const Collapsed: Story = {
  args: {
    title: 'Collapsed Section',
    defaultOpen: false,
    children: 'This content is hidden until expanded.',
  },
};

export const WithRightContent: Story = {
  args: {
    title: 'Notifications',
    right: (
      <span className="rounded-full bg-primary/20 text-primary text-xs px-2 py-0.5 font-medium">3 new</span>
    ),
    children: 'Section with a badge in the right slot.',
  },
};

export const CustomContent: Story = {
  args: {
    title: 'Settings',
    children: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/70">Enable notifications</span>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/70">Dark mode</span>
          <input type="checkbox" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/70">Auto-update</span>
          <input type="checkbox" defaultChecked />
        </div>
      </div>
    ),
  },
};
