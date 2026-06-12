'use client'

import { InputInterface } from '@/interface'

const Input: React.FC<InputInterface> = ({
  label,
  name,
  type = 'text',
  placeholder,
  className = '',
  error = '',
  icon,
  required = false,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={name} className="text-sm font-medium block">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className={`relative w-full flex items-center border rounded-lg ${className}`}>
        {icon && <span className="ml-3">{icon}</span>}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className="px-4 py-2 text-sm w-full outline-none bg-transparent"
          {...props}
        />
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}

export default Input
