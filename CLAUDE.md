# Above design system — rules for Claude

React + TypeScript + Vite + Storybook 10. Published to Chromatic; Figma Test library `G9NJsMEulHxW0FhK4kPG4N`
mirrors the tokens.

## Tokens
- `tokens/tokens.json` is the only place token values live. After editing it, run `npm run tokens`
  (writes `src/styles/tokens.css`, `src/styles/text-styles.css`, `tokens/tokens.md`). Never edit those by hand —
  `npm run tokens:check` fails CI.
- Tiers: `primitive` → `color` / `dimension` / `grid` (semantic) → `component` (`--button-*`, `--slide-*`).
  In `component`, numbers are px, `"{name}"` aliases another token, other strings are code-only raw CSS.
- Never hardcode a colour, spacing, size or type value in a component. Add or reuse a token instead.
  Look tokens up in `tokens/tokens.md`.
- Each Figma variable's WEB code syntax `var(--name)` is the join key with code. Don't rename on one side only.

## Keeping Figma in sync
- Figma → code: run `scripts/figma/export-tokens.js` via `use_figma`, then
  `node scripts/figma-to-tokens.mjs export.json && npm run tokens`.
- Code → Figma: see `scripts/figma/push-tokens.md`. Component ↔ Figma node mapping: `tokens/figma-components.json`.

## Components
- One folder per component in `src/components/<Name>/`: `Name.tsx`, `Name.css`, `Name.stories.tsx`.
  Export from `src/index.ts`. Stories must pass the a11y addon (`a11y.test: 'error'`).
- Brand: monochrome, hard edges, instant interactions, display type never bold. Deck stays monochrome.
- Never publish photos that show client names or logos.

## Workflow
- Before committing: `npm run tokens:check && npm run typecheck`.
- Log changes in `CHANGELOG.md` and bump `version` in `package.json` (semver rules at the top of the changelog).
- Git runs through the GitKraken tools on Jonas's Mac, not the VM shell (lock files).
- `.github/` can't be written from remote sessions. Put new workflow files in `setup/` for Jonas to copy.
- Fonts are licensed. Keep the repo and Storybook private.
