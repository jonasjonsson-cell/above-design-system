import type { Meta, StoryObj } from '@storybook/react-vite'
import { Swatch } from './Swatch'

const primitives = ['--black', '--white', '--offwhite']
const semantic = [
  '--color-bg', '--color-text', '--color-text-muted', '--color-text-subtle',
  '--color-border', '--color-border-strong', '--color-accent', '--color-on-accent',
]

const meta = { title: 'Foundations/Color', tags: ['!autodocs'] } satisfies Meta
export default meta

/** The whole brand lives in three values. No hues, no gradients. */
export const Palette: StoryObj = {
  render: () => <div>{primitives.map((t) => <Swatch key={t} name={t} />)}</div>,
}

/** Emphasis is built only with white at 100 / 50 / 30% on black. */
export const SemanticDark: StoryObj = {
  render: () => <div>{semantic.map((t) => <Swatch key={t} name={t} />)}</div>,
}

/** The inverted "cover" ground: black ink on off-white. */
export const SemanticLight: StoryObj = {
  render: () => (
    <div data-theme="light" style={{ background: 'var(--color-bg)', color: 'var(--color-text)', padding: 'var(--space-4)' }}>
      {semantic.map((t) => <Swatch key={t} name={t} />)}
    </div>
  ),
}

const steps = [['--fg1', '100% — headline'], ['--fg2', '50% — label / to-do'], ['--fg3', '30% — faint']]
const lab = { fontFamily: 'var(--font-label)', fontSize: 'var(--font-size-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' as const, color: 'var(--fg2)' }

/** fg1 / fg2 / fg3 on black, ink1 / ink2 / ink3 on off-white. */
export const Emphasis: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-8)', maxWidth: 700 }}>
      <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
        {steps.map(([t, n]) => (
          <div key={t} style={{ flex: 1, display: 'grid', gap: 'var(--space-2)' }}>
            <div style={{ height: 46, background: `var(${t})` }} />
            <div style={lab}>{t.slice(2)} · {n}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-4)', background: 'var(--offwhite)', padding: 'var(--space-4)' }}>
        {steps.map(([t, n]) => {
          const ink = t.replace('fg', 'ink')
          return (
            <div key={ink} style={{ flex: 1, display: 'grid', gap: 'var(--space-2)' }}>
              <div style={{ height: 46, background: `var(${ink})` }} />
              <div style={{ ...lab, color: 'var(--ink2)' }}>{ink.slice(2)} · {n}</div>
            </div>
          )
        })}
      </div>
    </div>
  ),
}
