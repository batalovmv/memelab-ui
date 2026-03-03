import type { Meta, StoryObj } from '@storybook/react';

import { ErrorBoundary } from './ErrorBoundary';

function ThrowingComponent() {
  throw new Error('Something unexpected happened');
  return null;
}

const meta = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ErrorBoundary>
      <ThrowingComponent />
    </ErrorBoundary>
  ),
};

export const CustomFallback: Story = {
  render: () => (
    <ErrorBoundary fallback={<div className="glass rounded-xl p-6 text-white text-center">Custom error UI</div>}>
      <ThrowingComponent />
    </ErrorBoundary>
  ),
};

export const RenderFunctionFallback: Story = {
  render: () => (
    <ErrorBoundary fallback={(error, reset) => (
      <div className="glass rounded-xl p-6 text-center">
        <p className="text-sm text-rose-400 mb-3">{error.message}</p>
        <button
          onClick={reset}
          className="px-3 py-2 text-sm rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          Retry
        </button>
      </div>
    )}>
      <ThrowingComponent />
    </ErrorBoundary>
  ),
};

export const NoError: Story = {
  args: {
    children: <div className="glass rounded-xl p-6 text-white text-center">Everything is fine!</div>,
  },
};
