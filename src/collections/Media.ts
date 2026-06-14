import type { CollectionConfig } from 'payload'

import cloudinary from '@/lib/cloudinary'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: true,
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'cloudinaryUrl',
      type: 'text',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'cloudinaryPublicId',
      type: 'text',
      admin: { readOnly: true, position: 'sidebar' },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.alt && data.filename) {
          const nameWithoutExt = data.filename.replace(/\.[^/.]+$/, '')
          data.alt = nameWithoutExt.replace(/[-_]/g, ' ')
        }
        return data
      },
    ],
    beforeChange: [
      async ({ data, req, operation }) => {
        if ((operation === 'create' || operation === 'update') && req.file?.data) {
          const dataUrl = `data:${req.file.mimetype};base64,${req.file.data.toString('base64')}`
          const result = await cloudinary.uploader.upload(dataUrl, {
            folder: 'portfolio',
            use_filename: true,
            unique_filename: true,
          })
          data.cloudinaryUrl = result.secure_url
          data.cloudinaryPublicId = result.public_id
        }
        return data
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        if (doc.cloudinaryPublicId) {
          await cloudinary.uploader.destroy(doc.cloudinaryPublicId)
        }
      },
    ],
  },
}
