import type { Meta, StoryObj } from '@storybook/react-vite'

const display = [
  ['display', '96px · statement'],
  ['hero', '160px · standard headline'],
  ['giant', '240px · cover word'],
]
const ui = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs']

const meta = { title: 'Foundations/Typography', tags: ['!autodocs'], parameters: { layout: 'fullscreen' } } satisfies Meta
export default meta

const label = { fontFamily: 'var(--font-family-label)', fontSize: 'var(--font-size-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' as const, color: 'var(--color-text-muted)' }

/** Suisse BP Int'l at poster scale: weight 400, line-height 0.8, negative tracking. */
export const Display: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-12)', padding: 'var(--space-margin-x)', overflow: 'hidden' }}>
      {display.map(([s, note]) => (
        <div key={s} style={{ display: 'grid', gap: 'var(--space-4)' }}>
          <div style={label}>--font-size-{s} — {note}</div>
          <div style={{ fontFamily: 'var(--font-family-display)', fontSize: `var(--font-size-${s})`, lineHeight: 'var(--line-height-display)', letterSpacing: 'var(--tracking-display)', whiteSpace: 'nowrap' }}>What’s up?</div>
        </div>
      ))}
    </div>
  ),
}

/** KH Interference — 12px, uppercase, 0.06em, 50% ink. Header bar only. */
export const LabelMono: StoryObj = {
  name: 'Label',
  render: () => <div style={{ padding: 'var(--space-margin-x)', ...label }}>Visual Design Weekly · 01 · ©2026 Above</div>,
}

/** UI scale for interface work. Not part of the source deck system. */
export const UIScale: StoryObj = {
  name: 'UI scale',
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-3)', padding: 'var(--space-margin-x)' }}>
      {ui.map((s) => (
        <div key={s} style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-6)' }}>
          <code style={{ width: 160, ...label }}>--font-size-{s}</code>
          <span style={{ fontSize: `var(--font-size-${s})`, lineHeight: 'var(--line-height-tight)' }}>Show &amp; tell of project, pitch, tool or inspiration.</span>
        </div>
      ))}
    </div>
  ),
}

const families = [
  ['--font-display', "Suisse BP Int'l", 'Display — primary'],
  ['--font-label', 'KH Interference', 'Label — the mono header bar'],
  ['--font-serif', 'Suisse BP Serif', 'Companion serif — opt-in'],
  ['--font-neue', 'Suisse BP Neue', 'Serif display cut — opt-in'],
  ['--font-antique', "Suisse BP Int'l Antique", 'Alt cut — opt-in'],
]

/** All five licensed families, self-hosted. */
export const Families: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-8)', padding: 'var(--space-margin-x)' }}>
      {families.map(([v, name, role]) => (
        <div key={v} style={{ display: 'grid', gap: 'var(--space-2)' }}>
          <div style={label}>{v} — {role}</div>
          <div style={{ fontFamily: `var(${v})`, fontSize: 64, lineHeight: 1, letterSpacing: v === '--font-label' ? 0 : '-0.03em' }}>{name} — Aa Bb 0123</div>
        </div>
      ))}
    </div>
  ),
}

const weights: [number, string][] = [[100, 'Thin'], [200, 'UltraLight'], [300, 'Light'], [400, 'Regular'], [500, 'Medium'], [700, 'Bold'], [900, 'Black']]

/** Suisse BP Int'l, 100–900 with italics. The deck uses 400. */
export const Weights: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-3)', padding: 'var(--space-margin-x)' }}>
      {weights.map(([w, n]) => (
        <div key={w} style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-6)' }}>
          <code style={{ width: 160, ...label }}>{w} · {n}</code>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: w, fontSize: 48, letterSpacing: '-0.03em' }}>Improve quality</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: w, fontStyle: 'italic', fontSize: 48, letterSpacing: '-0.03em', color: 'var(--fg2)' }}>italic</span>
        </div>
      ))}
    </div>
  ),
}

const textStyles: [string, string][] = [
  ['display-l', 'Suisse BP Int’l · 220 / 0.75 · −6%'],
  ['display-s', 'Suisse BP Int’l · 180 / 0.8 · −4%'],
  ['heading-xl', 'Suisse BP Int’l · 120 / 0.85 · −4%'],
  ['heading-l', 'Suisse BP Int’l · 100 / 0.85 · −4%'],
  ['heading-m', 'Suisse BP Int’l · 80 / 0.85 · −2%'],
  ['heading-s', 'Suisse BP Int’l · 60 / 0.9 · −2%'],
  ['heading-xs', 'Suisse BP Int’l · 48 / 0.9 · −1%'],
  ['body-xl', 'Suisse BP Int’l · 32 / 1'],
  ['body-l', 'Suisse BP Int’l · 24 / 1'],
  ['body-m', 'Suisse BP Int’l · 20 / 1'],
  ['body-s', 'Suisse BP Int’l · 16 / 1'],
  ['list-l', 'Suisse BP Int’l Light · 20 / 1.3'],
  ['list-s', 'Suisse BP Int’l Light · 16 / 1.3'],
  ['label-l', 'KH Interference · 16 / 1.2 · +6% · caps'],
  ['label-s', 'KH Interference · 12 / 1.2 · +6% · caps'],
]

/** The Figma text styles. Headlines dark and grey; body for longer texts; KH Interference for captions and numbers. Use the class, e.g. `className="text-heading-m"`. */
export const TextStyles: StoryObj = {
  name: 'Text styles',
  render: () => (
    <div data-theme="light" style={{ background: 'var(--white)', color: 'var(--black)', padding: 'var(--space-margin-x)', display: 'grid', gap: 'var(--space-6)', overflow: 'hidden' }}>
      {textStyles.map(([n, spec]) => (
        <div key={n} style={{ display: 'grid', gridTemplateColumns: '280px 1fr', alignItems: 'end', gap: 'var(--space-6)', borderTop: '1px solid var(--neutral-grey-01)', paddingTop: 'var(--space-3)' }}>
          <div className="text-label-s" style={{ color: 'var(--neutral-grey-02)' }}>.text-{n}<br />{spec}</div>
          <div className={`text-${n}`} style={{ whiteSpace: 'nowrap' }}>{n.startsWith('label') ? 'Case study · 2024/01/19' : n.startsWith('display') ? 'Display' : 'Bring clarity'}</div>
        </div>
      ))}
    </div>
  ),
}
