# @memelabui/ui

Shared UI component library for MemeLab projects. Dark-first glassmorphism design system built with React, TypeScript, and Tailwind CSS.

[![npm](https://img.shields.io/npm/v/@memelabui/ui)](https://www.npmjs.com/package/@memelabui/ui)

## Install

```bash
pnpm add @memelabui/ui
```

Peer dependencies: `react >= 18`, `react-dom >= 18`, `tailwindcss >= 3.4`.

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

The preset adds MemeLab colors (`primary`, `accent`, `surface`, `glow`), animations, border radius, and box shadow tokens to your Tailwind config. No component CSS is duplicated — component styles come from the CSS import below.

### 2. Import styles

```ts
// main.tsx (before your app code)
import '@memelabui/ui/styles';
```

This imports base styles, CSS variables (`--ml-*` tokens), glassmorphism utility classes, and component animations. Must be imported once at the root of your app.

### 3. Use components

```tsx
import { Button, Card, Input, ToastProvider } from '@memelabui/ui';

function App() {
  return (
    <ToastProvider>
      <Card variant="glass" hoverable>
        <h2 className="section-title">Login</h2>
        <Input label="Email" placeholder="you@example.com" />
        <Button variant="primary" className="mt-4">Submit</Button>
      </Card>
    </ToastProvider>
  );
}
```

---

## CSS Utility Classes

These classes are available globally after importing `@memelabui/ui/styles`. They provide the MemeLab visual foundation.

| Class | Purpose | When to use |
|-------|---------|-------------|
| `.glass` | Glassmorphism panel — translucent `bg`, `backdrop-filter: blur(16px)`, inset border, rounded | Visual shell for containers. **Does not include padding** — use `Card` component for padded cards |
| `.surface` | Surface panel — slightly more opaque `bg`, `blur(12px)`, border shadow | Alternative to `.glass` with stronger background. Also **no padding** |
| `.surface-hover` | Hover elevation transition — adds `box-shadow` on hover | Pair with `.glass` or `.surface` for interactive cards |
| `.section-title` | Card section heading — `font-semibold`, `border-bottom`, `mb-4` | Use inside `Card` for titled sections (settings, forms) |
| `.text-gradient` | Gradient text (violet to pink) | Branding, hero headings |
| `.animated-gradient` | Animated gradient background | Decorative elements, loading placeholders |
| `.page-container` | Centered max-w-80rem container with responsive padding | Page-level wrapper |
| `.orb` / `.orb-purple` / `.orb-blue` / `.orb-pink` | Decorative blurred orbs | Background effects (see `PageShell`) |
| `.pb-safe` / `.pt-safe` | iOS safe area padding | Mobile bottom/top bars |
| `.no-scrollbar` | Hides scrollbar | Horizontal scroll areas, custom scrolling |
| `.link-soft` | Subtle underline link | Secondary navigation links |

### Important: `.glass` / `.surface` vs `Card`

The `.glass` and `.surface` CSS classes are **visual treatments only** — they add background, blur, border, and shadow. They intentionally do **not** include padding because they're used across diverse elements (headers, sidebars, modals, custom layouts).

**For content cards, always use the `Card` component** instead of raw `.glass`/`.surface` classes. `Card` provides built-in padding (`p-5` by default) plus correct ARIA semantics.

```tsx
// Correct — Card handles padding automatically
<Card variant="glass" hoverable>
  <h2 className="section-title">Settings</h2>
  <Input label="Name" />
</Card>

// Avoid — raw classes require manual padding
<div className="glass surface-hover p-5">
  <h2 className="section-title">Settings</h2>
  <Input label="Name" />
</div>
```

---

## Components

### Cards & Containers

Use these to wrap content sections. Each has different levels of structure.

| Component | When to use | Key props |
|-----------|-------------|-----------|
| `Card` | Generic content container with glassmorphism | `variant` (`'surface'` / `'glass'`), `hoverable`, `padding` (`'none'` / `'sm'` / `'md'` / `'lg'`) |
| `SectionCard` | Settings/config section with title, description, and optional right slot | `title`, `description?`, `right?`, `overlay?` |
| `StatCard` | Dashboard metric tile with value, label, icon, and trend | `value`, `label`, `icon?`, `trend?` |
| `CollapsibleSection` | Expandable/collapsible content block | `title`, `defaultOpen?` |

**Choosing the right card:**

- Building a **settings form section** (title + form fields)? Use `SectionCard`
- Showing a **dashboard metric** (number + label + icon)? Use `StatCard`
- Need a **generic container** with glass/surface styling? Use `Card`
- Need an **expandable block**? Use `CollapsibleSection`

```tsx
// Settings page section
<SectionCard title="AI Provider" description="Choose the AI model for your bot">
  <Select label="Provider" />
  <Input label="Model" placeholder="Default" />
</SectionCard>

// Dashboard metric
<StatCard value="1,234" label="Messages today" trend={{ value: 12, direction: 'up' }} />

// Generic glass card
<Card variant="glass" hoverable padding="lg">
  <p>Any content here</p>
</Card>
```

### Form Inputs

All form components accept `label`, `error`, and `helperText` props with automatic ARIA linkage (`aria-invalid`, `aria-describedby`). They use `forwardRef` for ref forwarding and spread all native HTML attributes.

| Component | When to use | Key props |
|-----------|-------------|-----------|
| `Input` | Single-line text input | `label?`, `error?`, `helperText?`, `hasError?` + all `<input>` attrs |
| `SearchInput` | Search field with icon and clear button | `onClear?` + all `Input` props |
| `Textarea` | Multi-line text input | `label?`, `error?` + all `<textarea>` attrs |
| `Select` | Native dropdown select | `label?`, `error?` + all `<select>` attrs |
| `Combobox` | Searchable select with keyboard navigation | `options`, `value`, `onChange`, `placeholder?` |
| `Checkbox` | Checkbox with label and indeterminate support | `label?`, `indeterminate?`, `checked`, `onChange` |
| `RadioGroup` / `RadioItem` | Radio button group | `value`, `onChange` on Group; `value`, `label` on Item |
| `Toggle` | On/off switch | `checked`, `onChange(boolean)`, `label?`, `busy?`, `size?` |
| `Slider` | Range slider with value display | `min`, `max`, `value`, `onChange` |
| `TagInput` | Tag input with Enter/comma/paste support | `value: string[]`, `onChange`, `maxTags?` |
| `ColorInput` | Hex color picker with swatch | `value`, `onChange` |
| `FormField` | Generic wrapper for any input (label + error + helper) | `label`, `error?`, `helperText?`, `children` |

```tsx
// Full form with Toggle + Input + Select
<Card variant="glass" hoverable>
  <h2 className="section-title">Bot Personality</h2>
  <Input label="Bot name" value="MemeBot" />
  <Textarea label="Personality" placeholder="Friendly, humorous..." />
  <Select label="Response style">
    <option value="concise">Concise</option>
    <option value="detailed">Detailed</option>
  </Select>
  <Toggle
    label="Respond to @mentions"
    checked={mentionEnabled}
    onChange={setMentionEnabled}
  />
</Card>
```

### Buttons

| Component | When to use | Key props |
|-----------|-------------|-----------|
| `Button` | Primary actions, form submits, navigation | `variant` (`'primary'` / `'secondary'` / `'danger'` / `'success'` / `'warning'` / `'ghost'`), `loading?`, `size?` |
| `IconButton` | Icon-only actions (close, menu, refresh) | `aria-label` (required), `variant?`, `size?` |
| `ProgressButton` | Button with shimmer loading state | `loading?`, `progress?` |

### Data Display

| Component | When to use | Key props |
|-----------|-------------|-----------|
| `Badge` / `Pill` | Status labels, tags, categories | `variant` (`'neutral'` / `'primary'` / `'success'` / `'danger'` / `'warning'` / `'accent'` / `'successSolid'` / `'dangerSolid'`), `size?` |
| `Table` / `TableHeader` / `TableBody` / `TableRow` / `TableHead` / `TableCell` | Data tables | Compound — compose like native `<table>` |
| `Tabs` / `TabList` / `Tab` / `TabPanel` | Tabbed content switching | `variant` (`'underline'` / `'pill'`); compound pattern |
| `EmptyState` | Empty content placeholder | `icon?`, `title`, `description?`, `action?` |
| `Skeleton` | Loading placeholder | `width?`, `height?`, `rounded?` |
| `Spinner` | Loading indicator | `size` (`'sm'` / `'md'` / `'lg'`) |
| `Avatar` | User avatar with fallback | `src?`, `name?`, `size?` |
| `Divider` | Separator line | `orientation?`, `label?` |
| `ActiveFilterPills` | Filter pill bar with clear-all | `filters`, `onRemove`, `onClearAll` |
| `DotIndicator` | Remaining count dots | `count`, `max?` |

### Navigation

| Component | When to use | Key props |
|-----------|-------------|-----------|
| `Pagination` | Page navigation | `page`, `totalPages`, `onChange` |
| `Stepper` | Multi-step wizard indicator | `steps`, `currentStep` |
| `Breadcrumbs` | Breadcrumb path | `items` (links/buttons) |

### Overlay & Popups

| Component | When to use | Key props |
|-----------|-------------|-----------|
| `Modal` | Dialog / fullscreen overlay | `open`, `onClose`, children |
| `ConfirmDialog` | Confirmation prompts (delete, discard) | `open`, `onConfirm`, `onCancel`, `title`, `description` |
| `Tooltip` | Hover/focus info text | `content`, `children` (trigger) |
| `Dropdown` | Dropdown menu (context menu, actions) | Compound: `DropdownTrigger` + `DropdownMenu` + `DropdownItem` + `DropdownSeparator` |
| `Popover` | Click-triggered popup | `trigger`, `children` (content) |
| `Drawer` | Slide-in side panel | `open`, `onClose`, `position` (`'left'` / `'right'` / `'bottom'`) |
| `MutationOverlay` | Saving/saved/error status indicator | `status` (`'idle'` / `'saving'` / `'saved'` / `'error'`) |
| `NotificationBell` | Notification button with badge | `count`, `onClick` |

### Progress & Status

| Component | When to use | Key props |
|-----------|-------------|-----------|
| `ProgressBar` | Linear progress indicator | `value`, `max?`, `variant?`, `size?` |
| `CooldownRing` | Circular countdown timer | `remaining`, `total` |
| `StageProgress` | Multi-stage process tracker | `stages`, `currentStage` |

### Typography

| Component | When to use | Key props |
|-----------|-------------|-----------|
| `Heading` | Section headings h1-h6 | `as` (`'h1'` - `'h6'`), `size?`, `gradient?` |
| `Text` | Body text, captions, labels | `as` (`'p'` / `'span'`), `size?`, `color?`, `weight?`, `truncate?` |

### Layout

These components provide the overall page structure. Use them together for full-page layouts.

| Component | When to use | Key props |
|-----------|-------------|-----------|
| `PageShell` | Page wrapper with animated gradient orbs | `children` |
| `DashboardLayout` | Full dashboard (navbar + sidebar + content) | `navbar`, `sidebar`, `children` |
| `Navbar` | Fixed top navigation bar with glass effect | `logo?`, `children` (right-side content), `glass?` |
| `Sidebar` | Collapsible side navigation | `collapsed?`, `onToggle?`, `children` (nav items) |
| `Stack` | Flex container | `direction?`, `gap?`, `align?`, `justify?` |
| `ScrollArea` | Scrollable container with styled scrollbar | `children` |

**Full page layout example:**

```tsx
import { PageShell, DashboardLayout, Navbar, Sidebar, Card } from '@memelabui/ui';

function App() {
  return (
    <PageShell>
      <DashboardLayout
        navbar={
          <Navbar logo={<span className="text-gradient font-bold">MyApp</span>}>
            <Button variant="ghost">Sign out</Button>
          </Navbar>
        }
        sidebar={
          <Sidebar>
            <a href="/dashboard" className="px-4 py-2.5 rounded-lg text-sm text-white/60 hover:text-white">
              Overview
            </a>
            <a href="/settings" className="px-4 py-2.5 rounded-lg text-sm bg-accent/20 text-accent">
              Settings
            </a>
          </Sidebar>
        }
      >
        <Card variant="glass" hoverable>
          <h2 className="section-title">Settings</h2>
          <Input label="Bot name" />
        </Card>
      </DashboardLayout>
    </PageShell>
  );
}
```

### Feedback

| Component | When to use | Key props |
|-----------|-------------|-----------|
| `ToastProvider` / `useToast` | Toast notifications (wrap app root in Provider) | `useToast()` returns `{ toast }` function |
| `Alert` | Inline notification banner | `variant` (`'info'` / `'success'` / `'warning'` / `'error'`), `title?`, `children` |
| `CopyField` | Read-only field with copy button | `value`, `masked?` |
| `Transition` | Enter/exit animations | `show`, `preset` (`'fade'` / `'scale'` / `'slide'`) |

### Accessibility

| Component | When to use |
|-----------|-------------|
| `VisuallyHidden` | Screen reader-only text (hidden visually but accessible) |

### Hooks

| Hook | When to use | Returns |
|------|-------------|---------|
| `useClipboard` | Copy text with status feedback | `{ copy, copied }` |
| `useDisclosure` | Toggle open/close state for modals, menus | `{ isOpen, onOpen, onClose, onToggle }` |
| `useMediaQuery` | Respond to viewport changes | `boolean` |
| `useDebounce` | Debounce fast-changing values (search, resize) | debounced value |
| `useHotkeys` | Global keyboard shortcuts | bind key combos to callbacks |
| `useIntersectionObserver` | Lazy loading, infinite scroll | `{ ref, isIntersecting }` |
| `useSharedNow` | Live clock for "X ago" labels, countdowns | `Date` that updates every N ms |

---

## Common Patterns

### Settings page with sections

```tsx
import { Card, Input, Textarea, Select, Toggle } from '@memelabui/ui';

function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card variant="glass" hoverable>
        <h2 className="section-title">Bot Personality</h2>
        <div className="space-y-4">
          <Input label="Bot name" value={name} onChange={...} />
          <Textarea label="Personality description" value={desc} onChange={...} />
          <div className="grid grid-cols-3 gap-4">
            <Select label="Style"><option>Concise</option></Select>
            <Select label="Language"><option>Auto</option></Select>
            <Input label="Max length" type="number" />
          </div>
        </div>
      </Card>

      <Card variant="glass" hoverable>
        <h2 className="section-title">Triggers</h2>
        <div className="space-y-3">
          <Toggle label="Respond to @mentions" checked={...} onChange={...} />
          <Toggle label="Respond to keywords" checked={...} onChange={...} />
          <TagInput value={keywords} onChange={...} placeholder="Add keyword" />
        </div>
      </Card>
    </div>
  );
}
```

### Dashboard with stats

```tsx
import { StatCard, SectionCard, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@memelabui/ui';

function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard value="1,234" label="Messages" trend={{ value: 12, direction: 'up' }} />
        <StatCard value="89%" label="Response rate" />
        <StatCard value="2.3s" label="Avg. response" />
      </div>

      <SectionCard title="Recent Activity" description="Last 24 hours">
        <Table>
          <TableHeader>
            <TableRow><TableHead>Time</TableHead><TableHead>Message</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            <TableRow><TableCell>12:30</TableCell><TableCell>Hello bot!</TableCell></TableRow>
          </TableBody>
        </Table>
      </SectionCard>
    </>
  );
}
```

---

## Customization

Override CSS variables to customize the theme. Values must be **space-separated RGB channels** (not hex) for Tailwind opacity support:

```css
:root {
  --ml-bg: 10 10 15;            /* Page background */
  --ml-primary: 139 92 246;     /* Primary color (buttons, toggles, active states) */
  --ml-accent: 102 126 234;     /* Accent / gradient start */
  --ml-glow-purple: 118 75 162; /* Gradient middle */
  --ml-glow-pink: 240 147 251;  /* Gradient end */
  --ml-surface-50: 20 20 32;    /* Surface tint */
  --ml-surface-100: 30 30 48;   /* Surface tint darker */
}
```

Additional tokens:

| Token | Default | Purpose |
|-------|---------|---------|
| `--ml-glass-bg` | `rgba(255,255,255,0.05)` | Glass panel background |
| `--ml-glass-blur` | `16px` | Glass backdrop blur |
| `--ml-glass-border` | `rgba(255,255,255,0.1)` | Glass inset border |
| `--ml-radius-md` | `0.75rem` | Default border radius |
| `--ml-font-sans` | System font stack | Base font family |
| `--ml-transition-fast` | `150ms ease` | Hover/focus transition speed |

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
