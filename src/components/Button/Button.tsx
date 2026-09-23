import type { ButtonHTMLAttributes } from 'react'
import './Button.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. Use one primary action per view. */
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ variant = 'primary', size = 'md', className, type = 'button', ...rest }: ButtonProps) {
  const classes = ['above-button', `above-button--${variant}`, `above-button--${size}`, className].filter(Boolean).join(' ')
  return <button type={type} className={classes} {...rest} />
}
