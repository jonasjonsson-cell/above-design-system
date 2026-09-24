import type { Meta, StoryObj } from '@storybook/react-vite'

const display = [
  ['display', '96px · secondary statement'],
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
