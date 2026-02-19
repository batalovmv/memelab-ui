# @memelab/ui

Shared UI component library for MemeLab projects. Dark-first glassmorphism design system built with React, TypeScript, and Tailwind CSS.

## Install

```bash
pnpm add @memelab/ui
```

## Setup

### 1. Tailwind preset

```ts
// tailwind.config.ts
import memelabPreset from '@memelab/ui/preset';

export default {
  presets: [memelabPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@memelab/ui/dist/**/*.{js,mjs}',
  ],
};
```

### 2. Import styles

```ts
// main.tsx
import '@memelab/ui/styles';
```

### 3. Use components

```tsx
import { Button, Card, Modal, Input } from '@memelab/ui';

function App() {
  return (
    <Card hoverable>
      <Input label="Email" placeholder="you@example.com" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

## Components

### Core

| Component | Description |
|-----------|-------------|
| `Button` | Primary, secondary, danger, success, warning, ghost variants + loading state |
| `IconButton` | Icon-only button with required aria-label |
| `Input` | Text input with optional label, error, helperText |
| `Select` | Select dropdown with label/error wrapper |
| `Textarea` | Textarea with label/error wrapper |
| `Badge` / `Pill` | Status badges (neutral, primary, success, danger, warning, accent) |
| `Toggle` | Switch toggle (sm/md sizes) |
| `Spinner` | Loading spinner (sm/md/lg) |
| `Skeleton` | Pulse placeholder for loading states |
| `Card` | Surface or glass card container |
| `Modal` | Dialog with focus trap, backdrop blur, a11y |
| `ConfirmDialog` | Confirmation modal with cancel/confirm actions |
| `Tooltip` | Hover/focus tooltip with portal positioning |
| `EmptyState` | Empty state placeholder with icon, title, action |
| `CollapsibleSection` | Animated expand/collapse section |

### Layout

| Component | Description |
|-----------|-------------|
| `PageShell` | Page wrapper with background orbs and max-width |
| `Navbar` | Fixed glass navigation bar |
| `Sidebar` | Collapsible glass sidebar |
| `DashboardLayout` | Navbar + sidebar + content composition |

## Customization

Override CSS variables to customize the theme:

```css
:root {
  --ml-primary: #667eea;
  --ml-accent: #4c5fd4;
  --ml-bg: #0f0f18;
}
```

## Development

```bash
pnpm dev            # Storybook on :6006
pnpm build          # Build package
pnpm test           # Run tests
pnpm typecheck      # Type check
```

## License

MIT
