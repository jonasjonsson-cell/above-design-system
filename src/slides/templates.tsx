import { Logo } from '../components/Logo/Logo'
import { PhotoCard } from '../components/PhotoCard/PhotoCard'
import { Slide, type SlideHeader } from './Slide'

interface WithHeader { header?: SlideHeader }

/** 01 · Cover — off-white ground, one giant word, mono sub-label, the mark bottom-right. */
export function CoverSlide({ word, sub }: { word: string; sub?: string }) {
  return (
    <Slide theme="light">
      <h1 className="above-slide__cover-word">{word}</h1>
      {sub && <div className="above-slide__cover-sub">{sub}</div>}
      <Logo className="above-slide__cover-logo" size={120} />
    </Slide>
  )
}

/** Section opener — hero headline plus a mega numeral bleeding off the bottom. Omit number for a plain hero slide. */
export function SectionSlide({ title, number, header }: WithHeader & { title: string; number?: string }) {
  return (
    <Slide header={header}>
      <h1 className="above-slide__hero">{title}</h1>
      {number && <div className="above-slide__mega" aria-hidden="true">{number}</div>}
    </Slide>
  )
}

/** Timed agenda item — duration kicker, title below, mega index. Use \n in title for a line break. */
export function AgendaSlide({ duration, title, number, header }: WithHeader & { duration: string; title: string; number?: string }) {
  return (
    <Slide header={header}>
      <div className="above-slide__hero">{duration}</div>
      <h1 className="above-slide__hero above-slide__hero--below-kicker">{title}</h1>
      {number && <div className="above-slide__mega" aria-hidden="true">{number}</div>}
    </Slide>
  )
}

/** Statement — one to three 96px lines. */
export function StatementSlide({ lines, header }: WithHeader & { lines: string[] }) {
  return (
    <Slide header={header}>
      <h1 className="above-slide__statement">{lines.map((l) => <span key={l}>{l}</span>)}</h1>
    </Slide>
  )
}

/** Statement with the tilted photo card — the system's only ornament. */
export function PhotoSlide({ lines, src, alt, header }: WithHeader & { lines: string[]; src: string; alt: string }) {
  return (
    <Slide header={header}>
      <h1 className="above-slide__statement">{lines.map((l) => <span key={l}>{l}</span>)}</h1>
      <PhotoCard className="above-slide__photo" src={src} alt={alt} width={686} />
    </Slide>
  )
}

/** Summary — a full-white lead line followed by 50% "to-do" lines. */
export function SummarySlide({ lead, items, header }: WithHeader & { lead: string; items: string[] }) {
  return (
    <Slide header={header}>
      <ul className="above-slide__summary">
        <li>{lead}</li>
        {items.map((i) => <li key={i}>{i}</li>)}
      </ul>
    </Slide>
  )
}

/** Closing — one word and a single giant typographic glyph. */
export function ClosingSlide({ word = 'Tack!', glyph = '\u270C\uFE0E', header }: WithHeader & { word?: string; glyph?: string }) {
  return (
    <Slide header={header}>
      <h1 className="above-slide__hero">{word}</h1>
      <div className="above-slide__glyph" aria-hidden="true">{glyph}</div>
    </Slide>
  )
}
