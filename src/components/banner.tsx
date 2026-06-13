'use client'

import React, { useRef } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import Button from './form/Button'

import { FiGithub } from 'react-icons/fi'

gsap.registerPlugin()

const Banner = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.banner-tagline', { y: 24, opacity: 0, duration: 0.7 })
        .from('.banner-heading', { y: 48, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.banner-sub', { y: 24, opacity: 0, duration: 0.7 }, '-=0.4')
        .from('.banner-cta', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    },
    { scope: containerRef },
  )

  return (
    <div ref={containerRef} className="section pt-[200px] h-full md:min-h-[90vh] banner">
      <div className="container">
        <p className="banner-tagline text-base text-center font-light mb-2 text-light uppercase tracking-widest">
          Crafting Dynamic Web Solutions with Nextjs Expertise
        </p>
        <h2 className="banner-heading heading mb-6 text-center text-light">
          Transorming Concepts into <br />
          Seamless <span className="text-secondary"> User Experiences</span>
        </h2>
        <p className="banner-sub text-lg text-center font-light mb-6 text-light tracking-widest">
          Hi! I&apos;m Hrishikesh, a Next.js Developer based in India
        </p>
        <div className="banner-cta">
          <Button
            text="Github"
            className="max-w-fit flex mx-auto text-center"
            link="https://github.com/HrishikeshDev98"
            icon={<FiGithub />}
          />
        </div>
      </div>
    </div>
  )
}

export default Banner
