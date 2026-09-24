import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideFrame } from './Slide'
import { AgendaSlide, ClosingSlide, CoverSlide, PhotoSlide, SectionSlide, StatementSlide, SummarySlide } from './templates'
import { placeholderPhoto } from './placeholder'

const h = (page: string) => ({ title: 'Visual Design Weekly', page, copyright: '©2026 Above' })

const slides = [
  <CoverSlide word="Weekly" sub="Visual Design · Week 01 · 2026" />,
  <SectionSlide header={h('01')} title="What’s Up?" number="01" />,
  <AgendaSlide header={h('02')} duration="30 min" title={'Round the\ntable'} number="02" />,
  <StatementSlide header={h('03')} lines={['Collaborative session', 'Ideate, review, design and feedback on ongoing projects']} />,
  <StatementSlide header={h('04')} lines={['Show & tell of project, pitch, tool or inspiration']} />,
  <StatementSlide header={h('05')} lines={['Round the table', 'AI · Motion · Culture · Design systems · Brand · Recruitment']} />,
  <PhotoSlide header={h('06')} lines={['Well-being: temp check', 'On-going project round table']} src={placeholderPhoto} alt="Placeholder workshop board" />,
  <SummarySlide header={h('07')} lead="Summary" items={['Bring back temp check', 'More unfinished work', 'Share inspiration / tools']} />,
  <SectionSlide header={h('08')} title="Reflections?" />,
  <ClosingSlide header={h('09')} />,
]

const meta = {
  title: 'Slides/Visual Design Weekly',
  parameters: { layout: 'fullscreen' },
} satisfies Meta
export default meta

/** The 10-slide sample deck covering every layout type. */
export const Deck: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', padding: 'var(--space-6)', background: '#1a1a1a' }}>
      {slides.map((s, i) => <SlideFrame key={i} scale={0.3}>{s}</SlideFrame>)}
    </div>
  ),
}
