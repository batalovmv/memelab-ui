import type { Meta, StoryObj } from '@storybook/react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table';

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Views</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow hoverable>
          <TableCell>Meme Pack A</TableCell>
          <TableCell>Published</TableCell>
          <TableCell>12,430</TableCell>
        </TableRow>
        <TableRow hoverable>
          <TableCell>Meme Pack B</TableCell>
          <TableCell>Draft</TableCell>
          <TableCell>3,280</TableCell>
        </TableRow>
        <TableRow hoverable>
          <TableCell>Meme Pack C</TableCell>
          <TableCell>Archived</TableCell>
          <TableCell>980</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithAlignment: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Metric</TableHead>
          <TableHead className="text-center">Today</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow hoverable>
          <TableCell>Clicks</TableCell>
          <TableCell align="center">482</TableCell>
          <TableCell align="right">34,291</TableCell>
        </TableRow>
        <TableRow hoverable>
          <TableCell>Shares</TableCell>
          <TableCell align="center">91</TableCell>
          <TableCell align="right">8,420</TableCell>
        </TableRow>
        <TableRow hoverable>
          <TableCell>Saves</TableCell>
          <TableCell align="center">56</TableCell>
          <TableCell align="right">5,103</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
