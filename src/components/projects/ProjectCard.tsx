import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

import type { TechIcon } from '@/constants'

import ProjectCardBg from '@/static/images/backgrounds/project-card-bg.png'

import { MdArrowOutward } from 'react-icons/md'

type CardProject = {
  title: string
  description: string
  image?: StaticImageData
  imageUrl?: string
  link: string
  techs: TechIcon[]
}

const ProjectCard = ({ project }: { project: CardProject }) => {
  const imgSrc = project.imageUrl ?? project.image ?? ProjectCardBg

  return (
    <div className="project-card h-full border border-light/10 rounded-2xl overflow-hidden flex flex-col bg-[#0c0e23] p-3">
      <div
        className="relative h-[250px] w-full overflow-hidden rounded-2xl flex items-end justify-center p-4"
        style={{ perspective: '1000px' }}
      >
        <Image
          src={ProjectCardBg}
          alt=""
          fill
          className="object-cover pointer-events-none"
          priority
        />
        <div
          className="relative w-[90%] h-full rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 top-full -translate-y-[80%]"
          style={{ transform: 'rotate(3deg)', transformOrigin: '50%' }}
        >
          <Image src={imgSrc} alt={project.title} fill className="object-cover" />
        </div>
      </div>

      <div className="py-5 flex flex-col flex-1">
        <h3 className="text-light font-bold text-lg leading-snug sub-heading mb-2">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed flex-1 text-[#BEC1DD] mb-4">{project.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            {project.techs.map((tech, i) => (
              <div
                key={tech.name}
                title={tech.name}
                className="w-9 h-9 rounded-full border border-white/20 bg-[#0c0e23] flex items-center justify-center overflow-hidden"
                style={{ marginLeft: i === 0 ? 0 : '-10px', zIndex: i }}
              >
                <Image src={tech.icon} alt={tech.name} className="object-contain w-full h-full" />
              </div>
            ))}
          </div>

          {project.link && (
            <Link
              href={project.link}
              target="_blank"
              className="flex items-center gap-2 text-secondary text-sm font-medium w-fit"
            >
              Check Live Site <MdArrowOutward size={12} />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
