import Image from 'next/image'
import Button from '@/components/form/Button'
import BannerGrid from '@/static/images/banner-grid.png'
import WorkingTogether from '@/static/images/work/working-together.png'
import { IoMdCopy } from 'react-icons/io'

export const AboutCard = () => (
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
      <Button text="Copy my email address" className="flex w-full" icon={<IoMdCopy size={20} />} />
    </div>
  </div>
)
