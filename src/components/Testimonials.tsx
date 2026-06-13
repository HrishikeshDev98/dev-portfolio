'use client'

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'swiper/css'
import 'swiper/css/pagination'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    name: 'Sarah Mitchell',
    role: 'Product Manager',
    company: 'Vercel',
    quote:
      'Hrishikesh delivered a pixel-perfect Next.js application ahead of schedule. His attention to performance and clean code structure made our codebase a joy to maintain.',
    initials: 'SM',
  },
  {
    name: 'James Okafor',
    role: 'CTO',
    company: 'Launchpad Inc.',
    quote:
      'Working with Hrishikesh was a seamless experience. He understood our product requirements instantly and turned them into a fast, accessible, and beautiful web app.',
    initials: 'JO',
  },
  {
    name: 'Priya Nair',
    role: 'Founder',
    company: 'Sprout Studio',
    quote:
      'The attention to detail in both design implementation and API integration was impressive. Our clients constantly compliment the smoothness of the interface.',
    initials: 'PN',
  },
  {
    name: 'Lucas Fernandez',
    role: 'Lead Engineer',
    company: 'Notion',
    quote:
      "Exceptional problem-solving skills and clear communication throughout. He didn't just write code — he thought deeply about the user experience at every step.",
    initials: 'LF',
  },
  {
    name: 'Aiko Tanaka',
    role: 'Design Lead',
    company: 'Linear',
    quote:
      "Hrishikesh bridged the gap between design and engineering better than anyone I've worked with. Every transition, every interaction felt intentional and polished.",
    initials: 'AT',
  },
]

const Stars = () => (
  <div className="flex gap-1 mb-5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className="w-4 h-4 fill-secondary" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
)

const TestimonialCard = ({
  name,
  role,
  company,
  quote,
  initials,
}: (typeof TESTIMONIALS)[number]) => (
  <div className="h-full flex flex-col justify-between border border-white/10 rounded-3xl p-8 bg-white/[0.02] backdrop-blur-sm">
    <div>
      <Stars />
      <p className="text-light/80 text-[17px] leading-relaxed font-light">&ldquo;{quote}&rdquo;</p>
    </div>
    <div className="flex items-center gap-4 mt-8">
      <div className="w-11 h-11 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center shrink-0">
        <span className="text-secondary text-sm font-semibold">{initials}</span>
      </div>
      <div>
        <p className="text-light font-semibold text-base leading-tight">{name}</p>
        <p className="text-light/50 text-sm font-light mt-0.5">
          {role} · {company}
        </p>
      </div>
    </div>
  </div>
)

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.testimonials-label', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from('.testimonials-heading', {
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        delay: 0.15,
      })
      gsap.from('.testimonials-carousel', {
        y: 48,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        delay: 0.3,
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="section overflow-hidden">
      <div className="container mb-12">
        <p className="testimonials-label text-secondary text-xs uppercase tracking-widest font-medium text-center mb-3">
          What clients say
        </p>
        <h2 className="testimonials-heading text-light text-center sub-heading">
          Trusted by people who <br className="hidden md:block" /> ship great products
        </h2>
      </div>

      <div className="testimonials-carousel px-4 md:px-10">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1.1}
          spaceBetween={16}
          centeredSlides
          loop
          speed={700}
          autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true, el: '.testimonials-pagination' }}
          breakpoints={{
            640: { slidesPerView: 1.4, spaceBetween: 20 },
            1024: { slidesPerView: 2.4, spaceBetween: 24 },
            1280: { slidesPerView: 3, spaceBetween: 24 },
          }}
          className="!pb-14"
        >
          {TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.name} className="h-auto self-stretch">
              <TestimonialCard {...t} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="testimonials-pagination flex justify-center gap-2 mt-2" />
      </div>
    </section>
  )
}

export default Testimonials
