import type { Meta, StoryObj } from '@storybook/react-vite'

const space = ['1', '2', '3', '4', '6', '8', '12']

const meta = { title: 'Foundations/Spacing & Radius', tags: ['!autodocs'] } satisfies Meta
export default meta

const label = { fontFamily: 'var(--font-family-label)', fontSize: 'var(--font-size-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' as const, color: 'var(--color-text-muted)' }

export const Spacing: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
      {space.map((s) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <code style={{ width: 120, ...label }}>--space-{s}</code>
          <div style={{ height: 12, width: `var(--space-${s})`, background: 'var(--color-text)' }} />
        </div>
      ))}
    </div>
  ),
}

/** Hard edges everywhere. 4px + border + shadow exist only on the photo card. */
export const RadiusAndShadow: StoryObj = {
  name: 'Radius & shadow',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-12)', alignItems: 'center' }}>
      <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
        <div style={{ width: 96, height: 64, border: 'var(--border-width) solid var(--color-border-strong)', borderRadius: 'var(--radius-none)' }} />
        <code style={label}>--radius-none</code>
      </div>
      <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
        <div style={{ width: 96, height: 64, background: '#bdbdbd', border: 'var(--border-width-photo) solid var(--color-photo-border)', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)' }} />
        <code style={label}>--radius-card + --shadow-card</code>
      </div>
    </div>
  ),
}
