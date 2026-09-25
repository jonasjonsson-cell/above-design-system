<!-- GENERATED from tokens/*.tokens.json by scripts/build-tokens.mjs — do not edit by hand. -->
# Above tokens

Source: the DTCG 2025.10 files in `tokens/` (entry point `tokens/above.resolver.json`). Use the CSS custom property in code;
never hardcode a colour, size or spacing value. "Code-only" tokens are not mirrored in Figma.

## Primitives

| Token | DTCG path | Type | Value | Figma |
| --- | --- | --- | --- | --- |
| `--black` | `primitive.black` | color | `#000000` | ✓ |
| `--white` | `primitive.white` | color | `#ffffff` | ✓ |
| `--offwhite` | `primitive.offwhite` | color | `#f9f9f9` | ✓ |
| `--neutral-grey-01` | `primitive.neutral-grey-01` | color | `#d9d9d9` | ✓ |
| `--neutral-grey-02` | `primitive.neutral-grey-02` | color | `#939393` | ✓ |
| `--neutral-grey-03` | `primitive.neutral-grey-03` | color | `#5a5a5a` | ✓ |
| `--neutral-grey-04` | `primitive.neutral-grey-04` | color | `#181818` | ✓ |
| `--primary-green-01` | `primitive.primary-green-01` | color | `#9fe59a` | ✓ |
| `--primary-green-02` | `primitive.primary-green-02` | color | `#325c48` | ✓ |
| `--primary-green-03` | `primitive.primary-green-03` | color | `#223322` | ✓ |
| `--secondary-blue-electric` | `primitive.secondary-blue-electric` | color | `#3b4ff0` | ✓ |
| `--secondary-violet` | `primitive.secondary-violet` | color | `#7b52e0` | ✓ |
| `--secondary-blue-sky` | `primitive.secondary-blue-sky` | color | `#8ab4f9` | ✓ |
| `--secondary-coral` | `primitive.secondary-coral` | color | `#ff6b6b` | ✓ |
| `--fg1` | `primitive.fg1` | color | `#ffffff` | ✓ |
| `--fg2` | `primitive.fg2` | color | `rgba(255, 255, 255, 0.5)` | ✓ |
| `--fg3` | `primitive.fg3` | color | `rgba(255, 255, 255, 0.3)` | ✓ |
| `--ink1` | `primitive.ink1` | color | `#000000` | ✓ |
| `--ink2` | `primitive.ink2` | color | `rgba(0, 0, 0, 0.5)` | ✓ |
| `--ink3` | `primitive.ink3` | color | `rgba(0, 0, 0, 0.3)` | ✓ |

## Semantic colour — dark is the default ground

| Token | DTCG path | Dark | Light |
| --- | --- | --- | --- |
| `--bg-dark` | `semantic.bg-dark` | → `--black` | → `--black` |
| `--bg-light` | `semantic.bg-light` | → `--offwhite` | → `--offwhite` |
| `--fg-on-dark` | `semantic.fg-on-dark` | → `--white` | → `--white` |
| `--fg-on-light` | `semantic.fg-on-light` | → `--black` | → `--black` |
| `--color-bg` | `semantic.color.bg` | → `--black` | → `--offwhite` |
| `--color-surface` | `semantic.color.surface` | → `--black` | → `--offwhite` |
| `--color-surface-raised` | `semantic.color.surface-raised` | → `--neutral-grey-04` | → `--white` |
| `--color-text` | `semantic.color.text` | → `--fg1` | → `--ink1` |
| `--color-text-muted` | `semantic.color.text-muted` | → `--fg2` | → `--ink2` |
| `--color-text-subtle` | `semantic.color.text-subtle` | → `--fg3` | → `--ink3` |
| `--color-border` | `semantic.color.border` | → `--fg3` | → `--ink3` |
| `--color-border-strong` | `semantic.color.border-strong` | → `--white` | → `--black` |
| `--color-accent` | `semantic.color.accent` | → `--white` | → `--black` |
| `--color-on-accent` | `semantic.color.on-accent` | → `--black` | → `--white` |
| `--color-focus-ring` | `semantic.color.focus-ring` | → `--white` | → `--black` |
| `--color-photo-border` | `semantic.color.photo-border` | → `--white` | → `--white` |
| `--color-highlight` | `semantic.color.highlight` | → `--primary-green-01` | → `--primary-green-01` |
| `--color-on-highlight` | `semantic.color.on-highlight` | → `--primary-green-03` | → `--primary-green-03` |

## Dimensions & layout grids

| Token | DTCG path | Type | Value | Figma |
| --- | --- | --- | --- | --- |
| `--space-1` | `dimension.space.1` | dimension | `0.25rem` | ✓ |
| `--space-2` | `dimension.space.2` | dimension | `0.5rem` | ✓ |
| `--space-3` | `dimension.space.3` | dimension | `0.75rem` | ✓ |
| `--space-4` | `dimension.space.4` | dimension | `1rem` | ✓ |
| `--space-6` | `dimension.space.6` | dimension | `1.5rem` | ✓ |
| `--space-8` | `dimension.space.8` | dimension | `2rem` | ✓ |
| `--space-12` | `dimension.space.12` | dimension | `3rem` | ✓ |
| `--space-margin-x` | `dimension.space.margin-x` | dimension | → `--margin-x` | code-only |
| `--space-margin-header` | `dimension.space.margin-header` | dimension | → `--margin-header` | code-only |
| `--margin-x` | `dimension.margin.x` | dimension | `18px` | ✓ |
| `--margin-header` | `dimension.margin.header` | dimension | `20px` | ✓ |
| `--header-top` | `dimension.header.top` | dimension | `9px` | ✓ |
| `--radius-none` | `dimension.radius.none` | dimension | `0` | ✓ |
| `--radius-card` | `dimension.radius.card` | dimension | `4px` | ✓ |
| `--border-width` | `dimension.border.width` | dimension | `1px` | ✓ |
| `--border-width-photo` | `dimension.border.width-photo` | dimension | `8px` | ✓ |
| `--size-tab-w` | `dimension.size.tab-w` | dimension | `42px` | ✓ |
| `--size-tab-h` | `dimension.size.tab-h` | dimension | `9px` | ✓ |
| `--grid-slide-columns` | `dimension.grid.slide.columns` | number | `12` | ✓ |
| `--grid-slide-rows` | `dimension.grid.slide.rows` | number | `8` | ✓ |
| `--grid-slide-gutter` | `dimension.grid.slide.gutter` | dimension | `20px` | ✓ |
| `--grid-slide-margin` | `dimension.grid.slide.margin` | dimension | `20px` | ✓ |
| `--grid-page-columns` | `dimension.grid.page.columns` | number | `24` | ✓ |
| `--grid-page-gutter` | `dimension.grid.page.gutter` | dimension | `32px` | ✓ |
| `--grid-page-margin` | `dimension.grid.page.margin` | dimension | `64px` | ✓ |
| `--type-mega` | `dimension.type.mega` | dimension | `515px` | code-only |
| `--type-giant` | `dimension.type.giant` | dimension | `240px` | code-only |
| `--type-hero` | `dimension.type.hero` | dimension | `160px` | code-only |
| `--type-statement` | `dimension.type.statement` | dimension | `96px` | code-only |
| `--type-label` | `dimension.type.label` | dimension | `12px` | code-only |
| `--font-size-mega` | `dimension.font-size.mega` | dimension | → `--type-mega` | code-only |
| `--font-size-giant` | `dimension.font-size.giant` | dimension | → `--type-giant` | code-only |
| `--font-size-hero` | `dimension.font-size.hero` | dimension | → `--type-hero` | code-only |
| `--font-size-display` | `dimension.font-size.display` | dimension | → `--type-statement` | code-only |
| `--font-size-label` | `dimension.font-size.label` | dimension | → `--type-label` | code-only |
| `--font-size-xs` | `dimension.font-size.xs` | dimension | `0.75rem` | code-only |
| `--font-size-sm` | `dimension.font-size.sm` | dimension | `0.875rem` | code-only |
| `--font-size-md` | `dimension.font-size.md` | dimension | `1rem` | code-only |
| `--font-size-lg` | `dimension.font-size.lg` | dimension | `1.25rem` | code-only |
| `--font-size-xl` | `dimension.font-size.xl` | dimension | `1.5rem` | code-only |
| `--font-size-2xl` | `dimension.font-size.2xl` | dimension | `2rem` | code-only |
| `--slide-w` | `dimension.slide.w` | dimension | `1920px` | code-only |
| `--slide-h` | `dimension.slide.h` | dimension | `1080px` | code-only |

## Typography

| Token | DTCG path | Type | Value | Figma |
| --- | --- | --- | --- | --- |
| `--font-display` | `typography.font.display` | fontFamily | `'Suisse BP Intl', 'Helvetica Neue', Arial, sans-serif` | code-only |
| `--font-label` | `typography.font.label` | fontFamily | `'KH Interference', ui-monospace, 'SFMono-Regular', monospace` | code-only |
| `--font-serif` | `typography.font.serif` | fontFamily | `'Suisse BP Serif', Georgia, 'Times New Roman', serif` | code-only |
| `--font-neue` | `typography.font.neue` | fontFamily | `'Suisse BP Neue', 'Suisse BP Serif', Georgia, serif` | code-only |
| `--font-antique` | `typography.font.antique` | fontFamily | `'Suisse BP Intl Antique', 'Suisse BP Intl', sans-serif` | code-only |
| `--font-family-display` | `typography.font-family.display` | fontFamily | → `--font-display` | code-only |
| `--font-family-label` | `typography.font-family.label` | fontFamily | → `--font-label` | code-only |
| `--font-family-serif` | `typography.font-family.serif` | fontFamily | → `--font-serif` | code-only |
| `--font-family-neue` | `typography.font-family.neue` | fontFamily | → `--font-neue` | code-only |
| `--font-family-base` | `typography.font-family.base` | fontFamily | → `--font-display` | code-only |
| `--font-weight-thin` | `typography.font-weight.thin` | fontWeight | `100` | code-only |
| `--font-weight-ultralight` | `typography.font-weight.ultralight` | fontWeight | `200` | code-only |
| `--font-weight-light` | `typography.font-weight.light` | fontWeight | `300` | code-only |
| `--font-weight-regular` | `typography.font-weight.regular` | fontWeight | `400` | code-only |
| `--font-weight-medium` | `typography.font-weight.medium` | fontWeight | `500` | code-only |
| `--font-weight-bold` | `typography.font-weight.bold` | fontWeight | `700` | code-only |
| `--font-weight-black` | `typography.font-weight.black` | fontWeight | `900` | code-only |
| `--line-display` | `typography.line.display` | number | `0.8` | code-only |
| `--line-height-display` | `typography.line-height.display` | number | → `--line-display` | code-only |
| `--line-height-tight` | `typography.line-height.tight` | number | `1.1` | code-only |
| `--line-height-base` | `typography.line-height.base` | number | `1.4` | code-only |
| `--tracking-cover` | `typography.tracking.cover` | number | `-0.04em` | code-only |
| `--tracking-tight` | `typography.tracking.tight` | number | `-0.05em` | code-only |
| `--tracking-tighter` | `typography.tracking.tighter` | number | `-0.08em` | code-only |
| `--tracking-label` | `typography.tracking.label` | number | `0.06em` | code-only |
| `--tracking-label-text` | `typography.tracking.label-text` | number | `0.06em` | code-only |
| `--tracking-display` | `typography.tracking.display` | number | → `--tracking-tight` | code-only |
| `--tracking-mega` | `typography.tracking.mega` | number | → `--tracking-tighter` | code-only |
| `--text-display-l` | `typography.text.display-l` | typography | 220px / 0.75, weight 400, tracking -0.06em | Display/Display L |
| `--text-display-s` | `typography.text.display-s` | typography | 180px / 0.8, weight 400, tracking -0.04em | Display/Display S |
| `--text-heading-xl` | `typography.text.heading-xl` | typography | 120px / 0.85, weight 400, tracking -0.04em | Heading/Heading XL |
| `--text-heading-l` | `typography.text.heading-l` | typography | 100px / 0.85, weight 400, tracking -0.04em | Heading/Heading L |
| `--text-heading-m` | `typography.text.heading-m` | typography | 80px / 0.85, weight 400, tracking -0.02em | Heading/Heading M |
| `--text-heading-s` | `typography.text.heading-s` | typography | 60px / 0.9, weight 400, tracking -0.02em | Heading/Heading S |
| `--text-heading-xs` | `typography.text.heading-xs` | typography | 48px / 0.9, weight 400, tracking -0.01em | Heading/Heading XS |
| `--text-body-xl` | `typography.text.body-xl` | typography | 32px / 1, weight 400, tracking 0 | Body/Body XL |
| `--text-body-l` | `typography.text.body-l` | typography | 24px / 1, weight 400, tracking 0 | Body/Body L |
| `--text-body-m` | `typography.text.body-m` | typography | 20px / 1, weight 400, tracking 0 | Body/Body M |
| `--text-body-s` | `typography.text.body-s` | typography | 16px / 1, weight 400, tracking 0 | Body/Body S |
| `--text-list-l` | `typography.text.list-l` | typography | 20px / 1.3, weight 300, tracking 0 | List/List L |
| `--text-list-s` | `typography.text.list-s` | typography | 16px / 1.3, weight 300, tracking 0 | List/List S |
| `--text-label-l` | `typography.text.label-l` | typography | 16px / 1.2, weight 400, tracking 0.06em | Label/Label L |
| `--text-label-s` | `typography.text.label-s` | typography | 12px / 1.2, weight 400, tracking 0.06em | Label/Label S |
| `--text-deck-mega` | `typography.text.deck-mega` | typography | 515px / 0.8, weight 400, tracking -0.08em | Deck/Mega |
| `--text-deck-giant` | `typography.text.deck-giant` | typography | 240px / 0.8, weight 400, tracking -0.04em | Deck/Giant |
| `--text-deck-hero` | `typography.text.deck-hero` | typography | 160px / 0.8, weight 400, tracking -0.05em | Deck/Hero |
| `--text-deck-statement` | `typography.text.deck-statement` | typography | 96px / 0.84, weight 400, tracking -0.05em | Deck/Statement |

## Effects

| Token | DTCG path | Type | Value | Figma |
| --- | --- | --- | --- | --- |
| `--shadow-card` | `effect.shadow.card` | shadow | 3 layer(s) | Shadow/Card |
| `--rotate-card` | `effect.rotate.card` | number | `-9deg` | code-only |

## Motion

| Token | DTCG path | Type | Value | Figma |
| --- | --- | --- | --- | --- |
| `--duration-instant` | `motion.duration.instant` | duration | `0ms` | code-only |
| `--easing-none` | `motion.easing.none` | cubicBezier | `linear` | code-only |

## Component tokens

| Token | DTCG path | Type | Value | Figma |
| --- | --- | --- | --- | --- |
| `--button-gap` | `component.button.gap` | dimension | → `--space-2` | ✓ |
| `--button-padding-y-sm` | `component.button.padding-y-sm` | dimension | → `--space-1` | ✓ |
| `--button-padding-x-sm` | `component.button.padding-x-sm` | dimension | → `--space-3` | ✓ |
| `--button-padding-y-md` | `component.button.padding-y-md` | dimension | → `--space-2` | ✓ |
| `--button-padding-x-md` | `component.button.padding-x-md` | dimension | → `--space-4` | ✓ |
| `--button-padding-y-lg` | `component.button.padding-y-lg` | dimension | → `--space-3` | ✓ |
| `--button-padding-x-lg` | `component.button.padding-x-lg` | dimension | → `--space-6` | ✓ |
| `--slide-header-height` | `component.slide.header-height` | dimension | `48px` | ✓ |
| `--slide-header-top` | `component.slide.header-top` | dimension | `16px` | ✓ |
| `--slide-header-font-size` | `component.slide.header-font-size` | dimension | `13px` | ✓ |
| `--slide-content-top` | `component.slide.content-top` | dimension | `150px` | ✓ |
| `--slide-content-top-kicker` | `component.slide.content-top-kicker` | dimension | `360px` | ✓ |
| `--slide-statement-width` | `component.slide.statement-width` | dimension | `1820px` | ✓ |
| `--slide-statement-line-height` | `component.slide.statement-line-height` | number | `0.84` | code-only |
| `--slide-summary-gap` | `component.slide.summary-gap` | dimension | → `--space-6` | ✓ |
| `--slide-mega-left` | `component.slide.mega-left` | dimension | `6px` | ✓ |
| `--slide-mega-top` | `component.slide.mega-top` | dimension | `640px` | ✓ |
| `--slide-mega-size` | `component.slide.mega-size` | dimension | `516px` | ✓ |
| `--slide-cover-word-left` | `component.slide.cover-word-left` | dimension | `111px` | ✓ |
| `--slide-cover-word-top` | `component.slide.cover-word-top` | dimension | `100px` | ✓ |
| `--slide-cover-sub-left` | `component.slide.cover-sub-left` | dimension | `115px` | ✓ |
| `--slide-cover-sub-top` | `component.slide.cover-sub-top` | dimension | `360px` | ✓ |
| `--slide-cover-sub-size` | `component.slide.cover-sub-size` | dimension | `16px` | ✓ |
| `--slide-cover-logo-inset` | `component.slide.cover-logo-inset` | dimension | `112px` | ✓ |
| `--slide-photo-right` | `component.slide.photo-right` | dimension | `150px` | ✓ |
| `--slide-photo-top` | `component.slide.photo-top` | dimension | `470px` | ✓ |
| `--slide-photo-height` | `component.slide.photo-height` | dimension | `446px` | ✓ |
| `--slide-glyph-right` | `component.slide.glyph-right` | dimension | `90px` | ✓ |
| `--slide-glyph-top` | `component.slide.glyph-top` | dimension | `300px` | ✓ |
| `--slide-glyph-size` | `component.slide.glyph-size` | dimension | `560px` | ✓ |
| `--slide-glyph-rotate` | `component.slide.glyph-rotate` | number | `6deg` | code-only |
