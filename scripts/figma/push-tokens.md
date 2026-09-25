# Code → Figma

Push `tokens/tokens.json` into the Figma Test library (fileKey `G9NJsMEulHxW0FhK4kPG4N`).
Ask Claude: "push tokens to Figma". It runs `use_figma` scripts that upsert, by name:

- `primitive` → collection **Primitives** (`base/`, `neutral/`, `primary/`, `secondary/`, `emphasis/`), scopes hidden
- `color` → collection **Color**, modes Dark / Light, aliased to primitives
- `dimension` → collection **Spacing** (`space/`, `radius/`, `border/`, `size/`, `layout/`)
- `grid` → collection **Spacing** (`grid/…`, counts unscoped) + grid styles **Grid/Slide** (12 col × 8 rows) and **Grid/Page** (24 col), bound to those variables
- `component` → collection **Component** (`button/…`, `slide/…`); `"{name}"` values become aliases; raw CSS strings (e.g. `6deg`) stay code-only
- `textStyles` → text styles (name from `figma`, description `CSS: .text-<key>`)
- `effects` → effect styles (description `CSS: var(--<key>)`)

Every variable's WEB code syntax is `var(--<css-name>)` — that string is the join key between Figma and code,
so never rename it in Figma without renaming the token in code.
