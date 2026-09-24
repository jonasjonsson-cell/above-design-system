import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowButton } from './ArrowButton'

const meta = { title: 'Components/ArrowButton', component: ArrowButton, args: { 'aria-label': 'Read the full case study' } } satisfies Meta<typeof ArrowButton>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Large: Story = { args: { size: 64 } }
