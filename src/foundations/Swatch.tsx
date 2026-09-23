import { useEffect, useState } from 'react'

export function TokenValue({ name }: { name: string }) {
  const [value, setValue] = useState('')
  useEffect(() => {
    setValue(getComputedStyle(document.documentElement).getPropertyValue(name).trim())
  }, [name])
  return <code style={{ color: 'var(--color-text-subtle)', fontSize: 'var(--font-size-xs)' }}>{value}</code>
}

export function Swatch({ name }: { name: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-2) 0' }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 'var(--radius-md)',
          background: `var(${name})`,
          border: 'var(--border-width) solid var(--color-border)',
        }}
      />
      <div style={{ display: 'grid' }}>
        <code>{name}</code>
        <TokenValue name={name} />
      </div>
    </div>
  )
}
