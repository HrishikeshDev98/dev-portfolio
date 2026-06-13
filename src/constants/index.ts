import { StaticImageData } from 'next/image'
import WorkImage1 from '@/static/images/work/work-1.png'

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
]

// ─── Work section ─────────────────────────────────────────────────────────────

export const TECH_STACK_COL_ONE = [
  'ReactJS',
  'TypeScript',
  'Next.js',
  'Vue.js',
  'Express',
  'GraphQL',
]
export const TECH_STACK_COL_TWO = [
  'Vue.js',
  'Express',
  'GraphQL',
  'ReactJS',
  'TypeScript',
  'Next.js',
]

// ─── Recent Projects ──────────────────────────────────────────────────────────

export type Project = {
  title: string
  description: string
  image: StaticImageData
  link: string
  techs: string[]
}

export const PROJECTS: Project[] = [
  {
    title: '3D Solar System Planets to Explore',
    description:
      'Explore the wonders of our solar system with this captivating 3D simulation of the planets using Three.js.',
    image: WorkImage1,
    link: '#',
    techs: ['React', 'Three.js', 'GSAP'],
  },
  {
    title: 'Yoom – Video Conferencing App',
    description:
      'Simplify your video conferencing experience with Yoom. Seamlessly connect with colleagues and friends.',
    image: WorkImage1,
    link: '#',
    techs: ['Next.js', 'TypeScript', 'Tailwind'],
  },
  {
    title: 'AI Image SaaS – Canva Application',
    description:
      'A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.',
    image: WorkImage1,
    link: '#',
    techs: ['Next.js', 'MongoDB', 'Stripe'],
  },
  {
    title: 'Animated Apple iPhone 3D Website',
    description:
      'Recreated the Apple iPhone 15 Pro website, combining GSAP animations & Three.js 3D effects.',
    image: WorkImage1,
    link: '#',
    techs: ['React', 'GSAP', 'Three.js'],
  },
]
