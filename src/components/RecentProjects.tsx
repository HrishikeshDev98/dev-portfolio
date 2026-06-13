import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MdArrowOutward } from 'react-icons/md'

import { PROJECTS, type Project } from '@/constants'

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="border border-white/10 rounded-2xl overflow-hidden flex flex-col bg-[#10132e]">
    {/* Image */}
    <div className="relative h-[220px] w-full overflow-hidden">
      <Image src={project.image} alt={project.title} fill className="object-cover object-top" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#10132e]/80 to-transparent" />
    </div>

    {/* Content */}
    <div className="flex flex-col flex-1 p-6 gap-4">
      <h3 className="text-white font-bold text-lg leading-snug">{project.title}</h3>
      <p className="text-sm leading-relaxed flex-1">{project.description}</p>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-2">
        {project.techs.map((tech) => (
          <span
            key={tech}
            className="bg-white/5 border border-white/10 text-white/60 text-xs px-3 py-1 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Link */}
      <Link
        href={project.link}
        target="_blank"
        className="flex items-center gap-2 text-secondary text-sm font-medium hover:gap-3 transition-all duration-200 w-fit"
      >
        Check Live Site <MdArrowOutward size={12} />
      </Link>
    </div>
  </div>
)

const RecentProjects = () => {
  return (
    <section className="section">
      <div className="container">
        <h2 className="sub-heading text-light text-center mb-12 ">
          A small selection of <span className="text-secondary">recent projects</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecentProjects
