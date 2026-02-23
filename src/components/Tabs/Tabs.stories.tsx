import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Tab, TabList, TabPanel, Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    onValueChange: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['underline', 'pill'],
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Underline: Story = {
  args: {
    defaultValue: 'overview',
    variant: 'underline',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab value="overview">Overview</Tab>
        <Tab value="analytics">Analytics</Tab>
        <Tab value="settings">Settings</Tab>
      </TabList>
      <TabPanel value="overview">
        <p className="text-white/70 text-sm">Overview content goes here. This is the default active tab.</p>
      </TabPanel>
      <TabPanel value="analytics">
        <p className="text-white/70 text-sm">Analytics and metrics content.</p>
      </TabPanel>
      <TabPanel value="settings">
        <p className="text-white/70 text-sm">Settings and configuration options.</p>
      </TabPanel>
    </Tabs>
  ),
};

export const Pill: Story = {
  args: {
    defaultValue: 'month',
    variant: 'pill',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab value="day">Day</Tab>
        <Tab value="week">Week</Tab>
        <Tab value="month">Month</Tab>
        <Tab value="year">Year</Tab>
      </TabList>
      <TabPanel value="day">
        <p className="text-white/70 text-sm">Showing data for today.</p>
      </TabPanel>
      <TabPanel value="week">
        <p className="text-white/70 text-sm">Showing data for this week.</p>
      </TabPanel>
      <TabPanel value="month">
        <p className="text-white/70 text-sm">Showing data for this month.</p>
      </TabPanel>
      <TabPanel value="year">
        <p className="text-white/70 text-sm">Showing data for this year.</p>
      </TabPanel>
    </Tabs>
  ),
};

export const Controlled: Story = {
  args: {
    variant: 'underline',
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [active, setActive] = useState('profile');

    return (
      <div className="space-y-4">
        <p className="text-white/50 text-xs">
          Active tab: <span className="text-white font-mono">{active}</span>
        </p>
        <Tabs
          {...args}
          value={active}
          onValueChange={(v) => {
            setActive(v);
            args.onValueChange?.(v);
          }}
        >
          <TabList>
            <Tab value="profile">Profile</Tab>
            <Tab value="billing">Billing</Tab>
            <Tab value="notifications">Notifications</Tab>
          </TabList>
          <TabPanel value="profile">
            <p className="text-white/70 text-sm">Profile settings panel.</p>
          </TabPanel>
          <TabPanel value="billing">
            <p className="text-white/70 text-sm">Billing and subscription panel.</p>
          </TabPanel>
          <TabPanel value="notifications">
            <p className="text-white/70 text-sm">Notification preferences panel.</p>
          </TabPanel>
        </Tabs>
      </div>
    );
  },
};

export const WithDisabledTab: Story = {
  args: {
    defaultValue: 'active',
    variant: 'underline',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab value="active">Active</Tab>
        <Tab value="disabled" disabled>
          Disabled
        </Tab>
        <Tab value="another">Another</Tab>
      </TabList>
      <TabPanel value="active">
        <p className="text-white/70 text-sm">This tab is active and selectable.</p>
      </TabPanel>
      <TabPanel value="disabled">
        <p className="text-white/70 text-sm">This panel is never shown — the tab is disabled.</p>
      </TabPanel>
      <TabPanel value="another">
        <p className="text-white/70 text-sm">Another selectable tab panel.</p>
      </TabPanel>
    </Tabs>
  ),
};

export const ManyTabs: Story = {
  args: {
    defaultValue: 'tab1',
    variant: 'pill',
  },
  render: (args) => {
    const tabs = Array.from({ length: 8 }, (_, i) => ({
      value: `tab${i + 1}`,
      label: `Tab ${i + 1}`,
    }));

    return (
      <Tabs {...args}>
        <TabList className="flex-wrap gap-1">
          {tabs.map((t) => (
            <Tab key={t.value} value={t.value}>
              {t.label}
            </Tab>
          ))}
        </TabList>
        {tabs.map((t) => (
          <TabPanel key={t.value} value={t.value}>
            <p className="text-white/70 text-sm">Content for {t.label}.</p>
          </TabPanel>
        ))}
      </Tabs>
    );
  },
};
