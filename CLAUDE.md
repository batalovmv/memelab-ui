# AI Assistant Guide — @memelabui/ui

## Quick Start

1. **Package**: `@memelabui/ui` — shared UI component library for all MemeLab projects
2. **Repo**: github.com/batalovmv/memelab-ui
3. **Stack**: React 18/19 + TypeScript + Tailwind 3.4 + pnpm
4. **Build**: tsup (ESM + CJS + d.ts) + PostCSS for CSS
5. **Docs**: Storybook 8
6. **Tests**: Vitest + Testing Library

## Commands

```bash
pnpm install        # Install dependencies
pnpm dev            # Storybook dev server (port 6006)
pnpm build          # Build package (tsup + postcss)
pnpm test           # Run tests (vitest watch)
pnpm test:ci        # Run tests once
pnpm typecheck      # TypeScript check
pnpm lint           # ESLint
pnpm build:storybook # Build static Storybook
```

## Architecture

```
src/
├── index.ts          # Root barrel export (57+ components, 7 hooks, utils, tokens)
├── tokens/           # CSS variables + JS color constants
├── utils/            # cn() (clsx-like, no tailwind-merge), focus utilities
├── hooks/            # Reusable hooks (useClipboard, useDisclosure, etc.)
├── styles/           # CSS layers (base, components, animations)
│   ├── components.css  # .glass, .surface, .surface-hover, .section-title, .text-gradient, etc.
│   ├── base.css        # Body, scrollbar, focus, select, link resets
│   └── animations.css  # @keyframes + reduced-motion support
├── preset/           # Tailwind preset for consumers (colors, shadows, animations)
└── components/       # All React components (57 directories)
    ├── Button/       # Each has: Component.tsx, index.ts, .stories.tsx, .test.tsx
    ├── Card/         # Glass/surface card with padding prop
    ├── SectionCard/  # Settings section with title + body (has own padding)
    ├── StatCard/     # Dashboard metric card (has own padding)
    ├── ...
```

## Key Design Decisions

### cn() does NOT use tailwind-merge
`cn()` is a simple `clsx`-like utility — it concatenates class names but does NOT resolve Tailwind conflicts. Adding `className="p-6"` to a component that already has `p-5` will result in **both** classes present. Use explicit props (like `padding` on Card) for overrides.

### `.glass` / `.surface` = visual treatment only, NO padding
These CSS classes provide background, blur, border, and shadow. They intentionally omit padding because they're used on diverse elements (Navbar header, Sidebar, Modal, Card). The `Card` component adds padding via Tailwind classes (`p-3`/`p-5`/`p-6`).

### Card padding prop
`Card` has `padding` prop: `'none' | 'sm' | 'md' | 'lg'` (default `'md'` = `p-5` = 20px). Use `padding="none"` to opt out.

### Component padding conventions
- `Card` — padding via `padding` prop (default `p-5`)
- `SectionCard` — built-in `px-5 py-4` in header + body
- `StatCard` — built-in `p-4`
- `Navbar` — inner `px-6 h-16` (fixed layout)
- `Sidebar` — no padding, consumer adds via nav items

## Components (57 directories)

### Layout
- **PageShell** — page wrapper with animated gradient orbs
- **DashboardLayout** — sidebar + navbar + main content composition
- **Navbar** — fixed top navigation bar (`glass` by default), props: `logo?`, `children` (right side), `glass?`
- **Sidebar** — collapsible side navigation (`glass`), props: `collapsed?`, `onToggle?`, `children`

### Cards & Containers
- **Card** — glass/surface content card with `padding` prop (`'none'`/`'sm'`/`'md'`/`'lg'`), `variant`, `hoverable`
- **SectionCard** — settings section: title + description + right slot + body (own padding)
- **StatCard** — dashboard metric: value + label + icon + trend (own padding)
- **CollapsibleSection** — animated expand/collapse

### Form
- **Input** — text input with label, error, helperText, forwardRef
- **SearchInput** — input with search icon and clear button
- **Select** — native select with label/error (no custom arrow)
- **Combobox** — searchable select with keyboard navigation
- **Textarea** — multiline input (hardcoded `resize-y`)
- **Checkbox** — with indeterminate support
- **RadioGroup / RadioItem** — compound radio buttons
- **Toggle** — switch control, props: `checked`, `onChange(boolean)`, `label?`, `busy?`, `size?`
- **Slider** — range input with value display
- **TagInput** — tag input with Enter/comma/paste, dedup, maxTags
- **ColorInput** — hex color picker with swatch
- **FormField** — generic label + error + helper wrapper

### Actions
- **Button** — 6 variants (primary/secondary/danger/success/warning/ghost) + loading + sizes
- **IconButton** — icon-only button, requires `aria-label`
- **ProgressButton** — button with shimmer loading

### Data Display
- **Badge / Pill** — 8 variants, 2 sizes (Pill = alias of Badge)
- **Table** compound — TableHeader, TableBody, TableRow, TableHead, TableCell
- **Tabs** compound — TabList, Tab, TabPanel (underline/pill variants)
- **EmptyState** — placeholder with icon, title, description, action
- **Skeleton** — pulse loading placeholder
- **Spinner** — loading spinner (sm/md/lg)
- **Avatar** — image + initials fallback
- **Divider** — horizontal/vertical with optional label
- **ActiveFilterPills** — dismissible filter pill row + clear all
- **DotIndicator** — dot-based remaining count

### Overlay
- **Modal** — dialog with focus trap, scroll lock, backdrop blur
- **ConfirmDialog** — confirmation prompt
- **Tooltip** — hover/focus tooltip with portal
- **Dropdown** compound — Trigger, Menu, Item, Separator
- **Popover** — click-triggered positioned popup
- **Drawer** — slide-in side panel (left/right/bottom)
- **MutationOverlay** — saving/saved/error status
- **NotificationBell** — bell button with unread badge

### Progress & Status
- **ProgressBar** — horizontal progress with variants
- **CooldownRing** — SVG circular countdown
- **StageProgress** — multi-stage process indicator

### Typography
- **Heading** — h1-h6 with size/gradient
- **Text** — p/span with size/color/weight/truncate

### Layout Utilities
- **Stack** — flex container with direction/gap/align
- **ScrollArea** — styled scrollbar container

### Feedback
- **ToastProvider / useToast** — toast notification system
- **Alert** — inline notification (info/success/warning/error)
- **CopyField** — read-only field with copy button + masking
- **Transition** — animated enter/exit wrapper

### Accessibility
- **VisuallyHidden** — screen reader-only content

### Hooks
- **useClipboard** — copy text with status
- **useDisclosure** — open/close state
- **useMediaQuery** — responsive query
- **useDebounce** — debounced value
- **useHotkeys** — keyboard shortcuts
- **useIntersectionObserver** — lazy loading, infinite scroll
- **useSharedNow** — reactive clock for countdowns

## CSS Utility Classes (from styles/components.css)

| Class | Has padding? | Purpose |
|-------|-------------|---------|
| `.glass` | No | Glassmorphism: blur + bg + inset border |
| `.surface` | No | Surface: similar to glass, more opaque |
| `.surface-hover` | No | Hover shadow transition (pair with glass/surface) |
| `.section-title` | No | Card heading: semibold, border-bottom, margin |
| `.text-gradient` | No | Violet-to-pink gradient text |
| `.animated-gradient` | No | Animated gradient background |
| `.page-container` | Yes (px) | Centered max-w-80rem responsive container |
| `.orb` `.orb-*` | No | Decorative blurred orbs |
| `.link-soft` | No | Subtle underline link |

## Key Tokens

| Token | Value | Purpose |
|-------|-------|---------|
| `--ml-bg` | `#0a0a0f` | Page background |
| `--ml-primary` | `#8b5cf6` | Primary (violet-500) |
| `--ml-accent` | `#667eea` | Accent (gradient start) |
| `--ml-glow-purple` | `#764ba2` | Gradient middle |
| `--ml-glow-pink` | `#f093fb` | Gradient end |
| `--ml-glass-bg` | `rgba(255,255,255,0.05)` | Glass background |
| `--ml-glass-blur` | `16px` | Glass blur radius |
| `--ml-radius-md` | `0.75rem` | Default border radius |

## Code Style

- Strict TypeScript, no `any` without comment
- Files: `PascalCase.tsx` for components, `camelCase.ts` for utils
- `forwardRef` for all form elements and buttons
- `cn()` utility for className composition (**not** tailwind-merge)
- Commits: `feat:`, `fix:`, `refactor:`, `docs:`
- Tests: co-located `*.test.tsx` next to component
- Stories: co-located `*.stories.tsx` next to component

## Consumer Integration

```ts
// tailwind.config.ts
import memelabPreset from '@memelabui/ui/preset';
export default {
  presets: [memelabPreset],
  content: ['./src/**/*.{ts,tsx}', './node_modules/@memelabui/ui/dist/**/*.{js,mjs}'],
};

// main.tsx
import '@memelabui/ui/styles';

// usage
import { Button, Card, SectionCard, Toggle, Input } from '@memelabui/ui';
```
