'use client'

import { NAV_LINKS } from '@/constants/navigation'
import { useActiveSection } from '@/hooks/useActiveSection'

import { MobileMenu } from './mobile-menu'
import { NavLink } from './nav-link'

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace('#', ''))

const Header = () => {
  const activeId = useActiveSection(SECTION_IDS)

  return (
    <header className="fixed top-5 w-full z-50 px-4">
      <nav className="navbar rounded-xl px-6 py-4 container relative">
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
