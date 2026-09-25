// Shared loader for the DTCG 2025.10 token files. Used by build-tokens.mjs and figma-to-tokens.mjs.
import { readFileSync } from 'node:fs'

export const cssName = (path) => path.slice(1).join('-')
export const readJson = (url) => JSON.parse(readFileSync(url, 'utf8'))

// Flatten a DTCG document into tokens: { path, type, value, description, ext, file }.
// $type is inherited from the nearest ancestor group; $extensions['se.above'] is exposed as `ext`.
export function flatten(doc, file, out = [], path = [], inheritedType) {
  for (const [k, node] of Object.entries(doc)) {
    if (k.startsWith('$') || typeof node !== 'object' || node === null) continue
    const p = [...path, k]
    const type = node.$type ?? inheritedType
    if ('$value' in node) {
      if (!type) throw new Error(`${file}: ${p.join('.')} has no $type`)
      out.push({ path: p, type, value: node.$value, description: node.$description, ext: node.$extensions?.['se.above'] ?? {}, file })
    } else flatten(node, file, out, p, type)
  }
  return out
}

// Load everything the resolver references. `tokens` = base set + the default theme context.
export function loadTokens(dir) {
  const resolver = readJson(new URL('above.resolver.json', dir))
  if (resolver.version !== '2025.10') throw new Error('above.resolver.json: version must be 2025.10')
  const load = (refs) => refs.flatMap(({ $ref }) => flatten(readJson(new URL($ref, dir)), $ref))
  const base = load(resolver.sets.base.sources)
  const theme = resolver.modifiers.theme
  const themes = Object.fromEntries(Object.entries(theme.contexts).map(([name, refs]) => [name, load(refs)]))
  const tokens = [...base, ...themes[theme.default]]
  const byPath = new Map()
  const seen = new Map()
  for (const t of tokens) {
    const key = t.path.join('.'), name = cssName(t.path)
    if (byPath.has(key)) throw new Error(`Duplicate token ${key}`)
    if (seen.has(name)) throw new Error(`CSS name --${name} used by both ${seen.get(name)} and ${key}`)
    byPath.set(key, t); seen.set(name, key)
  }
  for (const t of [...tokens, ...Object.values(themes).flat()]) {
    const walk = (v) => {
      if (typeof v === 'string' && /^\{[^}]+\}$/.test(v) && !byPath.has(v.slice(1, -1))) throw new Error(`${t.file}: ${t.path.join('.')} → unknown alias ${v}`)
      if (v && typeof v === 'object') Object.values(v).forEach(walk)
    }
    walk(t.value)
  }
  return { resolver, base, themes, tokens, byPath, defaultTheme: theme.default }
}
