'use client'

import React, { useRef, useState, useEffect } from 'react'
import { IoChevronDown } from 'react-icons/io5'
import { SelectInterface } from '@/interface'

const Select: React.FC<SelectInterface> = ({
  label,
  name,
  value,
  onChange,
  options,
  className = '',
  onClick,
  error,
  icon,
  defaultValue = 'Select...',
  required = false,
  ...props
}) => {
  const [open, setOpen] = useState(false)
  const [openUpward, setOpenUpward] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string | undefined>(value)
  const [hiddenValue, setHiddenValue] = useState<string | undefined>(undefined)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const toggleDropdown = () => {
    onClick?.()
    if (!open) {
      const rect = ref.current?.getBoundingClientRect()
      setOpenUpward((window.innerHeight - (rect?.bottom || 0)) < 200)
    }
    setOpen((prev) => !prev)
  }

  const handleOptionSelect = (val: string, label: string) => {
    setSelectedValue(val)
    setHiddenValue(label)
    onChange?.(val)
    setOpen(false)
  }

  useEffect(() => {
    if (value !== undefined) setSelectedValue(value)
  }, [value])

  const selectedLabel = options?.find((opt) => opt.value === selectedValue)?.label ?? defaultValue

  return (
    <div className="flex flex-col gap-1 w-full relative z-40" ref={ref} {...props}>
      <input type="hidden" name={name} value={hiddenValue ?? ''} required={required} />
      {label && (
        <label htmlFor={name} className="text-sm font-medium block">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        className={`relative w-full flex items-center justify-between gap-4 px-4 py-2 border rounded-lg cursor-pointer ${className}`}
        onClick={toggleDropdown}
      >
        <div className="flex items-center gap-2 text-sm">
          {icon && <span>{icon}</span>}
          <span>{selectedLabel}</span>
        </div>
        <IoChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </div>

      {open && (
        <ul
          className={`absolute z-50 w-full bg-white border border-gray-200 shadow-md rounded-lg p-1 max-h-[230px] overflow-y-auto ${
            openUpward ? 'bottom-full mb-2' : 'top-full mt-1'
          }`}
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleOptionSelect(opt.value, opt.label)}
              className={`px-4 py-2 text-sm cursor-pointer rounded hover:bg-gray-100 ${
                selectedValue === opt.value ? 'bg-gray-100 font-medium' : ''
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}

export default Select
