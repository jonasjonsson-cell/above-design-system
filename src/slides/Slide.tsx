import type { HTMLAttributes, ReactNode } from 'react'
import { HeaderBar } from '../components/HeaderBar/HeaderBar'
import './Slide.css'

export interface SlideHeader {
  title: string
  page?: string
  copyright?: string
}

export interface SlideProps extends HTMLAttributes<HTMLElement> {
  /** dark = black ground (default); light = off-white cover ground. */
  theme?: 'dark' | 'light'
  /** Chapter bar at the top. Omit for none (e.g. the cover). */
  header?: SlideHeader
  children?: ReactNode
}

/** A 1920×1080 slide ground. Place template parts inside; they are absolutely positioned. */
export function Slide({ theme = 'dark', header, className, children, ...rest }: SlideProps) {
  return (
    <section
      data-theme={theme === 'light' ? 'light' : undefined}
      className={['above-slide', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {header && <HeaderBar className="above-slide__header" {...header} />}
      {children}
    </section>
  )
}

export interface SlideFrameProps {
  /** Scale factor for previews/thumbnails. 1 = full 1920×1080. */
  scale?: number
  children: ReactNode
}

/** Scales a Slide down for previews while keeping its exact 1920×1080 layout. */
export function SlideFrame({ scale = 0.5, children }: SlideFrameProps) {
  return (
    <div className="above-slide-frame" style={{ width: 1920 * scale, height: 1080 * scale }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: 1920, height: 1080 }}>{children}</div>
    </div>
  )
}
