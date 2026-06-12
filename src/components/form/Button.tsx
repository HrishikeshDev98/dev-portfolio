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
  const buttonClass = cn(
    sizeClasses[size],
    'button w-fit',
    `button-${variant}`,
    icon && 'flex items-center justify-center gap-2',
    className,
  )

  if (link) {
    return (
      <Link href={link} className={buttonClass} {...props}>
        <span>{text}</span>
        {icon && <span className="ms-2">{icon}</span>}
      </Link>
    )
  }

  return (
    <button type={type} className={buttonClass} {...props}>
      <span>{text}</span>
      {icon && <span className="ms-2">{icon}</span>}
    </button>
  )
}

export default Button
