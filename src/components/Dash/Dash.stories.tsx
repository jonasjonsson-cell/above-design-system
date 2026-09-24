import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dash } from './Dash'
import { placeholderPhoto } from '../../slides/placeholder'

const meta = { title: 'Components/Dash (5th element)', component: Dash, args: { width: 480 } } satisfies Meta<typeof Dash>
export default meta
type Story = StoryObj<typeof meta>

export const Solid: Story = {}
export const Highlight: Story = { args: { fill: 'var(--primary-green-01)' } }
export const ImageFill: Story = { args: { image: placeholderPhoto, label: 'Placeholder image in the dash' } }
