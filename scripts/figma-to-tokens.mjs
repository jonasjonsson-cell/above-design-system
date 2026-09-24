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
for (const group of ['primitive', 'color', 'dimension', 'textStyles', 'effects']) {
  for (const [k, v] of Object.entries(fig[group] || {})) {
    const cur = tokens[group]?.[k]
    if (cur === undefined) changes.push(`+ ${group}.${k}`)
    else if (norm(cur) !== norm(v)) changes.push(`~ ${group}.${k}: ${JSON.stringify(cur)} → ${JSON.stringify(v)}`)
    tokens[group][k] = v
  }
  for (const k of Object.keys(tokens[group] || {})) if (!(k in (fig[group] || {}))) changes.push(`! ${group}.${k} exists in code but not in Figma (kept)`)
}
writeFileSync(url, JSON.stringify(tokens, null, 2) + '\n')
console.log(changes.length ? changes.join('\n') : 'no changes')
