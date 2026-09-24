import type { Preview } from '@storybook/react-vite'
import '../src/styles/tokens.css'
import '../src/styles/global.css'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    a11y: { test: 'error' },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    options: {
      storySort: {
        order: ['Foundations', ['Introduction', 'Color', 'Typography', 'Spacing & Radius', 'Voice & content', 'Iconography'], 'Components', 'Slides', ['Visual Design Weekly', 'Templates']],
      },
    },
  },
}
export default preview
