import Banner from '@/components/banner'
import RecentProjects from '@/components/RecentProjects'
import Testimonials from '@/components/Testimonials'
import Work from '@/components/Work'

const Page = () => {
  return (
    <>
      <Banner />
      <div id="about">
        <Work />
      </div>
      <div id="projects">
        <RecentProjects />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
    </>
  )
}

export default Page
