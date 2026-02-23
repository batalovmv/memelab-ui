import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { TagInput } from './TagInput';

function TagInputDemo(props: React.ComponentProps<typeof TagInput>) {
  const [tags, setTags] = useState(props.value);

  useEffect(() => {
    setTags(props.value);
  }, [props.value]);

  return <TagInput {...props} value={tags} onChange={setTags} />;
}

const meta = {
  title: 'Components/TagInput',
  component: TagInput,
  tags: ['autodocs'],
} satisfies Meta<typeof TagInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTags: Story = {
  render: (args) => <TagInputDemo {...args} />,
  args: {
    label: 'Tags',
    value: ['React', 'TypeScript', 'Storybook'],
    placeholder: 'Add a tag',
  },
};

export const Empty: Story = {
  render: (args) => <TagInputDemo {...args} />,
  args: {
    label: 'Tags',
    value: [],
    placeholder: 'Type and press Enter',
  },
};

export const WithMax: Story = {
  render: (args) => <TagInputDemo {...args} />,
  args: {
    label: 'Limited tags',
    value: ['UI', 'Frontend', 'Design'],
    maxTags: 3,
    placeholder: 'Max reached',
  },
};
