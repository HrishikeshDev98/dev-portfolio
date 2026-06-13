import Image from 'next/image'

import GlobeImage from '@/static/images/work/timings/globe.png'

export const TimezoneCard = () => (
  <div className="top-card border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
    <Image
      src={GlobeImage}
      alt="Globe"
      className="absolute bottom-0 left-0 w-full h-[40%] object-cover object-top z-0"
    />
    <p className="text-white font-semibold text-[24px] text-center leading-snug relative z-20">
      I&apos;m very flexible with time zone communications
    </p>
  </div>
)
