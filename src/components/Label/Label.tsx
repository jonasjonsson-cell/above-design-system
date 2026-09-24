import type { HTMLAttributes } from 'react'

export interface LabelProps extends HTMLAttributes<HTMLSpanElement> {}

/** The technical mono label — 12px, uppercase, tracked, 50% ink. Header/footer text only. */
export function Label({ style, ...rest }: LabelProps) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-family-label)',
        fontSize: 'var(--font-size-label)',
        letterSpacing: 'var(--tracking-label)',
        textTransform: 'uppercase',
        lineHeight: 1,
        color: 'var(--color-text-muted)',
        ...style,
      }}
      {...rest}
    />
  )
}
