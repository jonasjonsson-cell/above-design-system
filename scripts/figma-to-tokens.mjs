#!/usr/bin/env node
// Figma → code, step 2. Merge a Figma export (from scripts/figma/export-tokens.js) into the DTCG files
// in tokens/ and print every change:  + added   ~ changed   ! in code but not in Figma (kept)
// Usage: node scripts/figma-to-tokens.mjs figma-export.json [--dry-run]
import { readFileSync, writeFileSync } from 'node:fs'
import { loadTokens, cssName, readJson } from './tokens-lib.mjs'

const [, , file, flag] = process.argv
if (!file) { console.error('usage: node scripts/figma-to-tokens.mjs <figma-export.json> [--dry-run]'); process.exit(1) }
const dir = new URL('../tokens/', import.meta.url)
const fig = readJson(new URL(file, `file://${process.cwd()}/`))
if (fig.format !== 'above-figma-export/2') { console.error('Export is from an older export-tokens.js — re-run the current script in Figma.'); process.exit(1) }

const { base, themes } = loadTokens(dir)
const docs = {}
const doc = (f) => (docs[f] ??= readJson(new URL(f, dir)))
const all = [...base, ...Object.values(themes).flat()]
const byCss = (tokens) => new Map(tokens.map((t) => [cssName(t.path), t]))
const baseByCss = byCss([...base, ...themes.dark])
const changes = []
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

const nodeAt = (f, path, create) => {
  let n = doc(f)
  for (const p of path) { if (!n[p]) { if (!create) return null; n[p] = {} } n = n[p] }
  return n
}
function put(f, path, value, type, extra = {}) {
  const key = path.join('.')
  const existing = nodeAt(f, path, false)
  if (existing && '$value' in existing) {
    if (!same(existing.$value, value)) { changes.push(`~ ${key}: ${JSON.stringify(existing.$value)} → ${JSON.stringify(value)}`); existing.$value = value }
    return
  }
  const n = nodeAt(f, path, true)
  Object.assign(n, { $value: value, ...(type ? { $type: type } : {}), ...extra })
  changes.push(`+ ${key} (${f})`)
}
const aliasTo = (cssRef) => { const t = baseByCss.get(cssRef); if (!t) throw new Error(`Figma alias to unknown token --${cssRef}`); return `{${t.path.join('.')}}` }
const hex2 = (n) => Math.round(n * 255).toString(16).padStart(2, '0')
const color = (c) => { const v = { colorSpace: 'srgb', components: [c.r, c.g, c.b].map((x) => +(+x).toFixed(4)), hex: `#${hex2(c.r)}${hex2(c.g)}${hex2(c.b)}` }; if (c.a !== undefined && +c.a.toFixed(3) !== 1) v.alpha = +c.a.toFixed(3); return v }
const px = (n) => ({ value: +(+n).toFixed(4), unit: 'px' })
// Colour values are compared by hex + alpha, so float noise in components never shows up as a change.
const colorEq = (a, b) => a && b && a.hex === b.hex && (a.alpha ?? 1) === (b.alpha ?? 1)

const TIERS = { Primitives: ['primitive.tokens.json', 'primitive'], Spacing: ['dimension.tokens.json', 'dimension'], Component: ['component.tokens.json', 'component'] }
const seen = new Set()
for (const v of fig.variables) {
  seen.add(v.css)
  if (v.collection === 'Color') {
    for (const [mode, raw] of Object.entries(v.values)) {
      const f = `semantic.${mode}.tokens.json`
      const cur = byCss(themes[mode] || []).get(v.css)
      const path = cur ? cur.path : ['semantic', 'color', v.css.replace(/^color-/, '')]
      const value = raw.alias ? aliasTo(raw.alias) : color(raw)
      if (cur && !raw.alias && colorEq(cur.value, value)) continue
      put(f, path, value, 'color')
    }
    continue
  }
  const tier = TIERS[v.collection]
  if (!tier) { changes.push(`? skipped variable ${v.name} in unknown collection ${v.collection}`); continue }
  const raw = Object.values(v.values)[0]
  const cur = baseByCss.get(v.css)
  const path = cur ? cur.path : [tier[1], ...v.name.split('/')]
  if (!cur && cssName(path) !== v.css) { changes.push(`? ${v.name}: Figma name gives --${cssName(path)} but code syntax is --${v.css}; add it by hand`); continue }
  let value, type
  if (raw.alias) value = aliasTo(raw.alias)
  else if (v.type === 'COLOR') { value = color(raw); type = 'color'; if (cur && colorEq(cur.value, value)) continue }
  else if (cur?.type === 'number' || (!cur && /-(columns|rows)$/.test(v.css))) { value = raw; type = 'number' }
  else { value = px(raw); type = 'dimension' }
  put(cur ? cur.file : tier[0], path, value, cur ? undefined : type)
}

const FAMILY = { 'KH Interference': '{typography.font.label}' }
const WEIGHT = { Thin: 100, Ultralight: 200, Light: 300, Regular: 400, Medium: 500, Bold: 700, Black: 900 }
for (const s of fig.textStyles) {
  seen.add(`text-${s.css}`)
  const cur = baseByCss.get(`text-${s.css}`)
  const path = cur ? cur.path : ['typography', 'text', s.css]
  const resolveDim = (d) => (typeof d === 'string' ? resolveDim(baseByCss.get(cssName(d.slice(1, -1).split('.'))).value) : d)
  const fontSize = cur && typeof cur.value.fontSize === 'string' && resolveDim(cur.value.fontSize).value === s.size ? cur.value.fontSize : px(s.size)
  const value = {
    fontFamily: FAMILY[s.family] ?? '{typography.font.display}',
    fontSize, fontWeight: WEIGHT[s.style] ?? 400,
    lineHeight: s.lineHeight ?? 1,
    letterSpacing: px(s.size * s.tracking),
  }
  put('typography.tokens.json', path, value, cur ? undefined : 'typography')
  const node = nodeAt('typography.tokens.json', path, false)
  const ext = (node.$extensions ??= {})['se.above'] ??= {}
  if (ext.figma !== s.name) { changes.push(`~ ${path.join('.')} Figma name: ${ext.figma} → ${s.name}`); ext.figma = s.name }
  const upper = s.textCase === 'UPPER'
  if (upper !== (ext.textCase === 'uppercase')) { changes.push(`~ ${path.join('.')} textCase → ${upper ? 'uppercase' : 'none'}`); if (upper) ext.textCase = 'uppercase'; else delete ext.textCase }
}
for (const e of fig.effects) {
  seen.add(e.css)
  const cur = baseByCss.get(e.css)
  const path = cur ? cur.path : ['effect', 'shadow', e.css.replace(/^shadow-/, '')]
  const value = e.layers.map((l) => ({ color: color(l.color), offsetX: px(l.x), offsetY: px(l.y), blur: px(l.blur), spread: px(l.spread) }))
  const eq = cur && cur.value.length === value.length && cur.value.every((l, i) => colorEq(l.color, value[i].color) && ['offsetX', 'offsetY', 'blur', 'spread'].every((k) => same(l[k], value[i][k])))
  if (!eq) put('effect.tokens.json', path, value, cur ? undefined : 'shadow')
}
for (const t of all) {
  const n = cssName(t.path)
  if (!t.ext.codeOnly && !seen.has(n)) changes.push(`! --${n} (${t.path.join('.')}) is in code but not in Figma (kept)`)
}
if (flag !== '--dry-run') for (const [f, d] of Object.entries(docs)) writeFileSync(new URL(f, dir), JSON.stringify(d, null, 2) + '\n')
console.log([...new Set(changes)].join('\n') || 'no changes')
