import Image from 'next/image'
import Link from 'next/link'

import { type Project, PROJECTS } from '@/constants'

import ProjectCardBg from '@/static/images/backgrounds/project-card-bg.png'

import { MdArrowOutward } from 'react-icons/md'

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="border border-light/10 rounded-2xl overflow-hidden flex flex-col bg-[#10132e] p-3">
    <div className="relative h-[250px] w-full overflow-hidden rounded-2xl">
      {/* <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover object-top transform rotate-6 z-10 bottom-10 rounded-2xl w-2/3"
      /> */}
      <Image
        src={ProjectCardBg}
        alt={project.title}
        fill
        className="object-cover pointer-events-none "
      />
    </div>

    {/* Content */}
    <div className="flex flex-col flex-1 p-6 gap-4">
      <h3 className="text-light font-bold text-lg leading-snug sub-heading">{project.title}</h3>
      <p className="text-sm leading-relaxed flex-1 text-[#BEC1DD]">{project.description}</p>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-2">
        {project.techs.map((tech) => (
          <span
            key={tech}
            className="bg-light/5 border border-light/10 text-light/60 text-xs px-3 py-1 rounded-full"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecentProjects
