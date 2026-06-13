'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { HiMenu, HiX } from 'react-icons/hi'
import { IoIosArrowDown } from 'react-icons/io'

type SubMenuItem = { name: string; href: string }
type MenuItem = { name: string; href: string; submenu?: SubMenuItem[] }

export const MobileMenu = ({ menus }: { menus: MenuItem[] }) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  const toggleSubmenu = (href: string) => setOpenSubmenu((prev) => (prev === href ? null : href))

  return (
    <>
      <button
        className="lg:hidden text-primary p-1 relative w-7 h-7 flex items-center justify-center"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <HiMenu
          size={26}
          className={`absolute transition-all duration-300 ${
            open ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        <HiX
          size={26}
          className={`absolute transition-all duration-300 ${
            open ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
          }`}
        />
      </button>

      <div
        className={`lg:hidden bg-white absolute top-full left-0 right-0 mt-3 rounded-xl border border-[#1C45953D] shadow-xl transition-all duration-300 origin-top ${
          open
            ? 'scale-y-100 opacity-100 pointer-events-auto'
            : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col px-4 py-3 gap-1">
          {menus.map((menu) => {
            const isActive =
              pathname === menu.href ||
              (menu.submenu?.some(
                (sub) => pathname === sub.href || pathname.startsWith(`${sub.href}/`),
              ) ??
                false)
            const isSubmenuOpen = openSubmenu === menu.href

            return (
              <li key={menu.href}>
                {menu.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(menu.href)}
                      className={`w-full flex items-center justify-between py-1 text-base transition-colors ${
                        isActive ? 'text-primary font-semibold' : 'hover:text-primary'
                      }`}
                    >
                      {menu.name}
                      <IoIosArrowDown
                        size={16}
                        className={`transition-transform duration-300 ${isSubmenuOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <ul
                      className={`overflow-hidden transition-all duration-300 pl-3 flex flex-col gap-1 border-l border-gray-200 ${
                        isSubmenuOpen ? 'max-h-96 mb-2' : 'max-h-0'
                      }`}
                    >
                      {menu.submenu.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            onClick={() => setOpen(false)}
                            className={`block py-1 text-sm transition-colors ${
                              pathname === sub.href
                                ? 'text-primary font-semibold'
                                : 'hover:text-primary text-gray-600'
                            }`}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    className={`block py-1 text-base transition-colors ${
                      isActive ? 'text-primary font-semibold' : 'hover:text-primary'
                    }`}
                    href={menu.href}
                    onClick={() => setOpen(false)}
                  >
                    {menu.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
