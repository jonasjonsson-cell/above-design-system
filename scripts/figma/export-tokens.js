// Figma → code. Paste into a `use_figma` call against the Test library (fileKey G9NJsMEulHxW0FhK4kPG4N).
// Returns JSON in the tokens.json shape. Save it and run:
//   node scripts/figma-to-tokens.mjs <export.json>   (merges into tokens/tokens.json)
//   npm run tokens                                   (regenerates the CSS)
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const vars = await figma.variables.getLocalVariablesAsync();
const byId = Object.fromEntries(vars.map((v) => [v.id, v]));
const css = (v) => (v.codeSyntax.WEB || '').replace(/^var\(--|\)$/g, '');
const hex = (c) => {
  const h = (n) => Math.round(n * 255).toString(16).padStart(2, '0');
  return c.a === undefined || c.a === 1 ? `#${h(c.r)}${h(c.g)}${h(c.b)}` : `rgba(${Math.round(c.r * 255)}, ${Math.round(c.g * 255)}, ${Math.round(c.b * 255)}, ${+c.a.toFixed(3)})`;
};
const col = (n) => cols.find((c) => c.name === n);
const out = { primitive: {}, color: {}, dimension: {}, textStyles: {}, effects: {} };
const P = col('Primitives'), C = col('Color'), S = col('Spacing');
for (const v of vars) {
  if (v.variableCollectionId === P.id) out.primitive[css(v)] = hex(v.valuesByMode[P.modes[0].modeId]);
  if (v.variableCollectionId === S.id) out.dimension[css(v)] = v.valuesByMode[S.modes[0].modeId];
  if (v.variableCollectionId === C.id) {
    const m = {};
    for (const mode of C.modes) {
      const val = v.valuesByMode[mode.modeId];
      m[mode.name.toLowerCase()] = val.type === 'VARIABLE_ALIAS' ? css(byId[val.id]) : hex(val);
    }
    out.color[css(v)] = m;
  }
}
for (const s of await figma.getLocalTextStylesAsync()) {
  const key = (s.description.match(/\.text-([\w-]+)/) || [])[1];
  if (!key) continue;
  out.textStyles[key] = {
    figma: s.name,
    family: s.fontName.family === 'KH Interference' ? 'label' : 'display',
    weight: s.fontName.style === 'Light' ? 300 : 400,
    size: s.fontSize,
    lineHeight: s.lineHeight.unit === 'PERCENT' ? +(s.lineHeight.value / 100).toFixed(3) : 1,
    tracking: s.letterSpacing.unit === 'PERCENT' ? +(s.letterSpacing.value / 100).toFixed(3) : 0,
    ...(s.textCase === 'UPPER' ? { uppercase: true } : {}),
  };
}
for (const e of await figma.getLocalEffectStylesAsync()) {
  const key = (e.description.match(/var\(--([\w-]+)\)/) || [])[1];
  if (!key) continue;
  out.effects[key] = {
    figma: e.name,
    layers: e.effects.filter((x) => x.type === 'DROP_SHADOW').map((x) => ({ x: x.offset.x, y: x.offset.y, blur: x.radius, spread: x.spread || 0, color: hex(x.color) })),
  };
}
return out;
