#!/usr/bin/env node
// Builds CSS and docs from the DTCG (Design Tokens Format Module 2025.10) token files in tokens/.
//   tokens/above.resolver.json  → which files make up the base set and the dark/light theme contexts
//   src/styles/tokens.css       → every token as a CSS custom property (+ [data-theme='light'] overrides)
//   src/styles/text-styles.css  → one .text-<name> class per typography token
//   tokens/tokens.md            → readable reference for people and Claude
// Usage: node scripts/build-tokens.mjs          (write)
//        node scripts/build-tokens.mjs --check  (fail if generated files are out of date — used in CI)
//
// Naming rule: CSS name = token path without its first (tier) segment, joined with "-".
//   primitive.black → --black · semantic.color.text-muted → --color-text-muted · component.button.gap → --button-gap
// That CSS name is also each Figma variable's WEB code syntax, i.e. the join key with Figma.
import { readFileSync, writeFileSync } from 'node:fs'
import { loadTokens, cssName } from './tokens-lib.mjs'

const root = new URL('..', import.meta.url)
const { tokens, themes, byPath } = loadTokens(new URL('tokens/', root))
const HEADER = '/* GENERATED from tokens/*.tokens.json by scripts/build-tokens.mjs — do not edit by hand. */\n'

// ---------- value → CSS ----------
const num = (n) => +(+n).toFixed(4)
const GENERIC = new Set(['serif', 'sans-serif', 'monospace', 'ui-monospace', 'cursive', 'fantasy', 'system-ui'])
const isAlias = (v) => typeof v === 'string' && /^\{[^}]+\}$/.test(v)
const aliasPath = (v) => v.slice(1, -1)
const ref = (v) => {
  const target = byPath.get(aliasPath(v))
  if (!target) throw new Error(`Unknown alias ${v}`)
  return `var(--${cssName(target.path)})`
}
const dim = (d, { asRem = false } = {}) => {
  if (isAlias(d)) return ref(d)
  if (d.value === 0) return '0'
  if (asRem && d.unit === 'px') return `${num(d.value / 16)}rem`
  return `${num(d.value)}${d.unit}`
}
const color = (c) => {
  if (isAlias(c)) return ref(c)
  if (c.alpha === undefined || c.alpha === 1) return c.hex
  const [r, g, b] = c.components.map((x) => Math.round(x * 255))
  return `rgba(${r}, ${g}, ${b}, ${num(c.alpha)})`
}
const family = (f) => (isAlias(f) ? ref(f) : f.map((n) => (GENERIC.has(n) || /^[A-Za-z]+$/.test(n) ? n : `'${n}'`)).join(', '))
const resolve = (v) => (isAlias(v) ? resolve(byPath.get(aliasPath(v)).value) : v)

function css(tok) {
  const { type, value: v, ext } = tok
  if (isAlias(v)) return ref(v)
  switch (type) {
    case 'color': return color(v)
    case 'dimension': return dim(v, { asRem: tok.path[1] === 'space' })
    case 'number': return ext.cssUnit ? `${num(v)}${ext.cssUnit}` : `${num(v)}`
    case 'fontFamily': return family(v)
    case 'fontWeight': return `${v}`
    case 'duration': return `${num(v.value)}${v.unit}`
    case 'cubicBezier': return v.join() === '0,0,1,1' ? 'linear' : `cubic-bezier(${v.join(', ')})`
    case 'shadow': return [].concat(v).map((l) => `${dim(l.offsetX)} ${dim(l.offsetY)} ${dim(l.blur)} ${dim(l.spread)} ${color(l.color)}`).join(', ')
    case 'typography': return `${v.fontWeight} ${dim(v.fontSize)}/${v.lineHeight} ${family(v.fontFamily)}`
    default: throw new Error(`Unsupported $type ${type} at ${tok.path.join('.')}`)
  }
}
// Text styles: letterSpacing is px in DTCG; CSS emits it relative to the font size (em), like Figma's percent.
const trackingEm = (v) => {
  const ls = resolve(v.letterSpacing), size = resolve(v.fontSize)
  return ls.value === 0 ? '0' : `${num(ls.value / size.value)}em`
}

// ---------- tokens.css ----------
const SECTIONS = [
  ['primitive', 'Primitives (Figma: Primitives)'],
  ['semantic', 'Semantic colour — dark is the default ground (Figma: Color, Dark mode)'],
  ['dimension', 'Dimensions & layout grids (Figma: Spacing; code-only: type ramp, font-size scale, slide canvas)'],
  ['typography', 'Typography (Figma: text styles; families, weights, tracking are code-only)'],
  ['effect', 'Effects (Figma: effect styles)'],
  ['motion', 'Motion (code-only)'],
  ['component', 'Component tokens (Figma: Component)'],
]
const lines = [HEADER + ':root {']
for (const [tier, title] of SECTIONS) {
  lines.push(`  /* ---------- ${title} ---------- */`)
  for (const tok of tokens.filter((t) => t.path[0] === tier)) {
    lines.push(`  --${cssName(tok.path)}: ${css(tok)};`)
    if (tok.type === 'typography') lines.push(`  --tracking-${cssName(tok.path).replace(/^text-/, '')}: ${trackingEm(tok.value)};`)
  }
  lines.push('')
}
lines[lines.length - 1] = '}'
lines.push('', "/* ---------- Semantic colour — light mode (Figma: Color, Light mode) ---------- */", "[data-theme='light'] {")
for (const tok of themes.light) {
  const dark = themes.dark.find((d) => d.path.join('.') === tok.path.join('.'))
  if (!dark || JSON.stringify(dark.value) !== JSON.stringify(tok.value)) lines.push(`  --${cssName(tok.path)}: ${css(tok)};`)
}
lines.push('}')
const tokensCss = lines.join('\n') + '\n'

// ---------- text-styles.css ----------
const ts = [HEADER + '/* One class per text style. Use these instead of literal sizes. */']
for (const tok of tokens.filter((t) => t.type === 'typography')) {
  const k = cssName(tok.path).replace(/^text-/, '')
  ts.push(`.text-${k} { font: var(--text-${k}); letter-spacing: var(--tracking-${k});${tok.ext.textCase === 'uppercase' ? ' text-transform: uppercase;' : ''} margin: 0; }`)
}
const textCss = ts.join('\n') + '\n'

// ---------- tokens.md ----------
const show = (tok) => {
  const v = tok.value
  if (isAlias(v)) return `→ \`--${cssName(byPath.get(aliasPath(v)).path)}\``
  if (tok.type === 'typography') return `${resolve(v.fontSize).value}px / ${v.lineHeight}, weight ${v.fontWeight}, tracking ${trackingEm(v)}`
  if (tok.type === 'shadow') return `${[].concat(v).length} layer(s)`
  return `\`${css(tok)}\``
}
const md = ['<!-- GENERATED from tokens/*.tokens.json by scripts/build-tokens.mjs — do not edit by hand. -->', '# Above tokens', '',
  'Source: the DTCG 2025.10 files in `tokens/` (entry point `tokens/above.resolver.json`). Use the CSS custom property in code;',
  'never hardcode a colour, size or spacing value. "Code-only" tokens are not mirrored in Figma.', '']
for (const [tier, title] of SECTIONS) {
  const rows = tokens.filter((t) => t.path[0] === tier)
  if (tier === 'semantic') {
    md.push(`## ${title.split(' (')[0]}`, '', '| Token | DTCG path | Dark | Light |', '| --- | --- | --- | --- |')
    for (const t of rows) {
      const l = themes.light.find((x) => x.path.join('.') === t.path.join('.'))
      md.push(`| \`--${cssName(t.path)}\` | \`${t.path.join('.')}\` | ${show(t)} | ${l ? show(l) : show(t)} |`)
    }
    md.push('')
    continue
  }
  md.push(`## ${title.split(' (')[0]}`, '', '| Token | DTCG path | Type | Value | Figma |', '| --- | --- | --- | --- | --- |')
  for (const t of rows) md.push(`| \`--${cssName(t.path)}\` | \`${t.path.join('.')}\` | ${t.type} | ${show(t)} | ${t.ext.codeOnly ? 'code-only' : t.ext.figma || '✓'} |`)
  md.push('')
}
const tokensMd = md.join('\n')

// ---------- write / check ----------
const out = [
  [new URL('src/styles/tokens.css', root), tokensCss],
  [new URL('src/styles/text-styles.css', root), textCss],
  [new URL('tokens/tokens.md', root), tokensMd],
]
if (process.argv.includes('--check')) {
  const read = (f) => { try { return readFileSync(f, 'utf8') } catch { return '' } }
  const stale = out.filter(([f, c]) => read(f) !== c)
  if (stale.length) {
    console.error('Out of date — run `npm run tokens`:', stale.map(([f]) => f.pathname).join(', '))
    process.exit(1)
  }
  console.log('tokens up to date')
} else {
  for (const [f, c] of out) writeFileSync(f, c)
  console.log('wrote tokens.css, text-styles.css, tokens.md')
}
