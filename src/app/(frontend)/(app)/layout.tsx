import { Inter } from 'next/font/google'

import '@/static/css/tailwind.config.css'
import 'swiper/css'

import Footer from '@/components/common/footer/footer'
import Header from '@/components/common/header/header'

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  description: '',
  title: 'Hrishikesh - Developer Portfolio',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html className={`${inter.variable} overflow-x-hidden`} lang="en">
      <body className="bg-primary ">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
