'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { type Project, PROJECTS } from '@/constants'

import ProjectCardBg from '@/static/images/backgrounds/project-card-bg.png'

import { MdArrowOutward } from 'react-icons/md'

gsap.registerPlugin(ScrollTrigger)

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="project-card border border-light/10 rounded-2xl overflow-hidden flex flex-col bg-[#0c0e23] p-3">
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
        style={{
          transform: 'rotate(3deg)',
          transformOrigin: '50%',
        }}
      >
        <Image src={project.image} alt={project.title} fill className="object-cover" />
      </div>
    </div>

    <div className="py-5">
      <h3 className="text-light font-bold text-lg leading-snug sub-heading mb-2">
        {project.title}
      </h3>
      <p className="text-sm leading-relaxed flex-1 text-[#BEC1DD] mb-4">{project.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {project.techs.map((tech, i) => (
            <div
              key={tech.name}
              title={tech.name}
              className="w-9 h-9  rounded-full border border-white/20 bg-[#0c0e23] flex items-center justify-center overflow-hidden"
              style={{ marginLeft: i === 0 ? 0 : '-10px', zIndex: i }}
            >
              <Image src={tech.icon} alt={tech.name} className="object-contain w-full h-full" />
            </div>
          ))}
        </div>

        <Link
          href={project.link}
          target="_blank"
          className="flex items-center gap-2 text-secondary text-sm font-medium w-fit"
        >
          Check Live Site <MdArrowOutward size={12} />
        </Link>
      </div>
    </div>
  </div>
)

const RecentProjects = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.projects-heading', {
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })

      gsap.from('.project-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 82%' },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="section">
      <div className="container">
        <h2 className="projects-heading sub-heading text-light text-center mb-12">
          A small selection of <span className="text-secondary">recent projects</span>
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecentProjects
