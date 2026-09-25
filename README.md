# Above Design System

Above's component library — React + TypeScript, documented in Storybook,
with a companion Figma library that mirrors the same tokens.

## Getting started

```bash
npm install
npm run storybook   # http://localhost:6006
```

## How it's organised

- `tokens/tokens.json` — **single source of truth** for colour, type, spacing, grids,
  component tokens and effects. `npm run tokens` generates `src/styles/tokens.css`,
  `src/styles/text-styles.css` and `tokens/tokens.md`. Three tiers: primitives
  (`--black`, `--primary-green-01`) → semantic (`--color-*`, `--space-*`) →
  component (`--button-*`, `--slide-*`). Components read semantic or component
  tokens — never hardcode a value.
- `src/foundations/` — Storybook pages documenting the tokens.
- `src/components/<Name>/` — one folder per component: `Name.tsx`, `Name.css`,
  `Name.stories.tsx`.
- `src/index.ts` — public exports.

## Publishing

Every push to `main` builds Storybook and publishes it to Chromatic via
`.github/workflows/chromatic.yml` (needs the `CHROMATIC_PROJECT_TOKEN`
repository secret). Pull requests get a preview build plus visual diffs.

## Keeping Figma in sync

Figma library: **Above Design System Test library** (fileKey `G9NJsMEulHxW0FhK4kPG4N`).

- `tokens/tokens.json` is the single source. `npm run tokens` generates `src/styles/tokens.css` and
  `text-styles.css`; CI (`npm run tokens:check`) fails if they're edited by hand.
- The JSON groups map 1:1 to Figma: `primitive` → Primitives, `color` → Color (Dark/Light),
  `dimension` and `grid` → Spacing (plus grid styles Grid/Slide, Grid/Page), `component` → Component,
  `textStyles` → text styles, `effects` → effect styles. `tokens/tokens.md` is a generated, readable list of every token.
  Each Figma variable's Web code syntax `var(--name)` is the join key — don't rename it on one side only.
- **Figma → code:** run `scripts/figma/export-tokens.js` through `use_figma`, save the JSON, then
  `node scripts/figma-to-tokens.mjs export.json && npm run tokens`. Commit → Chromatic publishes.
- **Code → Figma:** see `scripts/figma/push-tokens.md`.
- `tokens/figma-components.json` maps each React component to its Figma component set (node id, key,
  property ↔ prop mapping). Structural changes are made on both sides.

## Brand

Monochrome, Swiss/International style: black `#000`, white `#fff`, off-white
`#f9f9f9`; Suisse BP Int'l (display) + KH Interference (mono label); hard edges,
the tilted photo card as the only ornament. Values come from the "ABOVE Design
System WiP" export from Claude Design. The brand fonts are licensed — keep this
repo and the published Storybook access-restricted.
