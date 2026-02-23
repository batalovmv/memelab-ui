# @memelabui/ui

Shared UI component library for MemeLab projects. Dark-first glassmorphism design system built with React, TypeScript, and Tailwind CSS.

[![npm](https://img.shields.io/npm/v/@memelabui/ui)](https://www.npmjs.com/package/@memelabui/ui)

## Install

```bash
pnpm add @memelabui/ui
```

## Setup

### 1. Tailwind preset

```ts
// tailwind.config.ts
import memelabPreset from '@memelabui/ui/preset';

export default {
  presets: [memelabPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@memelabui/ui/dist/**/*.{js,mjs}',
  ],
};
```

### 2. Import styles

```ts
// main.tsx
import '@memelabui/ui/styles';
```

### 3. Use components

```tsx
import { Button, Card, Input, ToastProvider } from '@memelabui/ui';

function App() {
  return (
    <ToastProvider>
      <Card hoverable>
        <Input label="Email" placeholder="you@example.com" />
        <Button variant="primary">Submit</Button>
      </Card>
    </ToastProvider>
  );
}
```

## Components (60+ exports)

### Form

| Component | Description |
|-----------|-------------|
| `Input` | Text input with label, error, helperText |
| `SearchInput` | Search input with icon and clear button |
| `Select` | Select dropdown with label/error wrapper |
| `Combobox` | Searchable select with keyboard navigation and filtering |
| `Textarea` | Multiline text input with label/error |
| `Checkbox` | Custom checkbox with indeterminate support |
| `RadioGroup` / `RadioItem` | Compound radio button group |
| `Toggle` | Switch toggle (sm/md sizes) with `busy` spinner state |
| `Slider` | Range input with custom track/thumb and value display |
| `TagInput` | Tag input with Enter/comma/paste, dedup, maxTags |
| `ColorInput` | Hex color picker with swatch + text input |
| `FormField` | Generic label + error + helper wrapper for any input |

### Actions

| Component | Description |
|-----------|-------------|
| `Button` | Primary, secondary, danger, success, warning, ghost variants + loading |
| `IconButton` | Icon-only button with required `aria-label` |
| `ProgressButton` | Button with shimmer loading animation |

### Data Display

| Component | Description |
|-----------|-------------|
| `Card` | Surface or glass card container |
| `SectionCard` | Settings section card with title, description, right slot, overlay slot |
| `Badge` / `Pill` | Status badges (neutral, primary, success, danger, warning, accent) |
| `StatCard` | Dashboard stat card with value, label, icon, trend indicator |
| `Table` / `TableHeader` / `TableBody` / `TableRow` / `TableHead` / `TableCell` | Styled table primitives |
| `Tabs` / `TabList` / `Tab` / `TabPanel` | Compound tabs with underline and pill variants |
| `CollapsibleSection` | Animated expand/collapse with ARIA |
| `EmptyState` | Placeholder with icon, title, description, action |
| `Skeleton` | Pulse placeholder for loading states |
| `Spinner` | Loading spinner (sm/md/lg) |
| `DropZone` | Drag & drop file upload area with accept filter |
| `Avatar` | Circular avatar with image + initials fallback |
| `Divider` | Horizontal/vertical divider with optional label |
| `ActiveFilterPills` | Dismissible filter pill row with "Clear all" action |
| `DotIndicator` | Dot-based remaining count with urgency colors |

### Progress & Status

| Component | Description |
|-----------|-------------|
| `ProgressBar` | Horizontal progress bar with variants and sizes |
| `CooldownRing` | SVG circular countdown timer with color changes and pulse |
| `StageProgress` | Multi-stage process indicator with shimmer animation |

### Navigation

| Component | Description |
|-----------|-------------|
| `Pagination` | Page navigation with prev/next, ellipsis, active state |
| `Stepper` | Horizontal step indicator for wizards/onboarding |
| `Breadcrumbs` | Breadcrumb navigation with links/buttons/separators |

### Overlay

| Component | Description |
|-----------|-------------|
| `Modal` | Dialog with focus trap, scroll lock, backdrop blur |
| `ConfirmDialog` | Confirmation modal with cancel/confirm actions |
| `Tooltip` | Hover/focus tooltip with portal positioning |
| `Dropdown` | Compound menu (Trigger, Menu, Item, Separator) |
| `MutationOverlay` | Saving/saved/error status overlay for cards |
| `NotificationBell` | Notification bell button with unread count badge and ping animation |
| `Popover` | Click-triggered positioned popup with portal |
| `Drawer` | Slide-in side panel (left/right/bottom) with focus trap |

### Typography

| Component | Description |
|-----------|-------------|
| `Heading` | Heading h1-h6 with size/color presets and gradient variant |
| `Text` | Text paragraph/span with size, color, weight, and truncate |

### Layout

| Component | Description |
|-----------|-------------|
| `PageShell` | Page wrapper with animated background orbs |
| `Navbar` | Fixed glass navigation bar |
| `Sidebar` | Collapsible glass sidebar |
| `DashboardLayout` | Navbar + sidebar + content composition |
| `Stack` | Flex container with direction, gap, align, justify |
| `ScrollArea` | Scroll container with custom dark scrollbar styling |

### Feedback

| Component | Description |
|-----------|-------------|
| `ToastProvider` / `useToast` | Toast notification system with variants |
| `Alert` | Inline notification banner (info, success, warning, error) |
| `CopyField` | Read-only field with copy button and optional masking |
| `Transition` | Animated enter/exit wrapper (fade, scale, slide presets) |

### Accessibility

| Component | Description |
|-----------|-------------|
| `VisuallyHidden` | Screen reader-only content (invisible but accessible) |

### Hooks

| Hook | Description |
|------|-------------|
| `useClipboard` | Copy text to clipboard with status |
| `useDisclosure` | Open/close state management |
| `useMediaQuery` | Responsive media query listener |
| `useDebounce` | Debounced value |
| `useHotkeys` | Global keyboard shortcuts with modifier support |
| `useIntersectionObserver` | IntersectionObserver for infinite scroll and lazy loading |
| `useSharedNow` | Reactive current-time for countdowns and "X ago" labels |

## Customization

Override CSS variables to customize the theme:

```css
/* Values must be space-separated RGB channels (not hex) for Tailwind opacity support */
:root {
  --ml-bg: 10 10 15;
  --ml-primary: 139 92 246;
  --ml-accent: 102 126 234;
  --ml-glow-purple: 118 75 162;
  --ml-glow-pink: 240 147 251;
  --ml-surface-50: 20 20 32;
  --ml-surface-100: 30 30 48;
}
```

## Features

- **Dark-first glassmorphism** design system
- **Zero runtime dependencies** — only peer deps (react, react-dom, tailwindcss)
- **Tree-shakeable** — each component independently importable
- **Fully accessible** — ARIA attributes, keyboard navigation, focus management, `prefers-reduced-motion` support
- **SSR-safe** — no `document`/`window` access during server render
- **TypeScript-first** — all components and hooks fully typed with exported types
- **Tailwind preset** — tokens, colors, and animations included

## Development

```bash
pnpm dev            # Storybook on :6006
pnpm build          # Build package (tsup + postcss)
pnpm test           # Run tests (vitest watch)
pnpm test:ci        # Run tests once
pnpm typecheck      # TypeScript check
pnpm lint           # ESLint
```

## License

MIT
