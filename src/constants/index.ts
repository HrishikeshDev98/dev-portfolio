import { StaticImageData } from 'next/image'

import NextJsIcon from '@/static/images/icons/next js.png'
import NodeJsIcon from '@/static/images/icons/nodejs.png'
import PayloadIcon from '@/static/images/icons/payload cms.png'
import ReactIcon from '@/static/images/icons/react.png'
import TailwindIcon from '@/static/images/icons/tailwind.png'
import TypeScriptIcon from '@/static/images/icons/typescript.png'
import LSRaheja from '@/static/images/projects/ls-raheja.png'
import Speedtest from '@/static/images/projects/speedtest-dashboard.jpeg'
import VPF from '@/static/images/projects/villoo-poonawala-foundation.png'

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
]

// ─── Tech stack ───────────────────────────────────────────────────────────────

export type TechIcon = {
  name: string
  icon: StaticImageData
}

export const TECH_STACK: Record<string, TechIcon> = {
  react: { name: 'React', icon: ReactIcon },
  typescript: { name: 'TypeScript', icon: TypeScriptIcon },
  nextjs: { name: 'Next.js', icon: NextJsIcon },
  nodejs: { name: 'Node.js', icon: NodeJsIcon },
  tailwind: { name: 'Tailwind CSS', icon: TailwindIcon },
  payload: { name: 'Payload CMS', icon: PayloadIcon },
}

export const TECH_STACK_COL_ONE: TechIcon[] = [
  TECH_STACK.react,
  TECH_STACK.typescript,
  TECH_STACK.nextjs,
]

export const TECH_STACK_COL_TWO: TechIcon[] = [
  TECH_STACK.nodejs,
  TECH_STACK.tailwind,
  TECH_STACK.payload,
]

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const TESTIMONIALS = [
  {
    name: 'Sarah Mitchell',
    role: 'Product Manager',
    company: 'Vercel',
    quote:
      "Collaborating with Hrishikesh was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. His enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, he is the ideal partner.",
    initials: 'SM',
  },
  {
    name: 'James Okafor',
    role: 'CTO',
    company: 'Launchpad Inc.',
    quote:
      'Working with Hrishikesh was a seamless experience. He understood our product requirements instantly and turned them into a fast, accessible, and beautiful web app.',
    initials: 'JO',
  },
  {
    name: 'Priya Nair',
    role: 'Founder',
    company: 'Sprout Studio',
    quote:
      'The attention to detail in both design implementation and API integration was impressive. Our clients constantly compliment the smoothness of the interface.',
    initials: 'PN',
  },
  {
    name: 'Lucas Fernandez',
    role: 'Lead Engineer',
    company: 'Notion',
    quote:
      "Exceptional problem-solving skills and clear communication throughout. He didn't just write code — he thought deeply about the user experience at every step.",
    initials: 'LF',
  },
  {
    name: 'Aiko Tanaka',
    role: 'Design Lead',
    company: 'Linear',
    quote:
      "Hrishikesh bridged the gap between design and engineering better than anyone I've worked with. Every transition, every interaction felt intentional and polished.",
    initials: 'AT',
  },
]

// ─── Recent Projects ──────────────────────────────────────────────────────────

export type Project = {
  title: string
  description: string
  image: StaticImageData
  link: string
  techs: TechIcon[]
}

export const PROJECTS: Project[] = [
  {
    title: 'LS Raheja College Website',
    description:
      'Explore the wonders of our solar system with this captivating 3D simulation of the planets using Three.js.',
    image: LSRaheja,
    link: '',
    techs: [TECH_STACK.react, TECH_STACK.nextjs, TECH_STACK.tailwind],
  },
  {
    title: 'Yoom – Video Conferencing App',
    description:
      'Simplify your video conferencing experience with Yoom. Seamlessly connect with colleagues and friends.',
    image: Speedtest,
    link: '#',
    techs: [TECH_STACK.nextjs, TECH_STACK.tailwind],
  },
  {
    title: 'AI Image SaaS – Canva Application',
    description:
      'A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.',
    image: VPF,
    link: '#',
    techs: [TECH_STACK.nextjs, TECH_STACK.payload, TECH_STACK.nodejs],
  },
]
