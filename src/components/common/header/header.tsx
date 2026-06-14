'use client'

import { useRef } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { NAV_LINKS } from '@/constants/navigation'
import { useActiveSection } from '@/hooks/useActiveSection'

import { MobileMenu } from './mobile-menu'
import { NavLink } from './nav-link'

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace('#', ''))

const Header = () => {
  const headerRef = useRef<HTMLElement>(null)
  const activeId = useActiveSection(SECTION_IDS)

  useGSAP(
    () => {
      gsap.from('.header-nav', {
        y: -80,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.2,
      })
    },
    { scope: headerRef },
  )

  return (
    <header ref={headerRef} className="fixed top-5 w-full z-50 px-4">
      <nav className="header-nav navbar rounded-xl px-6 py-4 container relative border border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-white tracking-tight select-none">H</span>

          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} isActive={activeId === link.href.replace('#', '')}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <MobileMenu menus={NAV_LINKS} />
        </div>
      </nav>
    </header>
  )
}

export default Header
