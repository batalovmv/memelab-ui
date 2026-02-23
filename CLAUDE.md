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
├── index.ts          # Root barrel export
├── tokens/           # CSS variables + JS color constants
├── utils/            # cn(), focus utilities
├── hooks/            # Reusable hooks (useClipboard, useDisclosure, etc.)
├── styles/           # CSS layers (base, components, animations)
├── preset/           # Tailwind preset for consumers
└── components/       # All React components
    ├── Button/       # Each has: Component.tsx, index.ts, .stories.tsx, .test.tsx
    ├── ...
```

## Components

### Layout
- **PageShell** — page wrapper with background effects
- **DashboardLayout** — sidebar + navbar + main layout
- **Navbar** — fixed top navigation bar (glass)
- **Sidebar** — collapsible side navigation

### Form
- **Input** — text input with label, error, helperText
- **SearchInput** — input with search icon and clear button
- **Select** — styled select dropdown
- **Textarea** — multiline text input
- **Checkbox** — custom checkbox with indeterminate support
- **RadioGroup / RadioItem** — compound radio buttons
- **Toggle** — switch/toggle control

### Feedback
- **Button / IconButton** — primary action buttons
- **ProgressButton** — button with loading/progress state
- **Badge / Pill** — status indicators
- **Spinner** — loading spinner
- **Skeleton** — content placeholder
- **ToastProvider / useToast** — notification system

### Overlay
- **Modal** — dialog modal
- **ConfirmDialog** — confirmation prompt
- **Tooltip** — hover/focus tooltip
- **Dropdown** — compound dropdown menu (Trigger, Menu, Item, Separator)

### Display
- **Card** — glass/surface content card
- **Tabs** — compound tabs (TabList, Tab, TabPanel)
- **CollapsibleSection** — expandable content section
- **EmptyState** — placeholder for empty content areas
- **DropZone** — drag & drop file upload area

### Hooks
- **useClipboard** — copy text to clipboard
- **useDisclosure** — open/close state management
- **useMediaQuery** — responsive media query listener
- **useDebounce** — debounced value

## Design Principles

- **Dark-first glassmorphism** — signature MemeLab look
- **CSS variables (`--ml-*`)** — all tokens overridable per project
- **Zero runtime deps** — only peer deps (react, tailwindcss)
- **Tailwind preset** — consumers add `presets: [memelabPreset]`
- **Tree-shakeable** — each component independently importable
- **Accessible** — ARIA attributes, keyboard navigation, focus management

## Key Tokens

| Token | Value | Purpose |
|-------|-------|---------|
| `--ml-bg` | `#0a0a0f` | Page background |
| `--ml-primary` | `#8b5cf6` | Primary (violet-500) |
| `--ml-accent` | `#667eea` | Accent (gradient start) |
| `--ml-glow-purple` | `#764ba2` | Gradient middle |
| `--ml-glow-pink` | `#f093fb` | Gradient end |

## Code Style

- Strict TypeScript, no `any` without comment
- Files: `PascalCase.tsx` for components, `camelCase.ts` for utils
- `forwardRef` for all form elements and buttons
- `cn()` utility for className composition (no external deps)
- Commits: `feat:`, `fix:`, `refactor:`, `docs:`

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
import { Button, Card, Modal } from '@memelabui/ui';
```
