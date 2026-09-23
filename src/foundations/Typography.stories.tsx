import type { Meta, StoryObj } from '@storybook/react-vite'

const sizes = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs']

const meta = { title: 'Foundations/Typography', tags: ['!autodocs'] } satisfies Meta
export default meta

export const Scale: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
      {sizes.map((s) => (
        <div key={s} style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-6)' }}>
          <code style={{ width: 160 }}>--font-size-{s}</code>
          <span style={{ fontSize: `var(--font-size-${s})`, lineHeight: 'var(--line-height-tight)' }}>
            Design that works
          </span>
        </div>
      ))}
    </div>
  ),
}
