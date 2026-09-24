import type { ElementType, HTMLAttributes } from 'react'
import './Display.css'

export interface DisplayProps extends HTMLAttributes<HTMLElement> {
  /** Poster scale: display 96 · hero 160 · giant 240 · mega 515 (bleeds off edges). */
  size?: 'display' | 'hero' | 'giant' | 'mega'
  /** 50% ink for secondary / "to-do" lines. */
  muted?: boolean
  /** Element to render. Defaults to h1. */
  as?: ElementType
}

/** Display type — line-height 0.8, negative tracking, weight 400. One idea per slide, sentence case. */
export function Display({ size = 'hero', muted, as: Tag = 'h1', className, ...rest }: DisplayProps) {
  const classes = ['above-display', `above-display--${size}`, muted && 'above-display--muted', className].filter(Boolean).join(' ')
  return <Tag className={classes} {...rest} />
}
