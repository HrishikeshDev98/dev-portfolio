'use client'

import { useRef } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { AboutCard } from './work/AboutCard'
import { CurrentlyBuildingCard } from './work/CurrentlyBuildingCard'
import { LargeImageCard } from './work/LargeImageCard'
import { TechStackCard } from './work/TechStackCard'
import { TimezoneCard } from './work/TimezoneCard'

gsap.registerPlugin(ScrollTrigger)

const Work = () => {
  const topGridRef = useRef<HTMLDivElement>(null)
  const bottomGridRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.top-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: topGridRef.current, start: 'top 82%' },
      })
    },
    { scope: topGridRef },
  )

  useGSAP(
    () => {
      gsap.from('.bottom-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: bottomGridRef.current, start: 'top 82%' },
      })
    },
    { scope: bottomGridRef },
  )

  return (
    <section className="section pt-0">
      <div className="container">
        <div
          ref={topGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 mb-4"
        >
          <LargeImageCard />
          <TimezoneCard />
          <TechStackCard />
        </div>

        <div ref={bottomGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AboutCard />
          <CurrentlyBuildingCard />
        </div>
      </div>
    </section>
  )
}

export default Work
