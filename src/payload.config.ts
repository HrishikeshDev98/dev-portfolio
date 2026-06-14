import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Testimonials } from './collections/Testimonials'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const VERCEL_URL = 'https://dev-portfolio-lime-six.vercel.app'

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_BASE_URL || VERCEL_URL,
  cors: ['http://localhost:3000', VERCEL_URL, process.env.NEXT_PUBLIC_BASE_URL || ''].filter(
    Boolean,
  ),
  csrf: ['http://localhost:3000', VERCEL_URL, process.env.NEXT_PUBLIC_BASE_URL || ''].filter(
    Boolean,
  ),

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Projects, Testimonials],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [payloadCloudPlugin()],
})
