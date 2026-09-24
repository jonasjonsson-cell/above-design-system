import type { Meta, StoryObj } from '@storybook/react-vite'
import { Swatch } from './Swatch'

const primitives = ['--black', '--white', '--offwhite']
const semantic = [
  '--color-bg', '--color-text', '--color-text-muted', '--color-text-subtle',
  '--color-border', '--color-border-strong', '--color-accent', '--color-on-accent',
]

const meta = { title: 'Foundations/Color', tags: ['!autodocs'] } satisfies Meta
export default meta

/** The whole brand lives in three values. No hues, no gradients. */
export const Palette: StoryObj = {
  render: () => <div>{primitives.map((t) => <Swatch key={t} name={t} />)}</div>,
}

/** Emphasis is built only with white at 100 / 50 / 30% on black. */
export const SemanticDark: StoryObj = {
  render: () => <div>{semantic.map((t) => <Swatch key={t} name={t} />)}</div>,
}

/** The inverted "cover" ground: black ink on off-white. */
export const SemanticLight: StoryObj = {
  render: () => (
    <div data-theme="light" style={{ background: 'var(--color-bg)', color: 'var(--color-text)', padding: 'var(--space-4)' }}>
      {semantic.map((t) => <Swatch key={t} name={t} />)}
    </div>
  ),
}

const steps = [['--fg1', '100% — headline'], ['--fg2', '50% — label / to-do'], ['--fg3', '30% — faint']]
const lab = { fontFamily: 'var(--font-label)', fontSize: 'var(--font-size-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' as const, color: 'var(--fg2)' }

/** fg1 / fg2 / fg3 on black, ink1 / ink2 / ink3 on off-white. */
export const Emphasis: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-8)', maxWidth: 700 }}>
      <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
        {steps.map(([t, n]) => (
          <div key={t} style={{ flex: 1, display: 'grid', gap: 'var(--space-2)' }}>
            <div style={{ height: 46, background: `var(${t})` }} />
            <div style={lab}>{t.slice(2)} · {n}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-4)', background: 'var(--offwhite)', padding: 'var(--space-4)' }}>
        {steps.map(([t, n]) => {
          const ink = t.replace('fg', 'ink')
          return (
            <div key={ink} style={{ flex: 1, display: 'grid', gap: 'var(--space-2)' }}>
              <div style={{ height: 46, background: `var(${ink})` }} />
              <div style={{ ...lab, color: 'var(--ink2)' }}>{ink.slice(2)} · {n}</div>
            </div>
          )
        })}
      </div>
    </div>
  ),
}

const groups: [string, string[]][] = [
  ['Neutrals', ['--neutral-grey-04', '--neutral-grey-03', '--neutral-grey-02', '--neutral-grey-01', '--white']],
  ['Primary', ['--primary-green-01', '--primary-green-02', '--primary-green-03']],
  ['Secondary', ['--secondary-blue-electric', '--secondary-violet', '--secondary-blue-sky', '--secondary-coral']],
]

/** Straight forward, no tints — mainly monochrome and one key highlight colour. Secondary colours are for supporting content (data, diagrams), never the brand frame. */
export const ExtendedPalette: StoryObj = {
  name: 'Extended palette',
  render: () => (
    <div data-theme="light" style={{ display: 'grid', gap: 'var(--space-8)', background: 'var(--neutral-grey-01)', color: 'var(--black)', padding: 'var(--space-6)' }}>
      {groups.map(([g, ts]) => (
        <div key={g} style={{ display: 'grid', gap: 'var(--space-2)' }}>
          <div className="text-label-s" style={{ borderBottom: '1px solid var(--ink3)', paddingBottom: 'var(--space-2)' }}>{g}</div>
          <div style={{ display: 'flex' }}>
            {ts.map((t) => (
              <div key={t} style={{ flex: 1 }}>
                <div style={{ height: 80, background: `var(${t})` }} />
                <div className="text-label-s" style={{ marginTop: 'var(--space-2)', textTransform: 'none' }}>{t.slice(2)}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

const dist: [string, number][] = [['--white', 50], ['--neutral-grey-01', 5], ['--neutral-grey-02', 5], ['--neutral-grey-03', 5], ['--black', 25], ['--primary-green-03', 3], ['--primary-green-02', 3], ['--primary-green-01', 4]]

/** Roughly how much of a layout each colour takes: mostly white, a quarter black, the green only as an accent (~10%). */
export const Distribution: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--neutral-grey-01)', padding: 'var(--space-6)', color: 'var(--black)' }}>
      <div style={{ display: 'flex', height: 80 }}>
        {dist.map(([t, w]) => <div key={t} style={{ width: `${w}%`, background: `var(${t})` }} />)}
      </div>
      <div className="text-label-s" style={{ marginTop: 'var(--space-3)' }}>White 50% · greys 5% each · black 25% · greens 10%</div>
      <p className="text-body-m" style={{ maxWidth: 480, marginTop: 'var(--space-6)' }}>The general rule is to support what you are presenting, but we mainly express ourselves with clear, spacious white layouts with high-contrast typography.</p>
    </div>
  ),
}

/** The only approved green pairings: dark green on light green, light green on the two darks. */
export const Combinations: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', width: 480 }}>
      {[['--primary-green-01', '--primary-green-03'], ['--primary-green-02', '--primary-green-01'], ['--primary-green-03', '--primary-green-01']].map(([bg, fg]) => (
        <div key={bg} style={{ flex: 1, height: 112, background: `var(${bg})`, padding: 'var(--space-4)' }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: `var(${fg})` }} />
        </div>
      ))}
    </div>
  ),
}
