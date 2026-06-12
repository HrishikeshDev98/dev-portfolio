'use client'

import { NavLink } from './nav-link'
import { MobileMenu } from './mobile-menu'
import { NAV_LINKS } from '@/constants/navigation'
import { useEffect, useState } from 'react'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-5 w-full flex items-center justify-center z-50 px-4">
      <nav className="navbar rounded-xl px-6 py-4 w-full max-w-5xl relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <span className="text-2xl font-bold text-white tracking-tight select-none">H</span>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href}>{link.name}</NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger + dropdown */}
          <MobileMenu menus={NAV_LINKS} />
        </div>
      </nav>
    </header>
  )
}

export default Header
