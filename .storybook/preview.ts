import type { Preview } from '@storybook/react';
import '../src/styles/index.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'memelab-dark',
      values: [
        { name: 'memelab-dark', value: '#0a0a0f' },
        { name: 'memelab-surface', value: '#0f0f18' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
