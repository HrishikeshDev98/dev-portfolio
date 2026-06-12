'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const NavLink = ({
  href,
  children,
  submenu,
}: {
  href: string
  children: React.ReactNode
  submenu?: { href: string }[]
}) => {
  const pathname = usePathname()
  const isActive =
    pathname === href ||
    (submenu?.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`)) ??
      false)
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 text-[18px] transition-colors ${
        isActive ? 'text-primary font-semibold' : 'hover:text-primary'
      }`}
    >
      {children}
    </Link>
  )
}
