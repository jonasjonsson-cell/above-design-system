import type { CSSProperties, HTMLAttributes } from 'react'
import './Dash.css'

export interface DashProps extends HTMLAttributes<HTMLDivElement> {
  /** Width in px; height follows the dash's fixed proportion. */
  width?: number
  /** Solid fill — a token, e.g. "var(--primary-green-01)". Defaults to the ink colour. */
  fill?: string
  /** Fill the dash with an image instead ("filling it with an image"). */
  image?: string
  /** Accessible description when the dash carries an image. */
  label?: string
}

/**
 * The 5th element. Use the dash to create distinct layouts: fill it with an image, mask part of a
 * background, or use the bold shape itself. Establish it as a flat graphic sign before going 3D.
 */
export function Dash({ width = 240, fill, image, label, style, className, ...rest }: DashProps) {
  const vars = { '--dash-fill': image ? `url("${image}")` : fill, width, ...style } as CSSProperties
  return (
    <div
      className={['above-dash', className].filter(Boolean).join(' ')}
      style={vars}
      role={image && label ? 'img' : undefined}
      aria-label={image ? label : undefined}
      aria-hidden={image && label ? undefined : true}
      {...rest}
    />
  )
}
