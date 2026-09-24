import type { SVGProps } from 'react'

export interface LogoProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  /** Rendered height in px. Width follows the mark's 56:120 ratio. */
  size?: number
  /** Accessible name. Pass an empty string when the mark is decorative. */
  title?: string
}

/** The ABOVE mark (ā). Uses currentColor so it flips with the ground — never redraw it. */
export function Logo({ size = 120, title = 'ABOVE', ...rest }: LogoProps) {
  const decorative = title === ''
  return (
    <svg
      viewBox="0 0 56 120"
      width={(size * 56) / 120}
      height={size}
      fill="none"
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
      {...rest}
    >
      <path d="M 29.075 53.066 C 44.88 53.066 56 61.185 56 76.16 L 56 118.536 L 41.701 118.536 L 41.701 114.204 C 41.677 114.224 34.595 120 20.987 120 C 6.949 120 0.018 111.479 0.018 102.08 C 0.018 101.73 0.048 101.387 0.048 101.043 C 0.054 100.83 0.089 100.622 0.089 100.415 L 0.089 100.095 C 0.28 97.885 0.881 95.73 1.861 93.742 C 4.922 87.396 11.238 82.483 21.826 80.112 C 30.612 78.145 40.798 76.195 40.798 76.195 C 40.798 69.41 35.391 66.851 29.914 66.851 C 24.608 66.851 18.977 67.929 7.905 74.667 L 0.591 63.585 C 9.506 57.612 19.061 53.066 29.075 53.066 Z M 40.81 89.049 C 40.81 89.049 36.402 89.743 28.55 91.71 C 20.922 93.624 14.718 95.254 14.718 101.114 C 14.718 104.32 17.412 107.04 23.444 107.04 C 31.852 107.04 40.809 103.325 40.81 92.996 L 40.81 89.049 Z M 56 0 L 56 14.773 L 0 14.773 L 0 0 L 56 0 Z" fill="currentColor" />
    </svg>
  )
}
