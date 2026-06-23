'use client'

import { useRef } from 'react'
import Image from 'next/image'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { TESTIMONIALS } from '@/constants'
import type { CMSTestimonial } from '@/lib/payload-data'

import BgImage from '@/static/images/testimonials/bg.png'

gsap.registerPlugin(ScrollTrigger)

type TestimonialItem = {
  name: string
  role: string
  company: string
  quote: string
  initials: string
}

const TestimonialCard = ({ name, role, company, quote, initials }: TestimonialItem) => (
  <div className="relative h-full flex flex-col justify-between border border-white/10 rounded-2xl md:rounded-3xl p-3 md:p-5">
    <Image
      src={BgImage}
      className="absolute inset-0 w-full h-full object-cover rounded-2xl md:rounded-3xl -z-10"
      alt="bg"
    />
    <p className="text-light/80 text-sm md:text-base leading-relaxed font-light">{quote}</p>
    <div className="flex items-center gap-3 mt-5 md:mt-8">
      <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center shrink-0">
        <span className="text-secondary text-xs md:text-sm font-semibold">{initials}</span>
      </div>
      <div>
        <p className="text-light font-semibold text-sm md:text-base leading-tight">{name}</p>
        <p className="text-light/50 text-xs md:text-sm font-light mt-0.5">
          {role} · {company}
        </p>
      </div>
    </div>
  </div>
)

const Testimonials = ({ cmsItems }: { cmsItems: CMSTestimonial[] }) => {
  const sectionRef = useRef<HTMLElement>(null)

  const items: TestimonialItem[] = cmsItems.length ? cmsItems : TESTIMONIALS

  useGSAP(
    () => {
      gsap.from('.testimonials-heading', {
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from('.testimonials-carousel', {
        y: 48,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        delay: 0.2,
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="section overflow-hidden">
      <div className="container mb-12">
        <h2 className="testimonials-heading text-light text-center sub-heading">
          Kind words from <span className="text-secondary">peers</span>
        </h2>
      </div>

      <div className="testimonials-carousel">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1.1}
          spaceBetween={12}
          centeredSlides
          loop
          speed={700}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            480: { slidesPerView: 1, spaceBetween: 16 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 2.8, spaceBetween: 20 },
          }}
        >
          {items.map((t) => (
            <SwiperSlide key={t.name} className="!h-auto py-2">
              <TestimonialCard {...t} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Testimonials
