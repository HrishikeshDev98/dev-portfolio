import type { CollectionConfig } from 'payload'

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
  },
}
