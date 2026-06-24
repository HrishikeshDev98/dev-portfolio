'use client'

import Link from 'next/link'

import { ButtonProps } from '@/interface'
import { cn } from '@/utils/mergeClass'

const sizeClasses: Record<string, string> = {
  small: 'px-3 py-1 text-xs',
  medium: 'px-3 py-1 text-xs md:px-5 md:py-2 md:text-sm',
  normal: '',
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  link,
  icon,
  text,
  variant = 'primary',
  className = '',
  size = 'normal',
  ...props
}) => {
  const iconOnly = !text && !!icon

  const buttonClass = cn(
    'button text-light flex items-center justify-center gap-2 cursor-pointer',
    iconOnly ? 'p-3 md:p-4' : 'px-6 py-3 text-sm md:px-10 md:py-4 md:text-base',
    sizeClasses[size],
    `button-${variant}`,
    className,
  )

  if (link) {
    return (
      <Link href={link} className={buttonClass} {...(props as object)}>
        {text && <span>{text}</span>}
        {icon && <span>{icon}</span>}
      </Link>
    )
  }

  return (
    <button type={type} className={buttonClass} {...(props as object)}>
      {text && <span>{text}</span>}
      {icon && <span>{icon}</span>}
    </button>
  )
}

export default Button
