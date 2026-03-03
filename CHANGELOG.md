# Changelog

All notable changes to `@memelabui/ui` will be documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/).

## [0.8.0] - 2026-03-03

### Added
- `ErrorBoundary` — React error boundary with default fallback and reset
- `LoadingScreen` — full-viewport centered loading with Spinner + message
- `useScrollLock` hook — shared ref-counted body scroll lock
- `Tooltip` — `left` and `right` placement support

### Fixed
- `useHotkeys` — stabilized dependency array (no longer re-registers on every render)
- Modal + Drawer scroll lock now shares a single counter (no more broken lock when both open)

### Changed
- `StatCard` — uses `.glass` class instead of raw Tailwind for design consistency

## [0.7.0] - 2026-02-28

### Added
- `Card` `padding` prop (`'none'` | `'sm'` | `'md'` | `'lg'`)
- `.section-title` CSS utility class
- Comprehensive documentation in CLAUDE.md and README.md

## [0.6.1] - 2026-02-27

### Fixed
- Use `fireEvent` for Dropdown keyboard nav tests (CI jsdom compat)
- Remove explicit pnpm version from CI to use `packageManager` field

## [0.6.0] - 2026-02-26

### Added
- 38 new components, hooks, and quality fixes
- Full Storybook stories and tests for all components

## [0.1.0] - 2026-02-20

### Added
- Initial release with 19 components
- Complete stories and tests for all components
