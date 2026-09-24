import type { Meta, StoryObj } from '@storybook/react-vite'
import { Display } from './Display'

const meta = {
  title: 'Components/Display',
  component: Display,
  parameters: { layout: 'fullscreen' },
  args: { children: 'Improve quality' },
  decorators: [(S) => <div style={{ padding: 'var(--space-margin-x)', overflow: 'hidden' }}><S /></div>],
} satisfies Meta<typeof Display>
export default meta
type Story = StoryObj<typeof meta>

export const Hero: Story = { args: { size: 'hero' } }
export const Statement: Story = { args: { size: 'display', children: 'Collaborative session' } }
export const Muted: Story = { args: { size: 'display', muted: true, children: 'Round the table.' } }
export const Mega: Story = { args: { size: 'mega', children: '01' } }
