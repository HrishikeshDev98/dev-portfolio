'use client'

import Link from 'next/link'

export const NavLink = ({
  href,
  isActive,
  children,
}: {
  href: string
  isActive?: boolean
  children: React.ReactNode
}) => {
  return (
    <Link
      href={href}
      className={`text-base transition-colors duration-200 font-semibold ${
        isActive ? 'text-secondary' : 'text-white/70 hover:text-white'
      }`}
    >
      {children}
    </Link>
  )
}
