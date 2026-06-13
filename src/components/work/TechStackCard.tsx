import { TechStackCarousel } from '@/components/TechStackCarousel'

export const TechStackCard = () => (
  <div className="top-card border border-white/10 rounded-3xl p-6 flex flex-col justify-center gap-4 relative overflow-hidden h-[320px]">
    <div>
      <p className="text-light font-semibold text-[24px] relative z-10">My tech stack</p>
    </div>
    <TechStackCarousel />
  </div>
)
