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

const techNameToIcon = Object.values(TECH_STACK).reduce<Record<string, TechIcon>>((acc, t) => {
  acc[t.name.toLowerCase()] = t
  return acc
}, {})

function mapTechNames(names: { name: string }[]): TechIcon[] {
  return names.map(({ name }) => techNameToIcon[name.toLowerCase()]).filter(Boolean) as TechIcon[]
}

export async function getProjects(): Promise<CMSProject[]> {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'projects',
      sort: 'order',
      limit: 20,
    })

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
  } catch {
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

    if (!docs.length) return []

    return docs.map((doc) => ({
      name: doc.name,
      role: doc.role,
      company: doc.company,
      quote: doc.quote,
      initials: doc.initials,
    }))
  } catch {
    return []
  }
}

export { PROJECTS, TESTIMONIALS }
