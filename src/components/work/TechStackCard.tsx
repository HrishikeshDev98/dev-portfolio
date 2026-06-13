import { TechStackCarousel } from '@/components/TechStackCarousel'

export const TechStackCard = () => (
  <div className="top-card border border-white/10 rounded-3xl p-6 flex flex-col justify-center gap-4 relative overflow-hidden h-[320px]">
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-3xl" />
    <div className="absolute bottom-10 left-10">
      <p className="text-light font-semibold text-[24px] relative z-10">My tech stack</p>
    </div>
    <TechStackCarousel />
  </div>
)
