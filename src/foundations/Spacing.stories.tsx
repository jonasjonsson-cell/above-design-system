import type { Meta, StoryObj } from '@storybook/react-vite'

const space = ['1', '2', '3', '4', '6', '8', '12']
const radius = ['sm', 'md', 'lg', 'full']

const meta = { title: 'Foundations/Spacing & Radius', tags: ['!autodocs'] } satisfies Meta
export default meta

export const Spacing: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
      {space.map((s) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <code style={{ width: 100 }}>--space-{s}</code>
          <div style={{ height: 16, width: `var(--space-${s})`, background: 'var(--color-accent)' }} />
        </div>
      ))}
    </div>
  ),
}

export const Radius: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
      {radius.map((r) => (
        <div key={r} style={{ display: 'grid', gap: 'var(--space-2)', justifyItems: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: `var(--radius-${r})`, background: 'var(--color-bg-subtle)', border: 'var(--border-width) solid var(--color-border-strong)' }} />
          <code>--radius-{r}</code>
        </div>
      ))}
    </div>
  ),
}
