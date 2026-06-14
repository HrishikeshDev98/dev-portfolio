'use client'

import { useRef } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ProjectCard from '@/components/projects/ProjectCard'
import { PROJECTS } from '@/constants'
import type { CMSProject } from '@/lib/payload-data'

gsap.registerPlugin(ScrollTrigger)

const RecentProjects = ({ cmsProjects }: { cmsProjects: CMSProject[] }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const projects = cmsProjects.length ? cmsProjects : null

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
          {projects
            ? projects.map((p) => <ProjectCard key={p.title} project={p} />)
            : PROJECTS.map((p) => <ProjectCard key={p.title} project={p} />)}
        </div>
      </div>
    </section>
  )
}

export default RecentProjects
