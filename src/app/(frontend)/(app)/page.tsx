export const dynamic = 'force-dynamic'

import Banner from '@/components/banner'
import RecentProjects from '@/components/RecentProjects'
import Testimonials from '@/components/Testimonials'
import Work from '@/components/Work'
import { getProjects, getTestimonials } from '@/lib/payload-data'

const Page = async () => {
  const [cmsProjects, cmsTestimonials] = await Promise.all([getProjects(), getTestimonials()])

  return (
    <>
      <Banner />
      <div id="about">
        <Work />
      </div>
      <div id="projects">
        <RecentProjects cmsProjects={cmsProjects} />
      </div>
      <div id="testimonials">
        <Testimonials cmsItems={cmsTestimonials} />
      </div>
    </>
  )
}

export default Page
