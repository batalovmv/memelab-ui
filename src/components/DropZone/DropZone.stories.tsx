import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { DropZone } from './DropZone';

const meta = {
  title: 'Components/DropZone',
  component: DropZone,
  tags: ['autodocs'],
  args: {
    onFilesDropped: fn(),
  },
} satisfies Meta<typeof DropZone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomContent: Story = {
  args: {
    accept: 'image/*',
    children: (
      <div className="flex flex-col items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-violet-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18M6.75 9.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
          />
        </svg>
        <p className="text-base font-semibold text-white">Drag & drop images</p>
        <p className="text-sm text-white/40">PNG, JPG, GIF up to 10 MB</p>
      </div>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const SmallMaxFiles: Story = {
  args: {
    maxFiles: 1,
    accept: '.pdf',
    children: (
      <div className="flex flex-col items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-white/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
        <p className="text-sm text-white/50">Upload a single PDF</p>
      </div>
    ),
  },
};
