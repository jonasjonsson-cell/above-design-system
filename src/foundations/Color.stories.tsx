import type { Meta, StoryObj } from '@storybook/react-vite'
import { Swatch } from './Swatch'

const primitives = ['--above-black', '--above-white', '--above-offwhite']
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
