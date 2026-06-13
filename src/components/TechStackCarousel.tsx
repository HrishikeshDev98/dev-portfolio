'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { TECH_STACK_COL_ONE, TECH_STACK_COL_TWO } from '@/constants'

const Card = ({ tech }: { tech: string }) => (
  <div className="w-full py-8 rounded-lg bg-white/5 flex items-center justify-center">
    <span className="text-white/80 text-sm font-medium text-center px-2">{tech}</span>
  </div>
)

export const TechStackCarousel = () => {
  return (
    <div className="absolute right-0 w-2/3 h-[280px] flex gap-3 pe-4  overflow-hidden">
      <Swiper
        direction="vertical"
        slidesPerView="auto"
        loop
        speed={1200}
        autoplay={{ delay: 700, disableOnInteraction: false }}
        modules={[Autoplay]}
        className="w-1/2 h-[280px]"
      >
        {TECH_STACK_COL_ONE.map((tech) => (
          <SwiperSlide key={tech} className="!h-[100px]">
            <Card tech={tech} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        direction="vertical"
        slidesPerView="auto"
        loop
        speed={800}
        autoplay={{ delay: 700, disableOnInteraction: false, reverseDirection: true }}
        modules={[Autoplay]}
        className="w-1/2 h-[280px]"
      >
        {TECH_STACK_COL_TWO.map((tech) => (
          <SwiperSlide key={tech} className="!h-[100px]">
            <Card tech={tech} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
