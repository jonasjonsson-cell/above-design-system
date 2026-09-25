// Figma → code, step 1 (read-only). Paste into a `use_figma` call against the Test library
// (fileKey G9NJsMEulHxW0FhK4kPG4N). It reads variables, text styles and effect styles and returns
// them keyed by CSS name (each variable's WEB code syntax is the join key). Save the result, then:
//   node scripts/figma-to-tokens.mjs figma-export.json   (merges into tokens/*.tokens.json, prints every change)
//   npm run tokens                                       (regenerates the CSS and tokens.md)
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const vars = await figma.variables.getLocalVariablesAsync();
const byId = Object.fromEntries(vars.map((v) => [v.id, v]));
const css = (v) => (v.codeSyntax.WEB || '').replace(/^var\(--|\)$/g, '');
const val = (x) => (x && x.type === 'VARIABLE_ALIAS' ? { alias: css(byId[x.id]) } : x);
const out = { format: 'above-figma-export/2', variables: [], textStyles: [], effects: [] };
for (const v of vars) {
  const c = cols.find((k) => k.id === v.variableCollectionId);
  if (!c || !css(v)) continue;
  out.variables.push({
    css: css(v), name: v.name, collection: c.name, type: v.resolvedType,
    values: Object.fromEntries(c.modes.map((m) => [m.name.toLowerCase(), val(v.valuesByMode[m.modeId])])),
  });
}
for (const s of await figma.getLocalTextStylesAsync()) {
  const key = (s.description.match(/\.text-([\w-]+)/) || [])[1];
  if (!key) continue;
  out.textStyles.push({
    css: key, name: s.name, family: s.fontName.family, style: s.fontName.style, size: s.fontSize,
    lineHeight: s.lineHeight.unit === 'PERCENT' ? +(s.lineHeight.value / 100).toFixed(4) : null,
    tracking: s.letterSpacing.unit === 'PERCENT' ? +(s.letterSpacing.value / 100).toFixed(4) : 0,
    textCase: s.textCase,
  });
}
for (const e of await figma.getLocalEffectStylesAsync()) {
  const key = (e.description.match(/var\(--([\w-]+)\)/) || [])[1];
  if (!key) continue;
  out.effects.push({
    css: key, name: e.name,
    layers: e.effects.filter((x) => x.type === 'DROP_SHADOW').map((x) => ({ x: x.offset.x, y: x.offset.y, blur: x.radius, spread: x.spread || 0, color: x.color })),
  });
}
return out;
