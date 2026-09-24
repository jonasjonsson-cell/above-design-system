import { useEffect, useRef, useState } from 'react'

const label = { fontFamily: 'var(--font-family-label)', fontSize: 'var(--font-size-label)', letterSpacing: 'var(--tracking-label)', color: 'var(--color-text-muted)' }

/** Shows a token swatch and its resolved value in the swatch's own theme context. */
export function Swatch({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState('')
  useEffect(() => {
    if (ref.current) setValue(getComputedStyle(ref.current).getPropertyValue(name).trim())
  }, [name])
  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-2) 0' }}>
      <div style={{ width: 48, height: 48, background: `var(${name})`, border: 'var(--border-width) solid var(--color-border)' }} />
      <div style={{ display: 'grid', gap: 2 }}>
        <code style={{ ...label, textTransform: 'none', color: 'var(--color-text)' }}>{name}</code>
        <code style={label}>{value}</code>
      </div>
    </div>
  )
}
