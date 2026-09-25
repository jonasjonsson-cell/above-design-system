# Changelog

All notable changes to the Above design system. Versions follow [semver](https://semver.org):
**major** = a token or component prop is renamed or removed (breaking), **minor** = new tokens,
components or variants, **patch** = value tweaks and fixes. Figma library releases use the same number.

## 0.3.0 — 2026-09-25

### Changed (breaking for anyone reading the token JSON)
- Tokens now follow the W3C Design Tokens Format Module 2025.10 (DTCG). `tokens/tokens.json` is replaced by
  `tokens/above.resolver.json` plus `primitive`, `semantic`, `semantic.dark`, `semantic.light`, `dimension`,
  `typography`, `effect` and `component` `.tokens.json` files. Colours are DTCG colour objects, dimensions are
  `{value, unit}`, text styles are `typography` composites and the card shadow is a `shadow` token.
- Values that used to be hardcoded in the build script (font families, weights, tracking, deck type ramp, font-size
  scale, slide canvas, motion) are now tokens too, marked `codeOnly` in `$extensions["se.above"]`.
- Text-style letter-spacing is stored in px (DTCG has no em unit); the CSS still emits em.
- CSS custom property names and values are unchanged — every generated property resolves to the same value as 0.2.0.
- Figma sync scripts read and write the DTCG files (`figma-to-tokens.mjs` gained `--dry-run`); round trip verified
  against the live Test library with no changes.
- Repo prepared for the `above` GitHub organisation (LICENSE and docs no longer say "keep private").

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

- First version: a single tokens.json as the source, generated CSS, Figma Test library with variables, text styles
  and 8 components, Storybook foundations, components and slide templates, two-way Figma sync scripts.
