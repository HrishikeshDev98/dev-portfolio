import React from 'react'
import Image from 'next/image'
import WorkImage1 from '@/static/images/work/work-1.png'
import Button from './form/Button'
import { IoMdCopy } from 'react-icons/io'

const TIMEZONES = [
  { label: 'USA', city: 'Boston', offset: 'UTC-5' },
  { label: 'Germany', city: 'Berlin', offset: 'UTC+1' },
  { label: 'Russia', city: 'Moscow', offset: 'UTC+3' },
]

const TECH_STACK = ['ReactJS', 'Vue.js', 'Express', 'NuxtJS', 'TypeScript', 'GraphQL']

const Work = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-cols-3 grid-rows-2 gap-4 mb-4">
          <div className="row-span-2 col-span-2  border-[1px] border-white/10 relative values overflow-hidden rounded-3xl">
            <Image
              src={WorkImage1}
              className="h-full w-full object-cover rounded-3xl"
              alt="Work Image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-3xl" />
            <div className="absolute bottom-10 left-10 text-light w-1/3 z-10">
              <p className="font-semibold text-xl">
                I prioritize client collaboration, fostering open communication
              </p>
            </div>
          </div>

          <div className=" border border-white/10 rounded-3xl p-6 flex flex-col gap-4">
            <p className="text-white font-semibold text-base leading-snug">
              I&apos;m very flexible with time zone communications
            </p>
            <div className="flex flex-col gap-2 mt-auto">
              {TIMEZONES.map((tz) => (
                <div
                  key={tz.label}
                  className="flex items-center justify-between bg-white/5 border border-white/5 rounded-lg px-3 py-2"
                >
                  <span className="text-white/80 text-sm">{tz.label}</span>
                  <span className="text-white/40 text-xs">{tz.offset}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack card */}
          <div className=" border border-white/10 rounded-3xl p-6 flex flex-col gap-4">
            <p className="text-white font-semibold text-base">My tech stack</p>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK.map((tech) => (
                <span
                  key={tech}
                  className="bg-white/5 border border-white/10 text-white/70 text-xs px-3 py-1.5 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom grid — 3 equal columns */}
        <div className="grid grid-rows-2 grid-cols-3 gap-4">
          {/* Tech enthusiast + email CTA stacked */}
          <div className="flex flex-col gap-4">
            <div className=" border border-white/10 rounded-3xl p-6 flex-1">
              <p className="text-white font-semibold text-base leading-snug">
                Tech enthusiast with a passion for development.
              </p>
            </div>
            <div className=" border border-white/10 rounded-3xl p-6">
              <p className="text-white font-semibold text-sm mb-4 leading-snug">
                Do you want to start a project together?
              </p>
              <Button text="Copy my email address" icon={<IoMdCopy size={20} />} />
            </div>
          </div>

          {/* Currently building */}
          <div className=" col-span-2 border border-white/10 rounded-3xl p-6 flex flex-col justify-end h-[400px]">
            <p className="text-secondary text-xs uppercase tracking-widest mb-3 font-medium">
              The Inside Scoop
            </p>
            <p className="text-white font-bold text-2xl leading-snug">
              Currently building a JS Animation library
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Work
