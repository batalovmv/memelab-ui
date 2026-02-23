import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Pagination } from './Pagination';

function PaginationDemo(props: React.ComponentProps<typeof Pagination>) {
  const [page, setPage] = useState(props.page);

  useEffect(() => {
    setPage(props.page);
  }, [props.page]);

  return (
    <Pagination
      {...props}
      page={page}
      onPageChange={(nextPage) => {
        setPage(nextPage);
        props.onPageChange(nextPage);
      }}
    />
  );
}

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    onPageChange: fn(),
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FewPages: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    page: 1,
    totalPages: 4,
  },
};

export const ManyPages: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    page: 1,
    totalPages: 20,
    siblingCount: 1,
  },
};

export const MiddlePage: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    page: 10,
    totalPages: 20,
    siblingCount: 1,
  },
};
