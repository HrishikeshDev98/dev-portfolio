import React from 'react'
import Image from 'next/image'
import WorkImage1 from '@/static/images/work/work-1.png'
import GlobeImage from '@/static/images/work/timings/globe.png'
import Button from './form/Button'
import { TechStackCarousel } from './TechStackCarousel'
import { IoMdCopy } from 'react-icons/io'

const Work = () => {
  return (
    <section className="section !pt-0">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 mb-4">
          <div className="h-[280px] md:h-[350px] md:col-span-2 lg:h-auto lg:col-span-2 lg:row-span-2 border-[1px] border-white/10 relative values overflow-hidden rounded-3xl">
            <Image
              src={WorkImage1}
              className="h-full w-full object-cover rounded-3xl"
              alt="Work Image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-3xl" />
            <div className="absolute bottom-10 left-10 text-light w-2/3 lg:w-2/3 z-10">
              <p className="font-semibold text-[32px]">
                I prioritize client collaboration, fostering open communication
              </p>
            </div>
          </div>

          <div className="border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
            <Image
              src={GlobeImage}
              alt="Globe"
              className="absolute bottom-0 left-0 w-full h-[30%] object-cover object-top z-0"
            />
            <p className="text-white font-semibold text-[24px] text-center leading-snug relative z-20">
              I&apos;m very flexible with time zone communications
            </p>
          </div>

          <div className="border border-white/10 rounded-3xl p-6 flex flex-col justify-center gap-4 relative overflow-hidden h-[320px]">
            <p className="text-light  text-base font-extralight relative z-10">
              I constantly try to improve
            </p>
            <p className="text-light font-semibold text-[24px] relative z-10">My tech stack</p>
            <TechStackCarousel />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col gap-4">
            <div className="border border-light/10 rounded-3xl p-6 flex-1">
              <p className="text-light text-[24px] text-center font-semibold text-base leading-snug">
                Tech enthusiast with a passion for development.
              </p>
            </div>
            <div className="border border-light/10 rounded-3xl p-6">
              <p className="text-light font-semibold text-[24px] text-center mb-4 leading-snug">
                Do you want to start a project together?
              </p>
              <Button
                text="Copy my email address"
                className="flex w-full"
                icon={<IoMdCopy size={20} />}
              />
            </div>
          </div>

          <div className="lg:col-span-2 border border-light/10 rounded-3xl p-6 flex flex-col justify-end h-[300px] md:h-[400px]">
            <p className="text-secondary text-xs uppercase tracking-widest mb-3 font-medium">
              The Inside Scoop
            </p>
            <p className="text-light font-bold text-2xl leading-snug">
              Currently building a JS Animation library
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Work
