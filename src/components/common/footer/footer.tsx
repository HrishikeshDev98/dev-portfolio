import Image from 'next/image'
import Link from 'next/link'

import BannerGrid from '@/static/images/backgrounds/banner-grid.png'

const QUICK_LINKS = [{ name: 'Home', href: '/' }]

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      <section className="section relative z-10">
        <Image
          src={BannerGrid}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
          fill
        />
        <div className="container">
          <h2 className="text-light text-center sub-heading">
            Ready to take <span className="text-secondary">your</span> digital <br />
            presence to the next level?
          </h2>
        </div>
      </section>
    </footer>
  )
}

export default Footer
