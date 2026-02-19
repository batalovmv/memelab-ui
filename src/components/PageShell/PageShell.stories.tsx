import type { Meta, StoryObj } from '@storybook/react';
import { PageShell } from './PageShell';

const meta = {
  title: 'Layout/PageShell',
  component: PageShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PageShell>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold text-white">Page Title</h1>
    <p className="text-white/70">
      This is sample page content rendered inside the PageShell component.
    </p>
    <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
      <p className="text-white/50 text-sm">A card-like element to show container sizing.</p>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    children: <SampleContent />,
  },
};

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    children: <SampleContent />,
  },
};

export const WithHeader: Story = {
  args: {
    header: (
      <header className="sticky top-0 z-10 flex items-center h-14 px-6 bg-white/5 backdrop-blur-md border-b border-white/10">
        <span className="text-white font-semibold">MemeLab</span>
      </header>
    ),
    children: <SampleContent />,
  },
};

export const SmallWidth: Story = {
  args: {
    maxWidth: 'sm',
    children: <SampleContent />,
  },
};
