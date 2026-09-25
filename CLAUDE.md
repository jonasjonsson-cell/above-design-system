# Above design system — rules for Claude

React + TypeScript + Vite + Storybook 10. Published to Chromatic; Figma Test library `G9NJsMEulHxW0FhK4kPG4N`
mirrors the tokens. The repo lives in the `above` GitHub organisation so everyone at Above with access can use it.

## Tokens (W3C DTCG 2025.10)
- `tokens/*.tokens.json` are the only place token values live; `tokens/above.resolver.json` lists the base set and
  the dark/light theme contexts. After editing, run `npm run tokens` (writes `src/styles/tokens.css`,
  `src/styles/text-styles.css`, `tokens/tokens.md`). Never edit those by hand — `npm run tokens:check` fails CI.
- Follow the spec: every token has `$value` and a `$type` (own or inherited from its group); colours are
  `{colorSpace, components, alpha?, hex}`; dimensions are `{value, unit}` with `px` or `rem`; aliases are
  `"{group.token}"`. Above-specific data goes in `$extensions["se.above"]` (`codeOnly`, `cssUnit`, `figma`, `textCase`).
- CSS name = token path minus its first segment, joined with `-` (`component.button.gap` → `--button-gap`).
  It is also the Figma variable's WEB code syntax — the join key. Never rename on one side only.
- Tiers: `primitive` → `semantic` / `dimension` / `typography` / `effect` → `component`.
- Never hardcode a colour, spacing, size or type value in a component. Add or reuse a token.
  Look tokens up in `tokens/tokens.md`.

## Figma
- **Never write to Figma (variables, styles, components, pages) without Jonas's explicit approval.** Reading is fine.
  Show what would change first, then wait.
- Figma → code: run `scripts/figma/export-tokens.js` via `use_figma`, then
  `node scripts/figma-to-tokens.mjs export.json [--dry-run] && npm run tokens`.
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
- Fonts are licensed to Above and live in `public/fonts/`. Fine inside the Above organisation; never share
  them outside it.
