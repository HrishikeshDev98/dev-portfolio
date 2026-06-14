import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react'

export type InputInterface = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string
  name: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  placeholder?: string
  className?: string
  error?: string
  icon?: ReactNode
  required?: boolean
}

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

export type SelectOption = { label: string; value: string }

export type SelectInterface = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onClick'> & {
  label?: string
  name: string
  value?: string
  onChange?: (value: string) => void
  onClick?: () => void
  options: SelectOption[]
  className?: string
  error?: string
  icon?: ReactNode
  defaultValue?: string
  required?: boolean
}

export type TextareaInterface = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> & {
  label?: string
  name: string
  placeholder?: string
  className?: string
  error?: string
  required?: boolean
}
