import Image from 'next/image'

import WorkImage1 from '@/static/images/work/work-1.png'

export const LargeImageCard = () => (
  <div className="top-card h-[280px] md:h-[350px] md:col-span-2 lg:h-auto lg:col-span-2 lg:row-span-2 border-[1px] border-white/10 relative values overflow-hidden rounded-3xl">
    <Image src={WorkImage1} className="h-full w-full object-cover rounded-3xl" alt="Work Image" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-3xl" />
    <div className="absolute bottom-10 left-10 text-light w-2/3 z-10">
      <p className="font-semibold text-[32px]">
        I prioritize client collaboration, fostering open communication
      </p>
    </div>
  </div>
)
