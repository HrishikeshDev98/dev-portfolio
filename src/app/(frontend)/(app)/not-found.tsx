import Link from 'next/link'
import { IoArrowBackOutline, IoHomeOutline } from 'react-icons/io5'

export const metadata = {
  title: 'Page Not Found | Villoo Poonawala Foundation',
  description: 'The page you are looking for could not be found.',
}

const NotFound = () => {
  return (
    <section className="section flex items-center justify-center min-h-[70vh]">
      <div className="container text-center">
        <p
          className="font-heading font-bold text-primary leading-none text-[120px] md:text-[180px]"
          data-aos="fade-up"
        >
          404
        </p>
        <h1 className="heading mt-2" data-aos="fade-up" data-aos-delay="100">
          Page Not Found
        </h1>
        <p
          className="text-gray-600 mt-4 max-w-xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Sorry, the page you are looking for doesn&apos;t exist or has been moved. Let&apos;s get
          you back on track.
        </p>
        <div
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <Link href="/" className="button">
            <IoHomeOutline size={18} className="mr-2" />
            Back to Home
          </Link>
          <Link
            href="/contact-us"
            className="button !bg-transparent !text-primary !border-primary hover:!bg-primary hover:!text-light"
          >
            <IoArrowBackOutline size={18} className="mr-2" />
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFound
