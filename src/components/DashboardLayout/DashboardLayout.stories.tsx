import type { Meta, StoryObj } from '@storybook/react';
import { DashboardLayout } from './DashboardLayout';
import { Navbar } from '../Navbar/Navbar';
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';

const meta = {
  title: 'Layout/DashboardLayout',
  component: DashboardLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DashboardLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    navbar: (
      <Navbar>
        <Button variant="primary" size="sm">
          Sign Out
        </Button>
      </Navbar>
    ),
    children: (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-white/60">Welcome to your MemeLab dashboard</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Card 1</h3>
              <p className="text-white/60">Some content here</p>
            </div>
          </Card>
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Card 2</h3>
              <p className="text-white/60">More content here</p>
            </div>
          </Card>
        </div>
      </div>
    ),
  },
};
