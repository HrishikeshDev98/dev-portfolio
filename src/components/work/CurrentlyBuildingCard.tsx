import Image from 'next/image'
import JavascriptImage from '@/static/images/work/javascript.png'

export const CurrentlyBuildingCard = () => (
  <div className="bottom-card lg:col-span-2 border border-light/10 rounded-3xl p-6 flex flex-col justify-end h-[300px] md:h-[400px] relative overflow-hidden">
    <Image
      src={JavascriptImage}
      alt="JavaScript"
      className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-auto object-contain z-0 opacity-70"
    />
    <p className="text-secondary text-xs uppercase tracking-widest mb-3 font-medium relative z-10">
      The Inside Scoop
    </p>
    <p className="text-light font-bold text-2xl leading-snug relative z-10">
      Currently becoming a JS nerd.
    </p>
  </div>
)
