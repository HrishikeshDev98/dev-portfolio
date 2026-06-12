'use client'

import Link from 'next/link'
import { MobileMenu } from './mobile-menu'
import { NavLink } from './nav-link'
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
    <header className="fixed top-5 inset-x-4 z-50 mx-auto">
      <div className="container md:mx-auto w-full md:w-auto px-0">
        <div className="navbar relative w-full rounded-full border border-gray-200 backdrop-blur-md bg-white/80">
          <div
            className={`flex items-center justify-between px-5 md:px-6 transition-all duration-300 ${
              scrolled ? 'py-4' : 'py-5'
            }`}
          >
            <Link href="/" className="cursor-pointer flex items-center font-bold text-xl">
              My App
            </Link>

            <nav className="hidden lg:block">
              <ul className="flex space-x-8">
                {NAV_LINKS.map((menu) => (
                  <div key={menu.href} className="relative group">
                    <li>
                      <NavLink href={menu.href}>{menu.name}</NavLink>
                    </li>
                  </div>
                ))}
              </ul>
            </nav>

            <MobileMenu menus={NAV_LINKS} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
