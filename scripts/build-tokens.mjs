#!/usr/bin/env node
// Generates src/styles/tokens.css and src/styles/text-styles.css from tokens/tokens.json.
// Usage: node scripts/build-tokens.mjs          (write)
//        node scripts/build-tokens.mjs --check  (fail if the CSS is out of date — used in CI)
import { readFileSync, writeFileSync } from 'node:fs'

const root = new URL('..', import.meta.url)
const t = JSON.parse(readFileSync(new URL('tokens/tokens.json', root), 'utf8'))
const HEADER = '/* GENERATED from tokens/tokens.json by scripts/build-tokens.mjs — do not edit by hand. */\n'
const rem = (px) => (px === 0 ? '0' : `${+(px / 16).toFixed(4)}rem`)
const px = (n) => (n === 0 ? '0' : `${n}px`)
const em = (n) => (n === 0 ? '0' : `${n}em`)
const family = { display: 'var(--font-display)', label: 'var(--font-label)' }

const lines = []
const L = (s = '') => lines.push(s)
L(HEADER + ':root {')
L('  /* ---------- Primitives (Figma: Primitives) ---------- */')
for (const [k, v] of Object.entries(t.primitive)) L(`  --${k}: ${v};`)
L('')
for (const [k, v] of Object.entries(t.alias)) L(`  --${k}: var(--${v});`)
L(`
  /* ---------- Type families & deck ramp (code-only) ---------- */
  --font-display: 'Suisse BP Intl', 'Helvetica Neue', Arial, sans-serif;
  --font-label: 'KH Interference', ui-monospace, 'SFMono-Regular', monospace;
  --font-serif: 'Suisse BP Serif', Georgia, 'Times New Roman', serif;
  --font-neue: 'Suisse BP Neue', 'Suisse BP Serif', Georgia, serif; /* a serif, despite the deck README */
  --font-antique: 'Suisse BP Intl Antique', 'Suisse BP Intl', sans-serif;
  --type-mega: ${t.textStyles['deck-mega'].size}px;
  --type-giant: ${t.textStyles['deck-giant'].size}px;
  --type-hero: ${t.textStyles['deck-hero'].size}px;
  --type-statement: ${t.textStyles['deck-statement'].size}px;
  --type-label: ${t.textStyles['label-s'].size}px;
  --line-display: 0.8;
  --tracking-cover: -0.04em;
  --tracking-tight: -0.05em;
  --tracking-tighter: -0.08em;
  --tracking-label: 0.06em;
  --slide-w: 1920px;
  --slide-h: 1080px;`)
L('')
L('  /* ---------- Text styles (Figma: text styles) ---------- */')
for (const [k, s] of Object.entries(t.textStyles)) {
  L(`  --text-${k}: ${s.weight} ${s.size}px/${s.lineHeight} ${family[s.family]};`)
  L(`  --tracking-${k}: ${em(s.tracking)};`)
}
L('  --tracking-label-text: 0.06em;')
L('')
L('  /* ---------- Dimensions (Figma: Spacing) ---------- */')
for (const [k, v] of Object.entries(t.dimension)) L(`  --${k}: ${k.startsWith('space-') ? rem(v) : px(v)};`)
L('  --space-margin-x: var(--margin-x);')
L('  --space-margin-header: var(--margin-header);')
L('')
L('  /* ---------- Effects (Figma: effect styles) ---------- */')
for (const [k, e] of Object.entries(t.effects)) L(`  --${k}: ${e.layers.map((l) => `${px(l.x)} ${px(l.y)} ${px(l.blur)} ${px(l.spread)} ${l.color}`).join(', ')};`)
L('  --rotate-card: -9deg;')
L('')
L('  /* ---------- Semantic colour (Figma: Color — Dark mode) ---------- */')
for (const [k, m] of Object.entries(t.color)) L(`  --${k}: var(--${m.dark});`)
L(`
  /* ---------- Semantic type & UI scale (code-only) ---------- */
  --font-family-display: var(--font-display);
  --font-family-label: var(--font-label);
  --font-family-serif: var(--font-serif);
  --font-family-neue: var(--font-neue);
  --font-family-base: var(--font-display);
  --font-weight-thin: 100;
  --font-weight-ultralight: 200;
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  --font-weight-black: 900;
  --font-size-mega: var(--type-mega);
  --font-size-giant: var(--type-giant);
  --font-size-hero: var(--type-hero);
  --font-size-display: var(--type-statement);
  --font-size-label: var(--type-label);
  --line-height-display: var(--line-display);
  --tracking-display: var(--tracking-tight);
  --tracking-mega: var(--tracking-tighter);
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 2rem;
  --line-height-tight: 1.1;
  --line-height-base: 1.4;
  --duration-instant: 0ms;
  --easing-none: linear;
}
`)
L("/* ---------- Semantic colour (Figma: Color — Light mode) ---------- */")
L("[data-theme='light'] {")
for (const [k, m] of Object.entries(t.color)) if (m.light !== m.dark) L(`  --${k}: var(--${m.light});`)
L('}')
const tokensCss = lines.join('\n') + '\n'

const ts = [HEADER + '/* One class per text style. Use these instead of literal sizes. */']
for (const [k, s] of Object.entries(t.textStyles)) {
  ts.push(`.text-${k} { font: var(--text-${k}); letter-spacing: var(--tracking-${k});${s.uppercase ? ' text-transform: uppercase;' : ''} margin: 0; }`)
}
const textCss = ts.join('\n') + '\n'

const out = [
  [new URL('src/styles/tokens.css', root), tokensCss],
  [new URL('src/styles/text-styles.css', root), textCss],
]
if (process.argv.includes('--check')) {
  const stale = out.filter(([f, c]) => readFileSync(f, 'utf8') !== c)
  if (stale.length) {
    console.error('Out of date — run `npm run tokens`:', stale.map(([f]) => f.pathname).join(', '))
    process.exit(1)
  }
  console.log('tokens up to date')
} else {
  for (const [f, c] of out) writeFileSync(f, c)
  console.log('wrote tokens.css + text-styles.css')
}
