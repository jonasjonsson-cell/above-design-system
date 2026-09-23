# Above Design System

Above's component library — React + TypeScript, documented in Storybook,
with a companion Figma library that mirrors the same tokens.

## Getting started

```bash
npm install
npm run storybook   # http://localhost:6006
```

## How it's organised

- `src/styles/tokens.css` — **single source of truth** for color, type, spacing,
  radius, elevation and motion. Primitives (`--above-*`) feed semantic tokens
  (`--color-*`, `--space-*`, …). Components only read semantic tokens — never
  hardcode a value.
- `src/foundations/` — Storybook pages documenting the tokens.
- `src/components/<Name>/` — one folder per component: `Name.tsx`, `Name.css`,
  `Name.stories.tsx`.
- `src/index.ts` — public exports.

## Publishing

Every push to `main` builds Storybook and publishes it to Chromatic via
`.github/workflows/chromatic.yml` (needs the `CHROMATIC_PROJECT_TOKEN`
repository secret). Pull requests get a preview build plus visual diffs.

## Keeping Figma in sync

The Figma library's variables are generated from `tokens.css`. When tokens
change, re-sync the Figma variables in the same piece of work so the two never drift.

## Status

Token values are **placeholders** until they're brought over from the Above
design canvas in Claude Design.
