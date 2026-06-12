import Link from 'next/link'

const QUICK_LINKS = [
  { name: 'Home', href: '/' },
]

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <section className="container">
        <div className="flex flex-col md:flex-row gap-12 py-16 justify-between">
          <div>
            <Link href="/" className="font-bold text-xl">
              My App
            </Link>
          </div>
          <div>
            <h6 className="text-sm font-semibold uppercase tracking-widest mb-5">Quick Links</h6>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-black transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 py-8">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} My App. All rights reserved.
          </p>
        </div>
      </section>
    </footer>
  )
}

export default Footer
