import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ConfirmDialog } from './ConfirmDialog';

const meta = {
  title: 'Components/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
  args: {
    onClose: fn(),
    onConfirm: fn(),
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Delete item?',
    message: 'This action cannot be undone. The item will be permanently removed.',
    variant: 'danger',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <>
        <button
          type="button"
          className="rounded-lg bg-rose-600 px-4 py-2 text-white"
          onClick={() => setIsOpen(true)}
        >
          Open Dialog
        </button>
        <ConfirmDialog
          {...args}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            args.onClose();
          }}
          onConfirm={() => {
            setIsOpen(false);
            args.onConfirm();
          }}
        />
      </>
    );
  },
};

export const Warning: Story = {
  args: {
    title: 'Unsaved changes',
    message: 'You have unsaved changes. Are you sure you want to leave?',
    variant: 'warning',
    confirmText: 'Leave',
    cancelText: 'Stay',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <>
        <button
          type="button"
          className="rounded-lg bg-amber-600 px-4 py-2 text-white"
          onClick={() => setIsOpen(true)}
        >
          Open Warning
        </button>
        <ConfirmDialog
          {...args}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            args.onClose();
          }}
          onConfirm={() => {
            setIsOpen(false);
            args.onConfirm();
          }}
        />
      </>
    );
  },
};

export const Primary: Story = {
  args: {
    title: 'Confirm action',
    message: 'Are you sure you want to proceed with this action?',
    variant: 'primary',
    confirmText: 'Proceed',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <>
        <button
          type="button"
          className="rounded-lg bg-violet-600 px-4 py-2 text-white"
          onClick={() => setIsOpen(true)}
        >
          Open Primary
        </button>
        <ConfirmDialog
          {...args}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            args.onClose();
          }}
          onConfirm={() => {
            setIsOpen(false);
            args.onConfirm();
          }}
        />
      </>
    );
  },
};

export const Loading: Story = {
  args: {
    title: 'Delete item?',
    message: 'This action cannot be undone.',
    variant: 'danger',
    isLoading: true,
    loadingText: 'Deleting...',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <>
        <button
          type="button"
          className="rounded-lg bg-rose-600 px-4 py-2 text-white"
          onClick={() => setIsOpen(true)}
        >
          Open Loading
        </button>
        <ConfirmDialog
          {...args}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            args.onClose();
          }}
          onConfirm={() => {
            args.onConfirm();
          }}
        />
      </>
    );
  },
};

export const CustomTexts: Story = {
  args: {
    title: 'Reset settings?',
    message: 'All your custom settings will be restored to their default values.',
    variant: 'warning',
    confirmText: 'Yes, reset everything',
    cancelText: 'Keep my settings',
    loadingText: 'Resetting...',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <>
        <button
          type="button"
          className="rounded-lg bg-amber-600 px-4 py-2 text-white"
          onClick={() => setIsOpen(true)}
        >
          Open Custom
        </button>
        <ConfirmDialog
          {...args}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            args.onClose();
          }}
          onConfirm={() => {
            setIsOpen(false);
            args.onConfirm();
          }}
        />
      </>
    );
  },
};
