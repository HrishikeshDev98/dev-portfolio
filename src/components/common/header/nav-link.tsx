'use client'

import Link from 'next/link'

export const NavLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
  submenu?: { href: string }[]
}) => {
  return (
    <Link
      href={href}
      className={' text-base font-light transition-colors text-white font-semibold'}
    >
      {children}
    </Link>
  )
}
