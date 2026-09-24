import type { HTMLAttributes } from 'react'
import './HeaderBar.css'

export interface HeaderBarProps extends HTMLAttributes<HTMLElement> {
  /** Deck or section title, e.g. "Visual Design Weekly". */
  title: string
  /** Page / chapter index, e.g. "01". */
  page?: string
  /** Right-hand label. Defaults to "©{current year} Above". */
  copyright?: string
}

/** The chapter bar: a 42×9 tab marker opening a justified row of mono labels. */
export function HeaderBar({ title, page, copyright, className, ...rest }: HeaderBarProps) {
  const year = new Date().getFullYear()
  return (
    <header className={['above-header-bar', className].filter(Boolean).join(' ')} {...rest}>
      <span className="above-header-bar__tab" aria-hidden="true" />
      <span>{title}</span>
      {page && <span>{page}</span>}
      <span>{copyright ?? `©${year} Above`}</span>
    </header>
  )
}
