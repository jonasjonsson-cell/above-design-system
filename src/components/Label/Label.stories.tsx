import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from './Label'

const meta = { title: 'Components/Label', component: Label, args: { children: 'Visual Design Weekly' } } satisfies Meta<typeof Label>
export default meta
export const Default: StoryObj<typeof meta> = {}
