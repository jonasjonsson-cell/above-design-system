import type { Meta, StoryObj } from '@storybook/react-vite'
import { Logo } from './Logo'

const meta = { title: 'Components/Logo', component: Logo } satisfies Meta<typeof Logo>
export default meta
type Story = StoryObj<typeof meta>

export const OnBlack: Story = { args: { size: 120 } }
export const OnOffwhite: Story = {
  args: { size: 120 },
  decorators: [(S) => <div data-theme="light" style={{ background: 'var(--color-bg)', color: 'var(--color-text)', padding: 'var(--space-6)', display: 'inline-block' }}><S /></div>],
}
