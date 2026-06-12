import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
      {
        protocol: 'https',
        hostname: 'vpf.bayalis.in',
      },
      {
        protocol: 'https',
        hostname: 'vpf-media.s3.ap-south-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'd2plohnjso5frh.cloudfront.net',
      },
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
