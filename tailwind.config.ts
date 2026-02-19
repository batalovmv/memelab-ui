import type { Config } from 'tailwindcss';
import memelabPreset from './src/preset/index';

export default {
  presets: [memelabPreset as Config],
  content: [
    './src/**/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
  ],
  plugins: [],
} satisfies Config;
