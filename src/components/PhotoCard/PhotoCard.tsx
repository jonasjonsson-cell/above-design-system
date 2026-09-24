import type { HTMLAttributes } from 'react'
import './PhotoCard.css'

export interface PhotoCardProps extends HTMLAttributes<HTMLElement> {
  src: string
  /** Describe the image; required for accessibility. */
  alt: string
  /** Rendered width in px. */
  width?: number
  /** Rotate by the brand's -9°. Set false for an upright card. */
  tilted?: boolean
}

/** A photo or screenshot framed as a small tilted, white-bordered card on the black ground. */
export function PhotoCard({ src, alt, width = 480, tilted = true, className, style, ...rest }: PhotoCardProps) {
  const classes = ['above-photo-card', tilted && 'above-photo-card--tilted', className].filter(Boolean).join(' ')
  return (
    <figure className={classes} style={{ width, ...style }} {...rest}>
      <img src={src} alt={alt} />
    </figure>
  )
}
