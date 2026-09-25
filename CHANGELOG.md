# Changelog

All notable changes to the Above design system. Versions follow [semver](https://semver.org):
**major** = a token or component prop is renamed or removed (breaking), **minor** = new tokens,
components or variants, **patch** = value tweaks and fixes. Figma library releases use the same number.

## 0.2.0 — 2026-09-25

### Added
- Layout grid tokens (`--grid-slide-*`: 12 columns × 8 rows, 20px gutter/margin; `--grid-page-*`: 24 columns,
  32px gutter, 64px margin). In Figma: Spacing `grid/…` variables and the Grid/Slide and Grid/Page grid styles.
- Component tokens (`--button-*`, `--slide-*`). In Figma: a new Component collection, aliased to Spacing where
  the value is a spacing step.
- `tokens/tokens.md`, a generated, readable list of every token (checked in CI with the CSS).
- LICENSE (proprietary), CLAUDE.md (repo rules for Claude) and this changelog.

### Changed
- Slide templates and Button read component tokens instead of hardcoded pixel values. No visual change.

## 0.1.0

- First version: tokens.json as the single source, generated CSS, Figma Test library with variables, text styles
  and 8 components, Storybook foundations, components and slide templates, two-way Figma sync scripts.
