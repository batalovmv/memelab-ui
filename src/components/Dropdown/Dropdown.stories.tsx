import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button } from '../Button/Button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownSeparator, DropdownTrigger } from './Dropdown';

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="secondary">Options</Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem onSelect={fn()}>Edit</DropdownItem>
        <DropdownItem onSelect={fn()}>Duplicate</DropdownItem>
        <DropdownItem onSelect={fn()}>Archive</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
};

export const RightAligned: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="secondary">Right-aligned Menu</Button>
      </DropdownTrigger>
      <DropdownMenu align="right">
        <DropdownItem onSelect={fn()}>Profile</DropdownItem>
        <DropdownItem onSelect={fn()}>Settings</DropdownItem>
        <DropdownItem onSelect={fn()}>Sign out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="secondary">Actions</Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem onSelect={fn()}>Rename</DropdownItem>
        <DropdownItem disabled>Export (unavailable)</DropdownItem>
        <DropdownItem onSelect={fn()}>Delete</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="secondary">File</Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem onSelect={fn()}>New</DropdownItem>
        <DropdownItem onSelect={fn()}>Open</DropdownItem>
        <DropdownSeparator />
        <DropdownItem onSelect={fn()}>Save</DropdownItem>
        <DropdownItem onSelect={fn()}>Save As…</DropdownItem>
        <DropdownSeparator />
        <DropdownItem onSelect={fn()}>Quit</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
};

export const ManyItems: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="primary">Select a country</Button>
      </DropdownTrigger>
      <DropdownMenu>
        {[
          'Argentina',
          'Brazil',
          'Canada',
          'Denmark',
          'Egypt',
          'France',
          'Germany',
          'Hungary',
          'India',
          'Japan',
        ].map((country) => (
          <DropdownItem key={country} onSelect={fn()}>
            {country}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  ),
};
