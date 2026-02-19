import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Sidebar } from './Sidebar';

const NavLinks = () => (
  <div className="flex flex-col gap-1 px-2">
    {['Dashboard', 'Streamers', 'Channels', 'Settings'].map((label) => (
      <a
        key={label}
        href="#"
        className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
      >
        {label}
      </a>
    ))}
  </div>
);

const meta = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ height: 400, display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onToggle: fn(),
    children: <NavLinks />,
  },
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
    onToggle: fn(),
    children: <NavLinks />,
  },
};

export const WithToggle: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((prev) => !prev)}>
        <NavLinks />
      </Sidebar>
    );
  },
};
