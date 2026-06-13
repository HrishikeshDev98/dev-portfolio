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
