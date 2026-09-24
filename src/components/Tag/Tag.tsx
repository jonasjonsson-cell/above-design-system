import type { HTMLAttributes } from 'react'
import './Tag.css'

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** grey (default) · light · highlight (green — for the one thing that matters). */
  tone?: 'grey' | 'light' | 'highlight'
}

/** A small rounded status/topic tag, as in the sprint boards. Keep highlight to one per view. */
export function Tag({ tone = 'grey', className, ...rest }: TagProps) {
  return <span className={['above-tag', tone !== 'grey' && `above-tag--${tone}`, className].filter(Boolean).join(' ')} {...rest} />
}
