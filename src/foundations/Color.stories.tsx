import type { Meta, StoryObj } from '@storybook/react-vite'
import { Swatch } from './Swatch'

const semantic = [
  '--color-bg', '--color-bg-subtle', '--color-surface', '--color-border', '--color-border-strong',
  '--color-text', '--color-text-muted', '--color-text-subtle',
  '--color-accent', '--color-accent-hover', '--color-on-accent',
  '--color-danger', '--color-success', '--color-warning',
]

const meta = { title: 'Foundations/Color', tags: ['!autodocs'] } satisfies Meta
export default meta

export const Semantic: StoryObj = {
  render: () => <div>{semantic.map((t) => <Swatch key={t} name={t} />)}</div>,
}
