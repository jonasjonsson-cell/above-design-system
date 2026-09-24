import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideFrame } from './Slide'
import { AgendaSlide, ClosingSlide, CoverSlide, PhotoSlide, SectionSlide, StatementSlide, SummarySlide } from './templates'
import { placeholderPhoto } from './placeholder'

const header = (page: string) => ({ title: 'Visual Design Weekly', page, copyright: '©2026 Above' })

const meta = {
  title: 'Slides/Templates',
  parameters: { layout: 'fullscreen', backgrounds: { disable: true } },
  decorators: [(S) => <div style={{ padding: 'var(--space-6)', background: '#1a1a1a', minHeight: '100vh' }}><S /></div>],
} satisfies Meta
export default meta
type Story = StoryObj

const frame = (node: React.ReactNode) => <SlideFrame scale={0.5}>{node}</SlideFrame>

export const Cover: Story = { render: () => frame(<CoverSlide word="Weekly" sub="Visual Design · Week 01 · 2026" />) }
export const Section: Story = { render: () => frame(<SectionSlide header={header('01')} title="What’s Up?" number="01" />) }
export const Agenda: Story = { render: () => frame(<AgendaSlide header={header('02')} duration="30 min" title={'Round the\ntable'} number="02" />) }
export const Statement: Story = { render: () => frame(<StatementSlide header={header('03')} lines={['Collaborative session', 'Ideate, review, design and feedback on ongoing projects']} />) }
export const Photo: Story = { render: () => frame(<PhotoSlide header={header('06')} lines={['Well-being: temp check', 'On-going project round table']} src={placeholderPhoto} alt="Placeholder workshop board" />) }
export const Summary: Story = { render: () => frame(<SummarySlide header={header('07')} lead="Summary" items={['Bring back temp check', 'More unfinished work', 'Share inspiration / tools']} />) }
export const Closing: Story = { render: () => frame(<ClosingSlide header={header('09')} />) }
