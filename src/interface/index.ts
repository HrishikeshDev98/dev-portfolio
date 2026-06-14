import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type BaseProps = {
  text?: string
  icon?: ReactNode
  className?: string
  size?: 'small' | 'medium' | 'normal'
  variant?: 'primary' | 'outlined'
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    link?: never
    type?: 'button' | 'submit' | 'reset'
  }

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    link: string
    type?: never
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink
