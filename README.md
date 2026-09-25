# Above Design System

Above's component library — React + TypeScript, documented in Storybook,
with a companion Figma library that mirrors the same tokens.

## Getting started

```bash
npm install
npm run storybook   # http://localhost:6006
```

## How it's organised

- `tokens/` — **single source of truth**, in the W3C Design Tokens (DTCG 2025.10) format.
  `above.resolver.json` is the entry point: a base set (`primitive`, `semantic`, `dimension`, `typography`,
  `effect`, `component` `.tokens.json`) plus a theme modifier (`semantic.dark` / `semantic.light`).
  `npm run tokens` generates `src/styles/tokens.css`, `src/styles/text-styles.css` and `tokens/tokens.md`.
  Three tiers: primitives (`--black`) → semantic (`--color-*`, `--space-*`) → component (`--button-*`, `--slide-*`).
  Components read semantic or component tokens — never hardcode a value.
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

- `tokens/*.tokens.json` (DTCG) is the single source. `npm run tokens` generates the CSS and `tokens/tokens.md`;
  CI (`npm run tokens:check`) fails if they're edited by hand.
- CSS name = DTCG path minus its first segment, joined with `-` (`semantic.color.text` → `--color-text`). The same
  string is each Figma variable's Web code syntax — the join key. Don't rename it on one side only.
  Mapping: `primitive` → Primitives, `semantic.color` → Color (Dark/Light), `dimension` → Spacing (+ grid styles),
  `component` → Component, `typography.text` → text styles, `effect.shadow` → effect styles.
  Tokens marked `$extensions['se.above'].codeOnly` stay in code.
- **Figma → code:** run `scripts/figma/export-tokens.js` through `use_figma`, save the JSON, then
  `node scripts/figma-to-tokens.mjs export.json && npm run tokens` (add `--dry-run` to preview). Commit → Chromatic publishes.
- **Code → Figma:** see `scripts/figma/push-tokens.md`. Only after Jonas approves the listed changes.
- `tokens/figma-components.json` maps each React component to its Figma component set (node id, key,
  property ↔ prop mapping). Structural changes are made on both sides.

## Brand

Monochrome, Swiss/International style: black `#000`, white `#fff`, off-white
`#f9f9f9`; Suisse BP Int'l (display) + KH Interference (mono label); hard edges,
the tilted photo card as the only ornament. Values come from the "ABOVE Design
System WiP" export from Claude Design. The brand fonts are licensed to Above and
may be used by everyone at Above; don't share the font files outside the company.
