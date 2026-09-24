import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag } from './Tag'

const meta = { title: 'Components/Tag', component: Tag, args: { children: 'Site structure' } } satisfies Meta<typeof Tag>
export default meta
type Story = StoryObj<typeof meta>

export const Grey: Story = {}
export const Light: Story = { args: { tone: 'light', children: 'Search' } }
export const Highlight: Story = { args: { tone: 'highlight', children: 'Finalize concept' } }
