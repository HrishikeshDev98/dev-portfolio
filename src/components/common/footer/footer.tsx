'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Button from '@/components/form/Button'

import BannerGrid from '@/static/images/backgrounds/banner-grid.png'

import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { MdKeyboardArrowUp } from 'react-icons/md'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  useGSAP(
    () => {
      gsap.from('.footer-heading', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
      })
      gsap.from('.footer-text', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
      })
      gsap.from('.footer-cta', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.35,
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
      })
    },
    { scope: footerRef },
  )

  return (
    <>
      <footer ref={footerRef} className="relative overflow-hidden">
        <section className="section relative z-10">
          <Image
            src={BannerGrid}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
            fill
          />
          <div className="container text-center">
            <h2 className="footer-heading text-light text-center sub-heading mb-4">
              Ready to take <span className="text-secondary">your</span> digital <br />
              presence to the next level?
            </h2>
            <p className="footer-text text-light font-light mb-6 text-sm">
              Reach out to me today and let&apos;s discuss how I can help you achieve your goals.
            </p>
            <Button
              text="Contact Me Now"
              icon={<FaWhatsapp size={20} />}
              link="https://wa.me/919322882564"
              className="footer-cta w-fit mx-auto"
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        </section>

        <div className="py-5">
          <div className="container flex items-center justify-between">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} Hrishikesh. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <Button
                icon={<FaGithub size={16} />}
                link="https://github.com/HrishikeshDev98"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              />
              <Button
                icon={<FaLinkedin size={16} />}
                link="https://www.linkedin.com/in/hrishikesh-pawar-370413205/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              />
              <Button
                icon={<FaInstagram size={16} />}
                link="https://www.instagram.com/_hrishi.xd/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              />
            </div>
          </div>
        </div>
      </footer>

      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-8 right-6 z-50 w-11 h-11 rounded-full bg-[#38228B] flex items-center justify-center shadow-lg transition-all duration-300 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <MdKeyboardArrowUp size={24} className="text-white" />
      </button>
    </>
  )
}

export default Footer
