import { Montserrat } from 'next/font/google'
import '@/static/css/tailwind.config.css'
import Header from '@/components/common/header/header'
import Footer from '@/components/common/footer/footer'

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

export const metadata = {
  description: 'Your site description',
  title: 'My App',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html className={`${montserrat.variable} overflow-x-hidden`} lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
