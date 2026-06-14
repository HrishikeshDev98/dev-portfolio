'use client'

import { useRef } from 'react'
import Image from 'next/image'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import BannerGrid from '@/static/images/backgrounds/banner-grid.png'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.footer-heading', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
      })
    },
    { scope: footerRef },
  )

  return (
    <footer ref={footerRef} className="relative overflow-hidden">
      <section className="section relative z-10">
        <Image
          src={BannerGrid}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
          fill
        />
        <div className="container">
          <h2 className="footer-heading text-light text-center sub-heading">
            Ready to take <span className="text-secondary">your</span> digital <br />
            presence to the next level?
          </h2>
        </div>
      </section>
    </footer>
  )
}

export default Footer
