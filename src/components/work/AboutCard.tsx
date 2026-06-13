'use client'

import { useState } from 'react'
import Image from 'next/image'

import BannerGrid from '@/static/images/backgrounds/banner-grid.png'
import WorkingTogether from '@/static/images/work/working-together.png'

import { IoMdCheckmark, IoMdCopy } from 'react-icons/io'

const EMAIL = 'hrishi2298@gmail.com'

export const AboutCard = () => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (copied) return
    await navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bottom-card flex flex-col gap-4">
      <div className="border border-light/10 rounded-3xl p-6 flex-1">
        <Image
          src={BannerGrid}
          alt=""
          className="absolute top-0 left-0 w-full object-cover object-top z-0"
        />
        <p className="text-light text-[24px] text-center font-semibold leading-snug">
          Tech enthusiast with a passion for development.
        </p>
      </div>

      <div className="border border-light/10 rounded-3xl p-6 relative overflow-hidden">
        <Image
          src={WorkingTogether}
          alt=""
          className="absolute top-0 left-0 w-full object-cover object-top z-0"
        />
        <p className="text-light font-semibold text-[24px] text-center mb-4 leading-snug">
          Do you want to start a project together?
        </p>

        <button
          onClick={handleCopy}
          className="button button-primary text-light flex items-center justify-center gap-2 px-10 py-4 w-full relative overflow-hidden"
        >
          <span
            className={`transition-all duration-300 ${
              copied ? '-translate-y-6 opacity-0' : 'translate-y-0 opacity-100'
            }`}
          >
            Copy my email address
          </span>
          <span
            className={`absolute flex items-center gap-2 transition-all duration-300 ${
              copied ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            Copied!
          </span>

          <span className="relative w-5 h-5 shrink-0">
            <IoMdCopy
              size={20}
              className={`absolute inset-0 transition-all duration-300 ${
                copied ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
              }`}
            />
            <IoMdCheckmark
              size={20}
              className={`absolute inset-0 transition-all duration-300 ${
                copied ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
            />
          </span>
        </button>
      </div>
    </div>
  )
}
