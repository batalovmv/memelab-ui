import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button/Button';
import { ToastProvider, useToast, type ToastPosition, type ToastVariant } from './Toast';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Toast notification system. Wrap your app with `<ToastProvider>` and call `useToast()` to trigger notifications.',
      },
    },
  },
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Story: AllVariants ───────────────────────────────────────────────────────

function AllVariantsDemo() {
  const { toast } = useToast();

  const variants: ToastVariant[] = ['info', 'success', 'warning', 'error'];

  return (
    <div className="flex flex-wrap gap-3">
      {variants.map((variant) => (
        <Button
          key={variant}
          variant={variant === 'error' ? 'danger' : variant === 'success' ? 'success' : variant === 'warning' ? 'warning' : 'primary'}
          onClick={() =>
            toast({
              variant,
              title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} notification`,
              description: `This is a ${variant} message.`,
              duration: 5000,
            })
          }
        >
          Show {variant}
        </Button>
      ))}
    </div>
  );
}

export const AllVariants: Story = {
  render: () => (
    <ToastProvider position="top-right">
      <AllVariantsDemo />
    </ToastProvider>
  ),
};

// ─── Story: AutoDismiss ───────────────────────────────────────────────────────

function AutoDismissDemo() {
  const { toast } = useToast();

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-white/60">Toast will auto-dismiss after 2 seconds</p>
      <Button
        variant="primary"
        onClick={() =>
          toast({
            variant: 'info',
            title: 'Auto-dismiss in 2s',
            description: 'Watch me disappear automatically.',
            duration: 2000,
          })
        }
      >
        Trigger (2s)
      </Button>
    </div>
  );
}

export const AutoDismiss: Story = {
  render: () => (
    <ToastProvider position="top-right">
      <AutoDismissDemo />
    </ToastProvider>
  ),
};

// ─── Story: WithDescription ───────────────────────────────────────────────────

function WithDescriptionDemo() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="success"
        onClick={() =>
          toast({
            variant: 'success',
            title: 'Profile updated',
            description: 'Your profile changes have been saved successfully.',
          })
        }
      >
        Success with description
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          toast({
            variant: 'error',
            title: 'Upload failed',
            description: 'The file exceeds the 10 MB size limit. Please try a smaller file.',
          })
        }
      >
        Error with description
      </Button>
    </div>
  );
}

export const WithDescription: Story = {
  render: () => (
    <ToastProvider position="top-right">
      <WithDescriptionDemo />
    </ToastProvider>
  ),
};

// ─── Story: CustomPosition ────────────────────────────────────────────────────

const POSITIONS: ToastPosition[] = ['top-right', 'top-center', 'bottom-right', 'bottom-center'];

function CustomPositionDemo() {
  const [position, setPosition] = useState<ToastPosition>('top-right');

  return (
    <ToastProvider position={position}>
      <PositionPicker position={position} onPosition={setPosition} />
    </ToastProvider>
  );
}

function PositionPicker({
  position,
  onPosition,
}: {
  position: ToastPosition;
  onPosition: (p: ToastPosition) => void;
}) {
  const { toast } = useToast();

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {POSITIONS.map((p) => (
          <Button
            key={p}
            variant={position === p ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onPosition(p)}
          >
            {p}
          </Button>
        ))}
      </div>
      <Button
        variant="primary"
        onClick={() =>
          toast({
            variant: 'info',
            title: `Position: ${position}`,
            description: 'Toast appears at the selected corner.',
          })
        }
      >
        Show toast at {position}
      </Button>
    </div>
  );
}

export const CustomPosition: Story = {
  render: () => <CustomPositionDemo />,
};
