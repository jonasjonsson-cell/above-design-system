import type { ButtonHTMLAttributes, CSSProperties } from 'react'
import './ArrowButton.css'

export interface ArrowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible name, e.g. "Read the full case study". Required: the button has no visible text. */
  'aria-label': string
  size?: number
}

/** Round green arrow button, e.g. "Full case study on Above.se". */
export function ArrowButton({ size = 40, style, className, type = 'button', ...rest }: ArrowButtonProps) {
  return (
    <button type={type} className={['above-arrow-button', className].filter(Boolean).join(' ')} style={{ '--arrow-size': `${size}px`, ...style } as CSSProperties} {...rest}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3.5 15.5 12 7 20.5 10.5 24 22.5 12 10.5 0Z" fill="currentColor" />
      </svg>
    </button>
  )
}
