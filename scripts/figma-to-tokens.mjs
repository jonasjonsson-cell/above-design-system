#!/usr/bin/env node
// Merge a Figma export (from scripts/figma/export-tokens.js) into tokens/tokens.json and print what changed.
// Usage: node scripts/figma-to-tokens.mjs figma-export.json
import { readFileSync, writeFileSync } from 'node:fs'
const [, , file] = process.argv
if (!file) { console.error('usage: node scripts/figma-to-tokens.mjs <figma-export.json>'); process.exit(1) }
const url = new URL('../tokens/tokens.json', import.meta.url)
const tokens = JSON.parse(readFileSync(url, 'utf8'))
const fig = JSON.parse(readFileSync(file, 'utf8'))
const changes = []
const norm = (v) => (typeof v === 'string' ? v.replace(/\s+/g, '').toLowerCase() : JSON.stringify(v))
// Code-only values (raw CSS strings in `component`, `$description` keys) never exist in Figma — skip them in the report.
const codeOnly = (group, k, v) => k.startsWith('$') || (group === 'component' && typeof v === 'string' && !/^\{[\w-]+\}$/.test(v))
for (const group of ['primitive', 'color', 'dimension', 'grid', 'component', 'textStyles', 'effects']) {
  tokens[group] ??= {}
  for (const [k, v] of Object.entries(fig[group] || {})) {
    const cur = tokens[group]?.[k]
    if (cur === undefined) changes.push(`+ ${group}.${k}`)
    else if (norm(cur) !== norm(v)) changes.push(`~ ${group}.${k}: ${JSON.stringify(cur)} → ${JSON.stringify(v)}`)
    tokens[group][k] = v
  }
  for (const [k, v] of Object.entries(tokens[group])) if (!(k in (fig[group] || {})) && !codeOnly(group, k, v)) changes.push(`! ${group}.${k} exists in code but not in Figma (kept)`)
}
writeFileSync(url, JSON.stringify(tokens, null, 2) + '\n')
console.log(changes.length ? changes.join('\n') : 'no changes')
