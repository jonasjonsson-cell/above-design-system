import type { Meta, StoryObj } from '@storybook/react-vite'
import { PhotoCard } from './PhotoCard'

// Neutral placeholder — real workshop screenshots can show client names, so none ship in Storybook.
const placeholder =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="960" height="600"><rect width="960" height="600" fill="#e9e9e9"/><rect x="60" y="60" width="380" height="220" fill="#cfcfcf"/><rect x="480" y="60" width="420" height="480" fill="#d9d9d9"/><rect x="60" y="320" width="380" height="220" fill="#bdbdbd"/></svg>',
  )

const meta = {
  title: 'Components/PhotoCard',
  component: PhotoCard,
  parameters: { layout: 'centered' },
  args: { src: placeholder, alt: 'Placeholder workshop board', width: 480 },
} satisfies Meta<typeof PhotoCard>
export default meta
type Story = StoryObj<typeof meta>

export const Tilted: Story = {}
export const Upright: Story = { args: { tilted: false } }
