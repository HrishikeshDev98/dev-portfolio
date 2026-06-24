import config from '@payload-config'
import { getPayload } from 'payload'

import { PROJECTS, TECH_STACK, type TechIcon, TESTIMONIALS } from '@/constants'

export type CMSProject = {
  title: string
  description: string
  imageUrl: string
  link: string
  techs: TechIcon[]
}

export type CMSTestimonial = {
  name: string
  role: string
  company: string
  quote: string
  initials: string
}

// Strip everything but letters/digits so "Next.js", "NextJS" and "Next js" all collapse to "nextjs"
const normalizeTech = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

const techNameToIcon = Object.entries(TECH_STACK).reduce<Record<string, TechIcon>>(
  (acc, [key, tech]) => {
    acc[key] = tech // record key, e.g. "tailwind", "payload"
    acc[normalizeTech(tech.name)] = tech // normalized display name, e.g. "tailwindcss"
    return acc
  },
  {},
)

// Common shorthands authors type in the CMS that don't normalize to a known key
const TECH_ALIASES: Record<string, string> = {
  node: 'nodejs',
  next: 'nextjs',
  ts: 'typescript',
}

function mapTechNames(names: { name: string }[]): TechIcon[] {
  return names
    .map(({ name }) => {
      const key = normalizeTech(name)
      return techNameToIcon[key] ?? techNameToIcon[TECH_ALIASES[key]]
    })
    .filter(Boolean) as TechIcon[]
}

export async function getProjects(): Promise<CMSProject[]> {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'projects',
      sort: 'order',
      limit: 20,
    })

    console.log(`[CMS] projects fetched: ${docs.length}`)
    if (!docs.length) return []

    return docs.map((doc) => {
      const media = doc.image as { cloudinaryUrl?: string; url?: string } | null
      const imageUrl = media?.cloudinaryUrl ?? media?.url ?? ''
      return {
        title: doc.title,
        description: doc.description,
        imageUrl,
        link: doc.link ?? '',
        techs: mapTechNames((doc.techs as { name: string }[]) ?? []),
      }
    })
  } catch (err) {
    console.error('[CMS] getProjects failed:', err)
    return []
  }
}

export async function getTestimonials(): Promise<CMSTestimonial[]> {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'testimonials',
      sort: 'order',
      limit: 20,
    })

    console.log(`[CMS] testimonials fetched: ${docs.length}`)
    if (!docs.length) return []

    return docs.map((doc) => ({
      name: doc.name,
      role: doc.role,
      company: doc.company,
      quote: doc.quote,
      initials: doc.initials,
    }))
  } catch (err) {
    console.error('[CMS] getTestimonials failed:', err)
    return []
  }
}

export { PROJECTS, TESTIMONIALS }
