import type { Meta, StoryObj } from '@storybook/react-vite'
import { HeaderBar } from './HeaderBar'

const meta = {
  title: 'Components/HeaderBar',
  component: HeaderBar,
  parameters: { layout: 'fullscreen' },
  args: { title: 'Visual Design Weekly', page: '01', copyright: '©2026 Above' },
} satisfies Meta<typeof HeaderBar>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithoutPage: Story = { args: { page: undefined } }
