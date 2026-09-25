# Code → Figma

Push the DTCG token files (`tokens/*.tokens.json`) into the Figma Test library (fileKey `G9NJsMEulHxW0FhK4kPG4N`).

**Never run this without Jonas's explicit go-ahead.** Show the list of changes first, then wait for approval.

Ask Claude: "push tokens to Figma". Claude diffs code against a fresh `export-tokens.js` run, lists what would
change, and after approval runs `use_figma` scripts that upsert, by CSS name (the variable's WEB code syntax):

| DTCG source | Figma |
|---|---|
| `primitive.tokens.json` → `primitive.*` | collection **Primitives** (`base/`, `neutral/`, `primary/`, `secondary/`, `emphasis/`), scopes hidden |
| `semantic.dark.tokens.json` / `semantic.light.tokens.json` → `semantic.color.*` | collection **Color**, modes Dark / Light, aliased to primitives |
| `dimension.tokens.json` → `dimension.*` | collection **Spacing** (`space/`, `layout/`, `radius/`, `border/`, `size/`, `grid/`) + grid styles Grid/Slide and Grid/Page |
| `component.tokens.json` → `component.*` | collection **Component** (`button/`, `slide/`), aliases to Spacing kept as aliases |
| `typography.tokens.json` → `typography.text.*` | text styles (name from `$extensions['se.above'].figma`, description `CSS: .text-<name>`); letterSpacing px → percent of font size |
| `effect.tokens.json` → `effect.shadow.*` | effect styles (description `CSS: var(--shadow-<name>)`) |

Tokens with `$extensions['se.above'].codeOnly: true` are never pushed.

Every variable's WEB code syntax is `var(--<css-name>)`, where the CSS name is the DTCG path minus its first segment
joined with `-` (`dimension.space.2` → `--space-2`). That string is the join key between Figma and code, so never
rename it in Figma without renaming the token in code.
