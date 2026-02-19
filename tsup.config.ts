import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
      'preset/index': 'src/preset/index.ts',
      'tokens/index': 'src/tokens/index.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    sourcemap: true,
    external: ['react', 'react-dom', 'react/jsx-runtime', 'tailwindcss', 'tailwindcss/plugin'],
    treeshake: true,
    splitting: false,
  },
]);
